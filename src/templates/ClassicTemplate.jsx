import React from 'react'
import { toArr, renderBold } from '../utils/resume-helpers'

const ClassicTemplate = ({ data }) => {
  return (
    <div className="resume-paper classic-template" style={{ '--accent': data.themeColor }}>
      <div className="ats-header">
        <h1>{data.personal.fullName}</h1>
        <p>
          {[
            data.personal.location,
            data.personal.phone,
            data.personal.email,
            data.personal.linkedin,
            data.personal.github
          ].filter(Boolean).join(' | ')}
        </p>
      </div>

      <section className="ats-section">
        <h2 className="ats-heading">SUMMARY</h2>
        <p>{data.summary}</p>
      </section>

      <section className="ats-section">
        <h2 className="ats-heading">SKILLS</h2>
        {data.skills.map((cat, i) => (
          <div key={cat.id || i} style={{ fontSize: '0.85rem', marginBottom: '2pt' }}>
            {cat.category && <strong>{cat.category}: </strong>}
            {cat.items.join(', ')}
          </div>
        ))}
      </section>

      <section className="ats-section">
        <h2 className="ats-heading">EXPERIENCE</h2>
        {data.experience.map((exp) => (
          <div key={exp.id} className="ats-item">
            <div className="ats-item-header">
              <strong>{exp.company}</strong>
              <span>{exp.duration}</span>
            </div>
            <div className="ats-item-sub">
              <em>{exp.position}</em>
            </div>
            <ul className="ats-list">
              {toArr(exp.description).filter(p => p.trim()).map((p, i) => (
                <li key={i}>{renderBold(p)}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="ats-section">
        <h2 className="ats-heading">PROJECTS</h2>
        {data.projects.map((project) => (
          <div key={project.id} className="ats-item">
            <div className="ats-item-header">
              <strong>{project.title}</strong>
              <span>{project.tech}</span>
            </div>
            <ul className="ats-list">
              {toArr(project.description).filter(p => p.trim()).map((p, i) => (
                <li key={i}>{renderBold(p)}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="ats-section">
        <h2 className="ats-heading">EDUCATION</h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="ats-item">
            <div className="ats-item-header">
              <strong>{edu.school}</strong>
              <span>{edu.duration}</span>
            </div>
            <div className="ats-item-sub">
              {edu.degree} {edu.location && `| ${edu.location}`}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default ClassicTemplate
