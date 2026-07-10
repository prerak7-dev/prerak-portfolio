import { profile } from '../data/portfolioData.js';

export function Mark() {
  return (
    <div className="mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}

export function SketchArrow({ direction = 'right' }) {
  return (
    <svg className={`sketch-pointer ${direction}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path className="sketch-pointer-shadow" d="M4.7 3.4c.9-.8 2.2-.7 3.1.1l8 7.5c.7.7.7 1.8 0 2.5l-8 7.1c-.9.8-2.3.8-3.1-.1-.8-.9-.7-2.2.2-3l6-5.3-6.1-5.7c-.9-.8-1-2.2-.1-3.1Zm-1.2 6.8c.7-.6 1.7-.6 2.3 0l2.1 1.9-2.1 1.9c-.7.6-1.7.6-2.3 0-.6-.7-.6-1.7.1-2.3l.2-.2-.2-.2c-.7-.6-.7-1.6-.1-2.3Z" />
      <path d="M4 2.7c.9-.8 2.2-.7 3.1.1l8.6 8c.8.7.8 1.9 0 2.6l-8.6 7.7c-.9.8-2.3.7-3.1-.2-.8-.9-.7-2.2.2-3l6.5-5.8-6.5-6.1c-.9-.8-.9-2.2-.2-3.1Zm-1.3 6.8c.7-.6 1.7-.6 2.4 0l2.7 2.4-2.7 2.4c-.7.6-1.8.5-2.4-.2-.6-.7-.5-1.8.2-2.4l.3-.2-.3-.3c-.7-.6-.8-1.7-.2-2.4Z" />
    </svg>
  );
}

export function ProfileAvatar() {
  return <img src={profile.photo} alt={profile.name} className="profile-avatar" />;
}

export function Chip({ children }) {
  return <span className="chip">{children}</span>;
}
