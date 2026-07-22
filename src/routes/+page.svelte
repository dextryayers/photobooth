<script lang="ts">
	import { pb } from '$lib/states/photobooth.svelte';
	import { lang } from '$lib/states/lang.svelte';
	import { onMount } from 'svelte';

	const PHRASES = [
		['satu jepret, satu cerita', 'one snap, one story'],
		['4 bingkai, 1 kenangan', '4 frames, 1 memory'],
		['senyum dulu baru klik', 'smile before you click'],
		['analog feeling, digital result', 'analog feel, digital result'],
		['momen jadi abadi', 'moments made timeless'],
	];

	let pi = $state(0);
	let ci = $state(0);
	let deleting = $state(false);
	let typed = $state('');
	let langPrev = $state(lang.lang);
	let tid = $state(0);

	function cancelType() { if (tid) { clearTimeout(tid); tid = 0; } }

	function nextChar() {
		const cur = PHRASES[pi][lang.lang === 'id' ? 0 : 1];
		if (!deleting) {
			if (ci < cur.length) {
				ci++; typed = cur.slice(0, ci);
				tid = setTimeout(nextChar, 30 + Math.random() * 40);
			} else {
				tid = setTimeout(() => { deleting = true; nextChar(); }, 2800);
			}
		} else {
			if (ci > 0) {
				ci--; typed = cur.slice(0, ci);
				tid = setTimeout(nextChar, 16 + Math.random() * 16);
			} else {
				deleting = false;
				pi = (pi + 1) % PHRASES.length;
				tid = setTimeout(nextChar, 600);
			}
		}
	}

	function startType() {
		cancelType();
		ci = 0;
		deleting = false;
		typed = '';
		tid = setTimeout(nextChar, 300);
	}

	onMount(() => {
		startType();
	});

	$effect(() => {
		if (lang.lang !== langPrev) {
			langPrev = lang.lang;
			startType();
		}
	});
</script>

<svelte:head>
	<title>Photobooth - Photobooth Gratis</title>
</svelte:head>

<div class="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden page-bg px-4">
	<!-- Sprocket frame -->
	<div class="sprocket-l"></div>
	<div class="sprocket-r"></div>

	<!-- Mesh orbs -->
	<div class="pointer-events-none absolute inset-0" style="animation: breathe 7s ease-in-out infinite">
		<div class="absolute -left-28 -top-28 h-[400px] w-[400px] rounded-full bg-[#ef4444]/5 blur-[100px]" style="animation: mesh-1 14s ease-in-out infinite"></div>
		<div class="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#2d6a9f]/5 blur-[120px]" style="animation: mesh-2 16s ease-in-out infinite"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 w-full max-w-sm text-center">
		<!-- Hero -->
		<div class="relative anim-rise" style="animation-delay: 0.1s">
			<div class="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[min(200vw,1400px)] h-[min(120vw,800px)] -translate-x-1/2 -translate-y-1/2 rounded-[50%]" style="animation: pulse-slow 5s cubic-bezier(0.45, 0, 0.55, 1) infinite; background: radial-gradient(ellipse 50% 50% at 50% 50%, var(--eye-glow-1) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 50% 40%, var(--eye-glow-2) 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 50% 60%, var(--eye-glow-3) 0%, transparent 40%);"></div>
			<h1 class="relative z-1 font-['Syne'] text-4xl sm:text-5xl font-bold tracking-tight text-white whitespace-nowrap" style="perspective: 600px;">
				{#each 'PHOTO' as ch, i}
					<span
						class="inline-block"
						style="animation: bounce-in 0.6s var(--spring) {0.2 + i * 0.06}s forwards; opacity: 0;"
					>{ch}</span>
				{/each}
				<span class="text-[#ef4444]">
					{#each 'BOOTH' as ch, i}
						<span
							class="inline-block"
							style="animation: bounce-in 0.6s var(--spring) {0.5 + i * 0.06}s forwards; opacity: 0;"
						>{ch}</span>
					{/each}
				</span>
			</h1>
			<p class="relative z-1 mt-2 sm:mt-3 font-['Inter'] text-xs sm:text-sm font-light leading-relaxed text-secondary px-2">
				{lang.t('home.tagline')}
			</p>
		</div>

		<!-- Typewriter -->
		<div class="mt-5 sm:mt-7 h-7 anim-rise" style="animation-delay: 0.25s">
			<p class="font-['Inter'] text-sm tracking-wide">
				<span class="text-[#ef4444]/40 text-[9px] font-semibold tracking-[0.2em] uppercase mr-1.5">{lang.lang === 'id' ? 'ID' : 'EN'}</span>
				<span class="text-tertiary/80 italic">{typed}</span>
				<span class="inline-block h-[15px] w-[2px] bg-[#ef4444]/50 ml-1 align-middle animate-pulse"></span>
			</p>
		</div>



		<!-- CTA -->
		<div class="anim-pop" style="animation-delay: 0.7s">
			<button
				onclick={() => pb.start()}
				class="elastic group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#ef4444] px-8 sm:px-10 py-3.5 sm:py-4 font-['Syne'] text-sm sm:text-base font-bold text-white shadow-lg shadow-[#ef4444]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ef4444]/30"
			>
				<span class="relative z-10 tracking-wide">{lang.t('home.cta')}</span>
				<span class="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-0.5">⚡</span>
				<div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
			</button>
		</div>
	</div>

	<!-- Thin film leader line -->
	<div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ef4444]/15 to-transparent"></div>
</div>
