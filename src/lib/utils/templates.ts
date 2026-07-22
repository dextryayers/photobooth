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
	bg: string;
	border: string;
	filter: FilterId;
	desc: { id: string; en: string };
	decor: Decor[];
}

export const TEMPLATES: Template[] = [
	{
		id: 'classic', name: { id: 'Klasik', en: 'Classic' },
		aspect: '4:3', layout: '4x1', bg: '#faf8f5', border: '#e8e8e8', filter: 'none',
		desc: { id: 'Strip klasik bersih dan timeless', en: 'Clean timeless classic strip' },
		decor: [
			{ emoji: '⭐', x: 8, y: 7, scale: 0.7, rotation: -10 },
			{ emoji: '⭐', x: 92, y: 7, scale: 0.7, rotation: 10 },
			{ emoji: '✨', x: 50, y: 95, scale: 0.9 },
		],
	},
	{
		id: 'vintage', name: { id: 'Vintage', en: 'Vintage' },
		aspect: '2:3', layout: '4x1', bg: '#f5f0e8', border: '#d97706', filter: 'nostalgia',
		desc: { id: 'Nuansa klasik dengan aksen kamera lawas', en: 'Classic vintage camera accents' },
		decor: [
			{ emoji: '📷', x: 15, y: 12, scale: 0.9, rotation: -5 },
			{ emoji: '🎞️', x: 85, y: 88, scale: 0.8, rotation: 8 },
			{ emoji: '🌻', x: 50, y: 50, scale: 0.6, rotation: 0 },
		],
	},
	{
		id: 'polaroid', name: { id: 'Polaroid', en: 'Polaroid' },
		aspect: '3:4', layout: '2x2', bg: '#ffffff', border: '#e8e8e8', filter: 'fresh',
		desc: { id: 'Grid polaroid dengan hiasan kamar', en: 'Aesthetic polaroid grid' },
		decor: [
			{ emoji: '📸', x: 12, y: 12, scale: 0.8 },
			{ emoji: '🎞️', x: 88, y: 88, scale: 0.8 },
			{ emoji: '🌈', x: 50, y: 5, scale: 0.7 },
		],
	},
	{
		id: 'candy', name: { id: 'Candy Pop', en: 'Candy Pop' },
		aspect: '4:3', layout: '2x2', bg: '#fff0f5', border: '#ef4444', filter: 'candy',
		desc: { id: 'Manis ceria penuh warna dan permen', en: 'Sweet cheerful candy explosion' },
		decor: [
			{ emoji: '🍭', x: 20, y: 20, scale: 1, rotation: -15 },
			{ emoji: '🍬', x: 80, y: 15, scale: 0.9, rotation: 12 },
			{ emoji: '✨', x: 15, y: 85, scale: 0.8 },
			{ emoji: '🎀', x: 80, y: 82, scale: 0.9, rotation: 5 },
			{ emoji: '💖', x: 50, y: 50, scale: 0.7 },
		],
	},
	{
		id: 'cinematic', name: { id: 'Sinematik', en: 'Cinematic' },
		aspect: '16:9', layout: '4x1', bg: '#1a1a1a', border: '#ef4444', filter: 'noir',
		desc: { id: 'Strip lebar sinematik ala film layar lebar', en: 'Wide dramatic cinema strip' },
		decor: [
			{ emoji: '🎬', x: 12, y: 88, scale: 0.9 },
			{ emoji: '🎥', x: 88, y: 12, scale: 0.8 },
			{ emoji: '🎞️', x: 50, y: 50, scale: 0.6 },
		],
	},
	{
		id: 'rose', name: { id: 'Mawar', en: 'Rose' },
		aspect: '3:4', layout: '4x1', bg: '#fff5f7', border: '#f43f5e', filter: 'bittersweet',
		desc: { id: 'Romantis dengan taburan mawar merah', en: 'Romantic rose petal accents' },
		decor: [
			{ emoji: '🌹', x: 20, y: 10, scale: 1, rotation: -8 },
			{ emoji: '🌹', x: 80, y: 90, scale: 1, rotation: 10 },
			{ emoji: '🌹', x: 50, y: 50, scale: 0.8 },
			{ emoji: '💕', x: 15, y: 92, scale: 0.7 },
		],
	},
	{
		id: 'golden', name: { id: 'Golden Hour', en: 'Golden Hour' },
		aspect: '16:9', layout: '2x2', bg: '#fdf8f0', border: '#d97706', filter: 'golden',
		desc: { id: 'Keemasan hangat dengan sinar mentari', en: 'Warm golden sunset vibes' },
		decor: [
			{ emoji: '☀️', x: 50, y: 8, scale: 1.2 },
			{ emoji: '🌅', x: 15, y: 85, scale: 0.9 },
			{ emoji: '✨', x: 85, y: 15, scale: 0.7 },
			{ emoji: '🌾', x: 85, y: 85, scale: 0.8 },
		],
	},
	{
		id: 'ocean', name: { id: 'Lautan', en: 'Ocean' },
		aspect: '1:1', layout: '2x2', bg: '#f0faff', border: '#0ea5e9', filter: 'fresh',
		desc: { id: 'Kedalaman biru laut dengan hiasan ombak', en: 'Deep blue ocean with wave accents' },
		decor: [
			{ emoji: '🌊', x: 50, y: 90, scale: 1.1 },
			{ emoji: '🐚', x: 15, y: 15, scale: 0.8 },
			{ emoji: '🐠', x: 85, y: 85, scale: 0.9 },
			{ emoji: '🫧', x: 20, y: 80, scale: 0.6 },
		],
	},
	{
		id: 'moonlight', name: { id: 'Cahaya Bulan', en: 'Moonlight' },
		aspect: '1:1', layout: '4x1', bg: '#0c0c1a', border: '#818cf8', filter: 'noir',
		desc: { id: 'Malam misterius dengan sinar rembulan', en: 'Mysterious moonlit night' },
		decor: [
			{ emoji: '🌙', x: 85, y: 12, scale: 1 },
			{ emoji: '⭐', x: 20, y: 20, scale: 0.7 },
			{ emoji: '✨', x: 15, y: 85, scale: 0.6 },
			{ emoji: '🌠', x: 80, y: 80, scale: 0.7 },
		],
	},
	{
		id: 'forest', name: { id: 'Hutan', en: 'Forest' },
		aspect: '2:3', layout: '2x2', bg: '#f0faf0', border: '#16a34a', filter: 'mint',
		desc: { id: 'Hijau alami dengan pepohonan rimbun', en: 'Natural green with forest accents' },
		decor: [
			{ emoji: '🌲', x: 15, y: 50, scale: 0.9 },
			{ emoji: '🌲', x: 85, y: 50, scale: 0.9 },
			{ emoji: '🍃', x: 50, y: 15, scale: 0.7 },
			{ emoji: '🌸', x: 50, y: 88, scale: 0.7 },
			{ emoji: '🌿', x: 10, y: 88, scale: 0.6 },
		],
	},
];

export function getTemplateById(id: string): Template {
	return TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0];
}
