import resume from './data/resume.json';

// Public files live under the Vite base (/<repo name>/ on GitHub Pages).
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const RESUME_PDF = asset('resume.pdf');
export const HEADSHOT = asset('media/headshot.jpg');

const find = (needle) => resume.links.find((l) => l.includes(needle));

export const contact = {
  email: find('@'),
  linkedin: `https://${find('linkedin')}`,
  github: `https://${find('github')}`,
  leetcode: `https://${find('leetcode')}`,
};

export const isCurrent = (date) => /present/i.test(date);

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
// End of a date range as a month count: "Jan 2025 – Apr 2025" is Apr 2025, a bare
// "2025" is its December, and "Feb 2026 – Present" ends now.
export function endMonth(date) {
  if (isCurrent(date)) return Infinity;
  const parts = [...date.toLowerCase().matchAll(/(?:([a-z]{3})[a-z]*\s+)?(\d{4})/g)];
  if (!parts.length) return 0;
  const [, mon, year] = parts[parts.length - 1];
  return Number(year) * 12 + (mon && MONTHS.includes(mon) ? MONTHS.indexOf(mon) : 11);
}

export const currentRole = resume.experience[0];
export const currentOrg = currentRole.org.split(',')[0];
