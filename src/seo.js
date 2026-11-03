// Per-page <title> and description. Pure (no Vite imports) so scripts/spa-routes.mjs
// can bake them into each route's HTML for crawlers and link previews, and the app
// can set the same text on client-side navigation.
const NAME = 'Arjun Chavan';

export const PAGES = {
  '': { title: NAME, description: 'Arjun Chavan: computer science at the University of Michigan. Full-stack, ML, and robotics.' },
  projects: { title: `Projects | ${NAME}`, description: 'Robotics, machine learning and full-stack projects by Arjun Chavan, with live browser demos of a path planner and a robot arm.' },
  experience: { title: `Experience | ${NAME}`, description: 'Work and research experience of Arjun Chavan, a University of Michigan computer science student.' },
  contact: { title: `Contact | ${NAME}`, description: 'Get in touch with Arjun Chavan by email, LinkedIn or GitHub.' },
};

const clip = (s, n = 155) => (s.length <= n ? s : `${s.slice(0, n).replace(/\s+\S*$/, '')}…`);

export const projectMeta = (p) => ({
  title: `${p.title} | ${NAME}`,
  description: clip(p.summary || p.bullets[0] || PAGES.projects.description).replace(/\*\*/g, ''),
});

// Client-side navigation: keep the tab title and description in step with the route.
export function applyMeta({ title, description }) {
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
}
