import React from 'react'
import { Mail, Globe, User, MapPin, Phone, ExternalLink } from 'lucide-react'
import { toArr, renderBold } from '../utils/resume-helpers'

const VibrantTemplate = ({ data }) => {
  return (
    <div className="resume-paper vibrant-template" style={{ '--accent': data.themeColor }}>
      {/* ── Header ── */}
      <header className="resume-header">
        <h1>{data.personal.fullName || 'Your Name'}</h1>
        <p className="resume-title">{data.personal.title || 'Professional Title'}</p>
        <div className="resume-contact">
          {data.personal.email && (
            <span><Mail size={11} /> {data.personal.email}</span>
          )}
          {data.personal.phone && (
            <span><Phone size={11} /> {data.personal.phone}</span>
          )}
          {data.personal.location && (
            <span><MapPin size={11} /> {data.personal.location}</span>
          )}
          {data.personal.github && (
            <span><Globe size={11} /> {data.personal.github}</span>
          )}
          {data.personal.linkedin && (
            <span><User size={11} /> {data.personal.linkedin}</span>
          )}
        </div>
      </header>

      {/* ── Summary ── */}
      {data.summary && (
        <section className="resume-section">
          <h2 className="section-heading">About Me</h2>
          <p className="summary-text">{data.summary}</p>
        </section>
      )}

      {/* ── Skills ── */}
      {data.skills.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Expertise</h2>
          <div className="skills-categorized">
            {data.skills.map((cat, i) => (
              <div key={cat.id || i} className="skill-cat-row">
                {cat.category && <span className="skill-cat-name">{cat.category}:</span>}
                <span className="skill-cat-items"> {cat.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Experience ── */}
      {data.experience.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Work History</h2>
          <div className="experience-list">
            {data.experience.map((exp) => (
              <div key={exp.id} className="experience-item">
                <div className="exp-header">
                  <h3>{exp.company}</h3>
                  {exp.duration && <span className="exp-duration">{exp.duration}</span>}
                </div>
                {exp.position && <p className="exp-position">{exp.position}</p>}
                {toArr(exp.description).length > 0 && (
                  <ul className="desc-list">
                    {toArr(exp.description).filter(p => p.trim()).map((p, i) => (
                      <li key={i}>{renderBold(p)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Projects ── */}
      {data.projects.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Key Projects</h2>
          <div className="projects-list">
            {data.projects.map((project) => (
              <div key={project.id} className="project-item">
                <div className="project-header">
                  <h3>{project.title || 'Untitled Project'}</h3>
                  {project.link && (
                    <span className="project-link">
                      <ExternalLink size={9} />
                      {project.link.replace(/^https?:\/\//, '')}
                    </span>
                  )}
                </div>
                {project.tech && <p className="project-tech">{project.tech}</p>}
                {toArr(project.description).length > 0 && (
                  <ul className="desc-list">
                    {toArr(project.description).filter(p => p.trim()).map((p, i) => (
                      <li key={i}>{renderBold(p)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Education ── */}
      {data.education && data.education.length > 0 && (
        <section className="resume-section">
          <h2 className="section-heading">Education</h2>
          <div className="education-list">
            {data.education.map((edu) => (
              <div key={edu.id} className="education-item">
                <div className="edu-header">
                  <h3>{edu.school}</h3>
                  {edu.duration && <span className="edu-duration">{edu.duration}</span>}
                </div>
                <div className="edu-sub">
                  <span>{edu.degree}</span>
                  {edu.location && <span className="edu-location">{edu.location}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default VibrantTemplate
