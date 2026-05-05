import React from 'react'
import { Download, Mail, Globe, User, MapPin, ExternalLink } from 'lucide-react'
import html2pdf from 'html2pdf.js'

const Preview = ({ data }) => {
  const downloadPDF = () => {
    const element = document.getElementById('resume-content')
    const opt = {
      margin: 0,
      filename: `${data.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    html2pdf().from(element).set(opt).save()
  }

  return (
    <div className="preview-side">
      <div className="preview-toolbar">
        <div className="preview-status">
          <div className="status-dot"></div>
          Live Preview
        </div>
        <button className="download-btn" onClick={downloadPDF}>
          <Download size={18} />
          Download PDF
        </button>
      </div>

      <div className="resume-paper-container">
        <div id="resume-content" className="resume-paper">
          {/* Header */}
          <header className="resume-header">
            <h1>{data.personal.fullName || 'Your Name'}</h1>
            <p className="resume-title">{data.personal.title || 'Professional Title'}</p>
            
            <div className="resume-contact">
              {data.personal.email && (
                <span><Mail size={12} /> {data.personal.email}</span>
              )}
              {data.personal.location && (
                <span><MapPin size={12} /> {data.personal.location}</span>
              )}
              {data.personal.github && (
                <span><Globe size={12} /> {data.personal.github}</span>
              )}
              {data.personal.linkedin && (
                <span><User size={12} /> {data.personal.linkedin}</span>
              )}
            </div>
          </header>

          {/* Summary */}
          <section className="resume-section">
            <h2 className="section-heading">Professional Summary</h2>
            <p className="summary-text">{data.summary}</p>
          </section>

          {/* Skills */}
          <section className="resume-section">
            <h2 className="section-heading">Technical Skills</h2>
            <div className="skills-grid">
              {data.skills.map((skill, i) => (
                <span key={i} className="skill-item">{skill}</span>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="resume-section">
            <h2 className="section-heading">Key Projects</h2>
            <div className="projects-list">
              {data.projects.map((project) => (
                <div key={project.id} className="project-item">
                  <div className="project-header">
                    <h3>{project.title || 'Project Title'}</h3>
                    {project.link && (
                      <span className="project-link">
                        <ExternalLink size={10} /> {project.link.replace(/^https?:\/\//, '')}
                      </span>
                    )}
                  </div>
                  <p className="project-tech">Tech: {project.tech}</p>
                  <p className="project-desc">{project.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="resume-section">
              <h2 className="section-heading">Work Experience</h2>
              <div className="experience-list">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="experience-item">
                    <div className="exp-header">
                      <h3>{exp.company}</h3>
                      <span className="exp-duration">{exp.duration}</span>
                    </div>
                    <p className="exp-position">{exp.position}</p>
                    <p className="exp-desc">{exp.description}</p>
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
