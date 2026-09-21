import { store } from '../store.js';

export const CertificationsPage = {
  data() {
    return { filter: 'All' };
  },
  computed: {
    certs() { return store.certifications || []; },
    issuers() {
      const set = new Set();
      this.certs.forEach(c => set.add(c.issuer));
      return ['All', ...Array.from(set)];
    },
    filtered() {
      if (this.filter === 'All') return this.certs;
      return this.certs.filter(c => c.issuer === this.filter);
    }
  },
  methods: {
    formatDate(d) {
      if (!d) return '';
      const [y, m] = d.split('-');
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return `${months[parseInt(m)-1] || ''} ${y}`;
    }
  },
  template: `
    <section class="px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 sm:pb-10">
      <div class="max-w-5xl mx-auto">

        <div class="mb-8 sm:mb-10 fade-up d1">
          <div class="eyebrow mb-3"><span class="eyebrow-line"></span>06 — Certifications<span class="eyebrow-line"></span></div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ink">Certifications & Learning</h2>
          <p class="mt-3 text-sm sm:text-base text-inkSoft leading-relaxed max-w-2xl">Courses I've completed, certificates I've earned, and what I took away from each.</p>
        </div>

        <!-- Filter -->
        <div v-if="issuers.length > 2" class="flex flex-wrap gap-2 mb-6 sm:mb-8 fade-up d2">
          <button v-for="i in issuers" :key="i" @click="filter = i"
                  class="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium border transition-all"
                  :class="filter === i ? 'bg-terracotta text-white border-terracotta' : 'bg-white/70 text-inkSoft border-border hover:border-terracotta hover:text-terracottaDk'">
            {{ i }}
          </button>
        </div>

        <!-- Cert cards -->
        <div class="grid sm:grid-cols-2 gap-4 sm:gap-5">
          <div v-for="c in filtered" :key="c.title" class="soft-card overflow-hidden fade-up d2">
            <!-- Image -->
            <div v-if="c.image" class="aspect-video overflow-hidden border-b border-border">
              <img :src="c.image" :alt="c.title" class="w-full h-full object-cover"/>
            </div>
            <div v-else class="h-2 bg-gradient-to-r from-terracotta to-amber"></div>

            <div class="p-5 sm:p-6">
              <div class="flex items-start justify-between gap-3">
                <h3 class="font-display text-base sm:text-lg font-semibold text-ink">{{ c.title }}</h3>
                <span v-if="c.date" class="text-[10px] font-mono text-muted shrink-0">{{ formatDate(c.date) }}</span>
              </div>
              <p class="text-xs sm:text-sm text-terracottaDk font-medium mt-1">{{ c.issuer }}</p>
              <p v-if="c.description" class="mt-3 text-xs sm:text-sm text-inkSoft leading-relaxed">{{ c.description }}</p>

              <div v-if="c.whatILearned && c.whatILearned.length" class="mt-4">
                <p class="text-[10px] font-mono uppercase tracking-widest text-muted mb-2">What I learned</p>
                <ul class="space-y-1.5 text-xs sm:text-sm text-inkSoft list-disc list-inside marker:text-terracotta">
                  <li v-for="(l, i) in c.whatILearned" :key="i">{{ l }}</li>
                </ul>
              </div>

              <div v-if="c.tags && c.tags.length" class="mt-4 flex flex-wrap gap-1.5">
                <span v-for="t in c.tags" :key="t" class="tag">{{ t }}</span>
              </div>

              <div v-if="c.credentialUrl" class="mt-4">
                <a :href="c.credentialUrl" target="_blank" rel="noopener noreferrer" class="text-xs text-terracottaDk hover:text-terracotta font-medium inline-flex items-center gap-1">
                  Verify credential
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M9 7h8v8"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <p v-if="!filtered.length" class="text-center text-sm text-muted mt-10">No certifications yet — check back soon.</p>
      </div>
    </section>
  `
};