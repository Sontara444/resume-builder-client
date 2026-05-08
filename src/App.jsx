import { useState, useEffect, useCallback } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'

const INITIAL_DATA = {
  personal: {
    fullName: 'Alex Developer',
    title: 'Full Stack Engineer',
    email: 'alex@example.com',
    phone: '+1 (555) 000-0000',
    github: 'github.com/alexdev',
    linkedin: 'linkedin.com/in/alexdev',
    location: 'San Francisco, CA'
  },
  summary: 'Passionate Full Stack Engineer with 3+ years of experience building scalable web applications. Specialist in React, Node.js, and cloud architecture.',
  skills: [
    { id: 's1', category: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java'] },
    { id: 's2', category: 'Frameworks', items: ['React', 'Next.js', 'Node.js', 'TailwindCSS'] },
    { id: 's3', category: 'Tools', items: ['Git', 'Docker', 'AWS', 'PostgreSQL'] }
  ],
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: [
        'Built **real-time inventory management** with WebSocket sync across 50k+ SKUs.',
        'Integrated Stripe payments with fraud detection, **reducing chargebacks by 30%**.',
      ],
      tech: 'React, Redux, Node.js, Stripe',
      link: 'https://demo-shop.com'
    },
    {
      id: '2',
      title: 'AI Chatbot Dashboard',
      description: [
        'Integrated **OpenAI API** for automated customer support with sentiment analysis.',
        'Reduced average response time **from 4 min to 18 sec** across 10k daily sessions.',
      ],
      tech: 'Next.js, OpenAI, Firebase',
      link: 'https://ai-helper.io'
    }
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Innovators Inc.',
      position: 'Senior Frontend Developer',
      duration: '2021 - Present',
      description: [
        'Led **migration to React 18**, improving core web vitals scores by 40%.',
        'Mentored **4 junior engineers** and established a component library used across 6 products.',
      ]
    }
  ],
  education: [
    {
      id: '1',
      school: 'Global Tech University',
      degree: 'B.S. in Computer Science',
      duration: '2017 - 2021',
      location: 'New York, NY'
    }
  ],
  template: 'vibrant'
}

function normalizeSkills(skills) {
  if (!Array.isArray(skills)) return []
  // If old format: ['React', 'Node'] -> [{ category: 'Tech Stack', items: [...] }]
  if (skills.length > 0 && typeof skills[0] === 'string') {
    return [{ id: 'migrated', category: 'Tech Stack', items: skills }]
  }
  return skills.map(s => ({
    id: s.id || crypto.randomUUID(),
    category: s.category || 'Category',
    items: Array.isArray(s.items) ? s.items : []
  }))
}

// Normalize any legacy format (string | {text,bold}[] | string[]) → string[]
function normalizeDesc(v) {
  const arr = Array.isArray(v) ? v : (v ? [v] : [])
  return arr.map(p => (typeof p === 'object' && p !== null) ? p.text ?? '' : String(p))
}

function normalizeData(data) {
  return {
    ...data,
    summary:    data.summary || '',
    skills:     normalizeSkills(data.skills),
    projects:   data.projects.map(p => ({ ...p, description: normalizeDesc(p.description) })),
    experience: data.experience.map(e => ({ ...e, description: normalizeDesc(e.description) })),
    education:  data.education || [],
    template:   data.template || 'vibrant'
  }
}

const STORAGE_KEY = 'devresume_collection'

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return { resumes: [{ ...INITIAL_DATA, id: '1', name: 'My First Resume', lastModified: Date.now() }], activeId: '1' }
    
    const parsed = JSON.parse(saved)
    // Migration: If it's the old single-resume format
    if (parsed.personal && !parsed.resumes) {
      const first = { ...normalizeData(parsed), id: '1', name: 'My First Resume', lastModified: Date.now() }
      return { resumes: [first], activeId: '1' }
    }
    
    return {
      resumes: (parsed.resumes || []).map(r => ({ ...normalizeData(r), id: r.id || crypto.randomUUID() })),
      activeId: parsed.activeId || parsed.resumes?.[0]?.id || '1'
    }
  } catch {
    return { resumes: [{ ...INITIAL_DATA, id: '1', name: 'My First Resume', lastModified: Date.now() }], activeId: '1' }
  }
}

function App() {
  const [storageData, setStorageData] = useState(loadFromStorage)
  const { resumes, activeId } = storageData

  const activeResume = resumes.find(r => r.id === activeId) || resumes[0]

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData))
  }, [storageData])

  const updateData = useCallback((section, field, value, index = null) => {
    setStorageData(prev => ({
      ...prev,
      resumes: prev.resumes.map(r => {
        if (r.id !== activeId) return r
        let updated = { ...r, lastModified: Date.now() }
        if (index !== null) {
          updated[section] = r[section].map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          )
        } else if (field) {
          updated[section] = { ...r[section], [field]: value }
        } else {
          updated[section] = value
        }
        return updated
      })
    }))
  }, [activeId])

  const addItem = useCallback((section, item) => {
    setStorageData(prev => ({
      ...prev,
      resumes: prev.resumes.map(r => 
        r.id === activeId ? { ...r, [section]: [...r[section], item], lastModified: Date.now() } : r
      )
    }))
  }, [activeId])

  const removeItem = useCallback((section, id) => {
    setStorageData(prev => ({
      ...prev,
      resumes: prev.resumes.map(r => 
        r.id === activeId ? { ...r, [section]: r[section].filter(item => item.id !== id), lastModified: Date.now() } : r
      )
    }))
  }, [activeId])

  const createNewResume = useCallback(() => {
    const newId = crypto.randomUUID()
    const newResume = { 
      ...INITIAL_DATA, 
      id: newId, 
      name: `New Resume ${resumes.length + 1}`,
      lastModified: Date.now()
    }
    setStorageData(prev => ({
      resumes: [newResume, ...prev.resumes],
      activeId: newId
    }))
  }, [resumes.length])

  const duplicateResume = useCallback((id) => {
    const original = resumes.find(r => r.id === id)
    if (!original) return
    const newId = crypto.randomUUID()
    const duplicate = { 
      ...original, 
      id: newId, 
      name: `${original.name} (Copy)`,
      lastModified: Date.now()
    }
    setStorageData(prev => ({
      resumes: [duplicate, ...prev.resumes],
      activeId: newId
    }))
  }, [resumes])

  const deleteResume = useCallback((id) => {
    if (resumes.length <= 1) {
      alert("You must have at least one resume.")
      return
    }
    if (!window.confirm("Are you sure you want to delete this resume?")) return
    
    setStorageData(prev => {
      const filtered = prev.resumes.filter(r => r.id !== id)
      return {
        resumes: filtered,
        activeId: prev.activeId === id ? filtered[0].id : prev.activeId
      }
    })
  }, [resumes])

  const switchResume = useCallback((id) => {
    setStorageData(prev => ({ ...prev, activeId: id }))
  }, [])

  const renameResume = useCallback((id, newName) => {
    setStorageData(prev => ({
      ...prev,
      resumes: prev.resumes.map(r => r.id === id ? { ...r, name: newName, lastModified: Date.now() } : r)
    }))
  }, [])

  const resetData = useCallback(() => {
    if (window.confirm('Are you sure you want to reset THIS resume? This cannot be undone.')) {
      setStorageData(prev => ({
        ...prev,
        resumes: prev.resumes.map(r => 
          r.id === activeId ? { ...INITIAL_DATA, id: activeId, name: r.name, lastModified: Date.now() } : r
        )
      }))
    }
  }, [activeId])

  return (
    <div className="app-container">
      <Editor
        data={activeResume}
        resumes={resumes}
        activeId={activeId}
        updateData={updateData}
        addItem={addItem}
        removeItem={removeItem}
        resetData={resetData}
        createNewResume={createNewResume}
        duplicateResume={duplicateResume}
        deleteResume={deleteResume}
        switchResume={switchResume}
        renameResume={renameResume}
      />
      <Preview data={activeResume} />
    </div>
  )
}

export default App
