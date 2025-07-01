import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useSwipeGesture } from '../hooks/useSwipeGesture.js';
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
  const modalRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Swipe gestures for mobile
  const handleSwipeLeft = () => {
    if (imgModal !== null) {
      setImgModal((prev) => (prev + 1) % examples.length);
    }
  };

  const handleSwipeRight = () => {
    if (imgModal !== null) {
      setImgModal((prev) => (prev - 1 + examples.length) % examples.length);
    }
  };

  useSwipeGesture(handleSwipeLeft, handleSwipeRight);

  // Handle image loading
  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

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
        <div className="inspiration-images-grid">
          {examples.map((ex, i) => (
            <div key={i} className="inspiration-image-container">
              <div
                className={`inspiration-image-card ${getSizeClass(ex.size)}`}
                onClick={() => setImgModal(i)}
                title="Klicka för att förstora"
                tabIndex={0}
                aria-label={`Enlarge example inspiration poster ${i+1}`}
              >
                {!loadedImages.has(i) && (
                  <div 
                    className="image-loading" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 1
                    }}
                  />
                )}
                <img 
                  src={ex.src} 
                  alt={`Example inspiration poster ${i+1}`} 
                  loading="lazy"
                  className={`image-fade-in ${loadedImages.has(i) ? 'loaded' : ''}`}
                  onLoad={() => handleImageLoad(i)}
                  style={{ position: 'relative', zIndex: 2 }}
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
          aria-label="Enlarged inspiration poster"
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
              alt={`Enlarged example inspiration poster ${imgModal + 1}`}
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