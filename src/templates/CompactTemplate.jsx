import React from 'react'
import { toArr, renderBold } from '../utils/resume-helpers'

const CompactTemplate = ({ data }) => {
  const contactLine = [
    data.personal.email,
    data.personal.phone,
    data.personal.location,
    data.personal.github,
    data.personal.linkedin
  ].filter(Boolean).join(' · ')

  return (
    <div className="resume-paper compact-template" style={{ '--accent': data.themeColor }}>
      <header className="compact-header">
        <div className="compact-name-row">
          <h1>{data.personal.fullName || 'Your Name'}</h1>
          <span className="compact-title">{data.personal.title || 'Professional Title'}</span>
        </div>
        <p className="compact-contact">{contactLine}</p>
      </header>

      {data.summary && (
        <section className="compact-section">
          <h2 className="compact-heading">Summary</h2>
          <p className="compact-summary">{data.summary}</p>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="compact-section">
          <h2 className="compact-heading">Skills</h2>
          <div className="compact-skills">
            {data.skills.map((cat, i) => (
              <div key={cat.id || i} className="compact-skill-row">
                {cat.category && <strong>{cat.category}:</strong>} {cat.items.join(', ')}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="compact-section">
          <h2 className="compact-heading">Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="compact-item">
              <div className="compact-item-header">
                <span><strong>{exp.company}</strong> — {exp.position}</span>
                <span className="compact-meta">{exp.duration}</span>
              </div>
              {toArr(exp.description).filter(p => p.trim()).length > 0 && (
                <ul className="compact-dots">
                  {toArr(exp.description).filter(p => p.trim()).map((p, i) => (
                    <li key={i}>{renderBold(p)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="compact-section">
          <h2 className="compact-heading">Projects</h2>
          {data.projects.map((project) => (
            <div key={project.id} className="compact-item">
              <div className="compact-item-header">
                <span><strong>{project.title}</strong>{project.tech && <> — <em>{project.tech}</em></>}</span>
                {project.link && <span className="compact-meta">{project.link.replace(/^https?:\/\//, '')}</span>}
              </div>
              {toArr(project.description).filter(p => p.trim()).length > 0 && (
                <ul className="compact-dots">
                  {toArr(project.description).filter(p => p.trim()).map((p, i) => (
                    <li key={i}>{renderBold(p)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="compact-section">
          <h2 className="compact-heading">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="compact-item">
              <div className="compact-item-header">
                <span><strong>{edu.school}</strong> — {edu.degree}</span>
                <span className="compact-meta">{edu.duration}{edu.location && ` · ${edu.location}`}</span>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default CompactTemplate
