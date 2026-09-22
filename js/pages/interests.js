import { store } from '../store.js';

const iconSvg = {
  chess: '<path d="M12 2 4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/>',
  ai: '<path d="M12 2a3 3 0 0 1 3 3 3 3 0 0 1-1 2.24V9h4a3 3 0 0 1 3 3 3 3 0 0 1-2 2.83V22M12 2a3 3 0 0 0-3 3 3 3 0 0 0 1 2.24V9H6a3 3 0 0 0-3 3 3 3 0 0 0 2 2.83V22"/>',
  systems: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"/>',
  opensource: '<circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/>',
  music: '<path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/>',
  robot: '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 8V4M8 4h8M9 14h.01M15 14h.01"/>',
  game: '<rect x="2" y="6" width="20" height="12" rx="3"/><path d="M7 12h4M9 10v4M15 12h.01M18 14h.01"/>'
};

export const InterestsPage = {
  computed: {
    data() { return store.interests || { interests: [], hobbies: [] }; },
    interests() { return this.data.interests || []; },
    hobbies() { return this.data.hobbies || []; }
  },
  methods: {
    getIcon(name) { return iconSvg[name] || iconSvg.systems; }
  },
  template: `
    <section class="px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 sm:pb-10">
      <div class="max-w-5xl mx-auto">

        <div class="mb-8 sm:mb-10 fade-up d1">
          <div class="eyebrow mb-3"><span class="eyebrow-line"></span>06 — Interests<span class="eyebrow-line"></span></div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ink">Beyond the code</h2>
          <p class="mt-3 text-sm sm:text-base text-inkSoft leading-relaxed max-w-2xl">What shapes my thinking, fuels my curiosity, and keeps me balanced.</p>
        </div>

        <!-- Interests -->
        <div class="mb-12 sm:mb-16">
          <div class="flex items-center gap-3 mb-5 sm:mb-6">
            <h3 class="font-display text-lg sm:text-xl font-medium text-ink">Interests</h3>
            <span class="flex-1 h-px bg-border"></span>
            <span class="text-[10px] font-mono text-muted">{{ interests.length }}</span>
          </div>
          <div class="grid sm:grid-cols-2 gap-4 sm:gap-5">
            <div v-for="(item, i) in interests" :key="i" class="soft-card p-5 sm:p-6 fade-up" :class="'d' + Math.min(i+1, 6)">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-terracottaSft grid place-items-center shrink-0">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-terracottaDk" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" v-html="getIcon(item.icon)"></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-baseline justify-between gap-2">
                    <h4 class="font-display font-semibold text-ink text-sm sm:text-base">{{ item.title }}</h4>
                    <span v-if="item.category" class="tag tag-amber shrink-0">{{ item.category }}</span>
                  </div>
                  <p class="mt-2 text-xs sm:text-sm text-inkSoft leading-relaxed">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hobbies -->
        <div>
          <div class="flex items-center gap-3 mb-5 sm:mb-6">
            <h3 class="font-display text-lg sm:text-xl font-medium text-ink">Hobbies</h3>
            <span class="flex-1 h-px bg-border"></span>
            <span class="text-[10px] font-mono text-muted">{{ hobbies.length }}</span>
          </div>
          <div class="grid sm:grid-cols-2 gap-4 sm:gap-5">
            <div v-for="(item, i) in hobbies" :key="i" class="soft-card p-5 sm:p-6 fade-up" :class="'d' + Math.min(i+1, 6)">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sageSft grid place-items-center shrink-0">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" v-html="getIcon(item.icon)"></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-baseline justify-between gap-2">
                    <h4 class="font-display font-semibold text-ink text-sm sm:text-base">{{ item.title }}</h4>
                    <span v-if="item.category" class="tag shrink-0">{{ item.category }}</span>
                  </div>
                  <p class="mt-2 text-xs sm:text-sm text-inkSoft leading-relaxed">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};