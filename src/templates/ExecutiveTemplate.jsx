import React from 'react'
import { toArr, renderBold } from '../utils/resume-helpers'

const ExecutiveTemplate = ({ data }) => {
  const contact = [
    data.personal.email,
    data.personal.phone,
    data.personal.location,
    data.personal.github,
    data.personal.linkedin
  ].filter(Boolean)

  return (
    <div className="resume-paper executive-template" style={{ '--accent': data.themeColor }}>
      <header className="exec-header">
        <div className="exec-rule" />
        <h1>{data.personal.fullName || 'Your Name'}</h1>
        <p className="exec-title">{data.personal.title || 'Professional Title'}</p>
        <div className="exec-rule" />
        <div className="exec-contact">
          {contact.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="exec-sep">·</span>}
              <span>{c.replace(/^https?:\/\//, '')}</span>
            </React.Fragment>
          ))}
        </div>
      </header>

      {data.summary && (
        <section className="exec-section">
          <h2 className="exec-heading">Executive Summary</h2>
          <p className="exec-summary">{data.summary}</p>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="exec-section">
          <h2 className="exec-heading">Core Competencies</h2>
          <div className="exec-skills">
            {data.skills.flatMap(cat => cat.items).map((item, i) => (
              <span key={i} className="exec-skill-tag">{item}</span>
            ))}
          </div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="exec-section">
          <h2 className="exec-heading">Professional Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="exec-item">
              <div className="exec-item-header">
                <div>
                  <h3>{exp.position}</h3>
                  <p className="exec-item-org">{exp.company}</p>
                </div>
                <span className="exec-item-meta">{exp.duration}</span>
              </div>
              {toArr(exp.description).filter(p => p.trim()).length > 0 && (
                <ul className="exec-dots">
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
        <section className="exec-section">
          <h2 className="exec-heading">Key Initiatives</h2>
          {data.projects.map((project) => (
            <div key={project.id} className="exec-item">
              <div className="exec-item-header">
                <div>
                  <h3>{project.title}</h3>
                  {project.tech && <p className="exec-item-org">{project.tech}</p>}
                </div>
                {project.link && <span className="exec-item-meta">{project.link.replace(/^https?:\/\//, '')}</span>}
              </div>
              {toArr(project.description).filter(p => p.trim()).length > 0 && (
                <ul className="exec-dots">
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
        <section className="exec-section">
          <h2 className="exec-heading">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="exec-item">
              <div className="exec-item-header">
                <div>
                  <h3>{edu.school}</h3>
                  <p className="exec-item-org">{edu.degree}</p>
                </div>
                <span className="exec-item-meta">{edu.duration}{edu.location && ` · ${edu.location}`}</span>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default ExecutiveTemplate
