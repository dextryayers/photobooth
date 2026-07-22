export function downloadImage(dataUrl: string, filename = 'photobooth-strip.png'): void {
	const link = document.createElement('a');
	link.download = filename;
	link.href = dataUrl;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

export async function shareImage(dataUrl: string, title = 'Photobooth Strip'): Promise<void> {
	if (!navigator.share) throw new Error('Web Share API tidak didukung');
	const blob = await (await fetch(dataUrl)).blob();
	const file = new File([blob], 'photobooth-strip.png', { type: 'image/png' });
	await navigator.share({ title, files: [file], text: 'Hasil photobooth-ku!' });
}
