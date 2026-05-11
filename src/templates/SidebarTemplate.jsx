import React from 'react'
import { Mail, Phone, MapPin, Globe, User } from 'lucide-react'
import { toArr, renderBold } from '../utils/resume-helpers'

const SidebarTemplate = ({ data }) => {
  return (
    <div className="resume-paper sidebar-template" style={{ '--accent': data.themeColor }}>
      <aside className="sidebar-col">
        <div className="sidebar-name-block">
          <h1>{data.personal.fullName || 'Your Name'}</h1>
          <p className="sidebar-title">{data.personal.title || 'Professional Title'}</p>
        </div>

        <div className="sidebar-block">
          <h2 className="sidebar-heading">Contact</h2>
          <ul className="sidebar-contact">
            {data.personal.email    && <li><Mail size={10} /> <span>{data.personal.email}</span></li>}
            {data.personal.phone    && <li><Phone size={10} /> <span>{data.personal.phone}</span></li>}
            {data.personal.location && <li><MapPin size={10} /> <span>{data.personal.location}</span></li>}
            {data.personal.github   && <li><Globe size={10} /> <span>{data.personal.github}</span></li>}
            {data.personal.linkedin && <li><User size={10} /> <span>{data.personal.linkedin}</span></li>}
          </ul>
        </div>

        {data.skills.length > 0 && (
          <div className="sidebar-block">
            <h2 className="sidebar-heading">Skills</h2>
            <div className="sidebar-skills">
              {data.skills.map((cat, i) => (
                <div key={cat.id || i} className="sidebar-skill-cat">
                  {cat.category && <p className="sidebar-skill-name">{cat.category}</p>}
                  <p className="sidebar-skill-items">{cat.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education && data.education.length > 0 && (
          <div className="sidebar-block">
            <h2 className="sidebar-heading">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="sidebar-edu">
                <p className="sidebar-edu-school">{edu.school}</p>
                <p className="sidebar-edu-degree">{edu.degree}</p>
                <p className="sidebar-edu-meta">{edu.duration}{edu.location && ` · ${edu.location}`}</p>
              </div>
            ))}
          </div>
        )}
      </aside>

      <main className="sidebar-main">
        {data.summary && (
          <section className="sidebar-section">
            <h2 className="sidebar-main-heading">Profile</h2>
            <p className="sidebar-summary">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="sidebar-section">
            <h2 className="sidebar-main-heading">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="sidebar-item">
                <div className="sidebar-item-header">
                  <h3>{exp.position}</h3>
                  <span>{exp.duration}</span>
                </div>
                <p className="sidebar-item-sub">{exp.company}</p>
                {toArr(exp.description).filter(p => p.trim()).length > 0 && (
                  <ul className="sidebar-dots">
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
          <section className="sidebar-section">
            <h2 className="sidebar-main-heading">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="sidebar-item">
                <div className="sidebar-item-header">
                  <h3>{project.title}</h3>
                  {project.link && <span>{project.link.replace(/^https?:\/\//, '')}</span>}
                </div>
                {project.tech && <p className="sidebar-item-sub">{project.tech}</p>}
                {toArr(project.description).filter(p => p.trim()).length > 0 && (
                  <ul className="sidebar-dots">
                    {toArr(project.description).filter(p => p.trim()).map((p, i) => (
                      <li key={i}>{renderBold(p)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

export default SidebarTemplate
