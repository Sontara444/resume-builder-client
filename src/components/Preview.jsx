import React, { useState } from 'react'
import { Download, Mail, Globe, User, MapPin, Phone, ExternalLink } from 'lucide-react'
import html2pdf from 'html2pdf.js'

const toArr = v => {
  const arr = Array.isArray(v) ? v : (v ? [v] : [])
  return arr.map(p => (typeof p === 'object' && p !== null) ? (p.text ?? '') : String(p))
}

// Parse **word** markers into <strong> spans
const renderBold = (text) =>
  text.split(/\*\*/).map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)

const Preview = ({ data }) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadPDF = async () => {
    if (isDownloading) return
    setIsDownloading(true)
    try {
      const element = document.getElementById('resume-content')
      const safeName = (data.personal.fullName || 'Resume').replace(/\s+/g, '_')
      const opt = {
        margin: 0,
        filename: `${safeName}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      await html2pdf().from(element).set(opt).save()
    } catch (err) {
      console.error('PDF generation failed:', err)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="preview-side">
      <div className="preview-toolbar">
        <div className="preview-status">
          <div className="status-dot" />
          Live Preview
        </div>
        <button
          className="download-btn"
          onClick={downloadPDF}
          disabled={isDownloading}
          aria-label="Download resume as PDF"
        >
          <Download size={16} />
          {isDownloading ? 'Generating…' : 'Download PDF'}
        </button>
      </div>

      <div className="resume-paper-container">
        <div id="resume-content" className="resume-paper">

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
              <h2 className="section-heading">About</h2>
              <p className="summary-text">{data.summary}</p>
            </section>
          )}

          {/* ── Skills ── */}
          {data.skills.length > 0 && (
            <section className="resume-section">
              <h2 className="section-heading">Technical Skills</h2>
              <div className="skills-grid">
                {data.skills.map((skill, i) => (
                  <span key={skill + i} className="skill-item">{skill}</span>
                ))}
              </div>
            </section>
          )}

          {/* ── Projects ── */}
          {data.projects.length > 0 && (
            <section className="resume-section">
              <h2 className="section-heading">Projects</h2>
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

          {/* ── Experience ── */}
          {data.experience.length > 0 && (
            <section className="resume-section">
              <h2 className="section-heading">Work Experience</h2>
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

        </div>
      </div>
    </div>
  )
}

export default Preview
