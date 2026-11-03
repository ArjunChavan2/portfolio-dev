// Shared by src/data/projects.js (links) and scripts/spa-routes.mjs (built route folders),
// so the two can never disagree about a project's URL. Pure: no Vite imports.
export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
