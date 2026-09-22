import { store } from '../store.js';

export const PostsPage = {
  data() { return { filter: 'All' }; },
  computed: {
    posts() { return store.posts || []; },
    tags() {
      const set = new Set();
      this.posts.forEach(p => p.tags.forEach(t => set.add(t)));
      return ['All', ...Array.from(set).slice(0, 8)];
    },
    filtered() {
      if (this.filter === 'All') return this.posts;
      return this.posts.filter(p => p.tags.includes(this.filter));
    }
  },
  methods: {
    formatDate(d) {
      if (!d) return '';
      const date = new Date(d);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  },
  template: `
    <section class="px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 sm:pb-10">
      <div class="max-w-5xl mx-auto">

        <div class="mb-8 sm:mb-10 fade-up d1">
          <div class="eyebrow mb-3"><span class="eyebrow-line"></span>07 — Posts<span class="eyebrow-line"></span></div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ink">Writing & thoughts</h2>
          <p class="mt-3 text-sm sm:text-base text-inkSoft leading-relaxed max-w-2xl">Occasional posts about Java, clean code, and lessons learned along the way.</p>
        </div>

        <!-- Filter -->
        <div v-if="tags.length > 2" class="flex flex-wrap gap-2 mb-6 sm:mb-8 fade-up d2">
          <button v-for="t in tags" :key="t" @click="filter = t"
                  class="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium border transition-all"
                  :class="filter === t ? 'bg-terracotta text-white border-terracotta' : 'bg-white/70 text-inkSoft border-border hover:border-terracotta hover:text-terracottaDk'">
            {{ t }}
          </button>
        </div>

        <!-- Posts grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <a v-for="p in filtered" :key="p.title" :href="p.link || '#'" :target="p.link ? '_blank' : ''" rel="noopener noreferrer"
             class="soft-card overflow-hidden group block" :class="{ 'pointer-events-none': !p.link }">
            <!-- Image -->
            <div v-if="p.image" class="aspect-video overflow-hidden border-b border-border">
              <img :src="p.image" :alt="p.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
            </div>
            <div v-else class="h-32 grid place-items-center bg-gradient-to-br from-terracottaSft to-sageSft border-b border-border">
              <svg class="w-10 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <div class="p-4 sm:p-5">
              <span v-if="p.date" class="text-[10px] font-mono text-muted">{{ formatDate(p.date) }}</span>
              <h3 class="font-display text-sm sm:text-base font-semibold text-ink mt-1 group-hover:text-terracottaDk transition-colors">{{ p.title }}</h3>
              <p class="mt-2 text-xs sm:text-sm text-inkSoft leading-relaxed line-clamp-3">{{ p.excerpt }}</p>
              <div v-if="p.tags && p.tags.length" class="mt-3 flex flex-wrap gap-1.5">
                <span v-for="t in p.tags" :key="t" class="tag">{{ t }}</span>
              </div>
              <div v-if="p.link" class="mt-3 text-[11px] text-terracottaDk font-medium inline-flex items-center gap-1">
                Read more
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          </a>
        </div>

        <p v-if="!filtered.length" class="text-center text-sm text-muted mt-10">No posts yet — check back soon.</p>
      </div>
    </section>
  `
};