export async function startCamera(facing: 'user' | 'environment' = 'user'): Promise<MediaStream> {
	if (!navigator.mediaDevices?.getUserMedia) {
		throw new Error('Browser tidak mendukung akses kamera.');
	}
	try {
		return await navigator.mediaDevices.getUserMedia({
			video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
			audio: false,
		});
	} catch (err) {
		if (err instanceof DOMException) {
			if (err.name === 'NotAllowedError') throw new Error('Akses kamera ditolak.');
			if (err.name === 'NotFoundError') throw new Error('Kamera tidak terdeteksi.');
			if (err.name === 'NotReadableError') throw new Error('Kamera sedang dipakai aplikasi lain.');
		}
		throw new Error('Gagal mengakses kamera.');
	}
}

export function stopCamera(stream: MediaStream | null): void {
	if (!stream) return;
	stream.getTracks().forEach((t) => t.stop());
}
