import React from 'react'
import { toArr, renderBold } from '../utils/resume-helpers'

const BoldTemplate = ({ data }) => {
  return (
    <div className="resume-paper bold-template" style={{ '--accent': data.themeColor }}>
      <header className="bold-header">
        <div className="bold-header-inner">
          <h1>{data.personal.fullName || 'Your Name'}</h1>
          <p className="bold-title">{data.personal.title || 'Professional Title'}</p>
        </div>
        <div className="bold-contact">
          {[data.personal.email, data.personal.phone, data.personal.location, data.personal.github, data.personal.linkedin]
            .filter(Boolean)
            .map((item, i) => (
              <span key={i}>{item.replace(/^https?:\/\//, '')}</span>
            ))}
        </div>
      </header>

      <div className="bold-body">
        {data.summary && (
          <section className="bold-section">
            <h2 className="bold-heading">Profile</h2>
            <p className="bold-summary">{data.summary}</p>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="bold-section">
            <h2 className="bold-heading">Skills</h2>
            <div className="bold-skills-grid">
              {data.skills.map((cat, i) => (
                <div key={cat.id || i} className="bold-skill-card">
                  {cat.category && <p className="bold-skill-name">{cat.category}</p>}
                  <p className="bold-skill-items">{cat.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="bold-section">
            <h2 className="bold-heading">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="bold-item">
                <div className="bold-item-header">
                  <div>
                    <h3>{exp.position}</h3>
                    <p className="bold-item-org">{exp.company}</p>
                  </div>
                  <span className="bold-item-meta">{exp.duration}</span>
                </div>
                {toArr(exp.description).filter(p => p.trim()).length > 0 && (
                  <ul className="bold-dots">
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
          <section className="bold-section">
            <h2 className="bold-heading">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="bold-item">
                <div className="bold-item-header">
                  <div>
                    <h3>{project.title}</h3>
                    {project.tech && <p className="bold-item-org">{project.tech}</p>}
                  </div>
                  {project.link && <span className="bold-item-meta">{project.link.replace(/^https?:\/\//, '')}</span>}
                </div>
                {toArr(project.description).filter(p => p.trim()).length > 0 && (
                  <ul className="bold-dots">
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
          <section className="bold-section">
            <h2 className="bold-heading">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="bold-item">
                <div className="bold-item-header">
                  <div>
                    <h3>{edu.school}</h3>
                    <p className="bold-item-org">{edu.degree}</p>
                  </div>
                  <span className="bold-item-meta">{edu.duration}{edu.location && ` · ${edu.location}`}</span>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default BoldTemplate
