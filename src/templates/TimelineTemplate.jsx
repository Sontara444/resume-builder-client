import React from 'react'
import { toArr, renderBold } from '../utils/resume-helpers'

const TimelineTemplate = ({ data }) => {
  const contact = [
    data.personal.email,
    data.personal.phone,
    data.personal.location,
    data.personal.github,
    data.personal.linkedin
  ].filter(Boolean)

  return (
    <div className="resume-paper timeline-template" style={{ '--accent': data.themeColor }}>
      <header className="tl-header">
        <div className="tl-header-accent" />
        <div className="tl-header-content">
          <h1>{data.personal.fullName || 'Your Name'}</h1>
          <p className="tl-title">{data.personal.title || 'Professional Title'}</p>
          <div className="tl-contact">
            {contact.map((c, i) => (
              <span key={i}>{c.replace(/^https?:\/\//, '')}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="tl-body">
        {data.summary && (
          <section className="tl-section">
            <div className="tl-section-label">
              <span className="tl-label-dot" />
              <h2>Summary</h2>
            </div>
            <p className="tl-summary">{data.summary}</p>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="tl-section">
            <div className="tl-section-label">
              <span className="tl-label-dot" />
              <h2>Skills</h2>
            </div>
            <div className="tl-skills">
              {data.skills.map((cat, i) => (
                <div key={cat.id || i} className="tl-skill-row">
                  {cat.category && <strong>{cat.category}:</strong>} {cat.items.join(', ')}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="tl-section">
            <div className="tl-section-label">
              <span className="tl-label-dot" />
              <h2>Experience</h2>
            </div>
            <div className="tl-timeline">
              {data.experience.map((exp, idx) => (
                <div key={exp.id} className="tl-entry">
                  <div className="tl-entry-spine">
                    <div className="tl-entry-dot" />
                    {idx < data.experience.length - 1 && <div className="tl-entry-line" />}
                  </div>
                  <div className="tl-entry-content">
                    <div className="tl-entry-header">
                      <h3>{exp.position}</h3>
                      <span className="tl-entry-meta">{exp.duration}</span>
                    </div>
                    <p className="tl-entry-org">{exp.company}</p>
                    {toArr(exp.description).filter(p => p.trim()).length > 0 && (
                      <ul className="tl-dots">
                        {toArr(exp.description).filter(p => p.trim()).map((p, i) => (
                          <li key={i}>{renderBold(p)}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="tl-section">
            <div className="tl-section-label">
              <span className="tl-label-dot" />
              <h2>Projects</h2>
            </div>
            <div className="tl-timeline">
              {data.projects.map((project, idx) => (
                <div key={project.id} className="tl-entry">
                  <div className="tl-entry-spine">
                    <div className="tl-entry-dot" />
                    {idx < data.projects.length - 1 && <div className="tl-entry-line" />}
                  </div>
                  <div className="tl-entry-content">
                    <div className="tl-entry-header">
                      <h3>{project.title}</h3>
                      {project.link && <span className="tl-entry-meta">{project.link.replace(/^https?:\/\//, '')}</span>}
                    </div>
                    {project.tech && <p className="tl-entry-org">{project.tech}</p>}
                    {toArr(project.description).filter(p => p.trim()).length > 0 && (
                      <ul className="tl-dots">
                        {toArr(project.description).filter(p => p.trim()).map((p, i) => (
                          <li key={i}>{renderBold(p)}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section className="tl-section">
            <div className="tl-section-label">
              <span className="tl-label-dot" />
              <h2>Education</h2>
            </div>
            <div className="tl-timeline">
              {data.education.map((edu, idx) => (
                <div key={edu.id} className="tl-entry">
                  <div className="tl-entry-spine">
                    <div className="tl-entry-dot" />
                    {idx < data.education.length - 1 && <div className="tl-entry-line" />}
                  </div>
                  <div className="tl-entry-content">
                    <div className="tl-entry-header">
                      <h3>{edu.school}</h3>
                      <span className="tl-entry-meta">{edu.duration}</span>
                    </div>
                    <p className="tl-entry-org">{edu.degree}{edu.location && ` · ${edu.location}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default TimelineTemplate
