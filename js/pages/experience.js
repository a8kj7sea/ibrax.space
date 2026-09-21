import { store } from '../store.js';

export const ExperiencePage = {
  computed: {
    experience() { return store.experience || []; },
    profile()    { return store.profile || {}; }
  },
  methods: {
    go(to) { window.location.hash = to; }
  },
  template: `
    <section class="px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 sm:pb-10">
      <div class="max-w-4xl mx-auto">

        <div class="mb-8 sm:mb-10 fade-up d1">
          <div class="eyebrow mb-3"><span class="eyebrow-line"></span>03 — Experience<span class="eyebrow-line"></span></div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ink">Where I've worked</h2>
          <p class="mt-3 text-sm sm:text-base text-inkSoft leading-relaxed max-w-2xl">Companies I've contributed to and the roles I've grown through over time.</p>
        </div>

        <div class="timeline space-y-8 sm:space-y-10">
          <div v-for="(job, i) in experience" :key="i" class="relative">
            <div class="timeline-dot" :class="{ 'timeline-dot-seeking': job.isSeeking }"></div>

            <!-- Company header -->
            <div class="soft-card p-5 sm:p-6 mb-4" :class="{ 'border-terracotta': job.isSeeking }">
              <div class="flex items-start gap-4">
                <div v-if="job.logo" class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-border shrink-0 bg-white">
                  <img :src="job.logo" :alt="job.company" class="w-full h-full object-cover"/>
                </div>
                <div v-else class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-border shrink-0 grid place-items-center bg-terracottaSft">
                  <span class="font-display text-lg font-semibold text-terracottaDk">{{ job.company.charAt(0) }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-display font-semibold text-ink text-base sm:text-lg">{{ job.company }}</h3>
                  <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] sm:text-xs text-muted">
                    <span v-if="job.location" class="flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
                      {{ job.location }}
                    </span>
                    <span v-if="job.totalDuration" class="font-mono">{{ job.totalDuration }}</span>
                    <a v-if="job.website" :href="job.website" target="_blank" rel="noopener noreferrer" class="text-terracottaDk hover:text-terracotta font-medium">Visit site →</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Roles -->
            <div class="ml-4 sm:ml-6 space-y-3 sm:space-y-4 border-l-2 border-border pl-4 sm:pl-6">
              <div v-for="(role, j) in job.roles" :key="j" class="relative">
                <div class="absolute -left-[1.4rem] sm:-left-[1.65rem] top-2 w-3 h-3 rounded-full border-2 border-terracotta bg-cream"></div>
                <div class="bg-white/60 border border-border rounded-xl p-4 sm:p-5">
                  <div class="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 class="font-display font-semibold text-ink text-sm sm:text-base">{{ role.title }}</h4>
                    <span class="text-[10px] sm:text-xs font-mono text-muted">{{ role.period }}</span>
                  </div>
                  <div class="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-[10px] sm:text-xs text-muted">
                    <span v-if="role.type" class="tag tag-terra">{{ role.type }}</span>
                    <span v-if="role.duration" class="font-mono">{{ role.duration }}</span>
                    <span v-if="role.location">{{ role.location }}</span>
                  </div>
                  <p v-if="role.description" class="mt-3 text-xs sm:text-sm text-inkSoft leading-relaxed">{{ role.description }}</p>
                  <ul v-if="role.highlights" class="mt-3 space-y-1.5 text-xs sm:text-sm text-inkSoft list-disc list-inside marker:text-terracotta">
                    <li v-for="(h, k) in role.highlights" :key="k">{{ h }}</li>
                  </ul>
                  <div v-if="role.skills" class="mt-3 flex flex-wrap gap-1.5">
                    <span v-for="s in role.skills" :key="s" class="tag">{{ s }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="mt-12 sm:mt-16 text-center fade-up d3">
          <p class="text-sm text-inkSoft mb-4">Want to know more about what I can do?</p>
          <button @click="go('/contact')" class="btn-primary px-6 py-3 inline-flex items-center gap-2 text-sm">
            Let's talk
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </button>
        </div>
      </div>
    </section>
  `
};