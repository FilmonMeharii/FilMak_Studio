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
      
      {/* Categories Grid */}
      <section className="section-with-margin">
        <div className="images-grid">
          {categories.map((category, index) => (
            <div key={category.id} className="image-container">
              <Link 
                to={`/${category.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="image-card" style={{ position: 'relative' }}>
                  <img 
                    src={category.image} 
                    alt={t[category.title]} 
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
            +467000395606
          </div>
        </div>
      </section>
    </div>
  );
} 