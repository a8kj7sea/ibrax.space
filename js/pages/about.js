import { store } from '../store.js';

export const AboutPage = {
  computed: {
    about()   { return store.about || {}; },
    profile() { return store.profile || {}; }
  },
  methods: {
    go(to) { window.location.hash = to; }
  },
  template: `
    <section class="px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 sm:pb-10">
      <div class="max-w-4xl mx-auto">

        <div class="mb-8 sm:mb-10 fade-up d1">
          <div class="eyebrow mb-3"><span class="eyebrow-line"></span>01 — About<span class="eyebrow-line"></span></div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ink">A bit about me</h2>
          <p class="mt-3 text-sm sm:text-base text-inkSoft leading-relaxed max-w-2xl">{{ about.intro }}</p>
        </div>

        <div class="grid lg:grid-cols-[1.6fr_1fr] gap-6 sm:gap-10 items-start">
          <div class="space-y-4 sm:space-y-5 fade-up d2">
            <p v-for="(p, i) in about.paragraphs" :key="i" class="text-sm sm:text-base text-inkSoft leading-relaxed">{{ p }}</p>
            <div class="grid sm:grid-cols-3 gap-3 sm:gap-4 pt-4">
              <div v-for="h in about.highlights" :key="h.title" class="soft-card p-4 sm:p-5">
                <div class="font-display text-sm font-semibold text-ink">{{ h.title }}</div>
                <p class="text-xs text-inkSoft mt-1.5 leading-relaxed">{{ h.body }}</p>
              </div>
            </div>

            <!-- CTA to experience -->
            <div class="pt-4">
              <button @click="go('/experience')" class="btn-ghost px-5 py-3 inline-flex items-center gap-2 text-xs sm:text-sm">
                View work experience
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

          <aside class="fade-up d3 soft-card p-5 sm:p-6">
            <div class="flex items-center gap-3 sm:gap-4">
              <img :src="profile.avatar" :alt="profile.name" class="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-border"/>
              <div>
                <div class="font-display font-semibold text-ink text-sm sm:text-base">{{ profile.name }}</div>
                <div class="text-xs text-muted">{{ profile.title }}</div>
              </div>
            </div>
            <div class="mt-4 sm:mt-5 space-y-2.5 text-xs sm:text-sm">
              <div class="flex justify-between"><span class="text-muted">Location</span><span class="text-ink font-medium">{{ profile.location }}</span></div>
              <div class="flex justify-between"><span class="text-muted">Focus</span><span class="text-ink font-medium">Backend · AI</span></div>
              <div class="flex justify-between items-center"><span class="text-muted">Status</span><span class="inline-flex items-center gap-1.5 text-ink font-medium"><span class="status-dot"></span> Open to work</span></div>
            </div>
            <a :href="'mailto:' + profile.email" class="btn-primary mt-5 sm:mt-6 w-full justify-center inline-flex items-center gap-2 text-xs sm:text-sm py-2.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>
              Reach out
            </a>
          </aside>
        </div>

        <!-- Education -->
        <div class="mt-12 sm:mt-16">
          <div class="mb-8 sm:mb-10 fade-up d1">
            <div class="eyebrow mb-3"><span class="eyebrow-line"></span>02 — Education<span class="eyebrow-line"></span></div>
            <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ink">What I'm studying</h2>
            <p class="mt-3 text-sm sm:text-base text-inkSoft leading-relaxed max-w-2xl">Formal study and the courses that shaped my toolkit.</p>
          </div>
          <div class="soft-card p-5 sm:p-6 fade-up d2">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 class="font-display font-semibold text-ink text-base sm:text-lg">{{ about.education.degree }}</h3>
                <p class="text-xs sm:text-sm text-inkSoft mt-1">{{ about.education.institution }}</p>
              </div>
              <span class="tag tag-amber">GPA {{ about.education.gpa }}</span>
            </div>
            <p class="text-[10px] sm:text-xs font-mono text-muted mt-2">{{ about.education.period }}</p>
            <p class="text-xs sm:text-sm text-inkSoft mt-3 leading-relaxed">{{ about.education.details }}</p>
          </div>
        </div>
      </div>
    </section>
  `
};