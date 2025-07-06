import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import florence from '../assets/inspiration/O Amlakey.webp';
import gozo from '../assets/exam/gozo.webp';
import rose from '../assets/dop/dop girl.webp';
import whitePoster from '../assets/wedding/white poster.webp';
import girlBirthday from '../assets/birthday/girl birthday.webp';
import girlStudenten from '../assets/graduation/girl studenten.webp';

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
    image: gozo,
    icon: '📜',
    sizes: ['A2 (42 x 59 cm)', 'A1 (59 x 84 cm)', 'A3 (30 x 42 cm)', 'A4 (21 x 30 cm)', 'A0 (84 x 119 cm)']
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

// Ultra-lightweight image component for maximum performance
const FastImage = ({ src, alt, loading = "lazy", priority = false, ...props }) => {
  return (
    <img 
      src={src} 
      alt={alt}
      loading={priority ? "eager" : loading}
      decoding="async"
      style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover',
        ...props.style
      }}
      {...props}
    />
  );
};

export default function HomePage({ lang, setLang }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const t = translations[lang];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
                  <FastImage 
                    src={category.image} 
                    alt={`Example ${t[category.title]} poster`} 
                    loading={index < 2 ? "eager" : "lazy"}
                    priority={index < 2}
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
                      fontSize: windowWidth <= 480 ? '1.1em' : '1.3em', 
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      {category.icon} {t[category.title]}
                    </div>

                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Info */}
      <section className="section" style={{
        textAlign: 'center',
        padding: windowWidth <= 768 ? '20px 16px' : '30px 24px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        margin: windowWidth <= 768 ? '20px 8px' : '30px 16px',
        color: 'white',
        boxShadow: '0 8px 32px rgba(102,126,234,0.3)'
      }}>
        <p style={{ 
          fontSize: windowWidth <= 480 ? '1em' : '1.1em',
          margin: 0,
          lineHeight: 1.5
        }}>
          {t.contactInfo}
        </p>
      </section>

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