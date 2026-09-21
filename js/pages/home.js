import { store } from '../store.js';

export const HomePage = {
  computed: {
    profile()    { return store.profile || {}; },
    featured()    { return (store.projects || []).slice(0, 3); },
    latestPost()  { return (store.posts || [])[0] || null; },
    latestExp()   { return (store.experience || [])[0] || null; }
  },
  data() {
    return {
      typed: '', msgIndex: 0, charIndex: 0, deleting: false,
      progress: 34, timer: null, progTimer: null
    };
  },
  mounted() { this.tick(); this.bumpProgress(); },
  unmounted() { if (this.timer) clearTimeout(this.timer); if (this.progTimer) clearInterval(this.progTimer); },
  methods: {
    go(to) { window.location.hash = to; },
    formatDate(d) {
      if (!d) return '';
      const date = new Date(d);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },
    tick() {
      const messages = this.profile.bubbleMessages || [];
      if (!messages.length) return;
      const cur = messages[this.msgIndex];
      if (this.deleting) {
        this.charIndex--;
        this.typed = cur.substring(0, this.charIndex);
        if (this.charIndex < 0) {
          this.deleting = false;
          this.msgIndex = (this.msgIndex + 1) % messages.length;
          this.timer = setTimeout(this.tick, 480);
          return;
        }
        this.timer = setTimeout(this.tick, 30);
      } else {
        this.charIndex++;
        this.typed = cur.substring(0, this.charIndex);
        if (this.charIndex > cur.length) {
          this.deleting = true;
          this.timer = setTimeout(this.tick, 2400);
          return;
        }
        this.timer = setTimeout(this.tick, 60 + Math.random() * 50);
      }
    },
    bumpProgress() {
      this.progTimer = setInterval(() => {
        let p = this.progress + (Math.random() * 2 - 0.4);
        if (p > 78) p = 30;
        if (p < 24) p = 30;
        this.progress = Math.max(24, Math.floor(p));
      }, 3800);
    }
  },
  template: `
    <section class="px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-36 pb-8 sm:pb-10">
      <div class="max-w-5xl mx-auto">

        <!-- Hero -->
        <div class="grid lg:grid-cols-[1.4fr_1fr] gap-8 sm:gap-10 items-center">
          <div>
            <div class="fade-up d1 inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full border border-border bg-white/70 backdrop-blur-md mb-5 sm:mb-7">
              <span class="status-dot"></span>
              <span class="text-[10px] sm:text-xs font-medium tracking-wide text-inkSoft">{{ profile.availability }}</span>
              <span class="w-px h-3 bg-borderStrong"></span>
              <span class="text-[10px] sm:text-xs font-mono text-terracottaDk">HR friendly</span>
            </div>
            <h1 class="fade-up d2 font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] tracking-tight">
              Hi, I'm
              <span class="font-medium text-ink">{{ profile.name }}</span>
              <span class="block mt-1 font-script text-2xl sm:text-4xl lg:text-5xl text-terracotta -rotate-1">{{ profile.heroTagline }}</span>
            </h1>
            <p class="fade-up d3 mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg text-inkSoft leading-relaxed max-w-2xl">
              {{ profile.shortBio }} {{ profile.heroIntro }}
            </p>
            <div class="fade-up d4 mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a href="#/projects" @click.prevent="go('/projects')" class="btn-primary px-5 sm:px-6 py-3 sm:py-3.5 inline-flex items-center gap-2.5 text-xs sm:text-sm w-full sm:w-auto justify-center">
                Explore my work
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
              <a href="#/contact" @click.prevent="go('/contact')" class="btn-ghost px-5 py-3 sm:py-3.5 inline-flex items-center gap-2 text-xs sm:text-sm w-full sm:w-auto justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>
                Get in touch
              </a>
            </div>
            <div class="fade-up d5 mt-8 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-md">
              <div v-for="s in profile.stats" :key="s.label">
                <div class="font-display text-base sm:text-lg font-semibold text-ink">{{ s.value }}</div>
                <div class="text-[9px] sm:text-[11px] font-mono uppercase tracking-widest text-muted mt-1">{{ s.label }}</div>
              </div>
            </div>
          </div>

          <div class="fade-up d3 hidden lg:block">
            <div class="relative">
              <div class="avatar-glow inline-block">
                <img :src="profile.avatar" :alt="profile.name" class="w-56 h-56 rounded-full object-cover border-2 border-white shadow-[0_20px_50px_-15px_rgba(45,42,38,0.25)]"/>
              </div>
              <div class="stage mt-4">
                <div class="ground-line" style="bottom:24px;opacity:.4;"></div>
                <div class="ground-line" style="bottom:32px;opacity:.25;"></div>
                <div class="ground-line" style="bottom:40px;opacity:.12;"></div>
                <div class="stage-glow"></div>
                <div class="path-track"><div class="path-dashes"></div></div>
                <div class="character">
                  <svg width="92" height="150" viewBox="0 0 110 172" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <ellipse cx="55" cy="164" rx="26" ry="3" fill="rgba(45,42,38,.14)"/>
                    <g class="limb-b"><rect x="50" y="100" width="10" height="50" rx="5" fill="#4A423A"/><ellipse cx="55" cy="151" rx="10" ry="3.5" fill="#2A2620"/></g>
                    <g class="limb-a"><rect x="34" y="68" width="8" height="32" rx="4" fill="#B8603F"/><circle cx="38" cy="100" r="4.5" fill="#F4D5B8"/></g>
                    <g>
                      <path d="M 36 62 Q 36 56 42 56 L 68 56 Q 74 56 74 62 L 76 108 Q 76 113 71 113 L 39 113 Q 34 113 34 108 Z" fill="#D97757"/>
                      <path d="M 48 56 Q 55 62 62 56" fill="#B8603F" opacity=".55"/>
                    </g>
                    <g>
                      <rect x="50" y="44" width="10" height="14" fill="#E8C5A0"/>
                      <circle cx="55" cy="34" r="17" fill="#F4D5B8"/>
                      <path d="M 38 34 Q 38 17 55 17 Q 72 17 72 34 L 70 33 Q 68 23 55 23 Q 42 23 40 33 Z" fill="#3D2817"/>
                      <circle cx="49" cy="35" r="1.4" fill="#2A2620"/>
                      <circle cx="61" cy="35" r="1.4" fill="#2A2620"/>
                      <path d="M 50 41 Q 55 45 60 41" stroke="#2A2620" stroke-width="1.4" fill="none" stroke-linecap="round"/>
                    </g>
                    <g class="limb-a"><rect x="50" y="100" width="11" height="50" rx="5.5" fill="#3D3833"/><ellipse cx="55" cy="151" rx="11" ry="4" fill="#1A1614"/></g>
                    <g class="limb-b"><rect x="68" y="68" width="8" height="32" rx="4" fill="#D97757"/><circle cx="72" cy="100" r="4.5" fill="#F4D5B8"/></g>
                  </svg>
                </div>
                <div class="bubble-wrap">
                  <div class="bubble-card">
                    <p class="text-sm font-medium text-ink whitespace-nowrap flex items-center justify-center">
                      <span>{{ typed }}</span><span class="cursor ml-0.5">|</span>
                    </p>
                    <div class="bubble-tail"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress -->
        <div class="fade-up d5 mt-12 sm:mt-16 max-w-sm mx-auto lg:mx-0">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-mono uppercase tracking-widest text-muted">Site readiness</span>
            <span class="text-[10px] font-mono text-terracottaDk">{{ progress }}%</span>
          </div>
          <div class="progress-track h-1.5 rounded-full overflow-hidden">
            <div class="progress-fill h-full rounded-full" :style="{ width: progress + '%' }"></div>
          </div>
        </div>

        <!-- Featured projects -->
        <div class="mt-14 sm:mt-20">
          <div class="flex items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <div class="eyebrow mb-2"><span class="eyebrow-line"></span>Selected work<span class="eyebrow-line"></span></div>
              <h2 class="font-display text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight">A few things I've built</h2>
            </div>
            <a href="#/projects" @click.prevent="go('/projects')" class="text-xs sm:text-sm text-terracottaDk hover:text-terracotta font-medium inline-flex items-center gap-1.5 shrink-0">
              View all
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <a v-for="p in featured" :key="p.title" :href="p.link" target="_blank" rel="noopener noreferrer" class="project-card group">
              <div class="flex items-start justify-between gap-3">
                <h3 class="font-display text-sm sm:text-base font-semibold text-ink group-hover:text-terracottaDk transition-colors">{{ p.title }}</h3>
                <svg class="w-4 h-4 text-muted group-hover:text-terracotta transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M9 7h8v8"/></svg>
              </div>
              <p class="mt-2 text-xs sm:text-sm text-inkSoft leading-relaxed line-clamp-3">{{ p.description }}</p>
              <div class="mt-3 flex flex-wrap gap-1.5">
                <span v-for="t in p.tags.slice(0,4)" :key="t" class="tag">{{ t }}</span>
              </div>
            </a>
          </div>
        </div>

        <!-- Latest experience preview -->
        <div v-if="latestExp" class="mt-14 sm:mt-20">
          <div class="flex items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <div class="eyebrow mb-2"><span class="eyebrow-line"></span>Currently<span class="eyebrow-line"></span></div>
              <h2 class="font-display text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight">Where I am now</h2>
            </div>
            <a href="#/experience" @click.prevent="go('/experience')" class="text-xs sm:text-sm text-terracottaDk hover:text-terracotta font-medium inline-flex items-center gap-1.5 shrink-0">
              Full history
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </a>
          </div>
          <div class="soft-card p-5 sm:p-6 fade-up d2">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl border border-border shrink-0 grid place-items-center bg-terracottaSft">
                <span class="font-display text-lg font-semibold text-terracottaDk">{{ latestExp.company.charAt(0) }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-display font-semibold text-ink text-sm sm:text-base">{{ latestExp.company }}</h3>
                <p v-if="latestExp.roles && latestExp.roles[0]" class="text-xs sm:text-sm text-inkSoft mt-1">
                  {{ latestExp.roles[0].title }} · {{ latestExp.roles[0].period }}
                </p>
                <p v-if="latestExp.roles && latestExp.roles[0]" class="text-xs text-muted mt-1">{{ latestExp.roles[0].description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Latest post preview -->
        <div v-if="latestPost" class="mt-14 sm:mt-20">
          <div class="flex items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <div class="eyebrow mb-2"><span class="eyebrow-line"></span>Latest post<span class="eyebrow-line"></span></div>
              <h2 class="font-display text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight">From the blog</h2>
            </div>
            <a href="#/posts" @click.prevent="go('/posts')" class="text-xs sm:text-sm text-terracottaDk hover:text-terracotta font-medium inline-flex items-center gap-1.5 shrink-0">
              All posts
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </a>
          </div>
          <a :href="latestPost.link || '#/posts'" @click.prevent="go('/posts')" class="soft-card p-5 sm:p-6 block group fade-up d2">
            <div class="flex flex-wrap items-baseline justify-between gap-2">
              <h3 class="font-display font-semibold text-ink text-sm sm:text-base group-hover:text-terracottaDk transition-colors">{{ latestPost.title }}</h3>
              <span v-if="latestPost.date" class="text-[10px] font-mono text-muted">{{ formatDate(latestPost.date) }}</span>
            </div>
            <p class="mt-2 text-xs sm:text-sm text-inkSoft leading-relaxed">{{ latestPost.excerpt }}</p>
            <div v-if="latestPost.tags && latestPost.tags.length" class="mt-3 flex flex-wrap gap-1.5">
              <span v-for="t in latestPost.tags" :key="t" class="tag">{{ t }}</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  `
};