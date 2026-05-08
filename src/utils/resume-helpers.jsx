import React from 'react'

export const toArr = v => {
  const arr = Array.isArray(v) ? v : (v ? [v] : [])
  return arr.map(p => (typeof p === 'object' && p !== null) ? (p.text ?? '') : String(p))
}

// Parse **word** markers into <strong> spans
export const renderBold = (text) => {
  if (!text) return ''
  return text.split(/\*\*/).map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)
}
