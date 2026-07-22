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
	'home.tagline': { id: 'Ambil 4 foto. Pilih filter. Dapatkan strip-mu.', en: 'Take 4 photos. Pick a filter. Get your strip.' },
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
	'preview.filter': { id: 'Filter', en: 'Filter' },
	'preview.strip': { id: 'Strip', en: 'Strip' },
	'preview.cetak': { id: 'Cetak Strip', en: 'Print Strip' },
	'preview.layout': { id: 'Layout', en: 'Layout' },
	'preview.bg': { id: 'Latar', en: 'Background' },
	'preview.border': { id: 'Bingkai', en: 'Border' },
	'preview.pilih': { id: 'pilih filter & cetak', en: 'pick a filter & print' },

	// Result page
	'result.title': { id: 'Hasil', en: 'Result' },
	'result.siap': { id: 'siap diunduh atau dibagikan', en: 'ready to download or share' },
	'result.download': { id: 'Unduh Gambar', en: 'Download Image' },
	'result.share': { id: 'Bagikan', en: 'Share' },
	'result.baru': { id: 'Buat Baru', en: 'Create New' },

	// About page
	'about.title': { id: 'Tentang Photobooth', en: 'About Photobooth' },
	'about.desc': { id: 'Photobooth adalah aplikasi web untuk mengambil 4 foto dan mengubahnya menjadi strip foto klasik ala mesin photobooth. Pilih filter favoritmu, atur warna strip, dan unduh hasilnya.', en: 'Photobooth is a web app to take 4 photos and turn them into a classic photo strip. Pick your favorite filter, customize the strip colors, and download your creation.' },
	'about.how': { id: 'Cara Kerja', en: 'How It Works' },
	'about.how.desc': { id: 'Ambil 4 foto menggunakan kamera atau upload dari galeri. Pilih filter, atur layout dan warna strip, lalu cetak. Unduh atau bagikan hasilnya.', en: 'Take 4 photos using your camera or upload from gallery. Choose a filter, adjust layout and strip colors, then print. Download or share the result.' },
	'about.features': { id: 'Fitur', en: 'Features' },
	'about.feat1': { id: '10 filter kreatif (Bittersweet, Candy, Nostalgia, dll)', en: '10 creative filters (Bittersweet, Candy, Nostalgia, etc.)' },
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

	// Filters
	'filter.none': { id: 'Normal', en: 'Normal' },
	'filter.bittersweet': { id: 'Bittersweet', en: 'Bittersweet' },
	'filter.candy': { id: 'Candy', en: 'Candy' },
	'filter.fresh': { id: 'Fresh', en: 'Fresh' },
	'filter.nostalgia': { id: 'Nostalgia', en: 'Nostalgia' },
	'filter.golden': { id: 'Golden', en: 'Golden' },
	'filter.mint': { id: 'Mint', en: 'Mint' },
	'filter.eighties': { id: 'Eighties', en: 'Eighties' },
	'filter.citrus': { id: 'Citrus', en: 'Citrus' },
	'filter.noir': { id: 'Noir', en: 'Noir' },
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
