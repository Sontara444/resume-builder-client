import React from 'react';
import { Mail, Globe, Briefcase, MessageSquare, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">✨</span>
              <span className="logo-text">ResumeCraft</span>
            </div>
            <p className="footer-description">
              Empowering job seekers with professional, ATS-friendly resumes designed to land more interviews. 
              Our mission is to make career growth accessible to everyone.
            </p>
            <div className="footer-social">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Github">
                <Globe size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <Briefcase size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <MessageSquare size={18} />
              </a>
              <a href="mailto:support@resumecraft.com" className="social-link" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-link-group">
              <h4>Product</h4>
              <ul>
                <li><Link to="/create">Resume Builder</Link></li>
                <li><a href="/#templates">Templates</a></li>
                <li><Link to="/about">About Us</Link></li>
                <li><a href="#">Examples</a></li>
              </ul>
            </div>
            
            <div className="footer-link-group">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>

            <div className="footer-link-group">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Career Blog</a></li>
                <li><a href="#">Resume Guide</a></li>
                <li><a href="#">Interview Tips</a></li>
                <li><a href="#">Job Search</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <p>&copy; {currentYear} ResumeCraft. Built with <Heart size={14} className="heart-icon" /> for developers.</p>
          </div>
          <div className="footer-security">
            <ShieldCheck size={16} />
            <span>Secure & Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
