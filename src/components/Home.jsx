import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Briefcase, FilePlus, User, Layout, Eye } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Navbar />
      
      <main className="home-content">
        <section className="hero">
          <div className="hero-container">
            <div className="hero-badge">
              <Plus size={14} className="badge-icon" />
              <span>The #1 AI-Powered Resume Builder</span>
            </div>
            
            <h1 className="hero-title">
              Elevate Your Career with <br />
              <span className="text-gradient">Professional Resumes</span>
            </h1>
            
            <p className="hero-subtitle">
              Build a job-winning resume in minutes. Our platform offers modern templates, 
              ATS-friendly designs, and real-time previews to help you stand out.
            </p>

            <div className="hero-actions">
              <button 
                onClick={() => navigate('/create')}
                className="btn-main create-btn"
              >
                <Plus size={20} />
                <span>Create New Resume</span>
              </button>
              
              <button 
                className="btn-main update-btn"
                disabled
              >
                <Pencil size={20} />
                <span>Update Existing Resume</span>
                <span className="btn-tag">Coming Soon</span>
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <FilePlus size={18} className="stat-icon" />
                <span>ATS Optimized</span>
              </div>
              <div className="stat-item">
                <User size={18} className="stat-icon" />
                <span>Privacy Focused</span>
              </div>
              <div className="stat-item">
                <Layout size={18} className="stat-icon" />
                <span>Premium Designs</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              <div className="card-header">
                <div className="header-dot"></div>
                <div className="header-dot"></div>
                <div className="header-dot"></div>
              </div>
              <div className="card-content">
                <div className="dummy-resume">
                  <div className="dummy-resume-header"></div>
                  <div className="resume-body">
                    <div className="dummy-resume-line long"></div>
                    <div className="dummy-resume-line"></div>
                    <div className="dummy-resume-line medium"></div>
                    <div className="dummy-resume-line long"></div>
                  </div>
                </div>
              </div>
              <div className="visual-glow"></div>
            </div>
          </div>
        </section>

        <section className="features" id="templates">
          <div className="section-header">
            <h2 className="section-title">Why Choose ResumeCraft?</h2>
            <p className="section-subtitle">Everything you need to land your dream job</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-box">
                <Eye size={24} />
              </div>
              <h3>Fast & Easy</h3>
              <p>Create a professional resume in minutes with our intuitive editor.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-box">
                <Layout size={24} />
              </div>
              <h3>Modern Templates</h3>
              <p>Choose from a variety of designer-made templates for any industry.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-box">
                <Briefcase size={24} />
              </div>
              <h3>ATS Friendly</h3>
              <p>Our templates are designed to pass through Applicant Tracking Systems.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
