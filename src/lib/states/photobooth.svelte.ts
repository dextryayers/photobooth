import type { FilterId } from '$lib/utils/filters';
import { getTemplateById } from '$lib/utils/templates';
import type { PlacedSticker } from '$lib/utils/stickers';
import { goto } from '$app/navigation';

export type Layout = '4x1' | '2x2';
export type Orient = 'landscape' | 'portrait';

export const STRIP_COLORS = [
	{ name: 'Paper', value: '#faf8f5' },
	{ name: 'Cream', value: '#f5f0e8' },
	{ name: 'Kodak', value: '#ef4444' },
	{ name: 'Film Blue', value: '#2d6a9f' },
	{ name: 'Charcoal', value: '#2a2a2e' },
];

export const BORDER_COLORS = [
	{ name: 'Light', value: '#e8e8e8' },
	{ name: 'Dark', value: '#444' },
	{ name: 'Red', value: '#dc2626' },
	{ name: 'Gold', value: '#d97706' },
	{ name: 'None', value: 'transparent' },
];

export type TemplateId = string;

function createPb() {
	let photos = $state<string[]>([]);
	let idx = $state(0);
	let filter = $state<FilterId>('none');
	let err = $state<string | null>(null);
	let stripUrl = $state<string | null>(null);
	let facing = $state<'user' | 'environment'>('user');
	let stripBg = $state<string>('#faf8f5');
	let stripBorder = $state<string>('#e8e8e8');
	let layout = $state<Layout>('4x1');
	let templateId = $state<string>('classic');
	let orient = $state<Orient>('landscape');
	let photoCount = $state(4);
	let stickers = $state<PlacedSticker[]>([]);
	let nextStickerId = $state(0);

	function applyTemplate(id: string) {
		const t = getTemplateById(id);
		filter = t.filter;
		layout = t.layout;
		stripBg = t.bg;
		stripBorder = t.border;
		orient = t.aspect === '3:4' || t.aspect === '2:3' ? 'portrait' : 'landscape';
		templateId = id;
		photoCount = t.count;
		stickers = t.decor.map((d, i) => ({
			stickerId: `decor_${i}`,
			emoji: d.emoji,
			x: d.x,
			y: d.y,
			scale: d.scale ?? 1,
			rotation: d.rotation ?? 0,
		}));
	}

	return {
		get photos() { return photos; },
		get idx() { return idx; },
		get filter() { return filter; },
		set filter(v: FilterId) { filter = v; },
		get err() { return err; },
		get stripUrl() { return stripUrl; },
		get facing() { return facing; },
		get stripBg() { return stripBg; },
		set stripBg(v: string) { stripBg = v; },
		get stripBorder() { return stripBorder; },
		set stripBorder(v: string) { stripBorder = v; },
		get layout() { return layout; },
		set layout(v: Layout) { layout = v; },
		get templateId() { return templateId; },
		set templateId(v: string) { templateId = v; },
		get orient() { return orient; },
		set orient(v: Orient) { orient = v; },
		get photoCount() { return photoCount; },
		get stickers() { return stickers; },
		addSticker(emoji: string) {
			stickers = [...stickers, {
				stickerId: `s_${nextStickerId++}`,
				emoji,
				x: 50 + Math.random() * 40,
				y: 30 + Math.random() * 40,
				scale: 1,
				rotation: Math.random() * 20 - 10,
			}];
		},
		removeSticker(id: string) {
			stickers = stickers.filter(s => s.stickerId !== id);
		},
		updateSticker(id: string, patch: Partial<PlacedSticker>) {
			stickers = stickers.map(s => s.stickerId === id ? { ...s, ...patch } : s);
		},
		clearStickers() { stickers = []; },
		applyTemplate,

		start() {
			photos = [];
			idx = 0;
			filter = 'none';
			err = null;
			stripUrl = null;
			stripBg = '#faf8f5';
			stripBorder = '#e8e8e8';
			layout = '4x1';
			templateId = 'classic';
			orient = 'landscape';
			photoCount = 4;
			stickers = [];
			goto('/template');
		},

		addPhoto(url: string) {
			photos = [...photos, url];
			idx = photos.length;
			if (photos.length >= photoCount) {
				goto('/preview');
			}
		},

		addPhotos(urls: string[]) {
			photos = [...photos, ...urls];
			idx = photos.length;
			if (photos.length >= photoCount) {
				goto('/preview');
			}
		},

		setErr(msg: string | null) { err = msg; },

		generateStrip(url: string) {
			stripUrl = url;
			goto('/result');
		},

		reset() {
			photos = [];
			idx = 0;
			filter = 'none';
			err = null;
			stripUrl = null;
			stripBg = '#faf8f5';
			stripBorder = '#e8e8e8';
			layout = '4x1';
			templateId = 'classic';
			orient = 'landscape';
			photoCount = 4;
			stickers = [];
			goto('/');
		},

		toggleFacing() { facing = facing === 'user' ? 'environment' : 'user'; },
		toggleOrient() { orient = orient === 'landscape' ? 'portrait' : 'landscape'; },
	};
}

export const pb = createPb();
