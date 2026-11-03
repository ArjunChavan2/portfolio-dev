import { Link } from 'react-router-dom';
import Keyterms from './Keyterms';
import ProjectThumb from './ProjectThumb';
import { useTitleTransition } from '../viewTransition';

export default function ProjectCard({ project }) {
  const mediaTag = project.media?.type === 'demo' ? 'Interactive demo' : project.media?.type === 'video' ? 'Video' : null;
  const titleVT = useTitleTransition(project.slug);
  return (
    <Link viewTransition to={`/projects/${project.slug}`} className="project-card">
      <ProjectThumb project={project} />
      <div className="project-card-body">
        <div className="card-meta">
          <span>{project.category}</span>
          <span>{project.date}</span>
        </div>
        <h3 style={titleVT}>{project.title}</h3>
        <p><Keyterms text={project.summary} /></p>
        <div className="card-foot">
          <ul className="tags">
            {project.stack.slice(0, 4).map((s) => <li key={s}>{s}</li>)}
          </ul>
          {mediaTag && <span className="pill">{mediaTag}</span>}
        </div>
      </div>
    </Link>
  );
}
