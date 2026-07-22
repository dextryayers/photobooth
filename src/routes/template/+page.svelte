<script lang="ts">
	import { pb } from '$lib/states/photobooth.svelte';
	import { lang } from '$lib/states/lang.svelte';
	import { TEMPLATES } from '$lib/utils/templates';
	import { goto } from '$app/navigation';

	let sel = $state(pb.templateId);

	function confirm() {
		pb.applyTemplate(sel);
		goto('/capture');
	}

	const GRADIENTS = Array(4).fill(['#94a3b8', '#cbd5e1']);

	function aspectCSS(aspect: string): string {
		const [w, h] = aspect.split(':').map(Number);
		return `${w} / ${h}`;
	}

	const SECTIONS = [
		{ count: 1, label: '1 Foto' },
		{ count: 2, label: '2 Foto' },
		{ count: 3, label: '3 Foto' },
		{ count: 4, label: '4 Foto' },
	];

	function templatesFor(count: number) {
		return TEMPLATES.filter(t => t.count === count);
	}
</script>

<svelte:head>
	<title>{lang.t('preview.filter')} | Photobooth</title>
</svelte:head>

<div class="relative min-h-dvh page-bg overflow-auto">
	<div class="sprocket-l"></div>
	<div class="sprocket-r"></div>

	<div class="relative z-10 mx-auto max-w-5xl px-4 py-12">

		<div class="text-center">
			<h1 class="font-['Syne'] text-xl sm:text-2xl font-bold tracking-tight text-primary">
				{lang.t('template.title')}
			</h1>
			<p class="mt-1 font-['Inter'] text-xs text-secondary/60">{lang.t('template.geser')}</p>
		</div>

		{#each SECTIONS as sec}
			{@const items = templatesFor(sec.count)}
			{#if items.length > 0}
				<div class="mt-10 first:mt-8">
					<div class="mb-4 flex items-center gap-2">
						<h2 class="font-['Syne'] text-base font-bold text-primary">{sec.label}</h2>
						<div class="ml-3 h-px flex-1" style="background: linear-gradient(to right, var(--text-tertiary), transparent)"></div>
					</div>

					<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
						{#each items as t}
							<button
								onclick={() => sel = t.id}
								class="group rounded-xl bg-white transition-all duration-200"
								style="
									border: 2px solid {sel === t.id ? '#ef4444' : 'transparent'};
									box-shadow: {sel === t.id ? '0 4px 16px rgba(239,68,68,0.2)' : '0 1px 3px rgba(0,0,0,0.08)'};
									transform: {sel === t.id ? 'translateY(-2px)' : 'translateY(0)'};
								"
							>
								<div class="p-2 pb-0">
									<div class="relative overflow-hidden rounded-lg" style="background: {t.bg}; aspect-ratio: {aspectCSS(t.aspect)};">
										<div
											class="flex h-full w-full gap-px p-1"
											style="flex-direction: {t.layout === '4x1' ? 'column' : 'row'}; flex-wrap: {t.layout === '2x2' ? 'wrap' : 'nowrap'}"
										>
											{#each GRADIENTS.slice(0, t.count) as g}
												<div
													class="rounded-sm"
													style="flex: 1; min-width: {t.layout === '2x2' ? 'calc(50% - 0.5px)' : '100%'}; min-height: {t.layout === '4x1' ? `calc(${100 / t.count}% - 0.5px)` : 'calc(50% - 0.5px)'}; background: linear-gradient(135deg, {g[0]}, {g[1]});"
												></div>
											{/each}
										</div>
										{#each t.decor as d}
											<span
												class="absolute pointer-events-none select-none"
												style="
													left: {d.x}%;
													top: {d.y}%;
													transform: translate(-50%, -50%) rotate({d.rotation ?? 0}deg) scale({d.scale ?? 1});
													font-size: {t.layout === '2x2' ? '10px' : '8px'};
													line-height: 1;
												"
											>{d.emoji}</span>
										{/each}
									</div>
								</div>

								<div class="px-2.5 pb-2.5 pt-1.5 text-center">
									<span class="block font-['Syne'] text-[10px] font-bold text-gray-800 truncate leading-tight">{lang.lang === 'id' ? t.name.id : t.name.en}</span>
									<span class="font-['Inter'] text-[8px] text-gray-400">{t.aspect}</span>
								</div>
							</button>
						{/each}
					</div>
				</div>
			{/if}
		{/each}

		<div class="mt-8 text-center">
			<button
				onclick={confirm}
				class="inline-flex items-center gap-2 rounded-lg bg-[#ef4444] px-8 py-3 font-['Syne'] text-sm font-bold text-white shadow-lg shadow-[#ef4444]/20 transition-all duration-300 hover:bg-[#dc2626] hover:shadow-xl hover:shadow-[#ef4444]/25 active:scale-95"
			>
				{lang.t('template.lanjut')} →
			</button>
		</div>
	</div>
</div>
