const AudioCtx = typeof window !== 'undefined' ? (window.AudioContext || (window as any).webkitAudioContext) : null;

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
	if (!AudioCtx) return null;
	if (!ctx) ctx = new AudioCtx();
	if (ctx.state === 'suspended') ctx.resume();
	return ctx;
}

export function playShutter(): void {
	const ac = getCtx();
	if (!ac) return;
	const o = ac.createOscillator();
	const g = ac.createGain();
	o.connect(g);
	g.connect(ac.destination);
	o.type = 'square';
	o.frequency.setValueAtTime(800, ac.currentTime);
	o.frequency.exponentialRampToValueAtTime(200, ac.currentTime + 0.15);
	g.gain.setValueAtTime(0.3, ac.currentTime);
	g.gain.exponentialRampToValueAtTime(0.01, ac.currentTime + 0.15);
	o.start(ac.currentTime);
	o.stop(ac.currentTime + 0.15);
}

export function playCountdown(): void {
	const ac = getCtx();
	if (!ac) return;
	const o = ac.createOscillator();
	const g = ac.createGain();
	o.connect(g);
	g.connect(ac.destination);
	o.type = 'sine';
	o.frequency.setValueAtTime(600, ac.currentTime);
	g.gain.setValueAtTime(0.2, ac.currentTime);
	g.gain.exponentialRampToValueAtTime(0.01, ac.currentTime + 0.1);
	o.start(ac.currentTime);
	o.stop(ac.currentTime + 0.1);
}

export function playComplete(): void {
	const ac = getCtx();
	if (!ac) return;
	const notes = [523, 659, 784, 1047];
	notes.forEach((freq, i) => {
		const o = ac.createOscillator();
		const g = ac.createGain();
		o.connect(g);
		g.connect(ac.destination);
		o.type = 'sine';
		o.frequency.setValueAtTime(freq, ac.currentTime + i * 0.12);
		g.gain.setValueAtTime(0.2, ac.currentTime + i * 0.12);
		g.gain.exponentialRampToValueAtTime(0.01, ac.currentTime + i * 0.12 + 0.2);
		o.start(ac.currentTime + i * 0.12);
		o.stop(ac.currentTime + i * 0.12 + 0.2);
	});
}
