import React, { useEffect } from 'react';
import { Target, Shield, Zap, Sparkles, Code, Globe, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import './About.css';

const About = () => {
  // Optional: Add a simple scroll effect or leave it pure CSS
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.about-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    
    document.getElementById('about-features')?.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.getElementById('about-features')?.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="about-page">
      <Navbar />
      
      {/* Background Animated Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <main className="about-content">
        {/* HERO SECTION */}
        <section className="about-hero">
          <div className="about-hero-container">
            <div className="about-hero-text">
              <div className="hero-badge pulse-badge">
                <Sparkles size={14} className="badge-icon" />
                <span>Our Story</span>
              </div>
              
              <h1 className="about-title">
                Redefining the <br />
                <span className="text-gradient">Career Journey</span>
              </h1>
              
              <p className="about-subtitle">
                We're on a mission to democratize career growth. By combining stunning design with intelligent technology, we empower professionals to tell their unique stories and land their dream roles.
              </p>

              <div className="hero-stats-row">
                <div className="stat-block">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Careers Advanced</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-block">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">ATS Success Rate</span>
                </div>
              </div>
            </div>

            {/* Abstract Visual Elements */}
            <div className="about-hero-visual">
              <div className="floating-mockup mockup-1">
                <div className="mockup-header"></div>
                <div className="mockup-line long"></div>
                <div className="mockup-line short"></div>
                <div className="mockup-line med"></div>
              </div>
              <div className="floating-mockup mockup-2">
                <div className="mockup-header accent"></div>
                <div className="mockup-line"></div>
                <div className="mockup-line long"></div>
              </div>
              <div className="floating-mockup mockup-3">
                <div className="mockup-avatar"></div>
                <div className="mockup-line short"></div>
                <div className="mockup-line"></div>
              </div>
              <div className="glow-behind"></div>
            </div>
          </div>
        </section>

        {/* MISSION STATEMENT */}
        <section className="mission-section">
          <div className="mission-container">
            <div className="quote-mark">"</div>
            <h2 className="mission-text">
              Your resume is more than a document. It's the <span className="highlight-text">blueprint of your potential.</span> We build tools to make sure the world sees you at your absolute best.
            </h2>
            <p className="mission-author">— The ResumeCraft Team</p>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="about-features" id="about-features">
          <div className="section-header center">
            <h2 className="section-title">Driven by Excellence</h2>
            <p className="section-subtitle">The core principles that shape every feature we build</p>
          </div>
          
          <div className="about-grid">
            <div className="about-card">
              <div className="card-border"></div>
              <div className="about-icon-wrapper">
                <Target size={26} strokeWidth={1.5} />
              </div>
              <h3>Precision Engineering</h3>
              <p>Every pixel and line of code is optimized to ensure your resume passes ATS filters and looks flawless on any device.</p>
              <div className="card-glow"></div>
            </div>
            
            <div className="about-card">
              <div className="card-border"></div>
              <div className="about-icon-wrapper">
                <Zap size={26} strokeWidth={1.5} />
              </div>
              <h3>Frictionless Experience</h3>
              <p>We eliminate the tedious formatting struggles so you can focus entirely on showcasing your unique achievements.</p>
              <div className="card-glow"></div>
            </div>
            
            <div className="about-card">
              <div className="card-border"></div>
              <div className="about-icon-wrapper">
                <Shield size={26} strokeWidth={1.5} />
              </div>
              <h3>Uncompromising Privacy</h3>
              <p>Your career data is sensitive. We employ bank-level encryption and never sell your personal information to third parties.</p>
              <div className="card-glow"></div>
            </div>

            <div className="about-card">
              <div className="card-border"></div>
              <div className="about-icon-wrapper">
                <Code size={26} strokeWidth={1.5} />
              </div>
              <h3>Built for Modern Web</h3>
              <p>Leveraging cutting-edge web technologies to provide a lightning-fast, real-time editing experience right in your browser.</p>
              <div className="card-glow"></div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="about-cta">
          <div className="cta-container">
            <h2>Ready to transform your career?</h2>
            <p>Join thousands of professionals who have already upgraded their resumes.</p>
            <a href="/create" className="btn-main create-btn about-btn">
              <span>Start Building Now</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
