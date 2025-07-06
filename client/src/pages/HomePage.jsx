import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import florence from '../assets/florence.jpg';
import florence2 from '../assets/florence2.jpg';
import gozo from '../assets/Gozo.webp';
import rose from '../assets/dop/dop (100 x 60 cm).png';
import img1 from '../assets/61647459de00cb906f4996e6006e73a0.jpg';
import whitePoster from '../assets/wedding/white poster.png';
import girlBirthday from '../assets/birthday/girl birthday (1).png';
import girlStudenten from '../assets/graduation/girl studenten.png';

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
    image: whitePoster,
    icon: '💍',
    sizes: ['Vit Rollup (85 x 200 cm)', 'Färgad Rollup (85 x 200 cm)']
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
    image: girlBirthday,
    icon: '🎂',
    sizes: ['100 x 60 cm', 'A3 (30 x 42 cm)']
  },
  {
    id: 'graduation',
    title: 'graduation',
    image: girlStudenten,
    icon: '🎓',
    sizes: ['100 x 60 cm', 'A3 (30 x 42 cm)']
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

export default function HomePage({ lang, setLang }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const t = translations[lang];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload critical images
  useEffect(() => {
    const preloadImages = categories.slice(0, 3).map(category => {
      const img = new Image();
      img.src = category.image;
      return img;
    });
  }, []);

  return (
    <div className="page-container" style={{
      padding: windowWidth <= 768 ? '4px 8px' : '8px 16px'
    }}>
      <Header lang={lang} setLang={setLang} />

      {/* Categories Grid */}
      <section className="section-with-margin" style={{
        margin: windowWidth <= 768 ? '6px 0 20px 0' : '10px 0 30px 0',
        padding: windowWidth <= 768 ? '0 4px' : '0 8px'
      }}>
        <div className="images-grid" style={{
          gap: windowWidth <= 480 ? '16px' : windowWidth <= 768 ? '12px' : '12px'
        }}>
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
                    loading="lazy"
                    decoding="async"
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    color: 'white',
                    padding: windowWidth <= 480 ? '8px' : '10px',
                    textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: windowWidth <= 480 ? '3px' : '4px' 
                    }}>
                      <span style={{ 
                        fontSize: windowWidth <= 480 ? '1.2em' : '1.4em', 
                        marginRight: windowWidth <= 480 ? '6px' : '8px' 
                      }}>
                        {category.icon}
                      </span>
                      <h3 style={{ 
                        fontSize: windowWidth <= 480 ? '0.9em' : '1em', 
                        fontWeight: '600', 
                        margin: 0,
                        color: 'white'
                      }}>
                        {t[category.title]}
                      </h3>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      fontSize: windowWidth <= 480 ? '0.65em' : '0.7em',
                      fontWeight: '500'
                    }}>
                      See more examples 
                      <span style={{ marginLeft: '4px', fontSize: '1em' }}>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Combined Hero & Contact Section */}
      <section className="hero-section" style={{
        width: '100%',
        maxWidth: 700,
        margin: '0 auto',
        padding: windowWidth <= 768 ? '8px 0 6px 0' : '12px 0 10px 0',
        textAlign: 'center',
        background: 'linear-gradient(90deg, #f5f7fa 60%, #e0c3fc 100%)',
        borderRadius: windowWidth <= 768 ? 8 : 12,
        boxShadow: '0 1px 8px rgba(102,126,234,0.05)',
        marginTop: windowWidth <= 768 ? 12 : 20
      }}>
        <h1 style={{ 
          fontSize: windowWidth <= 480 ? '1.1em' : windowWidth <= 768 ? '1.3em' : '1.5em', 
          fontWeight: 700, 
          color: '#667eea', 
          marginBottom: windowWidth <= 768 ? 3 : 4, 
          letterSpacing: '-0.3px',
          lineHeight: 1.1
        }}>
          FilMak Studio Poster Gallery
        </h1>
        <p style={{ 
          fontSize: windowWidth <= 480 ? '0.7em' : '0.8em', 
          color: '#333', 
          maxWidth: 450, 
          margin: '0 auto',
          padding: windowWidth <= 768 ? '0 8px' : '0',
          lineHeight: 1.3,
          opacity: 0.9,
          marginBottom: windowWidth <= 768 ? 6 : 8
        }}>
          Welcome! Browse my custom-designed posters for weddings, baptisms, graduations, and more. Get inspired and contact me to order your own personalized print.
        </p>
        
        {/* Contact Info */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: windowWidth <= 768 ? 6 : 8,
          padding: windowWidth <= 768 ? '6px 8px' : '8px 12px',
          marginBottom: windowWidth <= 768 ? 6 : 8,
          border: '1px solid rgba(102,126,234,0.2)'
        }}>
          <div style={{
            fontSize: windowWidth <= 480 ? '0.7em' : '0.75em',
            color: '#667eea',
            fontWeight: 600,
            marginBottom: windowWidth <= 768 ? 2 : 3
          }}>
            Contact me
          </div>
          <div style={{
            fontSize: windowWidth <= 480 ? '0.85em' : '0.9em',
            color: '#333',
            fontWeight: 500
          }}>
            <a href="tel:+467000395606" aria-label="Call +46 70 003 95 606" style={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: 600
            }}>+46 70 003 95 606</a>
          </div>
        </div>

        <div style={{ marginTop: windowWidth <= 768 ? 4 : 6 }}>
          <Link to="/about" style={{ 
            color: '#667eea', 
            textDecoration: 'none', 
            fontSize: windowWidth <= 480 ? '0.65em' : '0.7em',
            fontWeight: 500,
            padding: windowWidth <= 768 ? '2px 6px' : '3px 8px',
            borderRadius: 4,
            border: '1px solid #667eea',
            transition: 'all 0.2s',
            display: 'inline-block'
          }}>
            Learn more about my work →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" role="contentinfo" style={{
        padding: windowWidth <= 768 ? '6px 0 3px 0' : '8px 0 4px 0',
        fontSize: windowWidth <= 480 ? '0.65em' : '0.7em'
      }}>
        <span>&copy; {new Date().getFullYear()} FilMak Studio. All rights reserved.</span>
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="footer-instagram-link"
          style={{ marginLeft: 8, verticalAlign: 'middle', display: 'inline-block' }}
        >
          <svg
            width="16"
            height="16"
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