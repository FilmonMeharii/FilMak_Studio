import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import '../styles/wedding.css';
import florence from '../assets/florence.jpg';
import florence2 from '../assets/florence2.jpg';
import gozo from '../assets/Gozo.webp';
import rose from '../assets/rose.jpg';
import img1 from '../assets/61647459de00cb906f4996e6006e73a0.jpg';

const translations = {
  sv: {
    title: 'Bröllop',
    backToHome: '← Tillbaka till startsidan',
  },
  en: {
    title: 'Wedding',
    backToHome: '← Back to homepage',
  },
  ti: {
    title: 'ብዓል',
    backToHome: '← ናብ መጀመርታ ተመለስ',
  },
};

const examples = [
  { src: florence, title: 'Bröllopsposter 1', size: '85 x 200 cm' },
  { src: florence2, title: 'Bröllopsposter 2', size: '60 x 200 cm' },
  { src: gozo, title: 'Bröllopsposter 3', size: '85 x 200 cm' },
  { src: rose, title: 'Bröllopsposter 4', size: '60 x 200 cm' },
  { src: img1, title: 'Bröllopsposter 5', size: '50 x 150 cm' },
  { src: florence, title: 'Bröllopsposter 6', size: '85 x 200 cm' },
];

// Function to get CSS class based on size
const getSizeClass = (size) => {
  if (size === '85 x 200 cm') return 'wedding-poster-85x200';
  if (size === '60 x 200 cm') return 'wedding-poster-60x200';
  if (size === '50 x 150 cm') return 'wedding-poster-50x150';
  return 'wedding-poster-85x200'; // default
};

export default function WeddingPosters() {
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
        <div className="wedding-images-grid">
          {examples.map((ex, i) => (
            <div key={i} className="wedding-image-container">
              <div
                className={`wedding-image-card ${getSizeClass(ex.size)}`}
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