export type StripLayout = '4x1' | '2x2';

const STRIP_W = 600;
const PAD = 28;
const PHOTO_W = 544;
const PHOTO_H = 408;
const PHOTO_SM = 260;
const GAP = 14;
const HEADER = 72;
const FOOTER = 44;

function fmtDate(): string {
	const d = new Date();
	const day = String(d.getDate()).padStart(2, '0');
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const year = d.getFullYear();
	return `${day}/${month}/${year}`;
}

function loadImg(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(new Error('Gagal memuat foto'));
		img.src = src;
	});
}

export async function captureFrame(video: HTMLVideoElement, filterCss = ''): Promise<string> {
	const c = document.createElement('canvas');
	const ar = video.videoWidth / video.videoHeight;
	let dw: number, dh: number;

	if (ar > 4 / 3) {
		dh = video.videoHeight;
		dw = dh * (4 / 3);
	} else {
		dw = video.videoWidth;
		dh = dw * (3 / 4);
	}

	c.width = PHOTO_W;
	c.height = PHOTO_H;
	const ctx = c.getContext('2d')!;
	const sx = (video.videoWidth - dw) / 2;
	const sy = (video.videoHeight - dh) / 2;
	ctx.drawImage(video, sx, sy, dw, dh, 0, 0, PHOTO_W, PHOTO_H);

	if (filterCss) {
		ctx.save();
		ctx.filter = filterCss;
		ctx.drawImage(c, 0, 0);
		ctx.restore();
	}

	return c.toDataURL('image/jpeg', 0.92);
}

export async function createPhotoStrip(
	photos: string[],
	filterCss = '',
	bgColor = '#faf8f5',
	borderColor = '#e8e8e8',
	layout: StripLayout = '4x1',
): Promise<string> {
	const imgs = await Promise.all(photos.map(loadImg));

	if (layout === '2x2') {
		const cols = 2;
		const rows = 2;
		const innerW = (STRIP_W - PAD * 2 - GAP * (cols - 1)) / cols;
		const innerH = innerW * (3 / 4);
		const totalH = HEADER + rows * innerH + (rows - 1) * GAP + FOOTER;
		const c = document.createElement('canvas');
		c.width = STRIP_W;
		c.height = totalH;
		const ctx = c.getContext('2d')!;

		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, STRIP_W, totalH);

		ctx.fillStyle = '#111';
		ctx.font = 'bold 30px "Syne", sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		const gradient = ctx.createLinearGradient(STRIP_W / 2 - 100, 0, STRIP_W / 2 + 100, 0);
		gradient.addColorStop(0, '#db2777');
		gradient.addColorStop(0.5, '#7c3aed');
		gradient.addColorStop(1, '#db2777');
		ctx.fillStyle = gradient;
		ctx.fillText('✦ PHOTOBOOTH ✦', STRIP_W / 2, 34);

		ctx.fillStyle = '#888';
		ctx.font = '12px "Syne", sans-serif';
		ctx.fillText(fmtDate(), STRIP_W / 2, 54);

		for (let i = 0; i < imgs.length; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);
			const x = PAD + col * (innerW + GAP);
			const y = HEADER + row * (innerH + GAP);

			ctx.save();
			ctx.shadowColor = 'rgba(0,0,0,0.08)';
			ctx.shadowBlur = 12;
			ctx.shadowOffsetY = 4;

			const r = 8;
			ctx.beginPath();
			ctx.moveTo(x + r, y);
			ctx.lineTo(x + innerW - r, y);
			ctx.quadraticCurveTo(x + innerW, y, x + innerW, y + r);
			ctx.lineTo(x + innerW, y + innerH - r);
			ctx.quadraticCurveTo(x + innerW, y + innerH, x + innerW - r, y + innerH);
			ctx.lineTo(x + r, y + innerH);
			ctx.quadraticCurveTo(x, y + innerH, x, y + innerH - r);
			ctx.lineTo(x, y + r);
			ctx.quadraticCurveTo(x, y, x + r, y);
			ctx.closePath();
			ctx.clip();

			ctx.drawImage(imgs[i], x, y, innerW, innerH);

			if (filterCss) {
				ctx.filter = filterCss;
				ctx.drawImage(c, x, y, innerW, innerH, x, y, innerW, innerH);
			}

			ctx.restore();
		}

		ctx.fillStyle = '#aaa';
		ctx.font = '10px "Syne", sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('photobooth.app', STRIP_W / 2, totalH - FOOTER / 2);

		return c.toDataURL('image/png');
	}

	const totalH = HEADER + photos.length * PHOTO_H + (photos.length - 1) * GAP + FOOTER;
	const c = document.createElement('canvas');
	c.width = STRIP_W;
	c.height = totalH;
	const ctx = c.getContext('2d')!;

	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, STRIP_W, totalH);

	ctx.fillStyle = '#111';
	ctx.font = 'bold 30px "Syne", sans-serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	const gradient = ctx.createLinearGradient(STRIP_W / 2 - 100, 0, STRIP_W / 2 + 100, 0);
	gradient.addColorStop(0, '#db2777');
	gradient.addColorStop(0.5, '#7c3aed');
	gradient.addColorStop(1, '#db2777');
	ctx.fillStyle = gradient;
	ctx.fillText('✦ PHOTOBOOTH ✦', STRIP_W / 2, 34);

	ctx.fillStyle = '#888';
	ctx.font = '12px "Syne", sans-serif';
	ctx.fillText(fmtDate(), STRIP_W / 2, 54);

	let y = HEADER;

	for (let i = 0; i < imgs.length; i++) {
		const img = imgs[i];
		const x = PAD;
		const w = PHOTO_W;
		const ph = PHOTO_H;

		ctx.save();
		ctx.shadowColor = 'rgba(0,0,0,0.08)';
		ctx.shadowBlur = 12;
		ctx.shadowOffsetY = 4;

		const r = 10;
		ctx.beginPath();
		ctx.moveTo(x + r, y);
		ctx.lineTo(x + w - r, y);
		ctx.quadraticCurveTo(x + w, y, x + w, y + r);
		ctx.lineTo(x + w, y + ph - r);
		ctx.quadraticCurveTo(x + w, y + ph, x + w - r, y + ph);
		ctx.lineTo(x + r, y + ph);
		ctx.quadraticCurveTo(x, y + ph, x, y + ph - r);
		ctx.lineTo(x, y + r);
		ctx.quadraticCurveTo(x, y, x + r, y);
		ctx.closePath();
		ctx.clip();

		ctx.drawImage(img, x, y, w, ph);

		if (filterCss) {
			ctx.filter = filterCss;
			ctx.drawImage(c, x, y, w, ph, x, y, w, ph);
		}

		ctx.restore();

		ctx.strokeStyle = borderColor;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(x + 4, y + ph + GAP / 2);
		ctx.lineTo(x + w - 4, y + ph + GAP / 2);
		ctx.stroke();

		y += ph + GAP;
	}

	ctx.fillStyle = '#aaa';
	ctx.font = '10px "Syne", sans-serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('photobooth.app', STRIP_W / 2, totalH - FOOTER / 2);

	return c.toDataURL('image/png');
}
