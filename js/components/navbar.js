import { store } from '../store.js';

function getPath() {
  return window.location.hash.replace(/^#/, '') || '/';
}

export const NavBar = {
  data() {
    return { scrolled: false, mobileOpen: false, current: getPath() };
  },
  computed: {
    profile()   { return store.profile || {}; },
    navItems()  { return store.profile?.navItems || []; }
  },
  methods: {
    onScroll() { this.scrolled = window.scrollY > 16; },
    go(to) { window.location.hash = to; this.mobileOpen = false; },
    isActive(to) { return this.current === to; },
    onHash() { this.current = getPath(); }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('hashchange', this.onHash);
  },
  unmounted() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('hashchange', this.onHash);
  },
  template: `
    <header class="fixed top-0 inset-x-0 z-50 transition-all duration-300" :class="scrolled ? 'py-2' : 'py-3 sm:py-4'">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center justify-between rounded-full px-3 sm:px-5 py-2.5 transition-all duration-300"
             :class="scrolled
                ? 'bg-white/80 backdrop-blur-md border border-border shadow-[0_8px_30px_-12px_rgba(45,42,38,0.15)]'
                : 'bg-white/40 backdrop-blur-sm border border-transparent'">
          <button @click="go('/')" class="flex items-center gap-2 sm:gap-3 group shrink-0">
            <img :src="profile.avatar" :alt="profile.name"
                 class="w-8 sm:w-9 h-8 sm:h-9 rounded-full object-cover border border-border transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-6"/>
            <span class="hidden sm:flex flex-col leading-tight text-left">
              <span class="font-display text-sm font-semibold tracking-tight text-ink">{{ profile.name }}</span>
              <span class="text-[10px] font-mono text-muted">personal · portfolio</span>
            </span>
          </button>

          <ul class="hidden lg:flex items-center gap-3 xl:gap-4">
            <li v-for="item in navItems" :key="item.to">
              <a :href="'#' + item.to" @click.prevent="go(item.to)" class="nav-link text-[13px]" :class="{ active: isActive(item.to) }">{{ item.name }}</a>
            </li>
          </ul>

          <div class="hidden lg:block">
            <button @click="go('/contact')" class="btn-primary text-xs px-4 py-2 inline-flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
              </svg>
              Get in touch
            </button>
          </div>

          <button @click="mobileOpen = !mobileOpen"
                  class="lg:hidden w-10 h-10 grid place-items-center rounded-full border border-border bg-white/70 shrink-0"
                  aria-label="Toggle menu">
            <svg v-if="!mobileOpen" class="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18"/>
            </svg>
          </button>
        </nav>

        <transition name="page">
          <div v-if="mobileOpen" class="lg:hidden mt-2 rounded-3xl bg-white/90 backdrop-blur-md border border-border p-3 shadow-[0_18px_50px_-20px_rgba(45,42,38,0.25)] max-h-[70vh] overflow-y-auto">
            <ul class="flex flex-col gap-1">
              <li v-for="item in navItems" :key="item.to">
                <a :href="'#' + item.to" @click.prevent="go(item.to)" class="block px-4 py-2.5 rounded-full font-medium text-sm"
                   :class="isActive(item.to) ? 'bg-terracottaSft text-terracottaDk' : 'text-inkSoft hover:bg-terracottaSft hover:text-terracottaDk'">
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </header>
  `
};