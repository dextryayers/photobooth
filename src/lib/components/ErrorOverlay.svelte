<script lang="ts">
	import { pb } from '$lib/states/photobooth.svelte';

	function dismiss() {
		pb.setErr(null);
		pb.reset();
	}
</script>

{#if pb.err}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
		<div class="mx-4 w-full max-w-sm rounded-xl page-bg p-8 text-center shadow-2xl shadow-black/40 ring-1 ring-[var(--glass-border)]" style="animation: rise-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards">
			<div class="mb-5 flex justify-center">
				<div class="relative flex h-18 w-18 items-center justify-center">
					<div class="absolute inset-0 animate-ping rounded-full bg-[#ef4444]/8"></div>
					<div class="flex h-18 w-18 items-center justify-center rounded-full bg-[#ef4444]/8 ring-1 ring-[#ef4444]/15">
						<svg class="h-9 w-9 text-[#ef4444]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
						</svg>
					</div>
				</div>
			</div>
			<h3 class="mb-2 font-['Syne'] text-xl font-bold text-primary">Waduh!</h3>
			<p class="mb-8 font-['Inter'] text-sm leading-relaxed text-secondary">{pb.err}</p>
			<button
				onclick={dismiss}
				class="elastic rounded-xl bg-[#ef4444] px-8 py-3 font-['Syne'] text-sm font-semibold text-white shadow-lg shadow-[#ef4444]/15 transition-all duration-300 hover:shadow-xl hover:shadow-[#ef4444]/20"
			>Coba Lagi</button>
		</div>
	</div>
{/if}
