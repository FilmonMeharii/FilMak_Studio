import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import '../styles/inspiration.css';
import florence from '../assets/florence.jpg';
import florence2 from '../assets/florence2.jpg';
import gozo from '../assets/Gozo.webp';
import rose from '../assets/rose.jpg';
import img1 from '../assets/61647459de00cb906f4996e6006e73a0.jpg';

const translations = {
  sv: {
    title: 'Inspiration',
    backToHome: '← Tillbaka till startsidan',
  },
  en: {
    title: 'Inspiration',
    backToHome: '← Back to homepage',
  },
  ti: {
    title: 'ጥቅስታት',
    backToHome: '← ናብ መጀመርታ ተመለስ',
  },
};

const examples = [
  { src: florence, title: 'Inspirationsposter 1', size: '10 x 15 cm' },
  { src: rose, title: 'Inspirationsposter 2', size: '15 x 20 cm' },
  { src: img1, title: 'Inspirationsposter 3', size: '20 x 10 cm' },
  { src: gozo, title: 'Inspirationsposter 4', size: '20 x 30 cm' },
  { src: florence2, title: 'Inspirationsposter 5', size: '25 x 35 cm' },
  { src: florence, title: 'Inspirationsposter 6', size: '30 x 15 cm' },
  { src: rose, title: 'Inspirationsposter 7', size: '30 x 40 cm' },
  { src: img1, title: 'Inspirationsposter 8', size: '40 x 60 cm' },
  { src: gozo, title: 'Inspirationsposter 9', size: '50 x 50 cm' },
];

// Function to get CSS class based on size
const getSizeClass = (size) => {
  if (size === '10 x 15 cm') return 'inspiration-poster-10x15';
  if (size === '15 x 20 cm') return 'inspiration-poster-15x20';
  if (size === '20 x 10 cm') return 'inspiration-poster-20x10';
  if (size === '20 x 30 cm') return 'inspiration-poster-20x30';
  if (size === '25 x 35 cm') return 'inspiration-poster-25x35';
  if (size === '30 x 15 cm') return 'inspiration-poster-30x15';
  if (size === '30 x 40 cm') return 'inspiration-poster-30x40';
  if (size === '40 x 60 cm') return 'inspiration-poster-40x60';
  if (size === '50 x 50 cm') return 'inspiration-poster-50x50';
  return 'inspiration-poster-10x15'; // default
};

export default function InspirationPosters() {
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
        <div className="inspiration-images-grid">
          {examples.map((ex, i) => (
            <div key={i} className="inspiration-image-container">
              <div
                className={`inspiration-image-card ${getSizeClass(ex.size)}`}
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