export type Lang = 'id' | 'en';

type Dict = Record<string, { id: string; en: string }>;

const dict: Dict = {
	// Navbar
	'nav.home': { id: 'Home', en: 'Home' },
	'nav.about': { id: 'Tentang', en: 'About' },
	'nav.privacy': { id: 'Privasi', en: 'Privacy' },

	// Banner
	'banner.follow': { id: 'Ikuti', en: 'Follow' },

	// Welcome page
	'home.tagline': { id: 'Ambil foto. Dapatkan strip-mu.', en: 'Take photos. Get your strip.' },
	'home.cta': { id: 'Mulai', en: 'Start' },

	// Capture page
	'capture.title': { id: 'Ambil Foto', en: 'Capture' },
	'capture.capture': { id: 'Ambil', en: 'Capture' },
	'capture.upload': { id: 'Upload dari Galeri', en: 'Upload from Gallery' },
	'capture.flip': { id: 'Balik Kamera', en: 'Flip Camera' },
	'capture.of': { id: 'dari', en: 'of' },
	'capture.count': { id: 'foto', en: 'photos' },

	// Preview page
	'preview.title': { id: 'Strip-mu', en: 'Your Strip' },
	'preview.strip': { id: 'Strip', en: 'Strip' },
	'preview.cetak': { id: 'Cetak Strip', en: 'Print Strip' },
	'preview.layout': { id: 'Layout', en: 'Layout' },
	'preview.bg': { id: 'Latar', en: 'Background' },
	'preview.border': { id: 'Bingkai', en: 'Border' },

	// Result page
	'result.title': { id: 'Hasil', en: 'Result' },
	'result.siap': { id: 'siap diunduh atau dibagikan', en: 'ready to download or share' },
	'result.download': { id: 'Unduh Gambar', en: 'Download Image' },
	'result.share': { id: 'Bagikan', en: 'Share' },
	'result.baru': { id: 'Buat Baru', en: 'Create New' },

	// About page
	'about.title': { id: 'Tentang Photobooth', en: 'About Photobooth' },
	'about.desc': { id: 'Photobooth adalah aplikasi web untuk mengambil foto dan mengubahnya menjadi strip foto klasik ala mesin photobooth. Atur warna strip, tambah stiker, dan unduh hasilnya.', en: 'Photobooth is a web app to take photos and turn them into a classic photo strip. Customize strip colors, add stickers, and download your creation.' },
	'about.how': { id: 'Cara Kerja', en: 'How It Works' },
	'about.how.desc': { id: 'Ambil foto menggunakan kamera atau upload dari galeri. Pilih template, atur layout dan warna strip, lalu cetak. Unduh atau bagikan hasilnya.', en: 'Take photos using your camera or upload from gallery. Pick a template, adjust layout and strip colors, then print. Download or share the result.' },
	'about.features': { id: 'Fitur', en: 'Features' },
	'about.feat1': { id: '31 template kreatif dengan dekorasi unik', en: '31 creative templates with unique decorations' },
	'about.feat2': { id: 'Layout 4x1 strip atau 2x2 grid', en: '4x1 strip or 2x2 grid layout' },
	'about.feat3': { id: 'Kustomisasi warna strip dan border', en: 'Custom strip and border colors' },
	'about.cta': { id: 'Mulai Sekarang', en: 'Start Now' },

	// Privacy page
	'privacy.title': { id: 'Privasi', en: 'Privacy' },
	'privacy.desc': { id: 'Kami menghormati privasi Anda. Semua foto diproses langsung di browser Anda — tidak ada yang dikirim ke server.', en: 'We respect your privacy. All photos are processed directly in your browser — nothing is sent to any server.' },
	'privacy.camera': { id: 'Akses kamera hanya digunakan saat kamu mengambil foto. Streaming video tidak direkam atau dikirim ke mana pun.', en: 'Camera access is only used when you take a photo. The video stream is never recorded or sent anywhere.' },
	'privacy.data': { id: 'Semua data tersimpan di localStorage perangkat Anda dan bisa dihapus kapan saja.', en: 'All data is stored in your device\'s localStorage and can be cleared anytime.' },
	'privacy.track': { id: 'Kami tidak menggunakan tracker, analytics, atau cookie pihak ketiga.', en: 'We don\'t use trackers, analytics, or third-party cookies.' },
	'privacy.cta': { id: 'Mulai Sekarang', en: 'Start Now' },

	// Template page
	'template.title': { id: 'Pilih Template', en: 'Choose Template' },
	'template.geser': { id: 'geser untuk lihat semua template', en: 'swipe to see all templates' },
	'template.lanjut': { id: 'Lanjutkan', en: 'Continue' },
	'template.pick': { id: 'Pilihan', en: 'Pick' },

};

function createLang() {
	let lang = $state<Lang>('id');

	return {
		get lang() { return lang; },
		set lang(v: Lang) { lang = v; },
		toggle() { lang = lang === 'id' ? 'en' : 'id'; },
		t(key: string): string {
			const entry = dict[key];
			if (!entry) return key;
			return entry[lang];
		},
	};
}

export const lang = createLang();
