export type Sticker = {
	id: string
	emoji: string
	name: string
}

export type PlacedSticker = {
	stickerId: string
	emoji: string
	x: number
	y: number
	scale: number
	rotation: number
}

export const STICKERS: Sticker[] = [
	{ id: 'heart', emoji: '❤️', name: 'Heart' },
	{ id: 'sparkles', emoji: '✨', name: 'Sparkles' },
	{ id: 'star', emoji: '⭐', name: 'Star' },
	{ id: 'fire', emoji: '🔥', name: 'Fire' },
	{ id: 'rainbow', emoji: '🌈', name: 'Rainbow' },
	{ id: 'unicorn', emoji: '🦄', name: 'Unicorn' },
	{ id: 'butterfly', emoji: '🦋', name: 'Butterfly' },
	{ id: 'rose', emoji: '🌹', name: 'Rose' },
	{ id: 'cherry', emoji: '🌸', name: 'Cherry Blossom' },
	{ id: 'sunflower', emoji: '🌻', name: 'Sunflower' },
	{ id: 'crown', emoji: '👑', name: 'Crown' },
	{ id: 'ribbon', emoji: '🎀', name: 'Ribbon' },
	{ id: 'balloon', emoji: '🎈', name: 'Balloon' },
	{ id: 'confetti', emoji: '🎉', name: 'Confetti' },
	{ id: 'gift', emoji: '🎁', name: 'Gift' },
	{ id: 'camera', emoji: '📸', name: 'Camera' },
	{ id: 'film', emoji: '🎞️', name: 'Film' },
	{ id: 'clapper', emoji: '🎬', name: 'Clapper' },
	{ id: 'music', emoji: '🎵', name: 'Music' },
	{ id: 'cat', emoji: '🐱', name: 'Cat' },
	{ id: 'dog', emoji: '🐶', name: 'Dog' },
	{ id: 'panda', emoji: '🐼', name: 'Panda' },
	{ id: 'koala', emoji: '🐨', name: 'Koala' },
	{ id: 'moon', emoji: '🌙', name: 'Moon' },
	{ id: 'sun', emoji: '☀️', name: 'Sun' },
	{ id: 'cloud', emoji: '☁️', name: 'Cloud' },
	{ id: 'lightning', emoji: '⚡', name: 'Lightning' },
	{ id: 'droplet', emoji: '💧', name: 'Droplet' },
	{ id: 'skull', emoji: '💀', name: 'Skull' },
	{ id: 'alien', emoji: '👽', name: 'Alien' },
]
