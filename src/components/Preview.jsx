import React, { useState } from 'react'
import { Download, ChevronLeft } from 'lucide-react'
import html2pdf from 'html2pdf.js'
import ModernResume from '../templates/VibrantTemplate'
import MinimalResume from '../templates/ElegantTemplate'
import ATSResume from '../templates/ClassicTemplate'

const Preview = ({ data, onBack }) => {
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

  const renderTemplate = () => {
    switch (data.template) {
      case 'elegant': return <MinimalResume data={data} />
      case 'classic': return <ATSResume data={data} />
      case 'vibrant': 
      default:        return <ModernResume data={data} />
    }
  }

  return (
    <div className="preview-side">
      <div className="preview-toolbar">
        <div className="toolbar-left">
          <button className="mobile-only-btn" onClick={onBack}>
            <ChevronLeft size={16} /> Editor
          </button>
          <div className="preview-status">
            <div className="status-dot" />
            Live Preview
          </div>
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
        <div id="resume-content">
          {renderTemplate()}
        </div>
      </div>
    </div>
  )
}

export default Preview
