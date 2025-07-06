import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useSwipeGesture } from '../hooks/useSwipeGesture.js';
import '../styles/inspiration.css';
import tiezazat10 from '../assets/inspiration/10 tiezazat.png';
import tiezazat10_2 from '../assets/inspiration/10 tiezazat 2.png';
import etiZmkah from '../assets/inspiration/eti zmkah.png';
import gerkaleyIkaEmo from '../assets/inspiration/gerkaley ika emo.png';
import nabBetEgziabiher from '../assets/inspiration/nab bet egziabiher.jpg';
import OAmlakey from '../assets/inspiration/O Amlakey.png';
import xruyLbiFtereley from '../assets/inspiration/xruy lbi ftereley .jpg';

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
  { src: tiezazat10_2, title: '10 tiezazat 2 - 1', size: '10 x 15 cm' },
  { src: tiezazat10_2, title: '10 tiezazat 2 - 2', size: '15 x 30 cm' },
  { src: tiezazat10_2, title: '10 tiezazat 2 - 3', size: '20 x 30 cm' },
  { src: etiZmkah, title: 'eti zmkah 1', size: '20 x 10 cm' },
  { src: etiZmkah, title: 'eti zmkah 2', size: '15 x 10 cm' },
  { src: etiZmkah, title: 'eti zmkah 3', size: '30 x 20 cm' },
  { src: gerkaleyIkaEmo, title: 'gerkaley ika emo 1', size: '10 x 15 cm' },
  { src: gerkaleyIkaEmo, title: 'gerkaley ika emo 2', size: '15 x 20 cm' },
  { src: gerkaleyIkaEmo, title: 'gerkaley ika emo 3', size: '20 x 30 cm' },
  { src: nabBetEgziabiher, title: 'nab bet egziabiher 1', size: '20 x 10 cm' },
  { src: nabBetEgziabiher, title: 'nab bet egziabiher 2', size: '40 x 25 cm' },
  { src: nabBetEgziabiher, title: 'nab bet egziabiher 3', size: '30 x 20 cm' },
  { src: OAmlakey, title: 'O Amlakey 1', size: '15 x 20 cm' },
  { src: OAmlakey, title: 'O Amlakey 2', size: '20 x 30 cm' },
  { src: OAmlakey, title: 'O Amlakey 3', size: '30 x 40 cm' },
  { src: tiezazat10, title: '10 tiezazat 1', size: '10 x 15 cm' },
  { src: tiezazat10, title: '10 tiezazat 2', size: '15 x 20 cm' },
  { src: tiezazat10, title: '10 tiezazat 3', size: '20 x 30 cm' },
  { src: xruyLbiFtereley, title: 'xruy lbi ftereley 1', size: '15 x 10 cm' },
  { src: xruyLbiFtereley, title: 'xruy lbi ftereley 2', size: '15 x 15 cm' },
  { src: xruyLbiFtereley, title: 'xruy lbi ftereley 3', size: '30 x 20 cm' }
];

// Function to get CSS class based on size
const getSizeClass = (size) => {
  if (size === '10 x 15 cm') return 'inspiration-poster-10x15';
  if (size === '15 x 10 cm') return 'inspiration-poster-15x10';
  if (size === '15 x 15 cm') return 'inspiration-poster-15x15';
  if (size === '15 x 20 cm') return 'inspiration-poster-15x20';
  if (size === '15 x 30 cm') return 'inspiration-poster-15x30';
  if (size === '20 x 10 cm') return 'inspiration-poster-20x10';
  if (size === '20 x 30 cm') return 'inspiration-poster-20x30';
  if (size === '25 x 35 cm') return 'inspiration-poster-25x35';
  if (size === '30 x 15 cm') return 'inspiration-poster-30x15';
  if (size === '30 x 20 cm') return 'inspiration-poster-30x20';
  if (size === '30 x 40 cm') return 'inspiration-poster-30x40';
  if (size === '40 x 25 cm') return 'inspiration-poster-40x25';
  if (size === '40 x 60 cm') return 'inspiration-poster-40x60';
  if (size === '50 x 50 cm') return 'inspiration-poster-50x50';
  return 'inspiration-poster-10x15'; // default
};

export default function InspirationPosters({ lang, setLang }) {
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