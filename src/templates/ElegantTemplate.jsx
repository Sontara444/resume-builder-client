import React from 'react'
import { toArr, renderBold } from '../utils/resume-helpers'

const ElegantTemplate = ({ data }) => {
  return (
    <div className="resume-paper elegant-template">
      {/* ── Header ── */}
      <header className="minimal-header">
        <h1>{data.personal.fullName || 'Your Name'}</h1>
        <p className="minimal-title">{data.personal.title || 'Professional Title'}</p>
        <div className="minimal-contact">
          {[
            data.personal.email,
            data.personal.phone,
            data.personal.location,
            data.personal.github,
            data.personal.linkedin
          ].filter(Boolean).map((item, i) => (
            <span key={i}>{item.replace(/^https?:\/\//, '')}</span>
          ))}
        </div>
      </header>

      <div className="minimal-content">
        {/* ── Summary ── */}
        {data.summary && (
          <section className="minimal-section">
            <h2 className="minimal-heading">Profile</h2>
            <p className="minimal-summary">{data.summary}</p>
          </section>
        )}

        {/* ── Skills ── */}
        {data.skills.length > 0 && (
          <section className="minimal-section">
            <h2 className="minimal-heading">Skills</h2>
            <div className="minimal-skills-categorized">
              {data.skills.map((cat, i) => (
                <div key={cat.id || i} className="minimal-skill-row">
                  {cat.category && <strong>{cat.category}: </strong>}
                  {cat.items.join(', ')}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Experience ── */}
        {data.experience.length > 0 && (
          <section className="minimal-section">
            <h2 className="minimal-heading">Experience</h2>
            <div className="minimal-list">
              {data.experience.map((exp) => (
                <div key={exp.id} className="minimal-item">
                  <div className="minimal-item-header">
                    <span className="minimal-item-title">{exp.company}</span>
                    <span className="minimal-item-meta">{exp.duration}</span>
                  </div>
                  <div className="minimal-item-sub">{exp.position}</div>
                  {toArr(exp.description).length > 0 && (
                    <ul className="minimal-dots">
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
          <section className="minimal-section">
            <h2 className="minimal-heading">Projects</h2>
            <div className="minimal-list">
              {data.projects.map((project) => (
                <div key={project.id} className="minimal-item">
                  <div className="minimal-item-header">
                    <span className="minimal-item-title">{project.title}</span>
                    <span className="minimal-item-meta">{project.tech}</span>
                  </div>
                  {toArr(project.description).length > 0 && (
                    <ul className="minimal-dots">
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
          <section className="minimal-section">
            <h2 className="minimal-heading">Education</h2>
            <div className="minimal-list">
              {data.education.map((edu) => (
                <div key={edu.id} className="minimal-item">
                  <div className="minimal-item-header">
                    <span className="minimal-item-title">{edu.school}</span>
                    <span className="minimal-item-meta">{edu.duration}</span>
                  </div>
                  <div className="minimal-item-sub">{edu.degree} {edu.location && `| ${edu.location}`}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ElegantTemplate
