<script lang="ts">
	import { pb, STRIP_COLORS, BORDER_COLORS } from '$lib/states/photobooth.svelte';
	import { createPhotoStrip } from '$lib/utils/canvas';
	import { STICKERS } from '$lib/utils/stickers';
	import { TEMPLATES } from '$lib/utils/templates';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let gen = $state(false);
	let peel = $state(0);
	let editTab = $state<'tema' | 'stiker' | 'layout'>('tema');
	let stickerCats = $state<'all' | 'love' | 'nature' | 'fun'>('all');
	let activeStickerId = $state<string | null>(null);

	let stripEl: HTMLDivElement;
	let dragSticker: { idx: number; startX: number; startY: number; origX: number; origY: number; moved: boolean } | null = null;
	let dragPhoto: { idx: number; startY: number; origOrder: number } | null = null;

	$effect(() => {
		if (pb.photos.length < pb.photoCount) pb.reset();
	});

	$effect(() => {
		const t = setInterval(() => { if (peel < pb.photos.length) peel++; }, 120);
		return () => clearInterval(t);
	});

	onMount(() => {
		function endDrag() {
			if (dragSticker) {
				stripEl?.style.removeProperty('cursor');
				dragSticker = null;
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
			pb.generateStrip(await createPhotoStrip(
				pb.photos, pb.stripBg, pb.stripBorder,
				pb.layout, pb.stickers, pb.cornerRadius, pb.showWatermark
			));
		} catch { gen = false; }
	}

	function goBack() {
		const v = document.querySelector('video');
		if (v?.srcObject) (v.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
		pb.reset();
	}

	function date() {
		const d = new Date();
		return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
	}

	function isDark(bg: string) {
		return bg === '#2a2a2e' || bg === '#0f172a' || bg === '#0c0c1a' || bg === '#0b0f2a'
			|| bg === '#1a1a1a' || bg === '#0a0515' || bg === '#0a0a1a' || bg === '#0a0f1e'
			|| bg === '#1c1917' || bg === '#0f0f0f';
	}

	function handleStripPointerMove(e: PointerEvent) {
		if (!dragSticker || !stripEl) return;
		const rect = stripEl.getBoundingClientRect();
		const dx = ((e.clientX - dragSticker.startX) / rect.width) * 100;
		const dy = ((e.clientY - dragSticker.startY) / rect.height) * 100;
		if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
			dragSticker.moved = true;
		}
		const s = pb.stickers[dragSticker.idx];
		if (s) {
			pb.updateSticker(s.stickerId, {
				x: Math.max(0, Math.min(100, dragSticker.origX + dx)),
				y: Math.max(0, Math.min(100, dragSticker.origY + dy)),
			});
		}
	}

	function startStickerDrag(e: PointerEvent, idx: number) {
		e.stopPropagation();
		e.preventDefault();
		const s = pb.stickers[idx];
		if (!s) return;
		dragSticker = { idx, startX: e.clientX, startY: e.clientY, origX: s.x, origY: s.y, moved: false };
	}

	function endStickerInteraction(idx: number, stickerId: string) {
		if (dragSticker && !dragSticker.moved) {
			activeStickerId = activeStickerId === stickerId ? null : stickerId;
		}
		stripEl?.style.removeProperty('cursor');
		dragSticker = null;
	}

	function handleStripClick(e: MouseEvent) {
		if (activeStickerId) {
			const target = e.target as HTMLElement;
			if (!target.closest('[data-s]')) {
				activeStickerId = null;
			}
		}
	}

	function handlePhotoDrag(e: PointerEvent) {
		if (!dragPhoto) return;
		const dy = e.clientY - dragPhoto.startY;
		const threshold = 40;
		if (Math.abs(dy) > threshold) {
			const dir = dy > 0 ? 1 : -1;
			const newIdx = Math.max(0, Math.min(pb.photos.length - 1, dragPhoto.origOrder + dir));
			if (newIdx !== dragPhoto.origOrder) {
				pb.movePhoto(dragPhoto.origOrder, newIdx);
				dragPhoto = { idx: newIdx, startY: e.clientY, origOrder: newIdx };
			}
		}
	}

	function startPhotoDrag(e: PointerEvent, idx: number) {
		if (pb.photos.length < 2) return;
		e.preventDefault();
		dragPhoto = { idx, startY: e.clientY, origOrder: idx };
	}

	function endPhotoDrag() {
		dragPhoto = null;
	}

	function filteredStickers() {
		if (stickerCats === 'all') return STICKERS;
		if (stickerCats === 'love') return STICKERS.filter(s =>
			['heart', 'rose', 'cherry', 'ribbon', 'butterfly', 'unicorn', 'star', 'crown'].includes(s.id));
		if (stickerCats === 'nature') return STICKERS.filter(s =>
			['sunflower', 'rose', 'butterfly', 'moon', 'sun', 'cloud', 'droplet', 'lightning'].includes(s.id));
		return STICKERS.filter(s =>
			['sparkles', 'fire', 'rainbow', 'balloon', 'confetti', 'gift', 'camera', 'film', 'clapper', 'music', 'cat', 'dog', 'panda', 'koala', 'skull', 'alien'].includes(s.id));
	}
</script>

<svelte:head>
	<title>Preview | Photobooth</title>
</svelte:head>

<div class="flex min-h-dvh flex-col page-bg">
	<div class="sprocket-l" />
	<div class="sprocket-r" />
	<div class="pointer-events-none absolute inset-0" style="background: radial-gradient(ellipse at top, var(--radial-glow) 0%, transparent 60%)" />

	<!-- Top bar -->
	<div class="relative z-10 flex items-center justify-between px-5 pt-5 pb-4">
		<button
			onclick={goBack}
			class="flex h-9 w-9 items-center justify-center rounded-full glass text-tertiary transition-all duration-300 hover:text-primary active:scale-90 hover:shadow-lg hover:shadow-black/5"
			aria-label="Kembali"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
		</button>
		<div class="flex items-center gap-1.5 rounded-full glass px-3 py-1">
			<span class="h-1.5 w-1.5 rounded-full bg-[#ef4444] animate-pulse" />
			<span class="font-['Inter'] text-[9px] font-medium tracking-[0.25em] text-secondary uppercase">Preview</span>
		</div>
		<button
			onclick={handleGen}
			disabled={gen}
			class="elastic flex items-center gap-1.5 rounded-xl bg-[#ef4444] px-4 py-2 font-['Syne'] text-[11px] font-bold text-white shadow-lg shadow-[#ef4444]/15 transition-all hover:shadow-xl hover:shadow-[#ef4444]/20 hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100"
		>
			{#if gen}
				<div class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
			{:else}
				<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			{/if}
			{gen ? 'Proses...' : 'Cetak'}
		</button>
	</div>

	<!-- Main split layout -->
	<div class="relative z-10 flex flex-1 flex-col overflow-hidden lg:flex-row">

		<!-- LEFT: Strip preview -->
		<div class="flex flex-1 items-center justify-center overflow-y-auto px-4 pb-5 lg:pb-0 lg:px-6 lg:py-4">
			<div class="w-full max-w-sm lg:max-w-md pt-3 lg:pt-0">
				<div class="relative rounded-2xl p-[3px]" style="background: linear-gradient(135deg, {isDark(pb.stripBg) ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}, transparent);">
					<div
						bind:this={stripEl}
						class="paper-texture relative rounded-xl px-5 pt-5 pb-4 shadow-2xl shadow-black/20 transition-all duration-700"
						style="background: {pb.stripBg}; touch-action: none;"
						onpointermove={handleStripPointerMove}
						onclick={handleStripClick}
					>
						{#if pb.showWatermark}
							<p class="font-['Syne'] text-center text-xs font-bold tracking-[0.3em] transition-all" style="color: {isDark(pb.stripBg) ? '#aaa' : '#333'}">✦ PHOTOBOOTH ✦</p>
							<p class="mb-3 text-center font-['Inter'] text-[9px] transition-all" style="color: {isDark(pb.stripBg) ? '#666' : '#999'}">{date()}</p>
						{/if}

						<!-- Photos area -->
						<div class="relative" onpointerup={endPhotoDrag} onpointerleave={endPhotoDrag} onpointermove={handlePhotoDrag}>
							{#if pb.layout === '2x2'}
								<div class="grid gap-2" style="grid-template-columns: repeat(2, 1fr)">
									{#each Array(pb.photoCount) as _, i}
										{#if pb.photos[i]}
											{@const photo = pb.photos[i]}
											<div class="relative group" style="
												transform: translateY({i < peel ? 0 : 16}px) scale({i < peel ? 1 : 0.96});
												filter: blur({i < peel ? 0 : 4}px);
												opacity: {i < peel ? 1 : 0};
												transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
												transition-delay: {i * 0.1}s;
											">
												<div class="absolute inset-0 z-20 flex items-center justify-center gap-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 backdrop-blur-sm">
													<button
														onclick={() => pb.removePhotoAt(i)}
														class="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/80 text-white shadow-lg transition-all hover:bg-red-500 hover:scale-110 active:scale-90"
													>
														<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
													</button>
												</div>
												<div class="overflow-hidden" style="aspect-ratio: 4/3; border-radius: {pb.cornerRadius}px">
													<img src={photo} alt="" class="h-full w-full object-cover" draggable="false" />
												</div>
											</div>
										{:else}
											<div class="relative" style="opacity: {i < peel ? 1 : 0}; transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); transition-delay: {i * 0.1}s;">
												<div class="flex items-center justify-center rounded-lg border-2 border-dashed" style="aspect-ratio: 4/3; border-color: {isDark(pb.stripBg) ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}">
													<div class="text-2xl opacity-20" style="color: {isDark(pb.stripBg) ? '#fff' : '#000'}">+</div>
												</div>
											</div>
										{/if}
									{/each}
								</div>
							{:else}
								<div class="flex flex-col gap-2">
									{#each Array(pb.photoCount) as _, i}
										{#if pb.photos[i]}
											{@const photo = pb.photos[i]}
											<div class="relative group" style="
												transform: translateY({i < peel ? 0 : 20}px) scale({i < peel ? 1 : 0.95});
												filter: blur({i < peel ? 0 : 4}px);
												opacity: {i < peel ? 1 : 0};
												transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
												transition-delay: {i * 0.1}s;
											">
												<div class="flex items-center gap-1.5 mb-1">
													<span class="flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold" style="background: {isDark(pb.stripBg) ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}; color: {isDark(pb.stripBg) ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'}">{i + 1}</span>
													<div class="flex-1" />
													<button
														onpointerdown={(e) => startPhotoDrag(e, i)}
														class="flex h-5 w-5 cursor-grab items-center justify-center rounded text-tertiary hover:text-primary opacity-0 group-hover:opacity-100 transition-all active:cursor-grabbing"
													>
														<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" /></svg>
													</button>
													<button onclick={() => pb.removePhotoAt(i)} class="flex h-5 w-5 items-center justify-center rounded text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-all">
														<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
													</button>
												</div>
												<div class="overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-black/10" style="aspect-ratio: 4/3; border-radius: {pb.cornerRadius}px">
													<img src={photo} alt="" class="h-full w-full object-cover transition-all duration-500 group-hover:scale-105" draggable="false" />
												</div>
												{#if i < pb.photoCount - 1}
													<div class="mx-2 mt-2.5 border-t border-dashed" style="border-color: {isDark(pb.stripBg) ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}" />
												{/if}
											</div>
										{:else}
											<div class="relative" style="opacity: {i < peel ? 1 : 0}; transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); transition-delay: {i * 0.1}s;">
												<div class="flex items-center justify-center rounded-lg border-2 border-dashed" style="aspect-ratio: 4/3; border-color: {isDark(pb.stripBg) ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}">
													<div class="text-2xl opacity-20" style="color: {isDark(pb.stripBg) ? '#fff' : '#000'}">+</div>
												</div>
												{#if i < pb.photoCount - 1}
													<div class="mx-2 mt-2.5 border-t border-dashed" style="border-color: {isDark(pb.stripBg) ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}" />
												{/if}
											</div>
										{/if}
									{/each}
								</div>
							{/if}

							<!-- Stickers -->
							{#each pb.stickers as s, i}
								<div class="absolute z-20" style="left: {s.x}%; top: {s.y}%; transform: translate(-50%, -50%);">
									<button
										data-s="1"
										onpointerdown={(e) => startStickerDrag(e, i)}
										onpointerup={() => endStickerInteraction(i, s.stickerId)}
										class="touch-none select-none transition-all duration-200 {dragSticker?.idx === i ? 'scale-125' : 'hover:scale-110'}"
										style="transform: rotate({s.rotation}deg) scale({dragSticker?.idx === i ? (s.scale * 1.25) : s.scale}); font-size: 36px; line-height: 1; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));"
									>{s.emoji}</button>
									{#if activeStickerId === s.stickerId}
										<div class="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 flex gap-1" in:fly={{ y: 4, duration: 180, opacity: 0 }}>
											<button onclick={(e) => { e.stopPropagation(); pb.updateSticker(s.stickerId, { scale: Math.max(0.4, (s.scale ?? 1) - 0.2) }); }} class="flex h-5 w-5 items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white text-[9px] hover:bg-black/50 transition-all active:scale-90">−</button>
											<button onclick={(e) => { e.stopPropagation(); pb.updateSticker(s.stickerId, { scale: Math.min(2, (s.scale ?? 1) + 0.2) }); }} class="flex h-5 w-5 items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white text-[9px] hover:bg-black/50 transition-all active:scale-90">+</button>
											<button onclick={(e) => { e.stopPropagation(); pb.updateSticker(s.stickerId, { rotation: ((s.rotation ?? 0) - 15) }); }} class="flex h-5 w-5 items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white text-[9px] hover:bg-black/50 transition-all active:scale-90">↺</button>
											<button onclick={(e) => { e.stopPropagation(); pb.updateSticker(s.stickerId, { rotation: ((s.rotation ?? 0) + 15) }); }} class="flex h-5 w-5 items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white text-[9px] hover:bg-black/50 transition-all active:scale-90">↻</button>
											<button onclick={(e) => { e.stopPropagation(); pb.removeSticker(s.stickerId); activeStickerId = null; }} class="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/70 backdrop-blur-md text-white text-[9px] hover:bg-red-500 transition-all active:scale-90">✕</button>
										</div>
									{/if}
								</div>
							{/each}
						</div>

						{#if pb.showWatermark}
							<p class="mt-3 text-center font-['Inter'] text-[7px] tracking-[0.3em]" style="color: {isDark(pb.stripBg) ? '#555' : '#ccc'}">PHOTOBOOTH.APP</p>
						{/if}
					</div>
				</div>

				<!-- Photo dots indicator -->
				<div class="mt-4 flex items-center justify-center gap-2">
					{#each Array(pb.photoCount) as _, i}
						<div class="flex items-center gap-1.5">
							<div class="h-1.5 w-1.5 rounded-full transition-all duration-300 {pb.photos[i] ? 'bg-[#ef4444]' : 'bg-white/10'}" style="box-shadow: {pb.photos[i] ? '0 0 6px rgba(239,68,68,0.4)' : 'none'}" />
							{#if i < pb.photoCount - 1}
								<div class="h-px w-3 transition-all" style="background: {pb.photos[i] && pb.photos[i + 1] ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)'}" />
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- RIGHT: Edit panel -->
		<div class="flex w-full flex-col border-t border-white/5 bg-[var(--bg-secondary)] lg:w-96 lg:border-l lg:border-t-0">

			<!-- Template cards -->
			<div class="relative overflow-x-auto px-4 pt-4 pb-3 scrollbar-none">
				<p class="mb-2.5 font-['Inter'] text-[9px] font-medium text-secondary tracking-wider uppercase">Template</p>
				<div class="flex gap-2">
					{#each TEMPLATES.filter(t => t.count === pb.photoCount) as t}
						<button
							onclick={() => { pb.applyTemplate(t.id); peel = 0; }}
							class="shrink-0 overflow-hidden rounded-xl transition-all duration-300 {pb.templateId === t.id ? 'ring-2 ring-[#ef4444] ring-offset-2 ring-offset-transparent' : 'glass hover:bg-white/5'}"
						>
							<div class="flex flex-col items-center gap-1.5 px-3 py-2" style="min-width: 56px;">
								<div class="flex gap-0.5">
									{#each Array(Math.min(t.count, 4)) as _, j}
										<div class="h-2 w-3 rounded-sm transition-all" style="background: {pb.templateId === t.id ? '#ef4444' : isDark(t.bg) ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}" />
									{/each}
								</div>
								<span class="font-['Inter'] text-[8px] font-medium whitespace-nowrap {pb.templateId === t.id ? 'text-[#ef4444]' : 'text-secondary'}">{t.name.id}</span>
							</div>
						</button>
					{/each}
				</div>
			</div>

			<!-- Tabs -->
			<div class="flex border-b border-white/5 px-4">
				<button
					onclick={() => editTab = 'tema'}
					class="relative flex flex-1 items-center justify-center gap-1.5 px-3 py-3.5 font-['Inter'] text-[10px] font-medium transition-all {editTab === 'tema' ? 'text-[#ef4444]' : 'text-tertiary hover:text-secondary'}"
				>
					{#if editTab === 'tema'}
						<div class="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#ef4444] rounded-full" />
					{/if}
					<span class="flex h-3.5 w-3.5 rounded-full border border-white/10 transition-all" style="background: {pb.stripBg}; box-shadow: {editTab === 'tema' ? '0 0 0 1px rgba(239,68,68,0.3)' : 'none'}" />
					Tema
				</button>
				<button
					onclick={() => editTab = 'layout'}
					class="relative flex flex-1 items-center justify-center gap-1.5 px-3 py-3.5 font-['Inter'] text-[10px] font-medium transition-all {editTab === 'layout' ? 'text-[#ef4444]' : 'text-tertiary hover:text-secondary'}"
				>
					{#if editTab === 'layout'}
						<div class="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#ef4444] rounded-full" />
					{/if}
					<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
					Layout
				</button>
				<button
					onclick={() => editTab = 'stiker'}
					class="relative flex flex-1 items-center justify-center gap-1.5 px-3 py-3.5 font-['Inter'] text-[10px] font-medium transition-all {editTab === 'stiker' ? 'text-[#ef4444]' : 'text-tertiary hover:text-secondary'}"
				>
					{#if editTab === 'stiker'}
						<div class="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#ef4444] rounded-full" />
					{/if}
					<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>
					Stiker
				</button>
			</div>

			<!-- Tab content -->
			<div class="flex-1 overflow-y-auto px-4 py-5">

				<!-- TEMA TAB -->
				{#if editTab === 'tema'}
					<div class="space-y-6" in:fly={{ y: 8, duration: 200, opacity: 0 }}>
						<div>
							<div class="mb-3 flex items-center gap-3">
								<div class="h-px flex-1" style="background: linear-gradient(90deg, rgba(239,68,68,0.15), transparent)" />
								<p class="font-['Inter'] text-[8px] font-semibold text-secondary tracking-[0.2em] uppercase">Latar</p>
								<div class="h-px flex-1" style="background: linear-gradient(90deg, transparent, rgba(239,68,68,0.15))" />
							</div>
							<div class="flex flex-wrap gap-3">
								{#each STRIP_COLORS as c}
									<button
										onclick={() => pb.stripBg = c.value}
										class="relative h-10 w-10 rounded-full transition-all duration-200 active:scale-90 hover:scale-110"
										style="background: {c.value}; border: 2px solid {pb.stripBg === c.value ? '#ef4444' : 'transparent'}; box-shadow: {pb.stripBg === c.value ? '0 0 0 3px rgba(239,68,68,0.25), 0 0 15px rgba(239,68,68,0.1)' : '0 2px 8px rgba(0,0,0,0.1)'}"
										title={c.name}
									>
										{#if pb.stripBg === c.value}
											<div class="absolute -inset-0.5 rounded-full animate-ping opacity-20" style="background: #ef4444; animation-duration: 1.5s;" />
											<div class="absolute inset-0 flex items-center justify-center"><svg class="h-3 w-3 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg></div>
										{/if}
									</button>
								{/each}
							</div>
						</div>
						<div>
							<div class="mb-3 flex items-center gap-3">
								<div class="h-px flex-1" style="background: linear-gradient(90deg, rgba(239,68,68,0.15), transparent)" />
								<p class="font-['Inter'] text-[8px] font-semibold text-secondary tracking-[0.2em] uppercase">Bingkai</p>
								<div class="h-px flex-1" style="background: linear-gradient(90deg, transparent, rgba(239,68,68,0.15))" />
							</div>
							<div class="flex flex-wrap gap-3">
								{#each BORDER_COLORS as c}
									<button
										onclick={() => pb.stripBorder = c.value}
										class="relative h-10 w-10 rounded-full transition-all duration-200 active:scale-90 hover:scale-110"
										style="background: {c.value === 'transparent' ? 'repeating-conic-gradient(rgba(255,255,255,0.1) 0% 25%, transparent 0% 50%) 50%/8px 8px' : c.value}; border: 2px solid {pb.stripBorder === c.value ? '#ef4444' : 'transparent'}; box-shadow: {pb.stripBorder === c.value ? '0 0 0 3px rgba(239,68,68,0.25), 0 0 15px rgba(239,68,68,0.1)' : '0 2px 8px rgba(0,0,0,0.1)'}"
										title={c.name}
									>
										{#if pb.stripBorder === c.value}
											<div class="absolute inset-0 flex items-center justify-center"><svg class="h-3 w-3 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg></div>
										{/if}
									</button>
								{/each}
							</div>
						</div>
						<div>
							<div class="mb-3 flex items-center justify-between">
								<div class="flex items-center gap-3">
									<div class="h-px w-6" style="background: linear-gradient(90deg, rgba(239,68,68,0.15), transparent)" />
									<p class="font-['Inter'] text-[8px] font-semibold text-secondary tracking-[0.2em] uppercase">Sudut</p>
								</div>
								<span class="flex h-5 min-w-[32px] items-center justify-center rounded-md text-[9px] font-medium" style="background: rgba(239,68,68,0.1); color: #ef4444">{pb.cornerRadius}px</span>
							</div>
							<div class="relative px-0.5">
								<input
									type="range" min="0" max="40" step="1" bind:value={pb.cornerRadius}
									class="range-slider w-full h-1.5 appearance-none rounded-full outline-none cursor-pointer"
								/>
								<div class="mt-1.5 flex justify-between px-0.5">
									<span class="font-['Inter'] text-[7px] text-tertiary">Persegi</span>
									<span class="font-['Inter'] text-[7px] text-tertiary">Bulat</span>
								</div>
							</div>
						</div>
						<div class="flex items-center justify-between rounded-xl glass px-4 py-3 transition-all hover:bg-white/[0.04]">
							<div class="flex items-center gap-3">
								<svg class="h-4 w-4 text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
								<div>
									<p class="font-['Inter'] text-[10px] font-medium text-primary">Watermark</p>
									<p class="font-['Inter'] text-[8px] text-tertiary">Tampilkan header & footer</p>
								</div>
							</div>
							<button
								onclick={() => pb.showWatermark = !pb.showWatermark}
								class="relative h-6 w-11 rounded-full transition-all duration-300 {pb.showWatermark ? 'bg-[#ef4444]' : 'bg-white/10'}"
							>
								<div class="h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300" style="transform: translateX({pb.showWatermark ? 22 : 2}px)" />
							</button>
						</div>
					</div>
				{/if}

				<!-- LAYOUT TAB -->
				{#if editTab === 'layout'}
					<div class="space-y-6" in:fly={{ y: 8, duration: 200, opacity: 0 }}>
						<div>
							<div class="mb-3 flex items-center gap-3">
								<div class="h-px flex-1" style="background: linear-gradient(90deg, rgba(239,68,68,0.15), transparent)" />
								<p class="font-['Inter'] text-[8px] font-semibold text-secondary tracking-[0.2em] uppercase">Tata Letak</p>
								<div class="h-px flex-1" style="background: linear-gradient(90deg, transparent, rgba(239,68,68,0.15))" />
							</div>
							<div class="grid grid-cols-2 gap-3">
								<button
									onclick={() => { pb.layout = '4x1'; peel = 0; }}
									class="flex flex-col items-center gap-3 rounded-xl p-6 transition-all duration-300 {pb.layout === '4x1' ? 'bg-[#ef4444]/10 ring-1 ring-[#ef4444]/30 shadow-lg shadow-[#ef4444]/5' : 'glass hover:bg-white/[0.04] hover:shadow-md'}"
								>
									<div class="flex flex-col gap-1">
										{#each Array(pb.photoCount) as _, j}
											<div class="h-2 rounded-sm transition-all duration-300" style="width: {48 - j * 6}px; background: {pb.layout === '4x1' ? '#ef4444' : 'rgba(255,255,255,0.15)'}" />
										{/each}
									</div>
									<span class="font-['Inter'] text-[10px] font-medium {pb.layout === '4x1' ? 'text-[#ef4444]' : 'text-secondary'}">Vertikal</span>
								</button>
								<button
									onclick={() => { pb.layout = '2x2'; peel = 0; }}
									disabled={pb.photoCount < 2}
									class="flex flex-col items-center gap-3 rounded-xl p-6 transition-all duration-300 {pb.layout === '2x2' ? 'bg-[#ef4444]/10 ring-1 ring-[#ef4444]/30 shadow-lg shadow-[#ef4444]/5' : 'glass hover:bg-white/[0.04] hover:shadow-md'} disabled:opacity-25 disabled:hover:shadow-none"
								>
									<div class="grid grid-cols-2 gap-1">
										{#each Array(Math.min(pb.photoCount, 4)) as _, j}
											<div class="h-3 w-6 rounded-sm transition-all duration-300" style="background: {pb.layout === '2x2' ? '#ef4444' : 'rgba(255,255,255,0.15)'}" />
										{/each}
									</div>
									<span class="font-['Inter'] text-[10px] font-medium {pb.layout === '2x2' ? 'text-[#ef4444]' : 'text-secondary'}">Grid</span>
								</button>
							</div>
						</div>
						<div>
							<div class="mb-3 flex items-center gap-3">
								<div class="h-px flex-1" style="background: linear-gradient(90deg, rgba(239,68,68,0.15), transparent)" />
								<p class="font-['Inter'] text-[8px] font-semibold text-secondary tracking-[0.2em] uppercase">Urutan</p>
								<div class="h-px flex-1" style="background: linear-gradient(90deg, transparent, rgba(239,68,68,0.15))" />
							</div>
							<div class="rounded-xl glass p-4 transition-all hover:bg-white/[0.02]">
								<div class="flex items-center gap-3">
									<svg class="h-5 w-5 shrink-0 text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" /></svg>
									<div>
										<p class="font-['Inter'] text-[10px] font-medium text-primary">Seret untuk mengatur</p>
										<p class="font-['Inter'] text-[8px] text-tertiary">Seret ikon grid pada foto untuk mengubah urutan</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<!-- STIKER TAB -->
				{#if editTab === 'stiker'}
					<div class="space-y-4" in:fly={{ y: 8, duration: 200, opacity: 0 }}>
						<div class="flex gap-1 rounded-xl glass p-1">
							<button onclick={() => stickerCats = 'all'} class="flex flex-1 items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 font-['Inter'] text-[9px] font-medium transition-all {stickerCats === 'all' ? 'bg-[#ef4444]/15 text-[#ef4444] shadow-sm' : 'text-secondary hover:text-primary hover:bg-white/5'}">🌟 Semua</button>
							<button onclick={() => stickerCats = 'love'} class="flex flex-1 items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 font-['Inter'] text-[9px] font-medium transition-all {stickerCats === 'love' ? 'bg-[#ef4444]/15 text-[#ef4444] shadow-sm' : 'text-secondary hover:text-primary hover:bg-white/5'}">❤️ Cinta</button>
							<button onclick={() => stickerCats = 'nature'} class="flex flex-1 items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 font-['Inter'] text-[9px] font-medium transition-all {stickerCats === 'nature' ? 'bg-[#ef4444]/15 text-[#ef4444] shadow-sm' : 'text-secondary hover:text-primary hover:bg-white/5'}">🌸 Alam</button>
							<button onclick={() => stickerCats = 'fun'} class="flex flex-1 items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 font-['Inter'] text-[9px] font-medium transition-all {stickerCats === 'fun' ? 'bg-[#ef4444]/15 text-[#ef4444] shadow-sm' : 'text-secondary hover:text-primary hover:bg-white/5'}">🎉 Lainnya</button>
						</div>
						<div class="flex flex-wrap gap-2 max-h-64 overflow-y-auto p-0.5">
							{#each filteredStickers() as s, j (s.id)}
								<button
									onclick={() => pb.addSticker(s.emoji)}
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg transition-all duration-200 hover:bg-white/10 hover:scale-110 hover:shadow-lg active:scale-90"
									style="animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) backwards; animation-delay: {j * 0.03}s;"
									title={s.name}
								>{s.emoji}</button>
							{/each}
						</div>
						{#if pb.stickers.length > 0}
							<button
								onclick={() => pb.clearStickers()}
								class="w-full rounded-xl glass px-4 py-2.5 font-['Inter'] text-[10px] font-medium text-red-400 transition-all hover:text-red-300 hover:bg-red-500/5 active:scale-[0.98]"
							>
								<div class="flex items-center justify-center gap-2">
									<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
									Hapus Semua Stiker ({pb.stickers.length})
								</div>
							</button>
						{/if}
					</div>
				{/if}

			</div>

			<!-- Bottom actions -->
			<div class="border-t border-white/5 px-4 py-4">
				<div class="flex gap-3">
					<button
						onclick={goBack}
						class="elastic flex flex-1 items-center justify-center gap-2 rounded-xl glass px-3 py-3 font-['Inter'] text-xs font-medium text-secondary transition-all hover:text-primary hover:bg-white/[0.04]"
					>
						<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
						Ulang
					</button>
					<button
						onclick={handleGen}
						disabled={gen}
						class="elastic flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ef4444] to-[#dc2626] px-3 py-3 font-['Syne'] text-xs font-bold text-white shadow-lg shadow-[#ef4444]/15 transition-all hover:shadow-xl hover:shadow-[#ef4444]/25 hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100"
					>
						{#if gen}
							<div class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
						{:else}
							<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						{/if}
						{gen ? 'Memproses...' : 'Cetak Strip'}
					</button>
				</div>
			</div>

		</div>
	</div>
</div>

<style>
	.range-slider::-webkit-slider-runnable-track {
		height: 6px;
		border-radius: 999px;
		background: rgba(255,255,255,0.08);
	}
	.range-slider::-webkit-slider-thumb {
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #ef4444;
		border: 2px solid rgba(239,68,68,0.3);
		box-shadow: 0 0 12px rgba(239,68,68,0.3);
		margin-top: -5px;
		cursor: pointer;
		transition: all 0.2s;
	}
	.range-slider::-webkit-slider-thumb:hover {
		transform: scale(1.15);
		box-shadow: 0 0 20px rgba(239,68,68,0.4);
	}
	.range-slider::-moz-range-track {
		height: 6px;
		border-radius: 999px;
		background: rgba(255,255,255,0.08);
		border: none;
	}
	.range-slider::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #ef4444;
		border: 2px solid rgba(239,68,68,0.3);
		box-shadow: 0 0 12px rgba(239,68,68,0.3);
		cursor: pointer;
	}
	.scrollbar-none {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
</style>
