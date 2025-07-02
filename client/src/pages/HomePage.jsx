import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import florence from '../assets/florence.jpg';
import florence2 from '../assets/florence2.jpg';
import gozo from '../assets/Gozo.webp';
import rose from '../assets/rose.jpg';
import img1 from '../assets/61647459de00cb906f4996e6006e73a0.jpg';

const translations = {
  sv: {
    contactInfo: 'Vill du ha en personlig poster? Kontakta mig via telefon: 070-123 45 67',
    wedding: 'Bröllop',
    christening: 'Dop',
    birthday: 'Födelsedag',
    graduation: 'Studenten',
    exam: 'Examen',
    inspiration: 'Inspiration',
  },
  en: {
    contactInfo: 'Want a personal poster? Contact me by phone: 070-123 45 67',
    wedding: 'Wedding',
    christening: 'Baptism',
    birthday: 'Birthday',
    graduation: 'Graduation',
    exam: 'Exam',
    inspiration: 'Inspiration',
  },
  ti: {
    contactInfo: 'ሰብኣዊ ፖስተር ይደልዩ? ሓበሬታ ምልኣኽ: 070-123 45 67',
    wedding: 'መርዓ',
    christening: 'ጥምቀት',
    birthday: 'ልደት',
    graduation: 'ስቱደንተን',
    exam: 'መመረቅታ',
    inspiration: 'ጥቅስታት',
  },
};

const categories = [
  {
    id: 'wedding',
    title: 'wedding',
    image: florence,
    icon: '💍',
    sizes: ['85 x 200 cm', '60 x 200 cm']
  },
  {
    id: 'christening',
    title: 'christening',
    image: rose,
    icon: '👶',
    sizes: ['60 x 200 cm', '50 x 150 cm']
  },
  {
    id: 'birthday',
    title: 'birthday',
    image: img1,
    icon: '🎂',
    sizes: ['60 x 200 cm', '50 x 150 cm']
  },
  {
    id: 'graduation',
    title: 'graduation',
    image: gozo,
    icon: '🎓',
    sizes: ['85 x 200 cm', '60 x 200 cm']
  },
  {
    id: 'exam',
    title: 'exam',
    image: florence2,
    icon: '📜',
    sizes: ['60 x 200 cm', '50 x 150 cm']
  },
  {
    id: 'inspiration',
    title: 'inspiration',
    image: florence,
    icon: '✨',
    sizes: ['85 x 200 cm', '60 x 200 cm']
  }
];

// Function to calculate aspect ratio from size string (e.g., "85 x 200 cm")
const getAspectRatio = (sizeStr) => {
  const match = sizeStr.match(/(\d+)\s*x\s*(\d+)/);
  if (match) {
    const width = parseInt(match[1]);
    const height = parseInt(match[2]);
    return (width / height) * 100; // Return as percentage for padding-top
  }
  return 100; // Default square if no match
};

export default function HomePage() {
  const [lang, setLang] = useState('sv');
  const t = translations[lang];

  return (
    <div className="page-container">
      <Header lang={lang} setLang={setLang} />
      
      {/* Hero Section */}
      <section className="hero-section" style={{
        width: '100%',
        maxWidth: 900,
        margin: '0 auto',
        padding: '48px 0 32px 0',
        textAlign: 'center',
        background: 'linear-gradient(90deg, #f5f7fa 60%, #e0c3fc 100%)',
        borderRadius: 24,
        boxShadow: '0 4px 32px rgba(102,126,234,0.07)',
        marginBottom: 32
      }}>
        <h1 style={{ fontSize: '2.5em', fontWeight: 900, color: '#667eea', marginBottom: 12, letterSpacing: '-1px' }}>
          FilMak Studio Poster Gallery
        </h1>
        <p style={{ fontSize: '1.2em', color: '#333', maxWidth: 600, margin: '0 auto' }}>
          Welcome! Browse my custom-designed posters for weddings, baptisms, graduations, and more. Get inspired and contact me to order your own personalized print.
        </p>
        <div style={{ marginTop: 20 }}>
          <Link to="/about" style={{ 
            color: '#667eea', 
            textDecoration: 'none', 
            fontSize: '0.95em',
            fontWeight: 500,
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid #667eea',
            transition: 'all 0.2s',
            display: 'inline-block'
          }}>
            Learn more about my work →
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-with-margin">
        <div className="images-grid">
          {categories.map((category, index) => (
            <div key={category.id} className="image-container">
              <Link 
                to={`/${category.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="image-card" style={{ position: 'relative' }} tabIndex={0} aria-label={`See example posters for ${t[category.title]}`}>
                  <img 
                    src={category.image} 
                    alt={`Example ${t[category.title]} poster`} 
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    color: 'white',
                    padding: '20px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: '10px' 
                    }}>
                      <span style={{ fontSize: '2em', marginRight: '12px' }}>
                        {category.icon}
                      </span>
                      <h3 style={{ 
                        fontSize: '1.3em', 
                        fontWeight: '700', 
                        margin: 0,
                        color: 'white'
                      }}>
                        {t[category.title]}
                      </h3>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      fontSize: '0.9em',
                      fontWeight: '600'
                    }}>
                      Se exempel 
                      <span style={{ marginLeft: '8px', fontSize: '1.1em' }}>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-box">
          <div className="contact-label">
            Contact me
          </div>
          <div className="contact-phone">
            <a href="tel:+467000395606" aria-label="Call +46 70 003 95 606">+46 70 003 95 606</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <span>&copy; {new Date().getFullYear()} FilMak Studio. All rights reserved.</span>
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="footer-instagram-link"
          style={{ marginLeft: 16, verticalAlign: 'middle', display: 'inline-block' }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ verticalAlign: 'middle' }}
          >
            <rect x="2" y="2" width="20" height="20" rx="6" fill="none" stroke="#fff" strokeWidth="2"/>
            <circle cx="12" cy="12" r="5" fill="none" stroke="#fff" strokeWidth="2"/>
            <circle cx="17" cy="7" r="1.2" fill="#fff"/>
          </svg>
        </a>
      </footer>
    </div>
  );
} 