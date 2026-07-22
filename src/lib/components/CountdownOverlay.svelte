<script lang="ts">
	import { playCountdown, playShutter } from '$lib/utils/sounds';

	let { oncomplete }: { oncomplete: () => void } = $props();

	let count = $state(3);
	let phase = $state<'enter' | 'hold' | 'exit'>('enter');

	$effect(() => {
		if (count <= 0) {
			playShutter();
			setTimeout(() => oncomplete(), 80);
			return;
		}
		playCountdown();
		phase = 'enter';

		const t1 = setTimeout(() => phase = 'hold', 250);
		const t2 = setTimeout(() => {
			phase = 'exit';
			setTimeout(() => {
				count--;
				if (count > 0) phase = 'enter';
			}, 180);
		}, 900);

		return () => { clearTimeout(t1); clearTimeout(t2); };
	});
</script>

<div class="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
	{#if count > 0}
		<div
			class="relative flex h-48 w-48 items-center justify-center"
			style="
				transform:
					{phase === 'enter' ? 'scale(1.5)' : phase === 'hold' ? 'scale(1)' : 'scale(0.5) rotate(10deg)'};
				opacity: {phase === 'exit' ? 0 : 1};
				transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease-out;
			"
		>
			{#each Array(3) as _, i}
				<div
					class="absolute inset-0 rounded-full"
					style="
						border: 2px solid rgba(236,72,153,0.3);
						animation: ring-pulse 1s ease-out infinite;
						animation-delay: -{i * 0.3}s;
						opacity: {count === 3 - i ? 1 : 0};
					"
				></div>
			{/each}
			<span
				class="relative font-['Syne'] text-9xl font-bold text-white drop-shadow-[0_0_40px_rgba(236,72,153,0.4)]"
				style="
					transform:
						{phase === 'enter' ? 'scale(1.3)' : phase === 'hold' ? 'scale(1)' : 'scale(0.4)'};
					transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
				"
			>{count}</span>
		</div>
	{/if}
</div>

<style>
	@keyframes ring-pulse {
		0% { transform: scale(0.9); opacity: 0.6; }
		100% { transform: scale(1.5); opacity: 0; }
	}
</style>
