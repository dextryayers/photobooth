<script lang="ts">
	import { pb } from '$lib/states/photobooth.svelte';
	import { lang } from '$lib/states/lang.svelte';
	import { TEMPLATES } from '$lib/utils/templates';
	import { goto } from '$app/navigation';

	let sel = $state(pb.templateId);
	let container: HTMLDivElement;

	function pick(id: string) {
		sel = id;
	}

	function confirm() {
		pb.applyTemplate(sel);
		goto('/capture');
	}

	$effect(() => {
		if (container) {
			const idx = TEMPLATES.findIndex(t => t.id === sel);
			const child = container.children[idx] as HTMLElement | undefined;
			child?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
		}
	});

	const darkBgs = new Set(['#0a0a0a', '#1a1a1a', '#1a1a2e', '#0c0c1a', '#0f0f23', '#1a0a0a', '#2a2a2e', '#08070b']);
	function isDark(bg: string) { return darkBgs.has(bg); }

	const PHOTO_GRADIENTS = [
		'linear-gradient(135deg, #f87171, #fbbf24)',
		'linear-gradient(135deg, #60a5fa, #a78bfa)',
		'linear-gradient(135deg, #34d399, #22d3ee)',
		'linear-gradient(135deg, #f472b6, #fb923c)',
	];
</script>

<svelte:head>
	<title>{lang.t('preview.filter')} — Photobooth</title>
</svelte:head>

<div class="relative flex min-h-dvh flex-col items-center overflow-hidden page-bg">
	<div class="sprocket-l"></div>
	<div class="sprocket-r"></div>

	<div class="relative z-10 flex w-full max-w-2xl flex-1 flex-col px-4 pt-12 sm:pt-14">
		<!-- Header -->
		<div class="text-center anim-rise" style="animation-delay: 0.1s">
			<span class="font-['Inter'] text-[10px] font-semibold tracking-[0.3em] text-[#ef4444]/50 uppercase">Photobooth</span>
			<h1 class="mt-1 font-['Syne'] text-2xl sm:text-3xl font-bold tracking-tight text-white">
				{lang.t('template.title')}
			</h1>
			<p class="mt-1 font-['Inter'] text-xs text-secondary">{lang.t('template.geser')}</p>
		</div>

		<!-- Swiper -->
		<div class="relative mt-5 flex-1 anim-rise" style="animation-delay: 0.2s">
			<div
				bind:this={container}
				class="flex h-full snap-x snap-mandatory items-start gap-4 overflow-x-auto px-6 pb-4 scroll-smooth"
				style="scrollbar-width: none; -ms-overflow-style: none; scroll-padding: 0 24px;"
			>
				{#each TEMPLATES as t, i}
					<button
						onclick={() => pick(t.id)}
						class="group snap-center relative shrink-0 w-[230px] rounded-2xl border p-0 text-left transition-all duration-500 outline-none"
						style="
							border-color: {sel === t.id ? '#ef4444' : 'rgba(255,255,255,0.06)'};
							background: {sel === t.id ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.02)'};
							box-shadow: {sel === t.id ? '0 0 0 1px rgba(239,68,68,0.3), 0 8px 24px rgba(239,68,68,0.08)' : '0 4px 12px rgba(0,0,0,0.1)'};
							animation: rise-up 0.5s var(--smooth) {0.15 + i * 0.03}s both;
						"
					>
						{#if i < 3}
							<div class="pointer-events-none absolute -top-2 -right-2 z-10 flex h-5 items-center gap-1 rounded-full bg-[#ef4444] px-2.5 text-[8px] font-bold tracking-wider text-white shadow-lg shadow-[#ef4444]/30">
								<svg class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>
								{lang.lang === 'id' ? 'Pilihan' : 'Pick'}
							</div>
						{/if}

						<!-- Preview -->
						<div class="relative mx-2.5 mt-2.5 overflow-hidden rounded-xl" style="background: {t.bg}; aspect-ratio: {t.aspect}; box-shadow: inset 0 0 0 0.5px rgba(255,255,255,0.04);">
							<div
								class="flex h-full w-full gap-px p-1.5"
								style="flex-direction: {t.layout === '4x1' ? 'column' : 'row'}; flex-wrap: {t.layout === '2x2' ? 'wrap' : 'nowrap'}"
							>
								{#each PHOTO_GRADIENTS as g, pi}
									<div
										class="relative overflow-hidden rounded-md"
										style="flex: 1; min-width: {t.layout === '2x2' ? 'calc(50% - 1px)' : '100%'}; min-height: {t.layout === '4x1' ? 'calc(25% - 1px)' : 'calc(50% - 1px)'}; background: {g};"
									>
										<div class="absolute inset-0" style="background: linear-gradient(rgba(255,255,255,0.08), transparent 40%, transparent 60%, rgba(0,0,0,0.1));"></div>
										<div class="absolute bottom-1 left-1 h-1 w-4 rounded-full bg-white/20"></div>
									</div>
								{/each}
							</div>
							<div class="pointer-events-none absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-white/20"></div>
						</div>

						<!-- Info -->
						<div class="space-y-0.5 px-2.5 pb-3 pt-2.5">
							<div class="flex items-center justify-between gap-2">
								<span class="font-['Syne'] text-sm font-bold text-primary truncate group-hover:text-[#ef4444] transition-colors duration-300">{lang.lang === 'id' ? t.name.id : t.name.en}</span>
								<span class="shrink-0 inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-['Inter'] text-[8px] font-semibold tracking-wider" style="border-color: {sel === t.id ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.08)'}; color: {sel === t.id ? '#ef4444' : 'var(--text-secondary)'}">
									<svg class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>
									{t.aspect}
								</span>
							</div>
							<p class="font-['Inter'] text-[10px] leading-relaxed text-tertiary line-clamp-1">{lang.lang === 'id' ? t.desc.id : t.desc.en}</p>
						</div>
					</button>
				{/each}
			</div>

			<div class="pointer-events-none absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-page-bg to-transparent"></div>
			<div class="pointer-events-none absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-page-bg to-transparent"></div>

			<!-- Scroll dots -->
			<div class="pointer-events-none absolute -bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
				{#each TEMPLATES as _, i}
					<div
						class="rounded-full transition-all duration-500"
						style="width: {Math.abs(i - TEMPLATES.findIndex(t => t.id === sel)) <= 1 ? (i === TEMPLATES.findIndex(t => t.id === sel) ? 8 : 4) : 3}px; height: 3px; background: {Math.abs(i - TEMPLATES.findIndex(t => t.id === sel)) <= 1 ? (i === TEMPLATES.findIndex(t => t.id === sel) ? '#ef4444' : 'rgba(239,68,68,0.3)') : 'rgba(255,255,255,0.08)'};"
					></div>
				{/each}
			</div>
		</div>

		<!-- CTA -->
		<div class="relative z-10 pb-6 pt-3 text-center anim-pop" style="animation-delay: 0.5s">
			<button
				onclick={confirm}
				class="elastic group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#ef4444] px-8 sm:px-10 py-3.5 sm:py-4 font-['Syne'] text-sm sm:text-base font-bold text-white shadow-lg shadow-[#ef4444]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ef4444]/30 active:scale-95"
			>
				<span class="relative z-10 tracking-wide">{lang.t('template.lanjut')}</span>
				<span class="relative z-10 inline-block transition-all duration-300 group-hover:translate-x-1">→</span>
				<div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
			</button>
		</div>
	</div>

	<div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ef4444]/15 to-transparent"></div>
</div>

<style>
	@keyframes rise-up {
		from { opacity: 0; transform: translateY(16px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
