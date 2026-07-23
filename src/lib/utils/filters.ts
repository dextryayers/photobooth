export type FilterId = 'none';

export const FILTERS = [
	{ id: 'none' as FilterId, name: 'Normal', cssFilter: '', gradient: 'linear-gradient(135deg, #faf8f5, #f0ede8)' },
];

export function getFilterById(_id: FilterId) {
	return FILTERS[0];
}
