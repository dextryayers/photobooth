import type { FilterId } from './filters';
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
	filter: FilterId;
	desc: { id: string; en: string };
	decor: Decor[];
}

export const TEMPLATES: Template[] = [
	{
		id: 'polaroid-1', name: { id: 'Polaroid Tunggal', en: 'Single Polaroid' },
		aspect: '3:4', layout: '4x1', count: 1, bg: '#f8fafc', border: '#e2e8f0', filter: 'fresh',
		desc: { id: 'Satu foto besar ala polaroid klasik', en: 'Single large classic polaroid' },
		decor: [
			{ emoji: '📸', x: 50, y: 8, scale: 0.8 },
			{ emoji: '✦', x: 10, y: 90, scale: 0.5 },
			{ emoji: '✦', x: 90, y: 90, scale: 0.5 },
		],
	},
	{
		id: 'minimal-1', name: { id: 'Minimal Satu', en: 'Minimal One' },
		aspect: '4:3', layout: '4x1', count: 1, bg: '#f1f5f9', border: '#64748b', filter: 'noir',
		desc: { id: 'Satu foto hitam putih elegan', en: 'Single elegant monochrome' },
		decor: [
			{ emoji: '◇', x: 12, y: 12, scale: 0.6 },
			{ emoji: '◇', x: 88, y: 12, scale: 0.6 },
			{ emoji: '—', x: 50, y: 88, scale: 0.5 },
		],
	},
	{
		id: 'double-film', name: { id: 'Film Ganda', en: 'Double Film' },
		aspect: '3:4', layout: '4x1', count: 2, bg: '#0f172a', border: '#ef4444', filter: 'noir',
		desc: { id: 'Dua foto dramatis ala film noir', en: 'Two dramatic noir shots' },
		decor: [
			{ emoji: '🎞️', x: 8, y: 30, scale: 0.6, rotation: -90 },
			{ emoji: '🎞️', x: 92, y: 70, scale: 0.6, rotation: 90 },
			{ emoji: '✦', x: 50, y: 7, scale: 0.6 },
		],
	},
	{
		id: 'sweet-duo', name: { id: 'Manis Duo', en: 'Sweet Duo' },
		aspect: '4:3', layout: '4x1', count: 2, bg: '#fdf2f8', border: '#f472b6', filter: 'candy',
		desc: { id: 'Dua foto manis dengan hiasan bunga', en: 'Two sweet floral photos' },
		decor: [
			{ emoji: '🌸', x: 15, y: 85, scale: 0.9 },
			{ emoji: '🌸', x: 85, y: 15, scale: 0.9 },
			{ emoji: '🦋', x: 85, y: 85, scale: 0.7, rotation: 8 },
			{ emoji: '💕', x: 50, y: 50, scale: 0.6 },
		],
	},
	{
		id: 'trip-vintage', name: { id: 'Tiga Vintage', en: 'Vintage Trio' },
		aspect: '4:3', layout: '4x1', count: 3, bg: '#fefce8', border: '#d97706', filter: 'nostalgia',
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
		aspect: '4:3', layout: '4x1', count: 3, bg: '#f0fdf4', border: '#10b981', filter: 'mint',
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
		id: 'classic', name: { id: 'Klasik', en: 'Classic' },
		aspect: '4:3', layout: '4x1', count: 4, bg: '#faf8f5', border: '#d4d4d8', filter: 'none',
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
		aspect: '4:3', layout: '2x2', count: 4, bg: '#fdf2f8', border: '#ef4444', filter: 'candy',
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
		aspect: '16:9', layout: '4x1', count: 4, bg: '#0f0f0f', border: '#ef4444', filter: 'noir',
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
		aspect: '3:4', layout: '4x1', count: 4, bg: '#fff5f7', border: '#f43f5e', filter: 'bittersweet',
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
		aspect: '16:9', layout: '2x2', count: 4, bg: '#fffbeb', border: '#d97706', filter: 'golden',
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
		aspect: '1:1', layout: '2x2', count: 4, bg: '#f0f9ff', border: '#0ea5e9', filter: 'fresh',
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
		aspect: '1:1', layout: '4x1', count: 4, bg: '#0c0c1a', border: '#818cf8', filter: 'noir',
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
		id: 'forest', name: { id: 'Hutan', en: 'Forest' },
		aspect: '2:3', layout: '4x1', count: 3, bg: '#f0fdf4', border: '#16a34a', filter: 'mint',
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
		id: 'cherry-duo', name: { id: 'Ceri Duo', en: 'Cherry Duo' },
		aspect: '3:4', layout: '2x2', count: 2, bg: '#fff5f5', border: '#dc2626', filter: 'bittersweet',
		desc: { id: 'Dua foto berdampingan merah ceri', en: 'Two side-by-side cherry red photos' },
		decor: [
			{ emoji: '🍒', x: 20, y: 50, scale: 0.9 },
			{ emoji: '🍒', x: 80, y: 50, scale: 0.9 },
			{ emoji: '❤️', x: 50, y: 10, scale: 0.7 },
			{ emoji: '🌸', x: 50, y: 90, scale: 0.7 },
		],
	},
	{
		id: 'gold-single', name: { id: 'Emas Satu', en: 'Gold Single' },
		aspect: '4:3', layout: '4x1', count: 1, bg: '#fefce8', border: '#d97706', filter: 'golden',
		desc: { id: 'Satu foto elegan dengan aksen emas', en: 'Single elegant gold-accent photo' },
		decor: [
			{ emoji: '✨', x: 15, y: 12, scale: 0.8 },
			{ emoji: '👑', x: 85, y: 12, scale: 0.8 },
			{ emoji: '🌟', x: 50, y: 90, scale: 0.9 },
			{ emoji: '✦', x: 12, y: 88, scale: 0.5 },
			{ emoji: '✦', x: 88, y: 88, scale: 0.5 },
		],
	},
];

export function getTemplateById(id: string): Template {
	return TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0];
}
