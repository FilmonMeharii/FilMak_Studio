import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import '../styles/graduation.css';
import florence from '../assets/florence.jpg';
import florence2 from '../assets/florence2.jpg';
import gozo from '../assets/Gozo.webp';
import rose from '../assets/rose.jpg';
import img1 from '../assets/61647459de00cb906f4996e6006e73a0.jpg';

const translations = {
  sv: {
    title: 'Student',
    backToHome: '← Tillbaka till startsidan',
  },
  en: {
    title: 'Graduation',
    backToHome: '← Back to homepage',
  },
  ti: {
    title: 'መመረቅታ',
    backToHome: '← ናብ መጀመርታ ተመለስ',
  },
};

const examples = [
  { src: gozo, title: 'Studentposter 1', size: '85 x 200 cm' },
  { src: florence, title: 'Studentposter 2', size: '60 x 200 cm' },
  { src: rose, title: 'Studentposter 3', size: '70 x 100 cm' },
  { src: img1, title: 'Studentposter 4', size: '80 x 120 cm' },
  { src: florence2, title: 'Studentposter 5', size: '50 x 150 cm' },
  { src: gozo, title: 'Studentposter 6', size: '85 x 200 cm' },
];

// Function to get CSS class based on size
const getSizeClass = (size) => {
  if (size === '85 x 200 cm') return 'graduation-poster-85x200';
  if (size === '60 x 200 cm') return 'graduation-poster-60x200';
  if (size === '70 x 100 cm') return 'graduation-poster-70x100';
  if (size === '80 x 120 cm') return 'graduation-poster-80x120';
  if (size === '50 x 150 cm') return 'graduation-poster-50x150';
  return 'graduation-poster-85x200'; // default
};

export default function GraduationPosters() {
  const [lang, setLang] = useState('sv');
  const t = translations[lang];
  const [imgModal, setImgModal] = useState(null);
  const modalRef = useRef(null);

  // Trap focus inside modal and handle keyboard navigation
  useEffect(() => {
    if (imgModal !== null) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setImgModal(null);
        } else if (e.key === 'ArrowRight') {
          setImgModal((prev) => (prev + 1) % examples.length);
        } else if (e.key === 'ArrowLeft') {
          setImgModal((prev) => (prev - 1 + examples.length) % examples.length);
        } else if (e.key === 'Tab') {
          // Trap focus
          const focusable = modalRef.current.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          } else if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        }
      };
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [imgModal]);

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
        <div className="graduation-images-grid">
          {examples.map((ex, i) => (
            <div key={i} className="graduation-image-container">
              <div
                className={`graduation-image-card ${getSizeClass(ex.size)}`}
                onClick={() => setImgModal(i)}
                title="Klicka för att förstora"
                tabIndex={0}
                aria-label={`Enlarge example graduation poster ${i+1}`}
              >
                <img 
                  src={ex.src} 
                  alt={`Example graduation poster ${i+1}`} 
                  loading="lazy"
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
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged graduation poster"
          tabIndex={-1}
          onClick={(e) => {
            if (e.target === e.currentTarget) setImgModal(null);
          }}
        >
          <div
            className="modal-content"
            ref={modalRef}
            style={{
              transition: 'transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s',
              transform: 'scale(1)',
              opacity: 1
            }}
          >
            <img
              src={examples[imgModal].src}
              alt={`Enlarged example graduation poster ${imgModal + 1}`}
              className="modal-image"
              loading="lazy"
              style={{ transition: 'opacity 0.3s' }}
            />
            <button
              onClick={() => setImgModal(null)}
              className="modal-close"
              aria-label="Close modal"
              autoFocus
            >
              ×
            </button>
            <button
              onClick={() => setImgModal((prev) => (prev - 1 + examples.length) % examples.length)}
              className="modal-prev"
              aria-label="Previous image"
              style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', fontSize: '2em', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0 16px' }}
            >
              ‹
            </button>
            <button
              onClick={() => setImgModal((prev) => (prev + 1) % examples.length)}
              className="modal-next"
              aria-label="Next image"
              style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', fontSize: '2em', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0 16px' }}
            >
              ›
            </button>
          </div>
        </div>
      )}

      <footer className="footer" role="contentinfo">
        &copy; {new Date().getFullYear()} FilMak Studio. All rights reserved.
      </footer>
    </div>
  );
} 