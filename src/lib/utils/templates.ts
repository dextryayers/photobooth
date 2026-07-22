import type { FilterId } from './filters';
import type { Layout } from '$lib/states/photobooth.svelte';

export interface Template {
	id: string;
	name: { id: string; en: string };
	aspect: string;
	layout: Layout;
	bg: string;
	border: string;
	filter: FilterId;
	desc: { id: string; en: string };
}

export const TEMPLATES: Template[] = [
	{
		id: 'classic', name: { id: 'Klasik', en: 'Classic' },
		aspect: '4:3', layout: '4x1', bg: '#faf8f5', border: '#e8e8e8', filter: 'none',
		desc: { id: 'Strip foto klasik ala mesin photobooth', en: 'Classic photobooth strip' },
	},
	{
		id: 'vintage', name: { id: 'Vintage', en: 'Vintage' },
		aspect: '4:3', layout: '4x1', bg: '#f5f0e8', border: '#d97706', filter: 'nostalgia',
		desc: { id: 'Nuansa hangat nostalgia masa lalu', en: 'Warm nostalgic vibe' },
	},
	{
		id: 'polaroid', name: { id: 'Polaroid', en: 'Polaroid' },
		aspect: '3:4', layout: '2x2', bg: '#ffffff', border: '#e8e8e8', filter: 'fresh',
		desc: { id: 'Grid polaroid 2x2 aesthetic', en: 'Aesthetic 2x2 polaroid grid' },
	},
	{
		id: 'cinematic', name: { id: 'Sinematik', en: 'Cinematic' },
		aspect: '16:9', layout: '4x1', bg: '#1a1a1a', border: '#444', filter: 'noir',
		desc: { id: 'Strip lebar sinematik dramatis', en: 'Dramatic wide cinematic strip' },
	},
	{
		id: 'candy', name: { id: 'Candy Pop', en: 'Candy Pop' },
		aspect: '4:3', layout: '2x2', bg: '#fff0f5', border: '#ef4444', filter: 'candy',
		desc: { id: 'Warna-warni manis dan ceria', en: 'Sweet and cheerful colors' },
	},
	{
		id: 'minty', name: { id: 'Mint Segar', en: 'Fresh Mint' },
		aspect: '4:3', layout: '4x1', bg: '#f0faf5', border: '#10b981', filter: 'mint',
		desc: { id: 'Segar dan natural dengan sentuhan mint', en: 'Fresh natural mint touch' },
	},
	{
		id: 'golden', name: { id: 'Golden Hour', en: 'Golden Hour' },
		aspect: '4:3', layout: '4x1', bg: '#fdf8f0', border: '#d97706', filter: 'golden',
		desc: { id: 'Keemasan hangat seperti senja', en: 'Warm golden sunset tones' },
	},
	{
		id: 'eighties', name: { id: '80-an', en: 'Eighties' },
		aspect: '4:3', layout: '4x1', bg: '#1a1a2e', border: '#e879f9', filter: 'eighties',
		desc: { id: 'Retro neon ala tahun 80-an', en: 'Retro neon 80s style' },
	},
	{
		id: 'bittersweet', name: { id: 'Bittersweet', en: 'Bittersweet' },
		aspect: '4:3', layout: '2x2', bg: '#fdf2f2', border: '#f43f5e', filter: 'bittersweet',
		desc: { id: 'Nuansa pahit manis yang estetik', en: 'Aesthetic bittersweet tones' },
	},
	{
		id: 'noir', name: { id: 'Noir', en: 'Noir' },
		aspect: '4:3', layout: '4x1', bg: '#0a0a0a', border: '#555', filter: 'noir',
		desc: { id: 'Hitam putih dramatis ala film noir', en: 'Dramatic black & white noir' },
	},
	{
		id: 'citrus', name: { id: 'Citrus', en: 'Citrus' },
		aspect: '4:3', layout: '2x2', bg: '#fffdf0', border: '#f97316', filter: 'citrus',
		desc: { id: 'Segar dan cerah seperti jeruk', en: 'Bright and fresh citrus' },
	},
	{
		id: 'film-blue', name: { id: 'Biru Film', en: 'Film Blue' },
		aspect: '4:3', layout: '4x1', bg: '#f0f5ff', border: '#3b82f6', filter: 'fresh',
		desc: { id: 'Aksen biru ala film klasik', en: 'Classic film blue accent' },
	},
	{
		id: 'charcoal', name: { id: 'Arang', en: 'Charcoal' },
		aspect: '4:3', layout: '4x1', bg: '#2a2a2e', border: '#ef4444', filter: 'none',
		desc: { id: 'Elegan gelap dengan aksen merah', en: 'Dark elegant with red accent' },
	},
	{
		id: 'square-mini', name: { id: 'Kotak Mini', en: 'Square Mini' },
		aspect: '1:1', layout: '2x2', bg: '#ffffff', border: '#e8e8e8', filter: 'none',
		desc: { id: 'Grid kotak sempurna untuk Instagram', en: 'Perfect square grid for Instagram' },
	},
	{
		id: 'wide-scape', name: { id: 'Panorama', en: 'Widescape' },
		aspect: '16:9', layout: '4x1', bg: '#faf8f5', border: '#333', filter: 'golden',
		desc: { id: 'Strip lebar panorama epik', en: 'Epic wide panorama strip' },
	},
	{
		id: 'pastel', name: { id: 'Pastel', en: 'Pastel' },
		aspect: '4:3', layout: '2x2', bg: '#fdf6f0', border: '#fbcfe8', filter: 'candy',
		desc: { id: 'Lembut dan manis ala pastel', en: 'Soft sweet pastel tones' },
	},
	{
		id: 'mono', name: { id: 'Monokrom', en: 'Monochrome' },
		aspect: '4:3', layout: '4x1', bg: '#f5f5f5', border: '#999', filter: 'noir',
		desc: { id: 'Elegansi hitam putih minimalis', en: 'Minimal black & white elegance' },
	},
	{
		id: 'retro-wave', name: { id: 'Retro Wave', en: 'Retro Wave' },
		aspect: '4:3', layout: '2x2', bg: '#0f0f23', border: '#f472b6', filter: 'eighties',
		desc: { id: 'Synthwave neon gelap keunguan', en: 'Dark purple neon synthwave' },
	},
	{
		id: 'cream-paper', name: { id: 'Kertas Krem', en: 'Cream Paper' },
		aspect: '4:3', layout: '4x1', bg: '#f5f0e8', border: '#d4c5a9', filter: 'nostalgia',
		desc: { id: 'Seperti kertas foto lawas', en: 'Like vintage photo paper' },
	},
	{
		id: 'cherry', name: { id: 'Cherry Red', en: 'Cherry Red' },
		aspect: '4:3', layout: '4x1', bg: '#fff5f5', border: '#dc2626', filter: 'bittersweet',
		desc: { id: 'Merah ceri berani dan vibrant', en: 'Bold vibrant cherry red' },
	},
	{
		id: 'forest', name: { id: 'Hutan', en: 'Forest' },
		aspect: '4:3', layout: '2x2', bg: '#f0faf0', border: '#16a34a', filter: 'mint',
		desc: { id: 'Hijau alami segar seperti hutan', en: 'Fresh natural forest green' },
	},
	{
		id: 'midnight', name: { id: 'Tengah Malam', en: 'Midnight' },
		aspect: '4:3', layout: '4x1', bg: '#0c0c1a', border: '#6366f1', filter: 'noir',
		desc: { id: 'Gelap misterius dengan aksen ungu', en: 'Mysterious dark with purple' },
	},
	{
		id: 'sunrise', name: { id: 'Fajar', en: 'Sunrise' },
		aspect: '4:3', layout: '4x1', bg: '#fff8f0', border: '#f97316', filter: 'golden',
		desc: { id: 'Hangat seperti matahari terbit', en: 'Warm like the rising sun' },
	},
	{
		id: 'ocean', name: { id: 'Lautan', en: 'Ocean' },
		aspect: '16:9', layout: '2x2', bg: '#f0faff', border: '#0ea5e9', filter: 'fresh',
		desc: { id: 'Biru segar ala kedalaman laut', en: 'Fresh blue ocean depths' },
	},
	{
		id: 'rose', name: { id: 'Mawar', en: 'Rose' },
		aspect: '3:4', layout: '4x1', bg: '#fff5f7', border: '#f43f5e', filter: 'bittersweet',
		desc: { id: 'Romantis merah muda elegan', en: 'Elegant romantic rose pink' },
	},
	{
		id: 'pixel', name: { id: 'Piksel', en: 'Pixel' },
		aspect: '1:1', layout: '2x2', bg: '#f0f0f0', border: '#222', filter: 'candy',
		desc: { id: 'Kotak-kotak ceria ala pixel art', en: 'Cheerful pixel art style' },
	},
	{
		id: 'leather', name: { id: 'Kulit', en: 'Leather' },
		aspect: '4:3', layout: '4x1', bg: '#faf5ef', border: '#8b5e3c', filter: 'nostalgia',
		desc: { id: 'Sentuhan klasik ala album kulit', en: 'Classic leather album feel' },
	},
	{
		id: 'frost', name: { id: 'Embun Beku', en: 'Frost' },
		aspect: '4:3', layout: '2x2', bg: '#f0faff', border: '#bae6fd', filter: 'fresh',
		desc: { id: 'Dingin dan bersih seperti embun beku', en: 'Clean cold frosty feel' },
	},
	{
		id: 'ember', name: { id: 'Bara Api', en: 'Ember' },
		aspect: '4:3', layout: '4x1', bg: '#1a0a0a', border: '#ef4444', filter: 'golden',
		desc: { id: 'Gelap membara dengan aksen api', en: 'Dark burning fire accent' },
	},
	{
		id: 'cloud', name: { id: 'Awan', en: 'Cloud' },
		aspect: '4:3', layout: '2x2', bg: '#f8fafc', border: '#94a3b8', filter: 'none',
		desc: { id: 'Ringan dan lapang seperti awan', en: 'Light and airy like clouds' },
	},
];

export function getTemplateById(id: string): Template {
	return TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0];
}
