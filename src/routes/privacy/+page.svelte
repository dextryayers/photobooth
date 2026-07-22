<script lang="ts">
	import { pb } from '$lib/states/photobooth.svelte';
</script>

<svelte:head>
	<title>Privasi - Photobooth</title>
</svelte:head>

<div class="flex min-h-dvh flex-col items-center page-bg px-4 pt-28 pb-12">
	<div class="sprocket-l"></div>
	<div class="sprocket-r"></div>

	<div class="relative z-10 w-full max-w-sm">
		<div class="mb-2 inline-flex items-center gap-2 rounded-full glass px-3 py-1 anim-rise">
			<span class="h-1.5 w-1.5 rounded-full bg-[#ef4444] animate-pulse"></span>
			<span class="font-['Inter'] text-[9px] font-medium tracking-[0.25em] text-secondary uppercase">Kebijakan Privasi</span>
		</div>

		<h1 class="font-['Syne'] text-3xl sm:text-4xl font-bold text-primary mt-4 mb-6 anim-rise" style="animation-delay: 0.05s">
			Privasi
		</h1>

		<div class="space-y-4 text-left anim-rise" style="animation-delay: 0.1s">
			<div class="glass rounded-xl p-4">
				<h3 class="font-['Syne'] text-sm font-bold text-primary mb-2">Data Kamu</h3>
				<p class="font-['Inter'] text-xs text-secondary leading-relaxed">Semua foto diproses langsung di perangkat kamu (client-side). Tidak ada foto yang dikirim, disimpan, atau dibagikan ke server kami.</p>
			</div>
			<div class="glass rounded-xl p-4">
				<h3 class="font-['Syne'] text-sm font-bold text-primary mb-2">Kamera</h3>
				<p class="font-['Inter'] text-xs text-secondary leading-relaxed">Akses kamera hanya digunakan saat kamu mengambil foto. Streaming video tidak direkam atau dikirim ke mana pun.</p>
			</div>
			<div class="glass rounded-xl p-4">
				<h3 class="font-['Syne'] text-sm font-bold text-primary mb-2">Penyimpanan Lokal</h3>
				<p class="font-['Inter'] text-xs text-secondary leading-relaxed">Kami menggunakan localStorage untuk menyimpan preferensi tema (gelap/terang). Tidak ada data pribadi yang disimpan.</p>
			</div>
			<div class="glass rounded-xl p-4">
				<h3 class="font-['Syne'] text-sm font-bold text-primary mb-2">Pihak Ketiga</h3>
				<p class="font-['Inter'] text-xs text-secondary leading-relaxed">Aplikasi ini tidak menggunakan tracker, analytics, atau layanan pihak ketiga yang mengumpulkan data pribadi.</p>
			</div>
		</div>

		<div class="mt-8 text-center anim-rise" style="animation-delay: 0.15s">
			<button
				onclick={() => pb.start()}
				class="elastic inline-flex items-center gap-2 rounded-xl bg-[#ef4444] px-8 py-3.5 font-['Syne'] text-sm font-bold text-white shadow-lg shadow-[#ef4444]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ef4444]/30"
			>
				Mulai Sekarang
			</button>
		</div>
	</div>
</div>
