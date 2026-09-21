import { store } from '../store.js';

export const SiteFooter = {
  computed: { profile() { return store.profile || {}; } },
  template: `
    <footer class="relative z-10 mt-16 sm:mt-20 lg:mt-24 px-5 sm:px-8 lg:px-12 py-10 sm:py-12 lg:py-16">
      <div class="max-w-3xl mx-auto text-center">
        <div class="fade-up d1 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-border mb-6 sm:mb-7">
          <span class="w-1.5 h-1.5 rounded-full bg-terracotta"></span>
          <span class="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-muted">Signed with care</span>
        </div>
        <p class="fade-up d2 text-xs sm:text-sm text-muted mb-1 font-light">With all my love,</p>
        <p class="fade-up d3 font-script text-4xl sm:text-5xl lg:text-6xl text-terracotta -rotate-2 leading-none">ibrahim al-athamneh</p>
        <div class="fade-up d4 flex items-center justify-center gap-3 mt-6 sm:mt-7">
          <a :href="profile.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
             class="w-9 sm:w-10 h-9 sm:h-10 grid place-items-center rounded-full border border-border bg-white/60 backdrop-blur-sm text-inkSoft hover:bg-terracotta hover:text-white hover:border-terracotta transition-all duration-300 hover:-translate-y-1">
            <svg class="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.515-.42-.09-1.02-.465-.015-.465.945 0 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
             class="w-9 sm:w-10 h-9 sm:h-10 grid place-items-center rounded-full border border-border bg-white/60 backdrop-blur-sm text-inkSoft hover:bg-terracotta hover:text-white hover:border-terracotta transition-all duration-300 hover:-translate-y-1">
            <svg class="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a :href="'mailto:' + profile.email" aria-label="Email"
             class="w-9 sm:w-10 h-9 sm:h-10 grid place-items-center rounded-full border border-border bg-white/60 backdrop-blur-sm text-inkSoft hover:bg-terracotta hover:text-white hover:border-terracotta transition-all duration-300 hover:-translate-y-1">
            <svg class="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>
          </a>
        </div>
        <div class="fade-up d5 mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-xs text-muted">
          <span>© {{ new Date().getFullYear() }} {{ profile.name }}. All rights reserved.</span>
          <span class="font-mono tracking-wide">Crafted with patience &amp; care</span>
        </div>
      </div>
    </footer>
  `
};