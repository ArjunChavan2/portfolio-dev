import { useViewTransitionState } from 'react-router-dom';

// Names a project's title only while a transition to or from that project is running,
// so the clicked card's title morphs into the page's heading and names never collide.
export const useTitleTransition = (slug) => (
  useViewTransitionState(`/projects/${slug}`) ? { viewTransitionName: `title-${slug}` } : undefined
);
