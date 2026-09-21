import { store } from '../store.js';

export const SectionHeading = {
  props: {
    eyebrow: { type: String, default: '' },
    title:   { type: String, required: true },
    intro:   { type: String, default: '' }
  },
  template: `
    <div class="mb-8 sm:mb-10 fade-up d1">
      <div v-if="eyebrow" class="eyebrow mb-3">
        <span class="eyebrow-line"></span>{{ eyebrow }}<span class="eyebrow-line"></span>
      </div>
      <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ink">{{ title }}</h2>
      <p v-if="intro" class="mt-3 text-sm sm:text-base text-inkSoft leading-relaxed max-w-2xl">{{ intro }}</p>
    </div>
  `
};

export const ProjectCard = {
  props: { project: { type: Object, required: true } },
  template: `
    <a :href="project.link" target="_blank" rel="noopener noreferrer" class="project-card group">
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-display text-base sm:text-lg font-semibold text-ink group-hover:text-terracottaDk transition-colors">{{ project.title }}</h3>
        <svg class="w-4 sm:w-5 h-4 sm:h-5 text-muted group-hover:text-terracotta transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M9 7h8v8"/>
        </svg>
      </div>
      <p class="mt-2 sm:mt-3 text-xs sm:text-sm text-inkSoft leading-relaxed">{{ project.description }}</p>
      <div class="mt-3 sm:mt-4 flex flex-wrap gap-1.5">
        <span v-for="t in project.tags" :key="t" class="tag">{{ t }}</span>
      </div>
    </a>
  `
};