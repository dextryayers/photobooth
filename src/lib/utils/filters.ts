export type FilterId = 'none' | 'bittersweet' | 'candy' | 'fresh' | 'nostalgia' | 'golden' | 'mint' | 'eighties' | 'citrus' | 'noir';

export interface FilterPreset {
	id: FilterId;
	name: string;
	cssFilter: string;
	gradient: string;
}

export const FILTERS: FilterPreset[] = [
	{ id: 'none', name: 'Normal', cssFilter: '', gradient: 'linear-gradient(135deg, #faf8f5, #f0ede8)' },
	{ id: 'bittersweet', name: 'Bittersweet', cssFilter: 'sepia(0.25) saturate(1.4) hue-rotate(-5deg) brightness(1.02)', gradient: 'linear-gradient(135deg, #fce4d6, #f8c8c8)' },
	{ id: 'candy', name: 'Candy', cssFilter: 'saturate(1.6) hue-rotate(320deg) brightness(1.05)', gradient: 'linear-gradient(135deg, #fce4ec, #f8bbd0)' },
	{ id: 'fresh', name: 'Fresh', cssFilter: 'saturate(1.15) hue-rotate(180deg) brightness(1.04) contrast(0.92)', gradient: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)' },
	{ id: 'nostalgia', name: 'Nostalgia', cssFilter: 'sepia(0.45) saturate(0.9) brightness(0.92) contrast(0.88)', gradient: 'linear-gradient(135deg, #efebe9, #d7ccc8)' },
	{ id: 'golden', name: 'Golden', cssFilter: 'sepia(0.35) saturate(1.5) hue-rotate(-15deg) brightness(1.06)', gradient: 'linear-gradient(135deg, #fff8e1, #ffecb3)' },
	{ id: 'mint', name: 'Mint', cssFilter: 'saturate(0.85) hue-rotate(140deg) brightness(1.1) contrast(0.9)', gradient: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' },
	{ id: 'eighties', name: 'Eighties', cssFilter: 'saturate(1.8) hue-rotate(280deg) contrast(1.1) brightness(0.9)', gradient: 'linear-gradient(135deg, #f3e5f5, #e1bee7)' },
	{ id: 'citrus', name: 'Citrus', cssFilter: 'saturate(1.5) hue-rotate(-30deg) brightness(1.08) contrast(1.05)', gradient: 'linear-gradient(135deg, #fff9c4, #fff176)' },
	{ id: 'noir', name: 'Noir', cssFilter: 'grayscale(1) contrast(1.3) brightness(0.85)', gradient: 'linear-gradient(135deg, #424242, #212121)' },
];

export function getFilterById(id: FilterId): FilterPreset {
	return FILTERS.find((f) => f.id === id) ?? FILTERS[0];
}
