import React, { useState } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import { Download, Layout, Code, Mail, MapPin, ExternalLink, Plus, Trash2, Globe } from 'lucide-react'

const INITIAL_DATA = {
  personal: {
    fullName: 'Alex Developer',
    title: 'Full Stack Engineer',
    email: 'alex@example.com',
    github: 'github.com/alexdev',
    linkedin: 'linkedin.com/in/alexdev',
    location: 'San Francisco, CA'
  },
  summary: 'Passionate Full Stack Engineer with 3+ years of experience building scalable web applications. Specialist in React, Node.js, and cloud architecture.',
  skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'AWS', 'Docker', 'TailwindCSS'],
  projects: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A high-performance e-commerce engine with real-time inventory management and secure payments.',
      tech: 'React, Redux, Node.js, Stripe',
      link: 'https://demo-shop.com'
    },
    {
      id: 2,
      title: 'AI Chatbot Dashboard',
      description: 'Integrated OpenAI API to create a customer support dashboard with automated sentiment analysis.',
      tech: 'Next.js, OpenAI, Firebase',
      link: 'https://ai-helper.io'
    }
  ],
  experience: [
    {
      id: 1,
      company: 'Tech Innovators Inc.',
      position: 'Senior Frontend Developer',
      duration: '2021 - Present',
      description: 'Leading the migration to React 18 and optimizing core web vitals by 40%.'
    }
  ]
}

function App() {
  const [resumeData, setResumeData] = useState(INITIAL_DATA)

  const updateData = (section, field, value, index = null) => {
    setResumeData(prev => {
      const newData = { ...prev }
      if (index !== null) {
        newData[section][index][field] = value
      } else if (field) {
        newData[section][field] = value
      } else {
        newData[section] = value
      }
      return newData
    })
  }

  const addItem = (section, item) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], item]
    }))
  }

  const removeItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }))
  }

  return (
    <div className="app-container">
      <Editor 
        data={resumeData} 
        updateData={updateData} 
        addItem={addItem}
        removeItem={removeItem}
      />
      <Preview data={resumeData} />
    </div>
  )
}

export default App
