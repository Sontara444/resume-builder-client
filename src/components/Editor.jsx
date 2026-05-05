import React from 'react'
import { User, Briefcase, Code, FolderGit2, Trash2, Plus, Globe, Mail, MapPin } from 'lucide-react'

const Editor = ({ data, updateData, addItem, removeItem }) => {
  return (
    <div className="editor-side">
      <header className="editor-header">
        <div className="logo">
          <Code className="logo-icon" />
          <span>DevResume</span>
        </div>
        <p>Build your professional resume in minutes.</p>
      </header>

      <div className="editor-content">
        {/* Personal Info */}
        <section className="editor-section">
          <div className="section-title">
            <User size={18} />
            <h2>Personal Information</h2>
          </div>
          <div className="input-grid">
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={data.personal.fullName}
                onChange={(e) => updateData('personal', 'fullName', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="input-group">
              <label>Professional Title</label>
              <input 
                type="text" 
                value={data.personal.title}
                onChange={(e) => updateData('personal', 'title', e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                value={data.personal.email}
                onChange={(e) => updateData('personal', 'email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="input-group">
              <label>Location</label>
              <input 
                type="text" 
                value={data.personal.location}
                onChange={(e) => updateData('personal', 'location', e.target.value)}
                placeholder="City, Country"
              />
            </div>
            <div className="input-group">
              <label>GitHub</label>
              <input 
                type="text" 
                value={data.personal.github}
                onChange={(e) => updateData('personal', 'github', e.target.value)}
                placeholder="github.com/username"
              />
            </div>
            <div className="input-group">
              <label>LinkedIn</label>
              <input 
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
            <Briefcase size={18} />
            <h2>Professional Summary</h2>
          </div>
          <textarea 
            rows="4"
            value={data.summary}
            onChange={(e) => updateData('summary', null, e.target.value)}
            placeholder="Write a brief overview of your professional background..."
          ></textarea>
        </section>

        {/* Tech Stack */}
        <section className="editor-section">
          <div className="section-title">
            <Code size={18} />
            <h2>Tech Stack</h2>
          </div>
          <div className="tags-input-container">
            <input 
              type="text" 
              placeholder="Add skill (e.g. React) and press enter"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  updateData('skills', null, [...data.skills, e.target.value.trim()])
                  e.target.value = ''
                }
              }}
            />
            <div className="tags-list">
              {data.skills.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                  <button onClick={() => updateData('skills', null, data.skills.filter((_, idx) => idx !== i))}>
                    <Plus size={12} style={{ transform: 'rotate(45deg)' }} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="editor-section">
          <div className="section-title">
            <FolderGit2 size={18} />
            <h2>Projects</h2>
            <button className="add-btn" onClick={() => addItem('projects', { id: Date.now(), title: '', description: '', tech: '', link: '' })}>
              <Plus size={16} /> Add
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
                />
                <button className="delete-btn" onClick={() => removeItem('projects', project.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea 
                rows="2"
                value={project.description}
                onChange={(e) => updateData('projects', 'description', e.target.value, index)}
                placeholder="Description"
              ></textarea>
              <input 
                type="text" 
                value={project.tech}
                onChange={(e) => updateData('projects', 'tech', e.target.value, index)}
                placeholder="Tech Used (e.g. React, Node.js)"
              />
              <input 
                type="text" 
                value={project.link}
                onChange={(e) => updateData('projects', 'link', e.target.value, index)}
                placeholder="Project Link"
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default Editor
