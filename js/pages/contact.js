import { store } from '../store.js';

export const ContactPage = {
  computed: { profile() { return store.profile || {}; } },
  data: () => ({ copied: false, toast: '' }),
  methods: {
    async copyEmail() {
      try {
        await navigator.clipboard.writeText(this.profile.email);
        this.copied = true;
        this.toast = 'Email copied to clipboard';
        setTimeout(() => { this.copied = false; this.toast = ''; }, 2200);
      } catch {
        this.toast = 'Could not copy — please copy manually';
        setTimeout(() => this.toast = '', 2500);
      }
    }
  },
  template: `
    <section class="px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 sm:pb-10">
      <div class="max-w-3xl mx-auto text-center">
        <div class="mb-8 sm:mb-10 fade-up d1">
          <div class="eyebrow mb-3"><span class="eyebrow-line"></span>08 — Contact<span class="eyebrow-line"></span></div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ink">Say hello</h2>
          <p class="mt-3 text-sm sm:text-base text-inkSoft leading-relaxed max-w-2xl mx-auto">Whether you're hiring, mentoring, or just curious — my inbox is genuinely open.</p>
        </div>

        <div class="soft-card p-6 sm:p-8 lg:p-10 fade-up d2">
          <img :src="profile.avatar" :alt="profile.name" class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-border mx-auto"/>
          <h3 class="mt-4 sm:mt-5 font-display text-lg sm:text-xl font-semibold text-ink">{{ profile.name }}</h3>
          <p class="text-xs sm:text-sm text-muted mt-1">{{ profile.title }} · {{ profile.location }}</p>
          <p class="text-xs sm:text-sm text-inkSoft mt-4 sm:mt-5 leading-relaxed max-w-md mx-auto">{{ profile.shortBio }}</p>

          <div class="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a :href="'mailto:' + profile.email" class="btn-primary px-5 sm:px-6 py-2.5 sm:py-3 inline-flex items-center gap-2 text-xs sm:text-sm w-full sm:w-auto justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>
              Email me
            </a>
            <button @click="copyEmail" class="btn-ghost px-5 py-2.5 sm:py-3 inline-flex items-center gap-2 text-xs sm:text-sm w-full sm:w-auto justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
              {{ copied ? 'Copied!' : 'Copy email' }}
            </button>
          </div>

          <div class="mt-5 sm:mt-6 text-[10px] sm:text-xs font-mono text-muted break-all px-2">{{ profile.email }}</div>

          <div class="mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-border flex items-center justify-center gap-3">
            <a :href="profile.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="w-9 sm:w-10 h-9 sm:h-10 grid place-items-center rounded-full border border-border bg-white/60 text-inkSoft hover:bg-terracotta hover:text-white hover:border-terracotta transition-all duration-300 hover:-translate-y-1">
              <svg class="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.515-.42-.09-1.02-.465-.015-.465.945 0 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="w-9 sm:w-10 h-9 sm:h-10 grid place-items-center rounded-full border border-border bg-white/60 text-inkSoft hover:bg-terracotta hover:text-white hover:border-terracotta transition-all duration-300 hover:-translate-y-1">
              <svg class="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>

        <p class="mt-6 sm:mt-8 text-xs sm:text-sm text-muted fade-up d3">Typically replies within 24 hours. Looking forward to it.</p>
      </div>

      <transition name="toast">
        <div v-if="toast" class="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full bg-ink text-cream text-xs font-medium shadow-lg z-50 max-w-[90vw] text-center">{{ toast }}</div>
      </transition>
    </section>
  `
};