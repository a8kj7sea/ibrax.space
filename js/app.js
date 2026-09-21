import { store, loadStore } from './store.js';
import { NavBar }       from './components/navbar.js';
import { SiteFooter }    from './components/footer.js';
import { SectionHeading, ProjectCard } from './components/ui.js';
import { HomePage }           from './pages/home.js';
import { AboutPage }          from './pages/about.js';
import { ExperiencePage }     from './pages/experience.js';
import { ProjectsPage }       from './pages/projects.js';
import { SkillsPage }         from './pages/skills.js';
import { CertificationsPage } from './pages/certifications.js';
import { InterestsPage }      from './pages/interests.js';
import { PostsPage }          from './pages/posts.js';
import { ContactPage }        from './pages/contact.js';

const { createApp, ref, computed, onMounted } = Vue;

function getPath() {
  return window.location.hash.replace(/^#/, '') || '/';
}

const routes = {
  '/':               HomePage,
  '/about':          AboutPage,
  '/experience':     ExperiencePage,
  '/projects':       ProjectsPage,
  '/skills':         SkillsPage,
  '/certifications': CertificationsPage,
  '/interests':      InterestsPage,
  '/posts':          PostsPage,
  '/contact':        ContactPage
};

const App = {
  components: { NavBar, SiteFooter },
  setup() {
    const route = ref(getPath());

    const onHash = () => {
      route.value = getPath();
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    onMounted(() => {
      window.addEventListener('hashchange', onHash);
      loadStore();
    });

    const Page = computed(() => routes[route.value] || HomePage);

    return { Page, route, store };
  },
  template: `
    <div>
      <div class="bg-blobs">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
      </div>
      <div class="dots"></div>

      <transition name="fade-screen">
        <div v-if="!store.loaded" class="loading-screen">
          <div class="loading-content">
            <div class="loading-initials">IA</div>
            <div class="loading-bar"></div>
          </div>
        </div>
      </transition>

      <template v-if="store.loaded">
        <NavBar />
        <main class="relative z-10">
          <transition name="page" mode="out-in">
            <component :is="Page" :key="route" />
          </transition>
        </main>
        <SiteFooter />
      </template>
    </div>
  `
};

const app = createApp(App);
app.component('SectionHeading', SectionHeading);
app.component('ProjectCard',    ProjectCard);
app.mount('#app');