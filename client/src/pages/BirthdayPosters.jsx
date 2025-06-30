import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import '../styles/birthday.css';
import florence from '../assets/florence.jpg';
import florence2 from '../assets/florence2.jpg';
import gozo from '../assets/Gozo.webp';
import rose from '../assets/rose.jpg';
import img1 from '../assets/61647459de00cb906f4996e6006e73a0.jpg';

const translations = {
  sv: {
    title: 'Födelsedag',
    backToHome: '← Tillbaka till startsidan',
  },
  en: {
    title: 'Birthday',
    backToHome: '← Back to homepage',
  },
  ti: {
    title: 'ልደት/በርዝደይ',
    backToHome: '← ናብ መጀመርታ ተመለስ',
  },
};

const examples = [
  { src: img1, title: 'Födelsedagsposter 1', size: '50 x 70 cm' },
  { src: rose, title: 'Födelsedagsposter 2', size: '60 x 80 cm' },
  { src: florence, title: 'Födelsedagsposter 3', size: '70 x 100 cm' },
  { src: gozo, title: 'Födelsedagsposter 4', size: '60 x 200 cm' },
  { src: florence2, title: 'Födelsedagsposter 5', size: '50 x 150 cm' },
  { src: img1, title: 'Födelsedagsposter 6', size: '50 x 70 cm' },
];

// Function to get CSS class based on size
const getSizeClass = (size) => {
  if (size === '50 x 70 cm') return 'birthday-poster-50x70';
  if (size === '60 x 80 cm') return 'birthday-poster-60x80';
  if (size === '70 x 100 cm') return 'birthday-poster-70x100';
  if (size === '60 x 200 cm') return 'birthday-poster-60x200';
  if (size === '50 x 150 cm') return 'birthday-poster-50x150';
  return 'birthday-poster-50x70'; // default
};

export default function BirthdayPosters() {
  const [lang, setLang] = useState('sv');
  const t = translations[lang];
  const [imgModal, setImgModal] = useState(null);

  return (
    <div className="page-container">
      <Header lang={lang} setLang={setLang} />
      
      {/* Back to home */}
      <div className="section">
        <Link to="/" className="back-link">
          {t.backToHome}
        </Link>
      </div>

      {/* Title */}
      <section className="section">
        <h1 className="page-title">
          {t.title}
        </h1>
      </section>

      {/* Images Grid */}
      <section className="section-with-margin">
        <div className="birthday-images-grid">
          {examples.map((ex, i) => (
            <div key={i} className="birthday-image-container">
              <div
                className={`birthday-image-card ${getSizeClass(ex.size)}`}
                onClick={() => setImgModal(i)}
                title="Klicka för att förstora"
              >
                <img 
                  src={ex.src} 
                  alt={ex.title} 
                />
              </div>
              <div style={{ 
                marginTop: '8px', 
                fontSize: '0.9em', 
                color: '#666',
                fontWeight: '500'
              }}>
                {ex.size}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Modal */}
      {imgModal !== null && (
        <div className="modal-overlay" onClick={() => setImgModal(null)}>
          <div className="modal-content">
            <img 
              src={examples[imgModal].src} 
              alt={examples[imgModal].title} 
              className="modal-image"
            />
            <button 
              onClick={() => setImgModal(null)} 
              className="modal-close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 