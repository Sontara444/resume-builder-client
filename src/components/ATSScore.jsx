import React, { useState } from 'react'
import { CheckCircle2, AlertCircle, X, Zap, Search, Target } from 'lucide-react'
import { calculateATSScore, checkKeywordMatch } from '../utils/ats-logic'

const ATSScore = ({ data, updateData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { score, suggestions, strengths } = calculateATSScore(data)
  const { found, missing, percentage: matchRate } = checkKeywordMatch(data, data.targetKeywords)

  const getScoreColor = (val) => {
    if (val >= 80) return '#22c55e' // Green
    if (val >= 50) return '#eab308' // Yellow
    return '#ef4444' // Red
  }

  return (
    <>
      <div className="ats-score-widget" onClick={() => setIsOpen(true)}>
        <div className="score-circle" style={{ borderColor: getScoreColor(score) }}>
          <span style={{ color: getScoreColor(score) }}>{score}%</span>
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
              <button onClick={() => setIsOpen(false)} className="close-btn"><X size={18} /></button>
            </div>

            <div className="ats-modal-content">
              <div className="score-summary">
                <div className="big-score" style={{ color: getScoreColor(score) }}>{score}%</div>
                <p>Your resume is {score >= 80 ? 'highly optimized' : score >= 50 ? 'moderately optimized' : 'needs improvement'} for ATS systems.</p>
              </div>

              {/* Keyword Matching Section */}
              <div className="keyword-check-section">
                <div className="section-header">
                  <div className="header-label">
                    <Target size={16} color="#3b82f6" />
                    <h4>Keyword Matcher</h4>
                  </div>
                  <div className="match-badge" style={{ backgroundColor: getScoreColor(matchRate) + '20', color: getScoreColor(matchRate) }}>
                    {matchRate}% Match
                  </div>
                </div>
                <p className="section-desc">Paste keywords from the job description (comma separated) to check alignment.</p>
                <div className="keyword-input-wrapper">
                  <Search size={14} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="e.g. React, TypeScript, GraphQL, AWS..."
                    value={data.targetKeywords || ''}
                    onChange={(e) => updateData('targetKeywords', null, e.target.value)}
                  />
                </div>
                
                {data.targetKeywords && (
                  <div className="keyword-results">
                    <div className="res-group">
                      <span className="res-label">Found ({found.length}):</span>
                      <div className="keyword-tags">
                        {found.map(k => <span key={k} className="tag found">{k}</span>)}
                        {found.length === 0 && <span className="none">None found</span>}
                      </div>
                    </div>
                    <div className="res-group">
                      <span className="res-label">Missing ({missing.length}):</span>
                      <div className="keyword-tags">
                        {missing.map(k => <span key={k} className="tag missing">{k}</span>)}
                        {missing.length === 0 && <span className="none">All keywords present!</span>}
                      </div>
                    </div>
                  </div>
                )}
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
