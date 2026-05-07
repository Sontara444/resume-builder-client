import React from 'react'
import { User, Briefcase, Code, FolderGit2, Trash2, Plus, RotateCcw } from 'lucide-react'

// Normalize any legacy description shape → string[]
const toArr = v => {
  const arr = Array.isArray(v) ? v : (v ? [v] : [])
  return arr.map(p => (typeof p === 'object' && p !== null) ? (p.text ?? '') : String(p))
}

const Editor = ({ data, updateData, addItem, removeItem, resetData }) => {
  const newId = () => crypto.randomUUID()

  const addPoint = (section, itemIndex) => {
    const points = toArr(data[section][itemIndex].description)
    updateData(section, 'description', [...points, ''], itemIndex)
  }

  const updatePoint = (section, itemIndex, pointIndex, value) => {
    const points = toArr(data[section][itemIndex].description).map((p, i) => i === pointIndex ? value : p)
    updateData(section, 'description', points, itemIndex)
  }

  const removePoint = (section, itemIndex, pointIndex) => {
    const points = toArr(data[section][itemIndex].description).filter((_, i) => i !== pointIndex)
    updateData(section, 'description', points, itemIndex)
  }

  // Wraps the selected text in the focused input with **...**
  const applyBold = (e, section, itemIndex, pointIndex, currentValue) => {
    e.preventDefault() // keep the input focused
    const input = document.activeElement
    if (!input || input.tagName !== 'INPUT') return
    const s = input.selectionStart
    const end = input.selectionEnd
    const newValue = s === end
      ? currentValue.slice(0, s) + '****' + currentValue.slice(s)
      : currentValue.slice(0, s) + `**${currentValue.slice(s, end)}**` + currentValue.slice(end)
    updatePoint(section, itemIndex, pointIndex, newValue)
  }

  return (
    <div className="editor-side">
      <header className="editor-header">
        <div className="header-top">
          <div className="logo">
            <Code className="logo-icon" size={20} />
            <span>DevResume</span>
          </div>
          <button className="reset-btn" onClick={resetData} title="Reset to default">
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
        <p>Build your professional resume in minutes.</p>
      </header>

      <div className="editor-content">

        {/* Personal Info */}
        <section className="editor-section">
          <div className="section-title">
            <User size={15} />
            <h2>Personal Info</h2>
          </div>
          <div className="input-grid">
            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={data.personal.fullName}
                onChange={(e) => updateData('personal', 'fullName', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="input-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={data.personal.title}
                onChange={(e) => updateData('personal', 'title', e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={data.personal.email}
                onChange={(e) => updateData('personal', 'email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                value={data.personal.phone || ''}
                onChange={(e) => updateData('personal', 'phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="input-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                value={data.personal.location}
                onChange={(e) => updateData('personal', 'location', e.target.value)}
                placeholder="City, Country"
              />
            </div>
            <div className="input-group">
              <label htmlFor="github">GitHub</label>
              <input
                id="github"
                type="text"
                value={data.personal.github}
                onChange={(e) => updateData('personal', 'github', e.target.value)}
                placeholder="github.com/username"
              />
            </div>
            <div className="input-group">
              <label htmlFor="linkedin">LinkedIn</label>
              <input
                id="linkedin"
                type="text"
                value={data.personal.linkedin}
                onChange={(e) => updateData('personal', 'linkedin', e.target.value)}
                placeholder="linkedin.com/in/username"
              />
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="editor-section">
          <div className="section-title">
            <Briefcase size={15} />
            <h2>Summary</h2>
          </div>
          <textarea
            id="summary"
            rows="4"
            value={data.summary}
            onChange={(e) => updateData('summary', null, e.target.value)}
            placeholder="Write a brief overview of your professional background..."
          />
        </section>

        {/* Tech Stack */}
        <section className="editor-section">
          <div className="section-title">
            <Code size={15} />
            <h2>Tech Stack</h2>
          </div>
          <div className="tags-input-container">
            <input
              type="text"
              aria-label="Add a skill and press Enter"
              placeholder="Type a skill and press Enter…"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  updateData('skills', null, [...data.skills, e.target.value.trim()])
                  e.target.value = ''
                }
              }}
            />
            {data.skills.length > 0 && (
              <div className="tags-list">
                {data.skills.map((skill, i) => (
                  <span key={skill + i} className="skill-tag">
                    {skill}
                    <button
                      aria-label={`Remove ${skill}`}
                      onClick={() => updateData('skills', null, data.skills.filter((_, idx) => idx !== i))}
                    >
                      <Plus size={11} style={{ transform: 'rotate(45deg)' }} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Projects */}
        <section className="editor-section">
          <div className="section-title">
            <FolderGit2 size={15} />
            <h2>Projects</h2>
            <button
              className="add-btn"
              onClick={() => addItem('projects', { id: newId(), title: '', description: [], tech: '', link: '' })}
            >
              <Plus size={13} /> Add
            </button>
          </div>
          {data.projects.map((project, index) => (
            <div key={project.id} className="item-card">
              <div className="item-card-header">
                <input
                  type="text"
                  className="item-title-input"
                  value={project.title}
                  onChange={(e) => updateData('projects', 'title', e.target.value, index)}
                  placeholder="Project Name"
                  aria-label="Project name"
                />
                <button
                  className="delete-btn"
                  aria-label="Remove project"
                  onClick={() => removeItem('projects', project.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="points-editor">
                {toArr(project.description).map((point, pi) => (
                  <div key={pi} className="point-row">
                    <span className="point-bullet" />
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => updatePoint('projects', index, pi, e.target.value)}
                      placeholder="Describe a feature… (select words + B to bold)"
                      aria-label={`Project point ${pi + 1}`}
                    />
                    <button
                      className="point-bold"
                      aria-label="Bold selected text"
                      onMouseDown={(e) => applyBold(e, 'projects', index, pi, point)}
                    >B</button>
                    <button
                      className="point-remove"
                      aria-label="Remove point"
                      onClick={() => removePoint('projects', index, pi)}
                    >
                      <Plus size={11} style={{ transform: 'rotate(45deg)' }} />
                    </button>
                  </div>
                ))}
                <button className="add-point-btn" onClick={() => addPoint('projects', index)}>
                  <Plus size={11} /> Add point
                </button>
              </div>
              <input
                type="text"
                value={project.tech}
                onChange={(e) => updateData('projects', 'tech', e.target.value, index)}
                placeholder="Tech stack (e.g. React, Node.js)"
                aria-label="Technologies used"
              />
              <input
                type="text"
                value={project.link}
                onChange={(e) => updateData('projects', 'link', e.target.value, index)}
                placeholder="Project URL"
                aria-label="Project link"
              />
            </div>
          ))}
        </section>

        {/* Work Experience */}
        <section className="editor-section">
          <div className="section-title">
            <Briefcase size={15} />
            <h2>Work Experience</h2>
            <button
              className="add-btn"
              onClick={() => addItem('experience', { id: newId(), company: '', position: '', duration: '', description: [] })}
            >
              <Plus size={13} /> Add
            </button>
          </div>
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="item-card">
              <div className="item-card-header">
                <input
                  type="text"
                  className="item-title-input"
                  value={exp.company}
                  onChange={(e) => updateData('experience', 'company', e.target.value, index)}
                  placeholder="Company Name"
                  aria-label="Company name"
                />
                <button
                  className="delete-btn"
                  aria-label="Remove experience"
                  onClick={() => removeItem('experience', exp.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateData('experience', 'position', e.target.value, index)}
                placeholder="Job Title"
                aria-label="Job title"
              />
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => updateData('experience', 'duration', e.target.value, index)}
                placeholder="Duration (e.g. 2021 – Present)"
                aria-label="Duration"
              />
              <div className="points-editor">
                {toArr(exp.description).map((point, pi) => (
                  <div key={pi} className="point-row">
                    <span className="point-bullet" />
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => updatePoint('experience', index, pi, e.target.value)}
                      placeholder="Describe a responsibility… (select words + B to bold)"
                      aria-label={`Experience point ${pi + 1}`}
                    />
                    <button
                      className="point-bold"
                      aria-label="Bold selected text"
                      onMouseDown={(e) => applyBold(e, 'experience', index, pi, point)}
                    >B</button>
                    <button
                      className="point-remove"
                      aria-label="Remove point"
                      onClick={() => removePoint('experience', index, pi)}
                    >
                      <Plus size={11} style={{ transform: 'rotate(45deg)' }} />
                    </button>
                  </div>
                ))}
                <button className="add-point-btn" onClick={() => addPoint('experience', index)}>
                  <Plus size={11} /> Add point
                </button>
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  )
}

export default Editor
