<script lang="ts">
	import './layout.css';
	import { pb } from '$lib/states/photobooth.svelte';
	import { lang } from '$lib/states/lang.svelte';
	import ErrorOverlay from '$lib/components/ErrorOverlay.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	let { children } = $props();

	let theme = $state<'dark' | 'light'>('dark');
	let navIn = $state(false);
	let menuOpen = $state(false);

	onMount(() => {
		const saved = localStorage.getItem('pb-theme');
		if (saved === 'light' || saved === 'dark') {
			theme = saved;
			document.documentElement.setAttribute('data-theme', saved);
		}
		setTimeout(() => navIn = true, 80);
	});

	function closeMenu() { menuOpen = false; }

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('pb-theme', theme);
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
</svelte:head>

<div class="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2.5 bg-[#ef4444]/10 px-4 py-2.5 backdrop-blur-md border-b border-[#ef4444]/10">
	<span class="text-secondary text-[11px] font-medium tracking-wide">{lang.t('banner.follow')}</span>
	<a href="https://instagram.com/hanziip.kds" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 rounded-full bg-[#ef4444]/15 px-3 py-1 text-[11px] font-semibold text-[#ef4444]/80 transition-all duration-300 hover:bg-[#ef4444]/25 hover:text-[#ef4444]">
		<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
		@hanziip.kds
	</a>
</div>

<!-- Floating Navbar -->
<nav
	class="fixed left-1/2 z-[100] flex items-center justify-between rounded-2xl glass-strong px-4 sm:px-5 h-12 sm:h-13 shadow-lg shadow-black/10 transition-all duration-700"
	style="
		top: 50px;
		transform: translate(-50%, {navIn ? '0' : '-20px'});
		opacity: {navIn ? 1 : 0};
		width: min(calc(100% - 32px), 720px);
	"
>
	<a href="/" class="group flex items-center gap-2 text-primary no-underline" onclick={(e) => { e.preventDefault(); pb.reset(); }}>
		<span class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ef4444]/10 group-hover:bg-[#ef4444]/20 transition-all duration-300">
			<svg class="h-3.5 w-3.5 text-[#ef4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.16a15.53 15.53 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
				<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
			</svg>
		</span>
		<span class="font-['Syne'] text-sm font-bold tracking-wider">PHOTO<span class="text-[#ef4444]">BOOTH</span></span>
	</a>

	<!-- Mobile: hamburger toggle -->
	<button
		onclick={() => menuOpen = !menuOpen}
		class="flex sm:hidden h-8 w-8 items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-white/5 transition-all duration-300"
		aria-label="Menu"
	>
		<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
			{#if menuOpen}
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			{:else}
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			{/if}
		</svg>
	</button>

	<!-- Desktop: inline links -->
	<div class="hidden sm:flex items-center gap-1">
		<a
			href="/"
			class="flex h-8 items-center justify-center rounded-lg px-2.5 transition-all duration-300 {$page.url.pathname === '/' ? 'text-[#ef4444] bg-[#ef4444]/10' : 'text-secondary hover:text-primary hover:bg-white/5'}"
		>
			<span class="font-['Inter'] text-[11px] font-medium">{lang.t('nav.home')}</span>
		</a>
		<a
			href="/about"
			class="flex h-8 items-center justify-center rounded-lg px-2.5 transition-all duration-300 {$page.url.pathname === '/about' ? 'text-[#ef4444] bg-[#ef4444]/10' : 'text-secondary hover:text-primary hover:bg-white/5'}"
		>
			<span class="font-['Inter'] text-[11px] font-medium">{lang.t('nav.about')}</span>
		</a>
		<a
			href="/privacy"
			class="flex h-8 items-center justify-center rounded-lg px-2.5 transition-all duration-300 {$page.url.pathname === '/privacy' ? 'text-[#ef4444] bg-[#ef4444]/10' : 'text-secondary hover:text-primary hover:bg-white/5'}"
		>
			<span class="font-['Inter'] text-[11px] font-medium">{lang.t('nav.privacy')}</span>
		</a>
		<a
			href="https://github.com/dextryayers"
			target="_blank"
			rel="noopener noreferrer"
			class="flex h-8 w-8 items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-white/5 transition-all duration-300"
			aria-label="GitHub"
		>
			<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
		</a>
		<button
			onclick={() => lang.toggle()}
			class="flex h-8 items-center justify-center rounded-lg px-2 text-[10px] font-bold tracking-widest uppercase text-secondary hover:text-primary hover:bg-white/5 transition-all duration-300"
			aria-label="Toggle language"
		>
			{lang.lang === 'id' ? 'EN' : 'ID'}
		</button>
		<button
			onclick={toggleTheme}
			class="flex h-8 w-8 items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-white/5 transition-all duration-300 active:scale-90"
			aria-label={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
		>
			{#if theme === 'dark'}
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
				</svg>
			{:else}
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
				</svg>
			{/if}
		</button>
	</div>

	<!-- Mobile: GitHub + Theme + Lang -->
	<div class="flex sm:hidden items-center gap-0.5">
		<a
			href="https://github.com/dextryayers"
			target="_blank"
			rel="noopener noreferrer"
			class="flex h-8 w-8 items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-white/5 transition-all duration-300"
			aria-label="GitHub"
		>
			<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
		</a>
		<button
			onclick={() => lang.toggle()}
			class="flex h-8 items-center justify-center rounded-lg px-2 text-[10px] font-bold tracking-widest uppercase text-secondary hover:text-primary hover:bg-white/5 transition-all duration-300"
			aria-label="Toggle language"
		>
			{lang.lang === 'id' ? 'EN' : 'ID'}
		</button>
		<button
			onclick={toggleTheme}
			class="flex h-8 w-8 items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-white/5 transition-all duration-300 active:scale-90"
			aria-label={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
		>
			{#if theme === 'dark'}
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
				</svg>
			{:else}
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
				</svg>
			{/if}
		</button>
	</div>
</nav>

<!-- Mobile dropdown menu -->
{#if menuOpen}
	<div class="fixed left-1/2 z-[99] flex flex-col gap-1 rounded-2xl glass-strong px-3 py-3 transition-all duration-300 sm:hidden"
		style="
			top: 96px;
			width: min(calc(100% - 32px), 720px);
			transform: translate(-50%, 0);
			animation: fade-in 0.2s ease-out;
		"
	>
		<a
			href="/"
			onclick={closeMenu}
			class="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 {$page.url.pathname === '/' ? 'text-[#ef4444] bg-[#ef4444]/10' : 'text-secondary hover:text-primary hover:bg-white/5'}"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>
			{lang.t('nav.home')}
		</a>
		<a
			href="/about"
			onclick={closeMenu}
			class="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 {$page.url.pathname === '/about' ? 'text-[#ef4444] bg-[#ef4444]/10' : 'text-secondary hover:text-primary hover:bg-white/5'}"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/></svg>
			{lang.t('nav.about')}
		</a>
		<a
			href="/privacy"
			onclick={closeMenu}
			class="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 {$page.url.pathname === '/privacy' ? 'text-[#ef4444] bg-[#ef4444]/10' : 'text-secondary hover:text-primary hover:bg-white/5'}"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
			{lang.t('nav.privacy')}
		</a>
	</div>
{/if}

<ErrorOverlay />
<div class="pt-[42px]" style="padding-top: 88px">
	{@render children()}
</div>
