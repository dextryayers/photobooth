<script lang="ts">
	import { pb } from '$lib/states/photobooth.svelte';
	import { downloadImage, shareImage } from '$lib/utils/download';
	import { playComplete } from '$lib/utils/sounds';
	import { onMount } from 'svelte';

	let dl = $state(false);
	let sh = $state(false);
	let ready = $state(false);
	let btns = $state(false);

	let ctx: CanvasRenderingContext2D | null = null;
	let particles: {
		x: number; y: number; vx: number; vy: number; sz: number;
		c: string; r: number; rv: number; life: number; shape: number;
	}[] = [];
	let anim: number | null = null;

	$effect(() => { if (!pb.stripUrl) pb.reset(); });

	onMount(() => {
		ready = true;
		setTimeout(() => btns = true, 600);
		playComplete();

		const c = document.getElementById('particles') as HTMLCanvasElement | null;
		if (c) {
			c.width = window.innerWidth;
			c.height = window.innerHeight;
			ctx = c.getContext('2d')!;
		}

		const bursts = [
			[0.25, 0.15], [0.75, 0.12], [0.5, 0.08],
			[0.15, 0.28], [0.85, 0.22],
		];
		bursts.forEach((b, i) => setTimeout(() => pop(b[0], b[1]), i * 200));

		const iv = setInterval(() => pop(Math.random() * 0.5 + 0.2, Math.random() * 0.25), 4500);
		return () => clearInterval(iv);
	});

	const COLORS = ['#ef4444', '#f97316', '#eab308', '#22d3ee', '#2dd4bf', '#f472b6'];

	function pop(cx: number, cy: number) {
		const w = ctx?.canvas.width ?? 400;
		const h = ctx?.canvas.height ?? 600;
		const bx = cx * w, by = cy * h;

		for (let i = 0; i < 45; i++) {
			const a = Math.random() * Math.PI * 2;
			const sp = 2 + Math.random() * 7;
			particles.push({
				x: bx, y: by, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 3,
				sz: 3 + Math.random() * 9, c: COLORS[Math.floor(Math.random() * COLORS.length)],
				r: Math.random() * 360, rv: (Math.random() - 0.5) * 10, life: 1,
				shape: Math.floor(Math.random() * 3),
			});
		}
		if (!anim) draw();
	}

	function draw() {
		if (!ctx) return;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		particles = particles.filter((p) => p.life > 0);

		for (const p of particles) {
			p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.r += p.rv; p.life -= 0.006;
			ctx.save();
			ctx.translate(p.x, p.y);
			ctx.rotate((p.r * Math.PI) / 180);
			ctx.globalAlpha = Math.max(0, p.life);
			ctx.fillStyle = p.c;

			if (p.shape === 0) {
				ctx.fillRect(-p.sz / 2, -p.sz / 4, p.sz, p.sz / 2);
			} else if (p.shape === 1) {
				ctx.beginPath();
				ctx.arc(0, 0, p.sz / 2, 0, Math.PI * 2);
				ctx.fill();
			} else {
				const s = p.sz / 2;
				ctx.beginPath();
				for (let i = 0; i < 5; i++) {
					const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
					i === 0 ? ctx.moveTo(Math.cos(a) * s, Math.sin(a) * s) : ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
				}
				ctx.closePath();
				ctx.fill();
			}
			ctx.restore();
		}

		if (particles.length > 0) anim = requestAnimationFrame(draw);
		else anim = null;
	}

	function date() { const d = new Date(); return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`; }

	async function handleDl() {
		if (dl || !pb.stripUrl) return;
		dl = true;
		try { if (navigator.vibrate) navigator.vibrate(20); downloadImage(pb.stripUrl, `photobooth-${Date.now()}.png`); }
		finally { dl = false; }
	}

	async function handleShare() {
		if (sh || !pb.stripUrl) return;
		sh = true;
		try { await shareImage(pb.stripUrl); } catch { handleDl(); }
		finally { sh = false; }
	}

	function again() { if (navigator.vibrate) navigator.vibrate(12); pb.reset(); }
</script>

<svelte:head>
	<title>Hasil - Photobooth</title>
</svelte:head>

<canvas id="particles" class="pointer-events-none fixed inset-0 z-50"></canvas>

<div class="relative flex min-h-dvh flex-col items-center page-bg px-4 py-8">
	<div class="sprocket-l"></div>
	<div class="sprocket-r"></div>
	<div class="pointer-events-none absolute inset-0" style="background: radial-gradient(ellipse at center, var(--radial-glow) 0%, transparent 60%)"></div>

	<div class="relative z-10 w-full max-w-xs">
		<div class="mb-5 text-center">
			<div class="mb-2 inline-flex items-center gap-2 rounded-full bg-[#ef4444]/10 px-4 py-1.5" style="opacity: {ready ? 1 : 0}; transition: opacity 0.5s">
				<span class="font-['Inter'] text-[10px] font-medium text-[#ef4444]/80">jadi! 🎉</span>
			</div>
			<h2 class="font-['Syne'] text-2xl sm:text-3xl font-bold text-primary" style="opacity: {ready ? 1 : 0}; transform: translateY({ready ? 0 : 10}px); transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s">Strip-mu</h2>
			<p class="mt-1 font-['Inter'] text-xs sm:text-sm text-tertiary" style="opacity: {ready ? 1 : 0}; transition: opacity 0.5s 0.2s">siap diunduh atau dibagikan</p>
		</div>

		<!-- Strip result -->
		{#if pb.stripUrl}
			<div class="paper-texture relative rounded-lg bg-[#faf8f5] px-5 py-5 shadow-2xl shadow-black/20" style="
				opacity: {ready ? 1 : 0};
				transform: {ready ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.95)'};
				transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
			">
				<p class="font-['Syne'] text-center text-xs font-bold tracking-[0.3em] text-gray-800">✦ PHOTOBOOTH ✦</p>
				<p class="mb-3 text-center font-['Inter'] text-[9px] text-gray-400">{date()}</p>
				<img src={pb.stripUrl} alt="" class="w-full rounded" />
				<p class="mt-3 text-center font-['Inter'] text-[7px] text-gray-300 tracking-[0.3em]">PHOTOBOOTH.APP</p>
			</div>
		{/if}

		<!-- Actions -->
		<div class="mt-6 space-y-2.5" style="
			opacity: {btns ? 1 : 0};
			transform: translateY({btns ? 0 : 12}px);
			transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
		">
			<button
				onclick={handleDl}
				disabled={dl}
				class="elastic group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#ef4444] px-5 sm:px-6 py-3.5 sm:py-4 font-['Syne'] text-sm sm:text-base font-bold text-white shadow-lg shadow-[#ef4444]/15 transition-all duration-300 hover:shadow-xl hover:shadow-[#ef4444]/20 disabled:opacity-40"
			>
				{#if dl}
					<div class="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
				{:else}
					<svg class="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
					</svg>
				{/if}
				<span>Unduh Strip</span>
				<div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
			</button>

			<button
				onclick={handleShare}
				disabled={sh || !('share' in navigator)}
				class="elastic group flex w-full items-center justify-center gap-3 rounded-xl glass px-5 sm:px-6 py-3.5 sm:py-4 font-['Inter'] text-sm sm:text-base font-medium text-secondary transition-all duration-300 hover:text-primary disabled:cursor-not-allowed disabled:opacity-10"
			>
				<svg class="h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
				</svg>
				<span>Bagikan</span>
			</button>

			<button
				onclick={again}
				class="elastic group flex w-full items-center justify-center gap-2 rounded-xl px-5 sm:px-6 py-2.5 sm:py-3 font-['Inter'] text-xs sm:text-sm text-tertiary transition-all duration-300 hover:text-secondary"
			>
				<svg class="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
				</svg>
				<span>Buat Baru</span>
			</button>
		</div>
	</div>
</div>
