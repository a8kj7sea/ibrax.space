const { reactive } = Vue;

export const store = reactive({
  profile: null,
  about: null,
  projects: null,
  skills: null,
  experience: null,
  certifications: null,
  interests: null,
  posts: null,
  loaded: false,
  error: null
});

export async function loadStore() {
  if (store.loaded) return;
  try {
    const [
      profile, about, projects, skills,
      experience, certifications, interests, posts
    ] = await Promise.all([
      fetch('./data/profile.json').then(r => r.json()),
      fetch('./data/about.json').then(r => r.json()),
      fetch('./data/projects.json').then(r => r.json()),
      fetch('./data/skills.json').then(r => r.json()),
      fetch('./data/experience.json').then(r => r.json()),
      fetch('./data/certifications.json').then(r => r.json()),
      fetch('./data/interests.json').then(r => r.json()),
      fetch('./data/posts.json').then(r => r.json())
    ]);

    store.profile        = profile;
    store.about          = about;
    store.projects       = projects;
    store.skills         = skills;
    store.experience     = experience;
    store.certifications = certifications;
    store.interests      = interests;
    store.posts          = posts;
    store.loaded         = true;

    if (profile.name && profile.title) {
      document.title = `${profile.name} — ${profile.title}`;
    }
  } catch (err) {
    store.error = err.message;
    console.error('Failed to load portfolio data:', err);
  }
}