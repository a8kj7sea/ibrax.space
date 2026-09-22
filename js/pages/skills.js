import { store } from '../store.js';

export const SkillsPage = {
  computed: { groups() { return store.skills || []; } },
  template: `
    <section class="px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 sm:pb-10">
      <div class="max-w-4xl mx-auto">
        <div class="mb-8 sm:mb-10 fade-up d1">
          <div class="eyebrow mb-3"><span class="eyebrow-line"></span>04 — Skills<span class="eyebrow-line"></span></div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ink">What I work with</h2>
          <p class="mt-3 text-sm sm:text-base text-inkSoft leading-relaxed max-w-2xl">Honest about what I know and what I'm still learning. Bars indicate confidence, not bragging.</p>
        </div>

        <div class="grid sm:grid-cols-2 gap-4 sm:gap-5">
          <div v-for="(g, i) in groups" :key="g.title" class="soft-card p-5 sm:p-6 fade-up" :class="'d' + Math.min(i+1, 6)">
            <h3 class="font-display font-semibold text-ink mb-3 sm:mb-4 text-sm sm:text-base">{{ g.title }}</h3>
            <div class="space-y-3 sm:space-y-4">
              <div v-for="s in g.items" :key="s.name">
                <div class="flex justify-between items-baseline mb-1.5">
                  <span class="text-xs sm:text-sm text-inkSoft" :class="{ 'italic': s.learning }">
                    {{ s.name }}
                    <span v-if="s.learning" class="text-[10px] font-mono text-terracottaDk ml-1">(learning)</span>
                  </span>
                  <span class="text-[10px] font-mono text-muted">{{ s.level }}%</span>
                </div>
                <div class="skill-bar"><span :style="{ width: s.level + '%' }"></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};