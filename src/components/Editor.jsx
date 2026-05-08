import React from 'react'
import { User, Briefcase, Code, FolderGit2, Trash2, Plus, RotateCcw, GraduationCap, Layout, Copy, FilePlus, ChevronDown, Pencil, Eye, Zap } from 'lucide-react'
import ATSScore from './ATSScore'

// Normalize any legacy description shape → string[]
const toArr = v => {
  const arr = Array.isArray(v) ? v : (v ? [v] : [])
  return arr.map(p => (typeof p === 'object' && p !== null) ? (p.text ?? '') : String(p))
}

const Editor = ({ 
  data, resumes, activeId, updateData, addItem, removeItem, resetData, 
  createNewResume, duplicateResume, deleteResume, switchResume, renameResume,
  onTogglePreview
}) => {
  const [expanded, setExpanded] = React.useState({
    resumes: true,
    template: true,
    personal: true,
    summary: false,
    skills: false,
    projects: false,
    experience: false,
    education: false
  })

  const toggle = (sec) => setExpanded(prev => ({ ...prev, [sec]: !prev[sec] }))

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

          <ATSScore data={data} />

          <div className="header-actions">
            <button className="mobile-only-btn" onClick={onTogglePreview}>
              <Eye size={14} /> Preview
            </button>
            <button className="reset-btn" onClick={resetData} title="Reset to default">
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>
        <p>Build your professional resume in minutes.</p>
      </header>

      <div className="editor-content">
        {/* Resume Management */}
        <section className={`editor-section ${expanded.resumes ? 'is-expanded' : ''}`}>
          <div className="section-title clickable" onClick={() => toggle('resumes')}>
            <FilePlus size={15} />
            <h2>My Resumes</h2>
            <ChevronDown size={14} className="chevron" />
            <button className="add-btn" onClick={(e) => { e.stopPropagation(); createNewResume(); }}>
              <Plus size={13} /> New
            </button>
          </div>
          {expanded.resumes && (
            <div className="resume-list">
              {resumes.map(r => (
                <div key={r.id} className={`resume-item-tab ${r.id === activeId ? 'active' : ''}`}>
                  <div className="resume-item-main" onClick={() => switchResume(r.id)}>
                    <span className="resume-name">{r.name || 'Untitled'}</span>
                    <span className="resume-date">{new Date(r.lastModified).toLocaleDateString()}</span>
                  </div>
                  <div className="resume-item-actions">
                    <button onClick={() => {
                      const newName = prompt('Enter new resume name:', r.name)
                      if (newName) renameResume(r.id, newName)
                    }} title="Rename">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => duplicateResume(r.id)} title="Duplicate">
                      <Copy size={13} />
                    </button>
                    <button className="del" onClick={() => deleteResume(r.id)} title="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Template Selection */}
        <section className={`editor-section ${expanded.template ? 'is-expanded' : ''}`}>
          <div className="section-title clickable" onClick={() => toggle('template')}>
            <Layout size={15} />
            <h2>Resume Template</h2>
            <ChevronDown size={14} className="chevron" />
          </div>
          {expanded.template && (
            <div className="template-options-container">
              <div className="template-grid">
                {[
                  { id: 'vibrant', label: 'Vibrant' },
                  { id: 'elegant', label: 'Elegant' },
                  { id: 'classic', label: 'Classic' }
                ].map((t) => (
                  <button
                    key={t.id}
                    className={`template-btn ${data.template === t.id ? 'active' : ''}`}
                    onClick={() => updateData('template', null, t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="color-palette-section">
                <p className="sub-label">Accent Color</p>
                <div className="color-grid">
                  {[
                    '#ff9100', // Original Orange
                    '#2563eb', // Royal Blue
                    '#059669', // Forest Green
                    '#4b5563', // Slate
                    '#111827', // Deep Black
                    '#9f1239', // Burgundy
                  ].map(color => (
                    <button
                      key={color}
                      className={`color-btn ${data.themeColor === color ? 'active' : ''}`}
                      style={{ '--color': color }}
                      onClick={() => updateData('themeColor', null, color)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Personal Info */}
        <section className={`editor-section ${expanded.personal ? 'is-expanded' : ''}`}>
          <div className="section-title clickable" onClick={() => toggle('personal')}>
            <User size={15} />
            <h2>Personal Info</h2>
            <ChevronDown size={14} className="chevron" />
          </div>
          {expanded.personal && (
            <div className="input-grid">
              <div className="input-group full-width">
                <label htmlFor="resumeName">Resume Name (Private)</label>
                <input
                  id="resumeName"
                  type="text"
                  value={data.name || ''}
                  onChange={(e) => updateData('name', null, e.target.value)}
                  placeholder="e.g. Frontend Developer Resume"
                />
              </div>
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
          )}
        </section>

        {/* Summary */}
        <section className={`editor-section ${expanded.summary ? 'is-expanded' : ''}`}>
          <div className="section-title clickable" onClick={() => toggle('summary')}>
            <Briefcase size={15} />
            <h2>Summary</h2>
            <ChevronDown size={14} className="chevron" />
          </div>
          {expanded.summary && (
            <textarea
              id="summary"
              rows="4"
              value={data.summary}
              onChange={(e) => updateData('summary', null, e.target.value)}
              placeholder="Write a brief overview of your professional background..."
            />
          )}
        </section>

        {/* Tech Stack */}
        <section className={`editor-section ${expanded.skills ? 'is-expanded' : ''}`}>
          <div className="section-title clickable" onClick={() => toggle('skills')}>
            <Code size={15} />
            <h2>Tech Stack</h2>
            <ChevronDown size={14} className="chevron" />
            <button
              className="add-btn"
              onClick={(e) => { e.stopPropagation(); addItem('skills', { id: newId(), category: '', items: [] }); }}
            >
              <Plus size={13} /> Add Category
            </button>
          </div>
          {expanded.skills && (
            <div className="skill-categories-list">
              {data.skills.map((cat, ci) => (
                <div key={cat.id} className="skill-cat-item">
                  <div className="item-card-header">
                    <input
                      type="text"
                      className="item-title-input"
                      value={cat.category}
                      onChange={(e) => {
                        const newSkills = [...data.skills]
                        newSkills[ci].category = e.target.value
                        updateData('skills', null, newSkills)
                      }}
                      placeholder="Category Name (e.g. Frameworks)"
                    />
                    <button
                      className="delete-btn"
                      onClick={() => removeItem('skills', cat.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="tags-input-container">
                    <input
                      type="text"
                      placeholder="Add skill and press Enter…"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          const newSkills = [...data.skills]
                          newSkills[ci].items = [...newSkills[ci].items, e.target.value.trim()]
                          updateData('skills', null, newSkills)
                          e.target.value = ''
                        }
                      }}
                    />
                    <div className="tags-list">
                      {cat.items.map((item, ii) => (
                        <span key={item + ii} className="skill-tag">
                          {item}
                          <button
                            onClick={() => {
                              const newSkills = [...data.skills]
                              newSkills[ci].items = cat.items.filter((_, idx) => idx !== ii)
                              updateData('skills', null, newSkills)
                            }}
                          >
                            <Plus size={11} style={{ transform: 'rotate(45deg)' }} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Projects */}
        <section className={`editor-section ${expanded.projects ? 'is-expanded' : ''}`}>
          <div className="section-title clickable" onClick={() => toggle('projects')}>
            <FolderGit2 size={15} />
            <h2>Projects</h2>
            <ChevronDown size={14} className="chevron" />
            <button
              className="add-btn"
              onClick={(e) => { e.stopPropagation(); addItem('projects', { id: newId(), title: '', description: [], tech: '', link: '' }); }}
            >
              <Plus size={13} /> Add
            </button>
          </div>
          {expanded.projects && data.projects.map((project, index) => (
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
        <section className={`editor-section ${expanded.experience ? 'is-expanded' : ''}`}>
          <div className="section-title clickable" onClick={() => toggle('experience')}>
            <Briefcase size={15} />
            <h2>Work Experience</h2>
            <ChevronDown size={14} className="chevron" />
            <button
              className="add-btn"
              onClick={(e) => { e.stopPropagation(); addItem('experience', { id: newId(), company: '', position: '', duration: '', description: [] }); }}
            >
              <Plus size={13} /> Add
            </button>
          </div>
          {expanded.experience && data.experience.map((exp, index) => (
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

        {/* Education */}
        <section className={`editor-section ${expanded.education ? 'is-expanded' : ''}`}>
          <div className="section-title clickable" onClick={() => toggle('education')}>
            <GraduationCap size={15} />
            <h2>Education</h2>
            <ChevronDown size={14} className="chevron" />
            <button
              className="add-btn"
              onClick={(e) => { e.stopPropagation(); addItem('education', { id: newId(), school: '', degree: '', duration: '', location: '' }); }}
            >
              <Plus size={13} /> Add
            </button>
          </div>
          {expanded.education && data.education.map((edu, index) => (
            <div key={edu.id} className="item-card">
              <div className="item-card-header">
                <input
                  type="text"
                  className="item-title-input"
                  value={edu.school}
                  onChange={(e) => updateData('education', 'school', e.target.value, index)}
                  placeholder="University/School Name"
                  aria-label="School name"
                />
                <button
                  className="delete-btn"
                  aria-label="Remove education"
                  onClick={() => removeItem('education', edu.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateData('education', 'degree', e.target.value, index)}
                placeholder="Degree/Certificate"
                aria-label="Degree"
              />
              <div className="input-grid" style={{ marginTop: '0.5rem' }}>
                <input
                  type="text"
                  value={edu.duration}
                  onChange={(e) => updateData('education', 'duration', e.target.value, index)}
                  placeholder="Duration (e.g. 2017 – 2021)"
                  aria-label="Duration"
                />
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => updateData('education', 'location', e.target.value, index)}
                  placeholder="Location"
                  aria-label="Location"
                />
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  )
}

export default Editor
