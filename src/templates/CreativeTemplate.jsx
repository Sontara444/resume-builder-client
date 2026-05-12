import React from 'react'
import { Mail, Phone, MapPin, Globe, User, ExternalLink } from 'lucide-react'
import { toArr, renderBold } from '../utils/resume-helpers'

const CreativeTemplate = ({ data }) => {
  return (
    <div className="resume-paper creative-template" style={{ '--accent': data.themeColor }}>
      {/* ── Hero header ── */}
      <header className="creative-header">
        <div className="creative-header-bg" />
        <div className="creative-header-content">
          <div className="creative-initials">
            {(data.personal.fullName || 'YN').split(' ').map(w => w[0]).slice(0, 2).join('')}
          </div>
          <div className="creative-name-block">
            <h1>{data.personal.fullName || 'Your Name'}</h1>
            <p className="creative-title">{data.personal.title || 'Professional Title'}</p>
          </div>
        </div>
        <div className="creative-contact-bar">
          {data.personal.email    && <span><Mail size={9} />{data.personal.email}</span>}
          {data.personal.phone    && <span><Phone size={9} />{data.personal.phone}</span>}
          {data.personal.location && <span><MapPin size={9} />{data.personal.location}</span>}
          {data.personal.github   && <span><Globe size={9} />{data.personal.github}</span>}
          {data.personal.linkedin && <span><User size={9} />{data.personal.linkedin}</span>}
        </div>
      </header>

      <div className="creative-body">
        {data.summary && (
          <section className="creative-section">
            <h2 className="creative-heading">About</h2>
            <p className="creative-summary">{data.summary}</p>
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="creative-section">
            <h2 className="creative-heading">Skills</h2>
            <div className="creative-skills-grid">
              {data.skills.map((cat, i) => (
                <div key={cat.id || i} className="creative-skill-cat">
                  {cat.category && <p className="creative-skill-name">{cat.category}</p>}
                  <div className="creative-skill-tags">
                    {cat.items.map((item, ii) => (
                      <span key={ii} className="creative-tag">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="creative-section">
            <h2 className="creative-heading">Experience</h2>
            <div className="creative-list">
              {data.experience.map((exp) => (
                <div key={exp.id} className="creative-item">
                  <div className="creative-item-dot" />
                  <div className="creative-item-body">
                    <div className="creative-item-header">
                      <h3>{exp.position}</h3>
                      <span className="creative-meta">{exp.duration}</span>
                    </div>
                    <p className="creative-item-org">{exp.company}</p>
                    {toArr(exp.description).filter(p => p.trim()).length > 0 && (
                      <ul className="creative-dots">
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
          <section className="creative-section">
            <h2 className="creative-heading">Projects</h2>
            <div className="creative-projects-grid">
              {data.projects.map((project) => (
                <div key={project.id} className="creative-project-card">
                  <div className="creative-project-top">
                    <h3>{project.title}</h3>
                    {project.link && (
                      <span className="creative-project-link">
                        <ExternalLink size={9} />{project.link.replace(/^https?:\/\//, '')}
                      </span>
                    )}
                  </div>
                  {project.tech && <p className="creative-project-tech">{project.tech}</p>}
                  {toArr(project.description).filter(p => p.trim()).length > 0 && (
                    <ul className="creative-dots">
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

        {data.education && data.education.length > 0 && (
          <section className="creative-section">
            <h2 className="creative-heading">Education</h2>
            <div className="creative-list">
              {data.education.map((edu) => (
                <div key={edu.id} className="creative-item">
                  <div className="creative-item-dot" />
                  <div className="creative-item-body">
                    <div className="creative-item-header">
                      <h3>{edu.school}</h3>
                      <span className="creative-meta">{edu.duration}</span>
                    </div>
                    <p className="creative-item-org">{edu.degree}{edu.location && ` · ${edu.location}`}</p>
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

export default CreativeTemplate
