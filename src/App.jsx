import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Editor from './components/Editor'
import Preview from './components/Preview'

const API_BASE = 'http://localhost:5000/api/resumes'

const INITIAL_DATA = {
  personal: {
    fullName: 'Alex Developer',
    title: 'Full Stack Engineer',
    email: 'alex@example.com',
    phone: '+1 (555) 000-0000',
    location: 'San Francisco, CA',
    github: 'github.com/alexdev',
    linkedin: 'linkedin.com/in/alexdev'
  },
  summary: 'Passionate Full Stack Engineer with 3+ years of experience building scalable web applications. Specialist in React, Node.js, and cloud architecture.',
  skills: [
    { id: '1', category: 'Frontend', items: ['React', 'TypeScript', 'Node.js', 'Next.js'] },
    { id: '2', category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'] }
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Innovators Inc.',
      position: 'Senior Frontend Developer',
      duration: '2021 - Present',
      description: ['Led migration to React 18, improving core web vitals scores by 40%.', 'Mentored 4 junior engineers and established a component library used across 6 products.']
    }
  ],
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      tech: 'React, Redux, Node.js, Stripe',
      description: ['Built real-time inventory management with WebSocket sync across 50k+ SKUs.', 'Integrated Stripe payments with fraud detection, reducing chargebacks by 30%.'],
      link: 'demo-shop.com'
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
  template: 'vibrant',
  themeColor: '#ff9100',
  targetKeywords: ''
}

function normalizeSkills(skills) {
  if (!Array.isArray(skills)) return []
  if (skills.length > 0 && typeof skills[0] === 'string') {
    return [{ id: 'migrated', category: 'Tech Stack', items: skills }]
  }
  return skills.map(s => ({
    id: s.id || (typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).slice(2)),
    category: s.category || 'Category',
    items: Array.isArray(s.items) ? s.items : []
  }))
}

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
    template:   data.template || 'vibrant',
    themeColor: data.themeColor || '#ff9100',
    targetKeywords: data.targetKeywords || ''
  }
}

function App() {
  const [storageData, setStorageData] = useState({ resumes: [], activeId: null })
  const [showPreview, setShowPreview] = useState(false)
  const [loading, setLoading] = useState(true)

  const activeResume = storageData.resumes.find(r => r._id === storageData.activeId) || storageData.resumes[0]
  const data = activeResume ? normalizeData(activeResume) : null

  // 1. Fetch data from DB
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data: resumes } = await axios.get(API_BASE)
        if (resumes.length > 0) {
          setStorageData({ resumes, activeId: resumes[0]._id })
        } else {
          const { data: initial } = await axios.post(API_BASE, { ...INITIAL_DATA, name: 'My First Resume' })
          setStorageData({ resumes: [initial], activeId: initial._id })
        }
      } catch (err) {
        console.error('Failed to fetch:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchResumes()
  }, [])

  // 2. Auto-save (Debounced)
  useEffect(() => {
    if (!data || loading) return
    const timer = setTimeout(async () => {
      try {
        await axios.post(API_BASE, data)
      } catch (err) {
        console.error('Auto-save failed:', err)
      }
    }, 1500)
    return () => clearTimeout(timer)
  }, [data, loading])

  const updateData = useCallback((section, field, value, index = null) => {
    setStorageData(prev => ({
      ...prev,
      resumes: prev.resumes.map(r => {
        if (r._id !== prev.activeId) return r
        let updated = { ...r }
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
  }, [storageData.activeId])

  const updatePoint = useCallback((section, itemIndex, pointIndex, value) => {
    setStorageData(prev => ({
      ...prev,
      resumes: prev.resumes.map(r => {
        if (r._id !== prev.activeId) return r
        const items = [...r[section]]
        const desc = [...items[itemIndex].description]
        desc[pointIndex] = value
        items[itemIndex] = { ...items[itemIndex], description: desc }
        return { ...r, [section]: items }
      })
    }))
  }, [storageData.activeId])

  const addItem = useCallback((section, item) => {
    setStorageData(prev => ({
      ...prev,
      resumes: prev.resumes.map(r => 
        r._id === prev.activeId ? { ...r, [section]: [...r[section], item] } : r
      )
    }))
  }, [storageData.activeId])

  const removeItem = useCallback((section, id) => {
    setStorageData(prev => ({
      ...prev,
      resumes: prev.resumes.map(r => 
        r._id === prev.activeId ? { ...r, [section]: r[section].filter(item => item.id !== id) } : r
      )
    }))
  }, [storageData.activeId])

  const createNewResume = async () => {
    try {
      const newResume = { ...INITIAL_DATA, name: `New Resume ${storageData.resumes.length + 1}` }
      const { data } = await axios.post(API_BASE, newResume)
      setStorageData(prev => ({
        resumes: [data, ...prev.resumes],
        activeId: data._id
      }))
    } catch (err) {
      alert('Failed to create resume')
    }
  }

  const deleteResume = async (id) => {
    if (storageData.resumes.length <= 1) return alert('Cannot delete the last resume')
    if (!window.confirm('Delete this resume?')) return
    try {
      await axios.delete(`${API_BASE}/${id}`)
      setStorageData(prev => {
        const filtered = prev.resumes.filter(r => r._id !== id)
        return {
          resumes: filtered,
          activeId: prev.activeId === id ? filtered[0]._id : prev.activeId
        }
      })
    } catch (err) {
      alert('Delete failed')
    }
  }

  const duplicateResume = async (id) => {
    try {
      const { data } = await axios.post(`${API_BASE}/${id}/duplicate`)
      setStorageData(prev => ({
        resumes: [data, ...prev.resumes],
        activeId: data._id
      }))
    } catch (err) {
      alert('Duplicate failed')
    }
  }

  const switchResume = (id) => setStorageData(prev => ({ ...prev, activeId: id }))

  const renameResume = (id, newName) => {
    setStorageData(prev => ({
      ...prev,
      resumes: prev.resumes.map(r => r._id === id ? { ...r, name: newName } : r)
    }))
  }

  if (loading) return <div className="loading-screen">Connecting to Database...</div>
  if (!data) return <div className="loading-screen">Error loading data.</div>

  return (
    <div className={`app-container ${showPreview ? 'show-preview' : ''}`}>
      <Editor 
        data={data} 
        resumes={storageData.resumes}
        activeId={storageData.activeId}
        updateData={updateData} 
        updatePoint={updatePoint}
        addItem={addItem}
        removeItem={removeItem}
        createNewResume={createNewResume}
        deleteResume={deleteResume}
        duplicateResume={duplicateResume}
        switchResume={switchResume}
        renameResume={renameResume}
        onTogglePreview={() => setShowPreview(true)}
      />
      <Preview 
        data={data} 
        updateData={updateData}
        onBack={() => setShowPreview(false)} 
        onTemplateChange={(tpl) => updateData('template', null, tpl)}
        onColorChange={(color) => updateData('themeColor', null, color)}
      />
    </div>
  )
}

export default App
