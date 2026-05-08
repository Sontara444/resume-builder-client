import React, { useState } from 'react'
import { CheckCircle2, AlertCircle, X, Zap } from 'lucide-react'
import { calculateATSScore } from '../utils/ats-logic'

const ATSScore = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { score, suggestions, strengths } = calculateATSScore(data)

  const getScoreColor = () => {
    if (score >= 80) return '#22c55e' // Green
    if (score >= 50) return '#eab308' // Yellow
    return '#ef4444' // Red
  }

  return (
    <>
      <div className="ats-score-widget" onClick={() => setIsOpen(true)}>
        <div className="score-circle" style={{ borderColor: getScoreColor() }}>
          <span style={{ color: getScoreColor() }}>{score}%</span>
        </div>
        <div className="score-label">
          <strong>ATS Score</strong>
          <span>View Suggestions</span>
        </div>
        <Zap size={14} className="zap-icon" />
      </div>

      {isOpen && (
        <div className="ats-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="ats-modal" onClick={e => e.stopPropagation()}>
            <div className="ats-modal-header">
              <div className="header-info">
                <Zap size={18} color="#eab308" fill="#eab308" />
                <h3>ATS Optimization Report</h3>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>

            <div className="ats-modal-content">
              <div className="score-summary">
                <div className="big-score" style={{ color: getScoreColor() }}>{score}%</div>
                <p>Your resume is {score >= 80 ? 'highly optimized' : score >= 50 ? 'moderately optimized' : 'needs improvement'} for ATS systems.</p>
              </div>

              <div className="ats-results-grid">
                <div className="results-section">
                  <h4><CheckCircle2 size={14} color="#22c55e" /> Strengths</h4>
                  <ul>
                    {strengths.map((s, i) => <li key={i}>{s}</li>)}
                    {strengths.length === 0 && <li className="empty">No strengths identified yet.</li>}
                  </ul>
                </div>

                <div className="results-section">
                  <h4><AlertCircle size={14} color="#eab308" /> Improvements</h4>
                  <ul>
                    {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    {suggestions.length === 0 && <li className="empty-success">Perfect! No improvements needed.</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ATSScore
