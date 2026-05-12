import React, { useState, useEffect, useRef } from 'react'
import { Download, ChevronLeft, Check, ChevronDown, FileText, Image, Printer } from 'lucide-react'
import html2pdf from 'html2pdf.js'
import html2canvas from 'html2canvas'
import ModernResume from '../templates/VibrantTemplate'
import MinimalResume from '../templates/ElegantTemplate'
import ATSResume from '../templates/ClassicTemplate'
import CompactResume from '../templates/CompactTemplate'
import SidebarResume from '../templates/SidebarTemplate'
import BoldResume from '../templates/BoldTemplate'
import ExecutiveResume from '../templates/ExecutiveTemplate'
import CreativeResume from '../templates/CreativeTemplate'
import TimelineResume from '../templates/TimelineTemplate'
import ATSScore from './ATSScore'

const TEMPLATES = [
  {
    id: 'vibrant',
    label: 'Vibrant',
    desc: 'Bold & modern',
    thumb: (color) => (
      <div className="thumb-vibrant">
        <div className="thumb-header" style={{ borderBottomColor: color }}>
          <div className="thumb-line w80 bold" />
          <div className="thumb-line w50 thin" style={{ background: color, opacity: 0.8 }} />
          <div className="thumb-contacts">
            <div className="thumb-dot" /><div className="thumb-dot" /><div className="thumb-dot" />
          </div>
        </div>
        <div className="thumb-section">
          <div className="thumb-label" style={{ background: color }} />
          <div className="thumb-line w90" /><div className="thumb-line w70" />
        </div>
        <div className="thumb-section">
          <div className="thumb-label" style={{ background: color }} />
          <div className="thumb-line w100" /><div className="thumb-line w85" /><div className="thumb-line w60" />
        </div>
      </div>
    )
  },
  {
    id: 'elegant',
    label: 'Elegant',
    desc: 'Clean & minimal',
    thumb: (color) => (
      <div className="thumb-elegant">
        <div className="thumb-elegant-header">
          <div className="thumb-line w70 bold" />
          <div className="thumb-line w40 thin" style={{ background: color }} />
          <div className="thumb-elegant-contact">
            <div className="thumb-dot" /><div className="thumb-dot" /><div className="thumb-dot" />
          </div>
        </div>
        <div className="thumb-section">
          <div className="thumb-elegant-label">
            <div className="thumb-line w30 bold dark" />
            <div className="thumb-elegant-rule" style={{ background: color }} />
          </div>
          <div className="thumb-line w90" /><div className="thumb-line w70" />
        </div>
        <div className="thumb-section">
          <div className="thumb-elegant-label">
            <div className="thumb-line w40 bold dark" />
            <div className="thumb-elegant-rule" style={{ background: color }} />
          </div>
          <div className="thumb-line w100" /><div className="thumb-line w80" />
        </div>
      </div>
    )
  },
  {
    id: 'classic',
    label: 'Classic',
    desc: 'ATS-friendly',
    thumb: () => (
      <div className="thumb-classic">
        <div className="thumb-classic-header">
          <div className="thumb-line w60 bold dark center" />
          <div className="thumb-line w80 thin dark center" />
        </div>
        <div className="thumb-classic-section">
          <div className="thumb-classic-rule" />
          <div className="thumb-line w100" /><div className="thumb-line w90" /><div className="thumb-line w75" />
        </div>
        <div className="thumb-classic-section">
          <div className="thumb-classic-rule" />
          <div className="thumb-line w100" /><div className="thumb-line w85" />
        </div>
      </div>
    )
  },
  {
    id: 'compact',
    label: 'Compact',
    desc: 'Space efficient',
    thumb: (color) => (
      <div className="thumb-compact">
        <div className="thumb-compact-header" style={{ borderBottomColor: color }}>
          <div className="thumb-line w65 bold dark" />
          <div className="thumb-line w80 thin" />
        </div>
        <div className="thumb-compact-body">
          <div className="thumb-compact-label" style={{ background: color }} />
          <div className="thumb-line w100" /><div className="thumb-line w90" />
          <div className="thumb-compact-label" style={{ background: color }} />
          <div className="thumb-line w100" /><div className="thumb-line w85" /><div className="thumb-line w70" />
          <div className="thumb-compact-label" style={{ background: color }} />
          <div className="thumb-line w95" /><div className="thumb-line w80" />
        </div>
      </div>
    )
  },
  {
    id: 'sidebar',
    label: 'Sidebar',
    desc: 'Two-column',
    thumb: (color) => (
      <div className="thumb-sidebar">
        <div className="thumb-sidebar-left" style={{ background: color }}>
          <div className="thumb-line w80 thin white" />
          <div className="thumb-line w60 thin white" />
          <div className="thumb-sidebar-rule" />
          <div className="thumb-line w90 thin white" /><div className="thumb-line w70 thin white" />
          <div className="thumb-sidebar-rule" />
          <div className="thumb-line w80 thin white" /><div className="thumb-line w90 thin white" />
        </div>
        <div className="thumb-sidebar-right">
          <div className="thumb-line w90 bold dark" /><div className="thumb-line w70" />
          <div className="thumb-sidebar-section-rule" style={{ background: color }} />
          <div className="thumb-line w100" /><div className="thumb-line w85" /><div className="thumb-line w75" />
          <div className="thumb-sidebar-section-rule" style={{ background: color }} />
          <div className="thumb-line w100" /><div className="thumb-line w90" />
        </div>
      </div>
    )
  },
  {
    id: 'executive',
    label: 'Executive',
    desc: 'Premium & formal',
    thumb: (color) => (
      <div className="thumb-executive">
        <div className="thumb-exec-rule" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
        <div className="thumb-line w60 bold dark center" style={{ marginTop: 4 }} />
        <div className="thumb-line w40 thin center" style={{ background: color, marginBottom: 2 }} />
        <div className="thumb-exec-rule" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
        <div className="thumb-section">
          <div className="thumb-exec-label" style={{ borderColor: color }}>
            <div className="thumb-line w30 bold dark" />
          </div>
          <div className="thumb-line w90" /><div className="thumb-line w70" />
        </div>
        <div className="thumb-section">
          <div className="thumb-exec-label" style={{ borderColor: color }}>
            <div className="thumb-line w40 bold dark" />
          </div>
          <div className="thumb-line w100" /><div className="thumb-line w80" />
        </div>
      </div>
    )
  },
  {
    id: 'creative',
    label: 'Creative',
    desc: 'Stand out',
    thumb: (color) => (
      <div className="thumb-creative">
        <div className="thumb-creative-header" style={{ background: color }}>
          <div className="thumb-creative-avatar" />
          <div style={{ flex: 1 }}>
            <div className="thumb-line w80 bold white" />
            <div className="thumb-line w50 thin white" style={{ opacity: 0.8 }} />
          </div>
        </div>
        <div className="thumb-creative-contact" style={{ borderTopColor: 'rgba(255,255,255,0.3)', background: color }}>
          <div className="thumb-dot" style={{ background: 'rgba(255,255,255,0.7)' }} />
          <div className="thumb-dot" style={{ background: 'rgba(255,255,255,0.7)' }} />
          <div className="thumb-dot" style={{ background: 'rgba(255,255,255,0.7)' }} />
        </div>
        <div className="thumb-creative-body">
          <div className="thumb-creative-heading" style={{ borderBottomColor: color, color }} />
          <div className="thumb-creative-grid">
            <div><div className="thumb-line w80" /><div className="thumb-line w60" /></div>
            <div><div className="thumb-line w80" /><div className="thumb-line w60" /></div>
          </div>
          <div className="thumb-creative-heading" style={{ borderBottomColor: color, color }} />
          <div className="thumb-line w100" /><div className="thumb-line w85" />
        </div>
      </div>
    )
  },
  {
    id: 'timeline',
    label: 'Timeline',
    desc: 'Visual journey',
    thumb: (color) => (
      <div className="thumb-timeline">
        <div className="thumb-tl-header">
          <div className="thumb-tl-bar" style={{ background: color }} />
          <div className="thumb-tl-header-content">
            <div className="thumb-line w70 bold dark" />
            <div className="thumb-line w45 thin" style={{ background: color }} />
          </div>
        </div>
        <div className="thumb-tl-body">
          {[1,2,3].map(i => (
            <div key={i} className="thumb-tl-row">
              <div className="thumb-tl-label">
                <div className="thumb-tl-dot" style={{ background: color }} />
              </div>
              <div className="thumb-tl-content">
                <div className="thumb-line w90" /><div className="thumb-line w70" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'bold',
    label: 'Bold',
    desc: 'High impact',
    thumb: (color) => (
      <div className="thumb-bold">
        <div className="thumb-bold-header" style={{ borderBottomColor: color }}>
          <div className="thumb-line w80 bold white" />
          <div className="thumb-line w50 thin" style={{ background: color, opacity: 0.9 }} />
          <div className="thumb-line w90 thin" style={{ opacity: 0.5, background: 'rgba(255,255,255,0.7)' }} />
        </div>
        <div className="thumb-bold-body">
          <div className="thumb-bold-label" style={{ borderLeftColor: color }} />
          <div className="thumb-bold-skills" style={{ borderLeftColor: color }}>
            <div className="thumb-line w90" /><div className="thumb-line w70" />
          </div>
          <div className="thumb-bold-label" style={{ borderLeftColor: color }} />
          <div className="thumb-line w100" /><div className="thumb-line w85" /><div className="thumb-line w70" />
        </div>
      </div>
    )
  }
]

const COLORS = [
  { hex: '#ff9100', name: 'Amber'    },
  { hex: '#2563eb', name: 'Blue'     },
  { hex: '#059669', name: 'Green'    },
  { hex: '#8b5cf6', name: 'Purple'   },
  { hex: '#ec4899', name: 'Pink'     },
  { hex: '#14b8a6', name: 'Teal'     },
  { hex: '#f43f5e', name: 'Rose'     },
  { hex: '#f59e0b', name: 'Yellow'   },
  { hex: '#64748b', name: 'Slate'    },
  { hex: '#111827', name: 'Charcoal' },
]

const Preview = ({ data, updateData, onBack, onTemplateChange, onColorChange }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false)
  // pageBreaks: array of {start, height} in px for each page segment
  const [pageSegments, setPageSegments] = useState([{ start: 0, height: null }])
  const hiddenRef = useRef(null)
  const downloadMenuRef = useRef(null)

  useEffect(() => {
    const container = hiddenRef.current
    if (!container) return

    const compute = () => {
      const A4_PX = 297 * (96 / 25.4)
      const containerRect = container.getBoundingClientRect()
      const totalHeight = containerRect.height
      const total = Math.max(1, Math.ceil(totalHeight / A4_PX))

      if (total <= 1) {
        setPageSegments([{ start: 0, height: null }])
        return
      }

      // Leaf text elements are the natural break candidates
      const els = Array.from(container.querySelectorAll('h1, h2, h3, p, li'))

      // Compute where each page STARTS (in template px from container top)
      const starts = [0]
      for (let page = 1; page < total; page++) {
        const boundary = page * A4_PX
        let best = boundary
        let maxBottom = 0

        for (const el of els) {
          const bottom = el.getBoundingClientRect().bottom - containerRect.top
          if (bottom <= boundary && bottom > maxBottom) maxBottom = bottom
        }

        // Use the natural break if it's in the last 40% of the page
        if (maxBottom >= boundary - A4_PX * 0.4) best = maxBottom
        starts.push(best)
      }

      // Each segment: start px offset + height (content that belongs to this page)
      const segs = starts.map((start, i) => ({
        start,
        height: i < starts.length - 1 ? starts[i + 1] - start : totalHeight - start
      }))
      setPageSegments(segs)
    }

    const observer = new ResizeObserver(compute)
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const accentColor = data.themeColor || '#ff9100'

  useEffect(() => {
    if (!downloadMenuOpen) return
    const handler = (e) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(e.target)) {
        setDownloadMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [downloadMenuOpen])

  const safeName = () => (data.personal.fullName || 'Resume').replace(/\s+/g, '_')

  const downloadPDF = async () => {
    setDownloadMenuOpen(false)
    if (isDownloading) return
    setIsDownloading(true)
    try {
      const element = document.getElementById('resume-content')
      const opt = {
        margin: 0,
        filename: `${safeName()}_Resume.pdf`,
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

  const downloadPNG = async () => {
    setDownloadMenuOpen(false)
    if (isDownloading) return
    setIsDownloading(true)
    try {
      const element = document.getElementById('resume-content')
      const canvas = await html2canvas(element, { scale: 2, useCORS: true })
      const link = document.createElement('a')
      link.download = `${safeName()}_Resume.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('PNG generation failed:', err)
      alert('Failed to generate image. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const printResume = () => {
    setDownloadMenuOpen(false)
    window.print()
  }

  const renderTemplate = () => {
    switch (data.template) {
      case 'elegant': return <MinimalResume data={data} />
      case 'classic': return <ATSResume data={data} />
      case 'compact': return <CompactResume data={data} />
      case 'sidebar':    return <SidebarResume data={data} />
      case 'bold':       return <BoldResume data={data} />
      case 'executive':  return <ExecutiveResume data={data} />
      case 'creative':   return <CreativeResume data={data} />
      case 'timeline':   return <TimelineResume data={data} />
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
        <div className="toolbar-right">
          <ATSScore data={data} updateData={updateData} />
          <div className="download-menu-wrap" ref={downloadMenuRef}>
            <button
              className="download-btn"
              onClick={() => setDownloadMenuOpen(o => !o)}
              disabled={isDownloading}
              aria-label="Download options"
            >
              <Download size={15} />
              {isDownloading ? 'Generating…' : 'Download'}
              <ChevronDown size={13} className={`dl-chevron${downloadMenuOpen ? ' open' : ''}`} />
            </button>
            {downloadMenuOpen && (
              <div className="download-menu">
                <button className="dl-menu-item" onClick={downloadPDF}>
                  <FileText size={14} />
                  <div className="dl-menu-item-text">
                    <span>PDF Document</span>
                    <span className="dl-menu-item-sub">Best for applications</span>
                  </div>
                </button>
                <button className="dl-menu-item" onClick={downloadPNG}>
                  <Image size={14} />
                  <div className="dl-menu-item-text">
                    <span>PNG Image</span>
                    <span className="dl-menu-item-sub">Share as image</span>
                  </div>
                </button>
                <div className="dl-menu-divider" />
                <button className="dl-menu-item" onClick={printResume}>
                  <Printer size={14} />
                  <div className="dl-menu-item-text">
                    <span>Print</span>
                    <span className="dl-menu-item-sub">Open print dialog</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="preview-workspace">
        <div className="resume-paper-container">
          {/* Hidden source — used only for PDF/PNG export and page-count measurement */}
          <div id="resume-content" ref={hiddenRef} className="resume-pdf-source">
            {renderTemplate()}
          </div>
          {/* Paged display — each page is a clipped A4 sheet */}
          <div className="paged-display">
            {pageSegments.map((seg, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div className="page-gap">
                    <span className="page-gap-label">Page {i + 1}</span>
                  </div>
                )}
                {/* Outer clip: always 297mm tall, white bg — looks like a full A4 sheet */}
                <div className="page-clip">
                  {/* Inner clip: cuts content to exactly this page's segment height */}
                  <div style={{ height: `${seg.height}px`, overflow: 'hidden' }}>
                    <div style={{ transform: `translateY(-${seg.start}px)` }}>
                      {renderTemplate()}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <aside className="template-panel" style={{ '--t-accent': accentColor }}>

          {/* ── Templates section ── */}
          <div className="panel-section panel-section--templates">
            <p className="panel-section-label">Templates</p>
            <div className="template-panel-list">
              {TEMPLATES.map((t) => {
                const isActive = data.template === t.id
                return (
                  <button
                    key={t.id}
                    className={`template-thumb-btn ${isActive ? 'active' : ''}`}
                    onClick={() => onTemplateChange(t.id)}
                    title={t.label}
                  >
                    <div className="template-thumb-preview">
                      {t.thumb(accentColor)}
                      {isActive && (
                        <div className="thumb-active-badge">
                          <Check size={8} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <div className="thumb-meta">
                      <span className="template-thumb-label">{t.label}</span>
                      <span className="template-thumb-desc">{t.desc}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Colors section ── */}
          <div className="panel-section panel-section--colors">
            <p className="panel-section-label">Color</p>
            <div className="panel-color-grid">
              {COLORS.map(({ hex, name }) => {
                const isActive = accentColor === hex
                return (
                  <button
                    key={hex}
                    className={`panel-color-btn ${isActive ? 'active' : ''}`}
                    style={{ '--c': hex }}
                    onClick={() => onColorChange(hex)}
                    title={name}
                    aria-label={name}
                  >
                    {isActive && <Check size={10} strokeWidth={3} />}
                  </button>
                )
              })}
            </div>
          </div>

        </aside>
      </div>
    </div>
  )
}

export default Preview
