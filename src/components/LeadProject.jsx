import { Link } from 'react-router-dom';
import Keyterms from './Keyterms';
import ProjectThumb from './ProjectThumb';
import { useTitleTransition } from '../viewTransition';

// The big lead card, used on Home and at the top of Projects (which adds its own class).
export default function LeadProject({ project, className = 'lead-card' }) {
  const titleVT = useTitleTransition(project.slug);
  const type = project.media?.type;
  return (
    <Link viewTransition to={`/projects/${project.slug}`} className={className}>
      <div className="lead-media"><ProjectThumb project={project} /></div>
      <div className="lead-body">
        <div className="card-meta">
          <span>{project.category}</span>
          <span>{project.date}</span>
        </div>
        <h3 style={titleVT}>{project.title}</h3>
        <p><Keyterms text={project.summary} /></p>
        <ul className="tags">
          {project.stack.slice(0, 5).map((t) => <li key={t}>{t}</li>)}
        </ul>
        <span className="lead-cta">
          {type === 'demo' ? 'Open the interactive demo' : type === 'video' ? 'Watch the video' : 'Read the project'}
        </span>
      </div>
    </Link>
  );
}
