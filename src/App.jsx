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
  skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'AWS', 'Docker', 'TailwindCSS'],
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
  ]
}

// Normalize any legacy format (string | {text,bold}[] | string[]) → string[]
function normalizeDesc(v) {
  const arr = Array.isArray(v) ? v : (v ? [v] : [])
  return arr.map(p => (typeof p === 'object' && p !== null) ? p.text ?? '' : String(p))
}

function normalizeData(data) {
  return {
    ...data,
    projects:   data.projects.map(p => ({ ...p, description: normalizeDesc(p.description) })),
    experience: data.experience.map(e => ({ ...e, description: normalizeDesc(e.description) })),
  }
}

const STORAGE_KEY = 'devresume_data'

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? normalizeData(JSON.parse(saved)) : INITIAL_DATA
  } catch {
    return INITIAL_DATA
  }
}

function App() {
  const [resumeData, setResumeData] = useState(loadFromStorage)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData))
    } catch {
      // localStorage unavailable (private browsing, storage full, etc.)
    }
  }, [resumeData])

  const updateData = useCallback((section, field, value, index = null) => {
    setResumeData(prev => {
      if (index !== null) {
        return {
          ...prev,
          [section]: prev[section].map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          )
        }
      }
      if (field) {
        return { ...prev, [section]: { ...prev[section], [field]: value } }
      }
      return { ...prev, [section]: value }
    })
  }, [])

  const addItem = useCallback((section, item) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], item]
    }))
  }, [])

  const removeItem = useCallback((section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }))
  }, [])

  const resetData = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      setResumeData(INITIAL_DATA)
    }
  }, [])

  return (
    <div className="app-container">
      <Editor
        data={resumeData}
        updateData={updateData}
        addItem={addItem}
        removeItem={removeItem}
        resetData={resetData}
      />
      <Preview data={resumeData} />
    </div>
  )
}

export default App
