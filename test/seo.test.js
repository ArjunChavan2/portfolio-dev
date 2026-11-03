// Page titles, descriptions and slugs are baked into the built HTML, so a bad edit here
// ships wrong link previews or broken deep links. Check the edge cases in CI.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PAGES, projectMeta } from '../src/seo.js';
import { slugify } from '../src/slugify.js';

test('projectMeta strips bold markers and cuts long text at a word with an ellipsis', () => {
  const long = `**Bold** ${'word '.repeat(60)}`;
  const { title, description } = projectMeta({ title: 'Demo', summary: long, bullets: [] });
  assert.equal(title, 'Demo | Arjun Chavan');
  assert.ok(!description.includes('**'));
  assert.ok(description.endsWith('…') && description.length <= 156);
  assert.ok(!/\s…$/.test(description));
});

test('projectMeta falls back to the Projects description when a project has no text', () => {
  assert.equal(projectMeta({ title: 'X', bullets: [] }).description, PAGES.projects.description);
});

test('slugify makes URL-safe slugs and trims dashes', () => {
  assert.equal(slugify('A* Path Planner & Robotics Runtime'), 'a-path-planner-robotics-runtime');
  assert.equal(slugify('  --Hello, World!--  '), 'hello-world');
});
