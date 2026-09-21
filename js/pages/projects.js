import { store } from '../store.js';

export const ProjectsPage = {
  data() {
    return {
      filter: 'All',
      sort: 'newest',
      view: 'grid'
    };
  },
  computed: {
    projects() { return store.projects || []; },
    tags() {
      const set = new Set();
      this.projects.forEach(p => p.tags.forEach(t => set.add(t)));
      return ['All', ...Array.from(set).slice(0, 10)];
    },
    filteredSorted() {
      let list = this.filter === 'All'
        ? [...this.projects]
        : this.projects.filter(p => p.tags.includes(this.filter));

      if (this.sort === 'newest') {
        list.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      } else if (this.sort === 'oldest') {
        list.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
      } else if (this.sort === 'name') {
        list.sort((a, b) => a.title.localeCompare(b.title));
      }
      return list;
    },
    timelineGroups() {
      const groups = {};
      this.filteredSorted.forEach(p => {
        const year = (p.date || 'Unknown').substring(0, 4);
        if (!groups[year]) groups[year] = [];
        groups[year].push(p);
      });
      return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
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
          <div class="eyebrow mb-3"><span class="eyebrow-line"></span>04 — Projects<span class="eyebrow-line"></span></div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-ink">Things I've shipped</h2>
          <p class="mt-3 text-sm sm:text-base text-inkSoft leading-relaxed max-w-2xl">Open-source libraries, tools, and experiments. Sort by date, filter by tag, or view as a timeline.</p>
        </div>

        <!-- Controls -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 fade-up d2">
          <!-- Tag filter -->
          <div class="flex flex-wrap gap-2 flex-1">
            <button v-for="t in tags" :key="t" @click="filter = t"
                    class="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium border transition-all"
                    :class="filter === t ? 'bg-terracotta text-white border-terracotta' : 'bg-white/70 text-inkSoft border-border hover:border-terracotta hover:text-terracottaDk'">
              {{ t }}
            </button>
          </div>

          <!-- Sort + view toggle -->
          <div class="flex items-center gap-2 shrink-0">
            <select v-model="sort" class="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium border border-border bg-white/70 text-inkSoft cursor-pointer outline-none focus:border-terracotta">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">A → Z</option>
            </select>
            <div class="flex rounded-full border border-border bg-white/70 overflow-hidden">
              <button @click="view = 'grid'" :class="view === 'grid' ? 'bg-terracotta text-white' : 'text-inkSoft'" class="px-3 py-1.5 text-[11px] font-medium">Grid</button>
              <button @click="view = 'timeline'" :class="view === 'timeline' ? 'bg-terracotta text-white' : 'text-inkSoft'" class="px-3 py-1.5 text-[11px] font-medium">Timeline</button>
            </div>
          </div>
        </div>

        <!-- Grid view -->
        <div v-if="view === 'grid'" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <a v-for="p in filteredSorted" :key="p.title" :href="p.link" target="_blank" rel="noopener noreferrer" class="project-card group">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="font-display text-sm sm:text-lg font-semibold text-ink group-hover:text-terracottaDk transition-colors">{{ p.title }}</h3>
                <p v-if="p.date" class="text-[10px] font-mono text-muted mt-0.5">{{ formatDate(p.date) }}</p>
              </div>
              <svg class="w-4 sm:w-5 h-4 sm:h-5 text-muted group-hover:text-terracotta transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M9 7h8v8"/></svg>
            </div>
            <p class="mt-2 sm:mt-3 text-xs sm:text-sm text-inkSoft leading-relaxed">{{ p.description }}</p>
            <div class="mt-3 sm:mt-4 flex flex-wrap gap-1.5">
              <span v-for="t in p.tags" :key="t" class="tag">{{ t }}</span>
            </div>
          </a>
        </div>

        <!-- Timeline view -->
        <div v-else class="space-y-8 sm:space-y-10">
          <div v-for="[year, items] in timelineGroups" :key="year">
            <div class="flex items-center gap-3 mb-4">
              <span class="font-display text-2xl sm:text-3xl font-medium text-terracotta">{{ year }}</span>
              <span class="flex-1 h-px bg-border"></span>
              <span class="text-[10px] font-mono text-muted">{{ items.length }} project{{ items.length !== 1 ? 's' : '' }}</span>
            </div>
            <div class="timeline space-y-5">
              <div v-for="p in items" :key="p.title" class="relative">
                <div class="timeline-dot"></div>
                <a :href="p.link" target="_blank" rel="noopener noreferrer" class="soft-card p-4 sm:p-5 block group">
                  <div class="flex flex-wrap items-start justify-between gap-2">
                    <h3 class="font-display font-semibold text-ink text-sm sm:text-base group-hover:text-terracottaDk transition-colors">{{ p.title }}</h3>
                    <span class="text-[10px] sm:text-xs font-mono text-muted">{{ formatDate(p.date) }}</span>
                  </div>
                  <p class="mt-2 text-xs sm:text-sm text-inkSoft leading-relaxed">{{ p.description }}</p>
                  <div class="mt-3 flex flex-wrap gap-1.5">
                    <span v-for="t in p.tags" :key="t" class="tag">{{ t }}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <p class="mt-8 sm:mt-10 text-center text-xs sm:text-sm text-muted fade-up d3">
          More on
          <a href="https://github.com/a8kj7sea" target="_blank" rel="noopener noreferrer" class="text-terracottaDk hover:text-terracotta font-medium">github.com/a8kj7sea</a>
        </p>
      </div>
    </section>
  `
};