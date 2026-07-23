import type { Layout } from '$lib/states/photobooth.svelte';

export interface Decor {
	emoji: string;
	x: number;
	y: number;
	rotation?: number;
	scale?: number;
}

export interface Template {
	id: string;
	name: { id: string; en: string };
	aspect: string;
	layout: Layout;
	count: 1 | 2 | 3 | 4;
	bg: string;
	border: string;
	desc: { id: string; en: string };
	decor: Decor[];
}

export const TEMPLATES: Template[] = [
	// ═══ 1 FOTO ═══
	{
		id: 'polaroid-1', name: { id: 'Polaroid Tunggal', en: 'Single Polaroid' },
		aspect: '3:4', layout: '4x1', count: 1, bg: '#f8fafc', border: '#e2e8f0',
		desc: { id: 'Satu foto besar ala polaroid klasik', en: 'Single large classic polaroid' },
		decor: [
			{ emoji: '📸', x: 50, y: 8, scale: 0.8 },
			{ emoji: '✦', x: 10, y: 90, scale: 0.5 },
			{ emoji: '✦', x: 90, y: 90, scale: 0.5 },
		],
	},
	{
		id: 'minimal-1', name: { id: 'Minimal Satu', en: 'Minimal One' },
		aspect: '4:3', layout: '4x1', count: 1, bg: '#f1f5f9', border: '#64748b',
		desc: { id: 'Satu foto hitam putih elegan', en: 'Single elegant monochrome' },
		decor: [
			{ emoji: '◇', x: 12, y: 12, scale: 0.6 },
			{ emoji: '◇', x: 88, y: 12, scale: 0.6 },
			{ emoji: '—', x: 50, y: 88, scale: 0.5 },
		],
	},
	{
		id: 'vintage-film', name: { id: 'Film Vintage', en: 'Vintage Film' },
		aspect: '16:9', layout: '4x1', count: 1, bg: '#1c1917', border: '#fbbf24',
		desc: { id: 'Satu foto lebar ala film klasik 35mm', en: 'Single wide classic 35mm film frame' },
		decor: [
			{ emoji: '🎞️', x: 5, y: 50, scale: 0.7, rotation: -90 },
			{ emoji: '🎞️', x: 95, y: 50, scale: 0.7, rotation: 90 },
			{ emoji: '🔴', x: 50, y: 7, scale: 0.4 },
			{ emoji: '◻️', x: 50, y: 92, scale: 0.5 },
		],
	},
	{
		id: 'zen-1', name: { id: 'Zen', en: 'Zen' },
		aspect: '1:1', layout: '4x1', count: 1, bg: '#f5f5f0', border: '#a8a29e',
		desc: { id: 'Satu foto persegi minimalis bernuansa zen', en: 'A single minimalist zen square' },
		decor: [
			{ emoji: '🌸', x: 15, y: 15, scale: 0.6 },
			{ emoji: '🪷', x: 85, y: 85, scale: 0.7 },
			{ emoji: '○', x: 50, y: 50, scale: 0.3 },
		],
	},
	{
		id: 'gold-single', name: { id: 'Emas Satu', en: 'Gold Single' },
		aspect: '4:3', layout: '4x1', count: 1, bg: '#fefce8', border: '#d97706',
		desc: { id: 'Satu foto elegan dengan aksen emas', en: 'Single elegant gold-accent photo' },
		decor: [
			{ emoji: '✨', x: 15, y: 12, scale: 0.8 },
			{ emoji: '👑', x: 85, y: 12, scale: 0.8 },
			{ emoji: '🌟', x: 50, y: 90, scale: 0.9 },
			{ emoji: '✦', x: 12, y: 88, scale: 0.5 },
			{ emoji: '✦', x: 88, y: 88, scale: 0.5 },
		],
	},
	{
		id: 'neon-single', name: { id: 'Neon', en: 'Neon' },
		aspect: '3:4', layout: '4x1', count: 1, bg: '#0a0a1a', border: '#c084fc',
		desc: { id: 'Satu foto dramatis dengan efek neon', en: 'Single dramatic neon-lit photo' },
		decor: [
			{ emoji: '💜', x: 12, y: 12, scale: 0.8 },
			{ emoji: '💙', x: 88, y: 12, scale: 0.8 },
			{ emoji: '🩷', x: 12, y: 88, scale: 0.8 },
			{ emoji: '💚', x: 88, y: 88, scale: 0.8 },
			{ emoji: '⚡', x: 50, y: 50, scale: 0.6 },
		],
	},
	{
		id: 'fairy-tale', name: { id: 'Dongeng', en: 'Fairy Tale' },
		aspect: '3:4', layout: '4x1', count: 1, bg: '#fdf4ff', border: '#d946ef',
		desc: { id: 'Satu foto magis dengan sentuhan peri', en: 'Single magical fairy-tale photo' },
		decor: [
			{ emoji: '🧚', x: 85, y: 12, scale: 0.9, rotation: 8 },
			{ emoji: '✨', x: 12, y: 12, scale: 0.6 },
			{ emoji: '🦋', x: 12, y: 85, scale: 0.8, rotation: -5 },
			{ emoji: '🌙', x: 85, y: 85, scale: 0.7 },
			{ emoji: '💫', x: 50, y: 90, scale: 0.7 },
		],
	},

	// ═══ 2 FOTO ═══
	{
		id: 'double-film', name: { id: 'Film Ganda', en: 'Double Film' },
		aspect: '3:4', layout: '4x1', count: 2, bg: '#0f172a', border: '#ef4444',
		desc: { id: 'Dua foto dramatis ala film noir', en: 'Two dramatic noir shots' },
		decor: [
			{ emoji: '🎞️', x: 8, y: 30, scale: 0.6, rotation: -90 },
			{ emoji: '🎞️', x: 92, y: 70, scale: 0.6, rotation: 90 },
			{ emoji: '✦', x: 50, y: 7, scale: 0.6 },
		],
	},
	{
		id: 'sweet-duo', name: { id: 'Manis Duo', en: 'Sweet Duo' },
		aspect: '4:3', layout: '4x1', count: 2, bg: '#fdf2f8', border: '#f472b6',
		desc: { id: 'Dua foto manis dengan hiasan bunga', en: 'Two sweet floral photos' },
		decor: [
			{ emoji: '🌸', x: 15, y: 85, scale: 0.9 },
			{ emoji: '🌸', x: 85, y: 15, scale: 0.9 },
			{ emoji: '🦋', x: 85, y: 85, scale: 0.7, rotation: 8 },
			{ emoji: '💕', x: 50, y: 50, scale: 0.6 },
		],
	},
	{
		id: 'cherry-duo', name: { id: 'Ceri Duo', en: 'Cherry Duo' },
		aspect: '3:4', layout: '2x2', count: 2, bg: '#fff5f5', border: '#dc2626',
		desc: { id: 'Dua foto berdampingan merah ceri', en: 'Two side-by-side cherry red photos' },
		decor: [
			{ emoji: '🍒', x: 20, y: 50, scale: 0.9 },
			{ emoji: '🍒', x: 80, y: 50, scale: 0.9 },
			{ emoji: '❤️', x: 50, y: 10, scale: 0.7 },
			{ emoji: '🌸', x: 50, y: 90, scale: 0.7 },
		],
	},
	{
		id: 'tropical-duo', name: { id: 'Tropis Duo', en: 'Tropical Duo' },
		aspect: '4:3', layout: '4x1', count: 2, bg: '#f0fdf4', border: '#22c55e',
		desc: { id: 'Dua foto segar bernuansa tropis', en: 'Two fresh tropical vacation photos' },
		decor: [
			{ emoji: '🌴', x: 12, y: 85, scale: 1, rotation: 5 },
			{ emoji: '🌺', x: 88, y: 15, scale: 0.9, rotation: -10 },
			{ emoji: '🍍', x: 88, y: 85, scale: 0.8 },
			{ emoji: '🌊', x: 15, y: 15, scale: 0.7, rotation: -90 },
		],
	},
	{
		id: 'midnight-duo', name: { id: 'Tengah Malam', en: 'Midnight Duo' },
		aspect: '3:4', layout: '4x1', count: 2, bg: '#0a0f1e', border: '#38bdf8',
		desc: { id: 'Dua foto malam dengan taburan bintang', en: 'Two midnight photos under the stars' },
		decor: [
			{ emoji: '🌙', x: 50, y: 7, scale: 0.8 },
			{ emoji: '⭐', x: 15, y: 50, scale: 0.6 },
			{ emoji: '⭐', x: 85, y: 30, scale: 0.5 },
			{ emoji: '✨', x: 12, y: 88, scale: 0.5 },
			{ emoji: '🌠', x: 88, y: 88, scale: 0.6 },
		],
	},
	{
		id: 'cozy-duo', name: { id: 'Cozy Duo', en: 'Cozy Duo' },
		aspect: '4:3', layout: '2x2', count: 2, bg: '#fffbeb', border: '#92400e',
		desc: { id: 'Dua foto hangat ala rumah nyaman', en: 'Two warm cozy home photos' },
		decor: [
			{ emoji: '☕', x: 20, y: 15, scale: 0.7 },
			{ emoji: '🕯️', x: 80, y: 15, scale: 0.7 },
			{ emoji: '🧸', x: 20, y: 85, scale: 0.7 },
			{ emoji: '📚', x: 80, y: 85, scale: 0.7 },
		],
	},
	{
		id: 'dino-duo', name: { id: 'Dino Duo', en: 'Dino Duo' },
		aspect: '4:3', layout: '4x1', count: 2, bg: '#f0fdf4', border: '#65a30d',
		desc: { id: 'Dua foto seru ala dinosaurus untuk si kecil', en: 'Two fun dinosaur-themed photos for kids' },
		decor: [
			{ emoji: '🦕', x: 12, y: 12, scale: 0.9, rotation: -5 },
			{ emoji: '🦖', x: 88, y: 88, scale: 0.9, rotation: 8 },
			{ emoji: '🌿', x: 88, y: 12, scale: 0.6 },
			{ emoji: '🌋', x: 12, y: 88, scale: 0.8 },
			{ emoji: '🥚', x: 50, y: 50, scale: 0.5 },
		],
	},
	{
		id: 'raindrop-duo', name: { id: 'Rintik Hujan', en: 'Raindrop Duo' },
		aspect: '3:4', layout: '4x1', count: 2, bg: '#f0f9ff', border: '#0c4a6e',
		desc: { id: 'Dua foto syahdu dengan nuansa hujan', en: 'Two serene rainy-day photos' },
		decor: [
			{ emoji: '🌧️', x: 50, y: 7, scale: 0.7 },
			{ emoji: '☂️', x: 15, y: 15, scale: 0.7, rotation: -10 },
			{ emoji: '💧', x: 88, y: 20, scale: 0.5 },
			{ emoji: '💧', x: 10, y: 85, scale: 0.5 },
			{ emoji: '🐸', x: 88, y: 85, scale: 0.7 },
		],
	},

	// ═══ 3 FOTO ═══
	{
		id: 'trip-vintage', name: { id: 'Tiga Vintage', en: 'Vintage Trio' },
		aspect: '4:3', layout: '4x1', count: 3, bg: '#fefce8', border: '#d97706',
		desc: { id: 'Tiga foto bernuansa vintage hangat', en: 'Three warm vintage photos' },
		decor: [
			{ emoji: '📷', x: 12, y: 12, scale: 0.8 },
			{ emoji: '🌻', x: 88, y: 50, scale: 0.8 },
			{ emoji: '🍂', x: 15, y: 88, scale: 0.7 },
			{ emoji: '🕰️', x: 88, y: 88, scale: 0.7 },
		],
	},
	{
		id: 'triple-mint', name: { id: 'Mint Tiga', en: 'Mint Trio' },
		aspect: '4:3', layout: '4x1', count: 3, bg: '#f0fdf4', border: '#10b981',
		desc: { id: 'Tiga foto segar dengan aksen daun', en: 'Three fresh minty photos' },
		decor: [
			{ emoji: '🌿', x: 8, y: 25, scale: 0.8, rotation: -90 },
			{ emoji: '🌿', x: 92, y: 75, scale: 0.8, rotation: 90 },
			{ emoji: '🍃', x: 15, y: 88, scale: 0.6 },
			{ emoji: '🍃', x: 85, y: 12, scale: 0.6 },
			{ emoji: '💚', x: 50, y: 50, scale: 0.5 },
		],
	},
	{
		id: 'forest', name: { id: 'Hutan', en: 'Forest' },
		aspect: '2:3', layout: '4x1', count: 3, bg: '#f0fdf4', border: '#16a34a',
		desc: { id: 'Tiga foto segar dengan nuansa hutan', en: 'Three fresh forest photos' },
		decor: [
			{ emoji: '🌲', x: 10, y: 15, scale: 0.9 },
			{ emoji: '🌲', x: 90, y: 85, scale: 0.9 },
			{ emoji: '🍃', x: 50, y: 15, scale: 0.7 },
			{ emoji: '🌸', x: 50, y: 88, scale: 0.7 },
			{ emoji: '🌿', x: 12, y: 88, scale: 0.6 },
			{ emoji: '🌿', x: 88, y: 12, scale: 0.6 },
		],
	},
	{
		id: 'boho-trio', name: { id: 'Boho Tiga', en: 'Boho Trio' },
		aspect: '4:3', layout: '4x1', count: 3, bg: '#fefaf5', border: '#d97706',
		desc: { id: 'Tiga foto boho dengan hiasan etnik', en: 'Three boho photos with ethnic decor' },
		decor: [
			{ emoji: '🔮', x: 50, y: 7, scale: 0.7 },
			{ emoji: '🌵', x: 12, y: 85, scale: 0.8 },
			{ emoji: '🪶', x: 88, y: 15, scale: 0.7, rotation: 15 },
			{ emoji: '🧿', x: 88, y: 85, scale: 0.6 },
			{ emoji: '✨', x: 15, y: 15, scale: 0.5 },
		],
	},
	{
		id: 'comic-trio', name: { id: 'Komik Tiga', en: 'Comic Trio' },
		aspect: '16:9', layout: '4x1', count: 3, bg: '#fef9c3', border: '#dc2626',
		desc: { id: 'Tiga foto bergaya komik pop art', en: 'Three comic book pop art photos' },
		decor: [
			{ emoji: '💥', x: 12, y: 12, scale: 0.9, rotation: -15 },
			{ emoji: '⭐', x: 88, y: 12, scale: 0.8 },
			{ emoji: '🗯️', x: 15, y: 88, scale: 0.7 },
			{ emoji: '🎨', x: 88, y: 88, scale: 0.7 },
		],
	},
	{
		id: 'pastel-trio', name: { id: 'Pastel Tiga', en: 'Pastel Trio' },
		aspect: '4:3', layout: '4x1', count: 3, bg: '#fdf2f8', border: '#f9a8d4',
		desc: { id: 'Tiga foto lembut bernuansa pastel', en: 'Three soft pastel-colored photos' },
		decor: [
			{ emoji: '🩷', x: 12, y: 12, scale: 0.6 },
			{ emoji: '🩵', x: 88, y: 12, scale: 0.6 },
			{ emoji: '💛', x: 12, y: 88, scale: 0.6 },
			{ emoji: '🤍', x: 88, y: 88, scale: 0.6 },
			{ emoji: '🫧', x: 50, y: 50, scale: 0.5 },
		],
	},
	{
		id: 'desert-trio', name: { id: 'Gurun Tiga', en: 'Desert Trio' },
		aspect: '16:9', layout: '4x1', count: 3, bg: '#fef9ef', border: '#ea580c',
		desc: { id: 'Tiga foto hangat bernuansa padang pasir', en: 'Three warm desert landscape photos' },
		decor: [
			{ emoji: '🏜️', x: 50, y: 90, scale: 0.8 },
			{ emoji: '🐪', x: 12, y: 15, scale: 0.7 },
			{ emoji: '🌵', x: 88, y: 15, scale: 0.8 },
			{ emoji: '☀️', x: 88, y: 88, scale: 0.7 },
		],
	},

	// ═══ 4 FOTO ═══
	{
		id: 'classic', name: { id: 'Klasik', en: 'Classic' },
		aspect: '4:3', layout: '4x1', count: 4, bg: '#faf8f5', border: '#d4d4d8',
		desc: { id: 'Strip klasik empat foto timeless', en: 'Classic four-photo strip' },
		decor: [
			{ emoji: '✦', x: 10, y: 10, scale: 0.5 },
			{ emoji: '✦', x: 90, y: 10, scale: 0.5 },
			{ emoji: '✦', x: 10, y: 90, scale: 0.5 },
			{ emoji: '✦', x: 90, y: 90, scale: 0.5 },
		],
	},
	{
		id: 'candy', name: { id: 'Candy Pop', en: 'Candy Pop' },
		aspect: '4:3', layout: '2x2', count: 4, bg: '#fdf2f8', border: '#ef4444',
		desc: { id: 'Empat foto grid warna-warni ceria', en: 'Cheerful colorful 4-grid' },
		decor: [
			{ emoji: '🍭', x: 12, y: 10, scale: 1, rotation: -15 },
			{ emoji: '🍬', x: 88, y: 10, scale: 0.9, rotation: 12 },
			{ emoji: '🎀', x: 88, y: 90, scale: 1, rotation: 5 },
			{ emoji: '✨', x: 12, y: 90, scale: 0.8 },
			{ emoji: '💖', x: 50, y: 50, scale: 0.7 },
		],
	},
	{
		id: 'cinematic', name: { id: 'Sinematik', en: 'Cinematic' },
		aspect: '16:9', layout: '4x1', count: 4, bg: '#0f0f0f', border: '#ef4444',
		desc: { id: 'Empat foto lebar sinematik dramatis', en: 'Four wide dramatic cinema shots' },
		decor: [
			{ emoji: '🎬', x: 10, y: 90, scale: 0.9 },
			{ emoji: '🎥', x: 90, y: 10, scale: 0.8 },
			{ emoji: '🎞️', x: 50, y: 50, scale: 0.5 },
			{ emoji: '✦', x: 50, y: 8, scale: 0.5 },
		],
	},
	{
		id: 'rose', name: { id: 'Mawar', en: 'Rose' },
		aspect: '3:4', layout: '4x1', count: 4, bg: '#fff5f7', border: '#f43f5e',
		desc: { id: 'Empat foto romantis dengan mawar merah', en: 'Four romantic rose photos' },
		decor: [
			{ emoji: '🌹', x: 12, y: 12, scale: 1, rotation: -8 },
			{ emoji: '🌹', x: 88, y: 88, scale: 1, rotation: 10 },
			{ emoji: '🌹', x: 12, y: 88, scale: 0.8, rotation: 5 },
			{ emoji: '💕', x: 88, y: 12, scale: 0.7 },
		],
	},
	{
		id: 'golden', name: { id: 'Golden Hour', en: 'Golden Hour' },
		aspect: '16:9', layout: '2x2', count: 4, bg: '#fffbeb', border: '#d97706',
		desc: { id: 'Empat foto grid hangat keemasan', en: 'Four warm golden grid shots' },
		decor: [
			{ emoji: '☀️', x: 50, y: 8, scale: 1.1 },
			{ emoji: '🌅', x: 15, y: 88, scale: 0.9 },
			{ emoji: '✨', x: 88, y: 15, scale: 0.7 },
			{ emoji: '🌾', x: 88, y: 88, scale: 0.8 },
		],
	},
	{
		id: 'ocean', name: { id: 'Lautan', en: 'Ocean' },
		aspect: '1:1', layout: '2x2', count: 4, bg: '#f0f9ff', border: '#0ea5e9',
		desc: { id: 'Empat foto grid biru ala lautan', en: 'Four blue ocean grid shots' },
		decor: [
			{ emoji: '🌊', x: 50, y: 92, scale: 1.2 },
			{ emoji: '🐚', x: 15, y: 12, scale: 0.8 },
			{ emoji: '🐠', x: 88, y: 12, scale: 0.9 },
			{ emoji: '🫧', x: 12, y: 88, scale: 0.6 },
			{ emoji: '🫧', x: 88, y: 88, scale: 0.5 },
		],
	},
	{
		id: 'moonlight', name: { id: 'Cahaya Bulan', en: 'Moonlight' },
		aspect: '1:1', layout: '4x1', count: 4, bg: '#0c0c1a', border: '#818cf8',
		desc: { id: 'Empat foto malam misterius bercahaya', en: 'Four mysterious moonlit photos' },
		decor: [
			{ emoji: '🌙', x: 85, y: 10, scale: 1 },
			{ emoji: '⭐', x: 15, y: 8, scale: 0.7 },
			{ emoji: '⭐', x: 10, y: 20, scale: 0.5 },
			{ emoji: '✨', x: 15, y: 90, scale: 0.6 },
			{ emoji: '🌠', x: 88, y: 88, scale: 0.7 },
		],
	},
	{
		id: 'retrowave', name: { id: 'Retro Wave', en: 'Retro Wave' },
		aspect: '16:9', layout: '2x2', count: 4, bg: '#0b0f2a', border: '#f472b6',
		desc: { id: 'Empat foto grid bergaya synthwave 80-an', en: 'Four synthwave 80s grid photos' },
		decor: [
			{ emoji: '🌇', x: 50, y: 7, scale: 0.8 },
			{ emoji: '💜', x: 12, y: 50, scale: 0.7 },
			{ emoji: '🩷', x: 88, y: 50, scale: 0.7 },
			{ emoji: '🌴', x: 15, y: 88, scale: 0.8 },
			{ emoji: '⚡', x: 88, y: 88, scale: 0.6 },
		],
	},
	{
		id: 'galaxy', name: { id: 'Galaksi', en: 'Galaxy' },
		aspect: '3:4', layout: '4x1', count: 4, bg: '#0a0515', border: '#a855f7',
		desc: { id: 'Empat foto angkasa dengan taburan bintang', en: 'Four cosmic space photos with stars' },
		decor: [
			{ emoji: '🌌', x: 50, y: 7, scale: 0.8 },
			{ emoji: '🪐', x: 15, y: 15, scale: 0.7 },
			{ emoji: '🌟', x: 88, y: 12, scale: 0.6 },
			{ emoji: '🌠', x: 12, y: 88, scale: 0.6 },
			{ emoji: '🛸', x: 88, y: 88, scale: 0.6, rotation: -10 },
			{ emoji: '✨', x: 50, y: 50, scale: 0.5 },
		],
	},
	{
		id: 'kpop', name: { id: 'K-Pop', en: 'K-Pop' },
		aspect: '1:1', layout: '2x2', count: 4, bg: '#fdf4ff', border: '#ec4899',
		desc: { id: 'Empat foto grid vibrant ala K-Pop', en: 'Four vibrant K-Pop style grid photos' },
		decor: [
			{ emoji: '💜', x: 12, y: 12, scale: 0.7 },
			{ emoji: '🩷', x: 88, y: 12, scale: 0.7 },
			{ emoji: '🧡', x: 12, y: 88, scale: 0.7 },
			{ emoji: '💙', x: 88, y: 88, scale: 0.7 },
			{ emoji: '🎤', x: 50, y: 50, scale: 0.6 },
			{ emoji: '⭐', x: 50, y: 7, scale: 0.6 },
		],
	},
	{
		id: 'rainbow-grid', name: { id: 'Pelangi Grid', en: 'Rainbow Grid' },
		aspect: '4:3', layout: '2x2', count: 4, bg: '#f8fafc', border: '#f97316',
		desc: { id: 'Empat foto grid warna-warni pelangi', en: 'Four colorful rainbow grid photos' },
		decor: [
			{ emoji: '🌈', x: 50, y: 7, scale: 0.8 },
			{ emoji: '🔴', x: 15, y: 50, scale: 0.5, rotation: 5 },
			{ emoji: '🟡', x: 85, y: 30, scale: 0.5 },
			{ emoji: '🟢', x: 15, y: 85, scale: 0.5 },
			{ emoji: '🔵', x: 85, y: 85, scale: 0.5 },
		],
	},
	{
		id: 'monochrome', name: { id: 'Monokrom', en: 'Monochrome' },
		aspect: '4:3', layout: '2x2', count: 4, bg: '#f5f5f5', border: '#525252',
		desc: { id: 'Empat foto grid hitam putih timeless', en: 'Four timeless black & white grid photos' },
		decor: [
			{ emoji: '◼️', x: 12, y: 12, scale: 0.5 },
			{ emoji: '◻️', x: 88, y: 12, scale: 0.5 },
			{ emoji: '▪️', x: 12, y: 88, scale: 0.5 },
			{ emoji: '▫️', x: 88, y: 88, scale: 0.5 },
			{ emoji: '◇', x: 50, y: 50, scale: 0.4 },
		],
	},
	{
		id: 'celebration', name: { id: 'Perayaan', en: 'Celebration' },
		aspect: '4:3', layout: '4x1', count: 4, bg: '#fffbf5', border: '#eab308',
		desc: { id: 'Empat foto meriah dengan confetti', en: 'Four festive celebration photos' },
		decor: [
			{ emoji: '🎉', x: 12, y: 10, scale: 0.8, rotation: -10 },
			{ emoji: '🎊', x: 88, y: 10, scale: 0.8, rotation: 10 },
			{ emoji: '🎈', x: 12, y: 88, scale: 0.8, rotation: 5 },
			{ emoji: '🎁', x: 88, y: 88, scale: 0.7, rotation: -5 },
			{ emoji: '✨', x: 50, y: 50, scale: 0.5 },
		],
	},
	{
		id: 'ethereal', name: { id: 'Etereal', en: 'Ethereal' },
		aspect: '3:4', layout: '4x1', count: 4, bg: '#f0f5ff', border: '#a5b4fc',
		desc: { id: 'Empat foto lembut bagaikan mimpi', en: 'Four soft dreamlike ethereal photos' },
		decor: [
			{ emoji: '🪽', x: 15, y: 12, scale: 0.8, rotation: -15 },
			{ emoji: '🪽', x: 85, y: 12, scale: 0.8, rotation: 15 },
			{ emoji: '💫', x: 15, y: 88, scale: 0.7 },
			{ emoji: '🌙', x: 85, y: 88, scale: 0.7 },
			{ emoji: '🫧', x: 50, y: 50, scale: 0.5 },
		],
	},
	{
		id: 'milano', name: { id: 'Milano', en: 'Milano' },
		aspect: '4:3', layout: '2x2', count: 4, bg: '#faf5ff', border: '#7c3aed',
		desc: { id: 'Empat foto grid elegan ala fashion Italia', en: 'Four elegant Italian fashion grid photos' },
		decor: [
			{ emoji: '👗', x: 12, y: 12, scale: 0.7 },
			{ emoji: '👠', x: 88, y: 12, scale: 0.7 },
			{ emoji: '👜', x: 12, y: 88, scale: 0.7 },
			{ emoji: '💎', x: 88, y: 88, scale: 0.6 },
			{ emoji: '✦', x: 50, y: 7, scale: 0.5 },
		],
	},
	{
		id: 'vinyl', name: { id: 'Vinyl', en: 'Vinyl' },
		aspect: '1:1', layout: '4x1', count: 4, bg: '#1a1a1a', border: '#f87171',
		desc: { id: 'Empat foto bergaya piringan hitam klasik', en: 'Four classic vinyl record style photos' },
		decor: [
			{ emoji: '🎵', x: 12, y: 12, scale: 0.7 },
			{ emoji: '🎶', x: 88, y: 12, scale: 0.7 },
			{ emoji: '🎸', x: 12, y: 88, scale: 0.7 },
			{ emoji: '🎧', x: 88, y: 88, scale: 0.7 },
			{ emoji: '💿', x: 50, y: 50, scale: 0.6 },
		],
	},
	{
		id: 'sakura', name: { id: 'Sakura', en: 'Sakura' },
		aspect: '3:4', layout: '4x1', count: 4, bg: '#fff4f4', border: '#f9a8d4',
		desc: { id: 'Empat foto romantis dengan bunga sakura', en: 'Four romantic cherry blossom photos' },
		decor: [
			{ emoji: '🌸', x: 12, y: 10, scale: 0.8 },
			{ emoji: '🌸', x: 88, y: 15, scale: 0.7, rotation: 8 },
			{ emoji: '🌸', x: 10, y: 88, scale: 0.6 },
			{ emoji: '🌸', x: 90, y: 85, scale: 0.8, rotation: -6 },
			{ emoji: '🦋', x: 50, y: 50, scale: 0.6 },
		],
	},
	{
		id: 'nautilus', name: { id: 'Nautilus', en: 'Nautilus' },
		aspect: '3:4', layout: '2x2', count: 4, bg: '#f0fcff', border: '#06b6d4',
		desc: { id: 'Empat foto grid bawah laut yang memukau', en: 'Four stunning underwater grid photos' },
		decor: [
			{ emoji: '🐙', x: 12, y: 12, scale: 0.7 },
			{ emoji: '🐬', x: 88, y: 12, scale: 0.7 },
			{ emoji: '🐳', x: 12, y: 88, scale: 0.8 },
			{ emoji: '🪸', x: 88, y: 88, scale: 0.7 },
			{ emoji: '🌊', x: 50, y: 50, scale: 0.6 },
		],
	},
];

export function getTemplateById(id: string): Template {
	return TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0];
}
