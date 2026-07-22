<script lang="ts">
	import { pb, STRIP_COLORS, BORDER_COLORS } from '$lib/states/photobooth.svelte';
	import { getFilterById, FILTERS } from '$lib/utils/filters';
	import { createPhotoStrip } from '$lib/utils/canvas';
	import { STICKERS } from '$lib/utils/stickers';
	import { onMount } from 'svelte';

	let gen = $state(false);
	let showFilters = $state(false);
	let showColors = $state(false);
	let showStickers = $state(false);
	let peel = $state(0);
	let dragSticker: { idx: number; startX: number; startY: number; origX: number; origY: number } | null = null;

	let stripEl: HTMLDivElement;

	$effect(() => { if (pb.photos.length < 4) pb.reset(); });

	$effect(() => {
		const t = setInterval(() => { if (peel < pb.photos.length) peel++; }, 180);
		return () => clearInterval(t);
	});

	onMount(() => {
		function endDrag() {
			if (dragSticker) {
				dragSticker = null;
				stripEl?.style.removeProperty('cursor');
			}
		}
		globalThis.addEventListener('pointerup', endDrag);
		globalThis.addEventListener('pointercancel', endDrag);
		return () => {
			globalThis.removeEventListener('pointerup', endDrag);
			globalThis.removeEventListener('pointercancel', endDrag);
		};
	});

	async function handleGen() {
		if (gen) return;
		gen = true;
		try {
			const f = getFilterById(pb.filter);
			pb.generateStrip(await createPhotoStrip(pb.photos, f.cssFilter, pb.stripBg, pb.stripBorder, pb.layout, pb.stickers));
		} catch { gen = false; }
	}

	function goBack() {
		const v = document.querySelector('video');
		if (v?.srcObject) (v.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
		pb.reset();
	}

	function fStyle() { return getFilterById(pb.filter).cssFilter; }
	function date() { const d = new Date(); return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`; }

	function handleStripPointerMove(e: PointerEvent) {
		if (!dragSticker || !stripEl) return;
		const rect = stripEl.getBoundingClientRect();
		const dx = ((e.clientX - dragSticker.startX) / rect.width) * 100;
		const dy = ((e.clientY - dragSticker.startY) / rect.height) * 100;
		const stickers = pb.stickers;
		const s = stickers[dragSticker.idx];
		if (s) {
			pb.updateSticker(s.stickerId, {
				x: Math.max(0, Math.min(100, dragSticker.origX + dx)),
				y: Math.max(0, Math.min(100, dragSticker.origY + dy)),
			});
		}
	}

	function startDrag(e: PointerEvent, idx: number) {
		e.stopPropagation();
		e.preventDefault();
		const s = pb.stickers[idx];
		if (!s) return;
		dragSticker = { idx, startX: e.clientX, startY: e.clientY, origX: s.x, origY: s.y };
		if (stripEl) stripEl.style.cursor = 'grabbing';
	}

	function addSticker(emoji: string) {
		pb.addSticker(emoji);
		showStickers = false;
	}
</script>

<svelte:head>
	<title>Preview | Photobooth</title>
</svelte:head>

<div class="flex min-h-dvh flex-col page-bg">
	<div class="sprocket-l"></div>
	<div class="sprocket-r"></div>
	<div class="pointer-events-none absolute inset-0" style="background: radial-gradient(ellipse at top, var(--radial-glow) 0%, transparent 60%)"></div>

	<!-- Top bar -->
	<div class="relative z-10 flex items-center justify-between px-5 pt-6 pb-2">
		<button
			onclick={goBack}
			class="flex h-9 w-9 items-center justify-center rounded-full glass text-tertiary transition-all duration-300 hover:text-primary active:scale-90"
			aria-label="Kembali"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
		</button>
		<div class="flex items-center gap-1.5 rounded-full glass px-3 py-1">
			<span class="h-1.5 w-1.5 rounded-full bg-[#ef4444] animate-pulse"></span>
			<span class="font-['Inter'] text-[9px] font-medium tracking-[0.25em] text-secondary uppercase">Preview</span>
		</div>
		<div class="w-9"></div>
	</div>

	<!-- Title -->
	<div class="relative z-10 px-5 pb-3 text-center anim-rise">
		<h2 class="font-['Syne'] text-2xl font-bold text-primary">Strip Foto</h2>
		<p class="mt-0.5 font-['Inter'] text-xs text-tertiary">pilih filter & hias strip</p>
	</div>

	<!-- Strip area (scrollable) -->
	<div class="relative z-10 flex-1 overflow-y-auto px-4">
		<div class="mx-auto w-full max-w-sm">
			<div
				bind:this={stripEl}
				class="paper-texture relative rounded-xl px-5 pt-5 pb-4 shadow-2xl shadow-black/20 transition-all duration-700"
				style="background: {pb.stripBg}; touch-action: none;"
				onpointermove={handleStripPointerMove}
			>
				<p class="font-['Syne'] text-center text-xs font-bold tracking-[0.3em]" style="color: {pb.stripBg === '#2a2a2e' ? '#aaa' : '#333'}">✦ PHOTOBOOTH ✦</p>
				<p class="mb-3 text-center font-['Inter'] text-[9px]" style="color: {pb.stripBg === '#2a2a2e' ? '#666' : '#999'}">{date()}</p>

				{#if pb.layout === '2x2'}
					<div class="grid grid-cols-2 gap-2">
						{#each pb.photos as photo, i}
							<div style="
								transform: translateY({i < peel ? 0 : 12}px);
								opacity: {i < peel ? 1 : 0};
								transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
								transition-delay: {i * 0.08}s;
							">
								<div class="overflow-hidden rounded" style="aspect-ratio: 4/3">
									<img src={photo} alt="" class="h-full w-full object-cover transition-all duration-500" style={fStyle() ? `filter: ${fStyle()}` : ''} />
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="flex flex-col gap-2.5">
						{#each pb.photos as photo, i}
							<div style="
								transform: translateY({i < peel ? 0 : 16}px);
								opacity: {i < peel ? 1 : 0};
								transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
								transition-delay: {i * 0.08}s;
							">
								<div class="overflow-hidden rounded" style="aspect-ratio: 4/3">
									<img src={photo} alt="" class="h-full w-full object-cover transition-all duration-500" style={fStyle() ? `filter: ${fStyle()}` : ''} />
								</div>
								{#if i < pb.photos.length - 1}
									<div class="mx-2 mt-2.5 border-t border-dashed" style="border-color: {pb.stripBg === '#2a2a2e' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)'}"></div>
								{/if}
							</div>
						{/each}
					</div>
				{/if}

				<!-- Stickers layer -->
				{#each pb.stickers as s, i}
					<button
						onclick={() => pb.removeSticker(s.stickerId)}
						onpointerdown={(e) => startDrag(e, i)}
						class="absolute z-20 cursor-grab touch-none select-none transition-transform hover:scale-110 active:scale-90"
						style="
							left: {s.x}%;
							top: {s.y}%;
							transform: translate(-50%, -50%) rotate({s.rotation}deg) scale({s.scale});
							font-size: 40px;
							line-height: 1;
							text-shadow: 0 1px 3px rgba(0,0,0,0.15);
						"
						title="Tap to remove"
					>{s.emoji}</button>
				{/each}

				<p class="mt-3 text-center font-['Inter'] text-[7px] tracking-[0.3em]" style="color: {pb.stripBg === '#2a2a2e' ? '#555' : '#ccc'}">PHOTOBOOTH.APP</p>
			</div>
		</div>
	</div>

	<!-- Bottom toolbar -->
	<div class="relative z-10 border-t border-white/5 px-4 pt-3 pb-6" style="background: var(--bg-secondary)">
		<div class="mx-auto max-w-sm space-y-3">
			<div class="flex gap-2">
				<button
					onclick={() => showColors = !showColors}
					class="elastic flex flex-1 items-center justify-center gap-1.5 rounded-xl glass px-3 py-2.5 font-['Inter'] text-[11px] font-medium text-secondary transition-all duration-300 hover:text-primary"
				>
					<span class="flex h-4 w-4 shrink-0 rounded-full border border-white/10" style="background: {pb.stripBg}"></span>
					<span class="truncate">Warna</span>
				</button>

				<button
					onclick={() => showFilters = true}
					class="elastic flex flex-1 items-center justify-center gap-1.5 rounded-xl glass px-3 py-2.5 font-['Inter'] text-[11px] font-medium text-secondary transition-all duration-300 hover:text-primary"
				>
					<span class="truncate">{getFilterById(pb.filter).name}</span>
					<svg class="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
					</svg>
				</button>

				<button
					onclick={() => showStickers = true}
					class="elastic flex flex-1 items-center justify-center gap-1.5 rounded-xl glass px-3 py-2.5 font-['Inter'] text-[11px] font-medium text-secondary transition-all duration-300 hover:text-primary"
				>
					<span class="text-base leading-none">✨</span>
					<span class="truncate">Stiker</span>
				</button>
			</div>

			{#if showColors}
				<div class="glass rounded-xl p-3.5 space-y-3" style="animation: rise-up 0.2s var(--smooth) forwards">
					<div>
						<p class="mb-2 font-['Inter'] text-[10px] font-medium text-secondary tracking-wider uppercase">Latar</p>
						<div class="flex gap-2">
							{#each STRIP_COLORS as c}
								<button
									onclick={() => pb.stripBg = c.value}
									class="h-8 w-8 rounded-full border-2 transition-all duration-200 active:scale-90"
									style="background: {c.value}; border-color: {pb.stripBg === c.value ? '#ef4444' : 'rgba(255,255,255,0.1)'}; box-shadow: {pb.stripBg === c.value ? '0 0 0 2px rgba(239,68,68,0.3)' : 'none'}"
									title={c.name}
								></button>
							{/each}
						</div>
					</div>
					<div>
						<p class="mb-2 font-['Inter'] text-[10px] font-medium text-secondary tracking-wider uppercase">Bingkai</p>
						<div class="flex gap-2">
							{#each BORDER_COLORS as c}
								<button
									onclick={() => pb.stripBorder = c.value}
									class="h-8 w-8 rounded-full border-2 transition-all duration-200 active:scale-90"
									style="background: {c.value === 'transparent' ? 'repeating-conic-gradient(rgba(255,255,255,0.1) 0% 25%, transparent 0% 50%) 50%/8px 8px' : c.value}; border-color: {pb.stripBorder === c.value ? '#ef4444' : c.value === 'transparent' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)'}; box-shadow: {pb.stripBorder === c.value ? '0 0 0 2px rgba(239,68,68,0.3)' : 'none'}"
									title={c.name}
								></button>
							{/each}
						</div>
					</div>
				</div>
			{/if}

			<div class="flex gap-2.5">
				<button
					onclick={goBack}
					class="elastic flex flex-1 items-center justify-center gap-2 rounded-xl glass px-4 py-3 font-['Inter'] text-sm font-medium text-secondary transition-all duration-300 hover:text-primary"
				>
					<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
					</svg>
					Ulang
				</button>

				<button
					onclick={handleGen}
					disabled={gen}
					class="elastic flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ef4444] px-4 py-3 font-['Syne'] text-sm font-bold text-white shadow-lg shadow-[#ef4444]/15 transition-all duration-300 hover:shadow-xl hover:shadow-[#ef4444]/20 disabled:opacity-40"
				>
					{#if gen}
						<div class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
					{:else}
						<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					{/if}
					{gen ? 'Proses...' : 'Cetak Strip'}
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Filter Modal -->
{#if showFilters}
	<div
		class="fixed inset-0 z-[200] flex items-end justify-center"
		style="animation: fade-in 0.2s ease-out"
		onclick={() => showFilters = false}
		onkeydown={(e) => e.key === 'Escape' && (showFilters = false)}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div class="absolute inset-0" style="background: var(--overlay); backdrop-filter: blur(8px)"></div>
		<div
			class="relative w-full max-w-sm rounded-t-2xl page-bg border-t border-[#ef4444]/10 px-5 pb-8 pt-4 shadow-2xl"
			style="animation: slide-up 0.35s var(--spring) forwards"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="mx-auto mb-5 h-1 w-10 rounded-full" style="background: var(--text-tertiary)"></div>

			<div class="mb-1 text-center">
				<h3 class="font-['Syne'] text-lg font-bold text-primary">Pilih Filter</h3>
				<p class="font-['Inter'] text-[11px] text-tertiary">sentuh untuk memilih</p>
			</div>

			<div class="grid grid-cols-5 gap-2.5 mt-4">
				{#each FILTERS as f}
					<button
						onclick={() => { pb.filter = f.id; showFilters = false; }}
						class="flex flex-col items-center gap-1.5 rounded-xl p-2 transition-all duration-200 {pb.filter === f.id
							? 'bg-[#ef4444]/15 ring-1 ring-[#ef4444]/40'
							: 'hover:bg-white/5'}"
					>
						<div
							class="h-10 w-full rounded-lg border border-white/5 overflow-hidden"
							style="background: {f.gradient}"
						>
						</div>
						<span class="font-['Inter'] text-[9px] font-medium tracking-wide {pb.filter === f.id ? 'text-[#ef4444]/90' : 'text-secondary'}">{f.name}</span>
					</button>
				{/each}
			</div>
		</div>
	</div>
{/if}

<!-- Sticker Modal -->
{#if showStickers}
	<div
		class="fixed inset-0 z-[200] flex items-end justify-center"
		style="animation: fade-in 0.2s ease-out"
		onclick={() => showStickers = false}
		onkeydown={(e) => e.key === 'Escape' && (showStickers = false)}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div class="absolute inset-0" style="background: var(--overlay); backdrop-filter: blur(8px)"></div>
		<div
			class="relative w-full max-w-sm rounded-t-2xl page-bg border-t border-[#ef4444]/10 px-5 pb-8 pt-4 shadow-2xl"
			style="animation: slide-up 0.35s var(--spring) forwards"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="mx-auto mb-5 h-1 w-10 rounded-full" style="background: var(--text-tertiary)"></div>

			<div class="mb-1 text-center">
				<h3 class="font-['Syne'] text-lg font-bold text-primary">Stiker Hiasan</h3>
				<p class="font-['Inter'] text-[11px] text-tertiary">sentuh stiker untuk menambah</p>
			</div>

			<div class="mt-4 flex flex-wrap justify-center gap-3">
				{#each STICKERS as s}
					<button
						onclick={() => addSticker(s.emoji)}
						class="flex h-11 w-11 items-center justify-center rounded-xl text-xl transition-all duration-200 hover:bg-white/10 hover:scale-110 active:scale-90"
						title={s.name}
					>
						{s.emoji}
					</button>
				{/each}
			</div>

			{#if pb.stickers.length > 0}
				<div class="mt-4 text-center">
					<button
						onclick={() => { pb.clearStickers(); showStickers = false; }}
						class="rounded-lg glass px-4 py-2 font-['Inter'] text-[11px] font-medium text-red-400 transition-all duration-200 hover:text-red-300"
					>
						Hapus Semua Stiker
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}
