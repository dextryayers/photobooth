<script lang="ts">
	import { pb } from '$lib/states/photobooth.svelte';
</script>

<svelte:head>
	<title>Tentang - Photobooth</title>
</svelte:head>

<div class="flex min-h-dvh flex-col items-center page-bg px-4 pt-28 pb-12">
	<div class="sprocket-l"></div>
	<div class="sprocket-r"></div>

	<div class="relative z-10 w-full max-w-sm text-center">
		<div class="mb-2 inline-flex items-center gap-2 rounded-full glass px-3 py-1 anim-rise">
			<span class="h-1.5 w-1.5 rounded-full bg-[#ef4444] animate-pulse"></span>
			<span class="font-['Inter'] text-[9px] font-medium tracking-[0.25em] text-secondary uppercase">Tentang</span>
		</div>

		<h1 class="font-['Syne'] text-3xl sm:text-4xl font-bold text-primary mt-4 anim-rise" style="animation-delay: 0.05s">
			Tentang <span class="text-[#ef4444]">Photobooth</span>
		</h1>

		<p class="mt-4 font-['Inter'] text-sm leading-relaxed text-secondary anim-rise" style="animation-delay: 0.1s">
			Photobooth adalah aplikasi web untuk mengambil foto dan mengubahnya menjadi strip foto klasik ala mesin photobooth. Pilih template, atur warna strip, tambah stiker, dan unduh hasilnya.
		</p>

		<div class="mt-8 space-y-4 text-left anim-rise" style="animation-delay: 0.15s">
			<div class="glass rounded-xl p-4">
				<h3 class="font-['Syne'] text-sm font-bold text-primary mb-1">Cara Pakai</h3>
				<p class="font-['Inter'] text-xs text-secondary leading-relaxed">Ambil foto menggunakan kamera atau upload dari galeri. Pilih template, atur layout dan warna strip, lalu cetak. Unduh atau bagikan hasilnya.</p>
			</div>
			<div class="glass rounded-xl p-4">
				<h3 class="font-['Syne'] text-sm font-bold text-primary mb-1">Fitur</h3>
				<ul class="font-['Inter'] text-xs text-secondary leading-relaxed space-y-1.5">
					<li class="flex items-center gap-2"><span class="text-[#ef4444]">-</span>31 template kreatif dengan dekorasi unik</li>
					<li class="flex items-center gap-2"><span class="text-[#ef4444]">-</span>Layout 4x1 strip atau 2x2 grid</li>
					<li class="flex items-center gap-2"><span class="text-[#ef4444]">-</span>Kustomisasi warna strip dan border</li>
					<li class="flex items-center gap-2"><span class="text-[#ef4444]">-</span>Unduh PNG resolusi tinggi</li>
				</ul>
			</div>
		</div>

		<div class="mt-8 anim-rise" style="animation-delay: 0.2s">
			<button
				onclick={() => pb.start()}
				class="elastic inline-flex items-center gap-2 rounded-xl bg-[#ef4444] px-8 py-3.5 font-['Syne'] text-sm font-bold text-white shadow-lg shadow-[#ef4444]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#ef4444]/30"
			>
				Mulai Sekarang
			</button>
		</div>
	</div>
</div>
