import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useSwipeGesture } from '../hooks/useSwipeGesture.js';
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
  { src: florence, title: 'Bröllopsposter 1', size: 'A3 (30 x 42 cm)' },
  { src: florence, title: 'Bröllopsposter 2', size: 'A2 (42 x 59 cm)' },
  { src: florence, title: 'Bröllopsposter 3', size: 'A1 (59 x 84 cm)' },
  { src: florence, title: 'Bröllopsposter 4', size: 'A0 (84 x 119 cm)' },
  { src: florence, title: 'Bröllopsposter 5', size: 'Rollup (85 x 200 cm)' },
  { src: florence2, title: 'Bröllopsposter 6', size: 'A3 (30 x 42 cm)' },
  { src: florence2, title: 'Bröllopsposter 7', size: 'A2 (42 x 59 cm)' },
  { src: florence2, title: 'Bröllopsposter 8', size: 'A1 (59 x 84 cm)' },
  { src: florence2, title: 'Bröllopsposter 9', size: 'A0 (84 x 119 cm)' },
  { src: gozo, title: 'Bröllopsposter 10', size: 'A3 (30 x 42 cm)' },
  { src: gozo, title: 'Bröllopsposter 11', size: 'A2 (42 x 59 cm)' },
  { src: gozo, title: 'Bröllopsposter 12', size: 'A1 (59 x 84 cm)' },
  { src: gozo, title: 'Bröllopsposter 13', size: 'A0 (84 x 119 cm)' },
  { src: rose, title: 'Bröllopsposter 14', size: 'A3 (30 x 42 cm)' },
  { src: rose, title: 'Bröllopsposter 15', size: 'A2 (42 x 59 cm)' },
  { src: rose, title: 'Bröllopsposter 16', size: 'A1 (59 x 84 cm)' },
  { src: rose, title: 'Bröllopsposter 17', size: 'Rollup (85 x 200 cm)' },
  { src: img1, title: 'Bröllopsposter 18', size: 'A3 (30 x 42 cm)' },
  { src: img1, title: 'Bröllopsposter 19', size: 'A2 (42 x 59 cm)' },
  { src: img1, title: 'Bröllopsposter 20', size: 'A1 (59 x 84 cm)' }
];

// Function to get CSS class based on size
const getSizeClass = (size) => {
  if (size === 'A2 (42 x 59 cm)') return 'wedding-poster-a2';
  if (size === 'A1 (59 x 84 cm)') return 'wedding-poster-a1';
  if (size === 'A0 (84 x 119 cm)') return 'wedding-poster-a0';
  if (size === 'A3 (30 x 42 cm)') return 'wedding-poster-a3';
  if (size === 'Rollup (85 x 200 cm)') return 'wedding-poster-rollup';
  return 'wedding-poster-a2'; // default
};

export default function WeddingPosters() {
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

      {/* Images Grid */}
      <section className="section-with-margin">
        <div className="wedding-images-grid">
          {examples.map((ex, i) => (
            <div key={i} className="wedding-image-container">
              <div
                className={`wedding-image-card ${getSizeClass(ex.size)}`}
                onClick={() => setImgModal(i)}
                title="Klicka för att förstora"
                tabIndex={0}
                aria-label={`Enlarge example wedding poster ${i+1}`}
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
                  alt={`Example wedding poster ${i+1}`} 
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
          aria-label="Enlarged wedding poster"
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
              alt={`Enlarged example wedding poster ${imgModal + 1}`}
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