<script lang="ts">
	import { pb } from '$lib/states/photobooth.svelte';
	import { startCamera, stopCamera } from '$lib/utils/camera';
	import { captureFrame } from '$lib/utils/canvas';
	import { getFilterById } from '$lib/utils/filters';
	import { playShutter } from '$lib/utils/sounds';
	import { onMount } from 'svelte';
	import CountdownOverlay from '$lib/components/CountdownOverlay.svelte';
	import ErrorOverlay from '$lib/components/ErrorOverlay.svelte';

	let video = $state<HTMLVideoElement | null>(null);
	let stream: MediaStream | null = null;
	let counting = $state(false);
	let previewUrl = $state<string | null>(null);
	let showing = $state(false);
	let ready = $state(false);
	let flash = $state(false);
	let tid: ReturnType<typeof setTimeout> | null = null;

	onMount(() => {
		initCam(pb.facing);
		return () => { if (tid) clearTimeout(tid); stopCamera(stream); };
	});

	$effect(() => {
		if (video && stream) {
			video.srcObject = stream;
			video.play();
		}
	});

	async function initCam(facing: 'user' | 'environment') {
		try {
			ready = false;
			stopCamera(stream);
			stream = await startCamera(facing);
			if (video) {
				video.srcObject = stream;
				video.play();
				ready = true;
			}
		} catch (e) {
			pb.setErr(e instanceof Error ? e.message : 'Gagal akses kamera');
		}
	}

	async function snap() {
		if (!video || !stream) return;
		counting = false;
		const f = getFilterById(pb.filter);
		const url = await captureFrame(video, f.cssFilter, pb.orient);

		flash = true;
		setTimeout(() => flash = false, 280);

		playShutter();
		previewUrl = url;
		showing = true;

		tid = setTimeout(() => {
			pb.addPhoto(url);
			showing = false;
			previewUrl = null;
			tid = null;
		}, 700);
	}

	function startCd() { counting = true; }
	function onDone() { snap(); }

	async function flip() {
		if (tid) { clearTimeout(tid); tid = null; }
		pb.toggleFacing();
		await initCam(pb.facing);
	}

	function goBack() {
		if (tid) clearTimeout(tid);
		stopCamera(stream);
		pb.reset();
	}

	function handleUpload(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			const url = reader.result as string;
			flash = true;
			setTimeout(() => flash = false, 280);
			playShutter();
			previewUrl = url;
			showing = true;
			tid = setTimeout(() => {
				pb.addPhoto(url);
				showing = false;
				previewUrl = null;
				tid = null;
			}, 700);
		};
		reader.readAsDataURL(file);
		input.value = '';
	}
</script>

<svelte:head>
	<title>Ambil Foto - Photobooth</title>
</svelte:head>

<ErrorOverlay />

<div class="relative flex min-h-dvh flex-col items-center justify-center page-bg overflow-hidden">
	<div class="sprocket-l"></div>
	<div class="sprocket-r"></div>

	<div class="pointer-events-none absolute inset-0" style="background: radial-gradient(ellipse at center, var(--radial-glow) 0%, transparent 70%)"></div>

			{#if showing && previewUrl}
		<div class="anim-pop relative z-10 w-full max-w-xs px-4">
			<div class="paper-texture relative mx-auto w-full overflow-hidden rounded-lg bg-[#faf8f5] shadow-2xl shadow-black/30">
				<div class="px-4 pt-4 pb-3">
					<p class="font-['Syne'] text-center text-xs font-bold tracking-[0.3em] text-gray-800">✦ PHOTOBOOTH ✦</p>
					<div class="mt-3 overflow-hidden rounded" style="aspect-ratio: {pb.orient === 'portrait' ? '3/4' : '4/3'}">
						<img src={previewUrl} alt="" class="h-auto w-full" />
					</div>
					<div class="mt-3 flex items-center justify-between">
						<div class="h-2 w-2 rounded-full bg-[#ef4444]" style="opacity: {pb.idx + 1} / 4"></div>
						<p class="font-['Inter'] text-[9px] text-gray-400 tracking-wider">foto {pb.idx + 1} aman</p>
						<div class="h-2 w-2 rounded-full bg-[#ef4444]/30"></div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="relative z-10 w-full max-w-xs px-4">
			<div class="paper-texture relative mx-auto w-full overflow-hidden rounded-lg bg-[#faf8f5] shadow-2xl shadow-black/30">
				<div class="px-4 pt-4 pb-3">
					<p class="font-['Syne'] text-center text-xs font-bold tracking-[0.3em] text-gray-800">✦ PHOTOBOOTH ✦</p>
					<div class="relative mt-3 overflow-hidden rounded bg-gray-900" style="aspect-ratio: {pb.orient === 'portrait' ? '3/4' : '4/3'}">
						<video
							bind:this={video}
							class="h-full w-full object-cover transition-all duration-700"
							class:scale-x-[-1]={pb.facing === 'user'}
							class:opacity-0={!ready}
							autoplay playsinline muted
						></video>

						{#if flash}
							<div class="absolute inset-0 z-20 bg-white pointer-events-none" style="animation: flash-out 0.28s ease-out forwards"></div>
						{/if}

						{#if !ready}
							<div class="absolute inset-0 flex items-center justify-center z-10 bg-gray-900">
								<div class="flex flex-col items-center gap-3">
									<div class="relative flex h-10 w-10 items-center justify-center">
										<div class="absolute inset-0 animate-ping rounded-full bg-[#ef4444]/15"></div>
										<div class="h-8 w-8 animate-spin rounded-full border-2 border-white/8 border-t-[#ef4444]"></div>
									</div>
									<p class="font-['Inter'] text-[11px] text-white/25 tracking-widest uppercase">Loading film</p>
								</div>
							</div>
						{/if}

						{#if counting}
							<CountdownOverlay oncomplete={onDone} />
						{/if}

						<!-- Viewfinder corner marks -->
						<div class="pointer-events-none absolute inset-0 z-10">
							<div class="absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-white/20"></div>
							<div class="absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-white/20"></div>
							<div class="absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-white/20"></div>
							<div class="absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-white/20"></div>
						</div>
					</div>

					<!-- Film counter -->
					<div class="mt-3 flex items-center justify-between">
						<div class="flex gap-1.5">
							{#each Array(4) as _, i}
								<div class="rounded-full transition-all duration-500" style="
									width: {i === pb.idx ? 20 : 6}px; height: 6px;
									background: {i < pb.idx ? '#ef4444' : i === pb.idx ? '#ef4444' : 'rgba(0,0,0,0.1)'};
									box-shadow: {i === pb.idx ? '0 0 8px rgba(239,68,68,0.25)' : 'none'};
								"></div>
							{/each}
						</div>
						<p class="font-['Inter'] text-[9px] text-gray-400 tracking-wider">{pb.idx + 1} / 4</p>
					</div>
				</div>
			</div>

			<!-- Upload -->
			<div class="mt-5 flex justify-center">
				<label class="group cursor-pointer flex items-center gap-2 rounded-full glass px-5 py-2.5 text-secondary transition-all duration-300 hover:text-primary hover:bg-white/[0.06] active:scale-95">
					<input type="file" accept="image/*" class="hidden" onchange={handleUpload} />
					<svg class="h-4 w-4 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
					</svg>
					<span class="font-['Inter'] text-[11px] font-medium tracking-wide">Upload dari galeri</span>
				</label>
			</div>

			<!-- Controls -->
			<div class="mt-5 flex items-center justify-center gap-5 sm:gap-7">
				<button
					onclick={goBack}
					class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full glass text-secondary transition-all duration-300 hover:text-primary active:scale-90"
					aria-label="Kembali"
				>
					<svg class="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
				</button>

				<div class="flex flex-col items-center gap-1">
					<button
						onclick={() => pb.toggleOrient()}
						class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full glass text-secondary transition-all duration-300 hover:text-primary active:scale-90"
						aria-label={pb.orient === 'portrait' ? 'Landscape' : 'Portrait'}
					>
						<svg class="h-4 w-4 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6h16.5M4.5 4.5h15c.621 0 1.125.504 1.125 1.125v12.75c0 .621-.504 1.125-1.125 1.125h-15c-.621 0-1.125-.504-1.125-1.125V5.625c0-.621.504-1.125 1.125-1.125z" />
						</svg>
					</button>
					<span class="font-['Inter'] text-[7px] text-tertiary tracking-[0.15em] uppercase">{pb.orient === 'portrait' ? 'Potret' : 'Lanskap'}</span>
				</div>

				<!-- Shutter -->
				<div class="flex flex-col items-center gap-1">
					<button
						onclick={startCd}
						disabled={!ready || counting || showing}
						class="flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-white shadow-xl shadow-black/30 transition-all duration-200 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
						style="box-shadow: 0 0 0 4px rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.3);"
						aria-label="Jepret"
					>
						<div class="h-13 w-13 sm:h-14 sm:w-14 rounded-full bg-[#ef4444] transition-all duration-200 group-hover:bg-[#dc2626]" style="width: 44px; height: 44px;"></div>
					</button>
					<span class="font-['Inter'] text-[7px] text-tertiary tracking-[0.15em] uppercase">Jepret</span>
				</div>

				<div class="flex flex-col items-center gap-1">
					<button
						onclick={flip}
						class="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full glass text-secondary transition-all duration-300 hover:text-primary active:scale-90"
						aria-label="Balik kamera"
					>
						<svg class="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
						</svg>
					</button>
					<span class="font-['Inter'] text-[7px] text-tertiary tracking-[0.15em] uppercase">Flip</span>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	@keyframes flash-out {
		0% { opacity: 0.9; }
		100% { opacity: 0; }
	}
</style>
