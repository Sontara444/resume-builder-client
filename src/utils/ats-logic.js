export const ACTION_VERBS = [
  'developed', 'built', 'designed', 'improved', 'optimized', 'implemented', 
  'created', 'managed', 'led', 'architected', 'scaled', 'delivered', 
  'reduced', 'increased', 'streamlined', 'automated'
]

export const checkKeywordMatch = (data, keywordsString) => {
  if (!keywordsString) return { found: [], missing: [], percentage: 0 }
  
  const keywords = keywordsString.split(',').map(k => k.trim().toLowerCase()).filter(k => k.length > 0)
  if (keywords.length === 0) return { found: [], missing: [], percentage: 0 }

  const { targetKeywords, ...rest } = data
  const allText = JSON.stringify(rest).toLowerCase()
  const found = keywords.filter(k => allText.includes(k))
  const missing = keywords.filter(k => !allText.includes(k))
  const percentage = Math.round((found.length / keywords.length) * 100)

  return { found, missing, percentage }
}

export const calculateATSScore = (data) => {
  let score = 0
  const suggestions = []
  const strengths = []

  // Rule 1: Summary
  if (data.summary && data.summary.trim().length > 50) {
    score += 15
    strengths.push('Professional summary is well-defined.')
  } else {
    suggestions.push('Add a professional summary of at least 50 characters.')
  }

  // Rule 2: Skills Count
  const totalSkills = data.skills.reduce((acc, cat) => acc + cat.items.length, 0)
  if (totalSkills >= 8) {
    score += 15
    strengths.push('Great variety of technical skills.')
  } else if (totalSkills >= 5) {
    score += 10
    suggestions.push('Consider adding more specialized technical skills.')
  } else {
    suggestions.push('Add more technical skills (aim for at least 8).')
  }

  // Rule 3: Experience
  if (data.experience && data.experience.length > 0) {
    score += 20
    strengths.push('Work experience section included.')
    
    // Check for bullet points depth
    const hasGoodDepth = data.experience.some(exp => exp.description?.length > 2)
    if (hasGoodDepth) {
      score += 5
    } else {
      suggestions.push('Add more bullet points to your work experience items.')
    }
  } else {
    suggestions.push('Work experience is crucial; add your past roles.')
  }

  // Rule 4: Projects
  if (data.projects && data.projects.length >= 2) {
    score += 15
    strengths.push('Multiple projects demonstrate practical application.')
  } else {
    suggestions.push('Add at least 2 key projects to showcase your work.')
  }

  // Rule 5: Action Verbs
  const { targetKeywords: _, ...contentWithoutKeywords } = data
  const allText = JSON.stringify(contentWithoutKeywords).toLowerCase()
  const foundVerbs = ACTION_VERBS.filter(verb => allText.includes(verb))
  if (foundVerbs.length >= 5) {
    score += 15
    strengths.push('Strong use of action-oriented language.')
  } else if (foundVerbs.length >= 2) {
    score += 5
    suggestions.push('Use more action verbs (e.g., Optimized, Architected, Led).')
  } else {
    suggestions.push('Include strong action verbs in your descriptions.')
  }

  // Rule 6: Contact Info
  const hasContact = data.personal.email && data.personal.phone && (data.personal.github || data.personal.linkedin)
  if (hasContact) {
    score += 15
    strengths.push('Complete contact information.')
  } else {
    suggestions.push('Ensure Email, Phone, and LinkedIn/GitHub are provided.')
  }

  // Rule 7: Keyword Match (Bonus)
  if (data.targetKeywords) {
    const { percentage } = checkKeywordMatch(data, data.targetKeywords)
    if (percentage >= 80) {
      score += 10
      strengths.push('Excellent keyword alignment with target job.')
    } else if (percentage >= 50) {
      score += 5
      strengths.push('Good keyword alignment.')
    } else if (percentage > 0) {
      suggestions.push('Try to include more keywords from the job description.')
    }
  }

  return {
    score: Math.min(score, 100),
    suggestions,
    strengths
  }
}
