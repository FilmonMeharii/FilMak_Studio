import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import FastImage from '../components/FastImage.jsx';
import { useSwipeGesture } from '../hooks/useSwipeGesture.js';
import '../styles/birthday.css';
import girlBirthday from '../assets/birthday/girl birthday.webp';
import boyBirthday from '../assets/birthday/boy birthday.webp';

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
    title: 'ልደት',
    backToHome: '← ናብ መጀመርታ ተመለስ',
  },
};

const examples = [];

// Function to get CSS class based on size
const getSizeClass = (size) => {
  if (size === 'A2 (42 x 59 cm)') return 'birthday-poster-a2';
  if (size === 'A1 (59 x 84 cm)') return 'birthday-poster-a1';
  if (size === 'A4 (21 x 30 cm)') return 'birthday-poster-a4';
  return 'birthday-poster-a3'; // default
};

export default function BirthdayPosters() {
  const [lang, setLang] = useState('sv');
  const t = translations[lang];
  const [imgModal, setImgModal] = useState(null);
  const modalRef = useRef(null);

  const featuredImages = [
    { src: girlBirthday, title: 'Födelsedagsposter - Flicka', size: '100 x 60 cm' },
    { src: boyBirthday, title: 'Födelsedagsposter - Pojke', size: '100 x 60 cm' }
  ];

  // Swipe gestures for mobile
  const handleSwipeLeft = () => {
    if (imgModal !== null) {
      setImgModal((prev) => (prev + 1) % featuredImages.length);
    }
  };

  const handleSwipeRight = () => {
    if (imgModal !== null) {
      setImgModal((prev) => (prev - 1 + featuredImages.length) % featuredImages.length);
    }
  };

  useSwipeGesture(handleSwipeLeft, handleSwipeRight);

  // Trap focus inside modal and handle keyboard navigation
  useEffect(() => {
    if (imgModal !== null) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setImgModal(null);
        } else if (e.key === 'ArrowRight') {
          setImgModal((prev) => (prev + 1) % featuredImages.length);
        } else if (e.key === 'ArrowLeft') {
          setImgModal((prev) => (prev - 1 + featuredImages.length) % featuredImages.length);
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

      {/* Featured birthday images at the top of the grid, both clickable */}
      <div className="birthday-featured-image-container" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '24px', margin: '8px 0 8px 0', width: '100%', padding: '0 24px' }}>
        {featuredImages.map((img, idx) => (
          <div
            key={img.title}
            className="birthday-image-card"
            onClick={() => setImgModal(-1 - idx)}
            title="Klicka för att förstora"
            tabIndex={0}
            aria-label={`Enlarge featured birthday poster ${idx+1}`}
            style={{ cursor: 'pointer', maxWidth: '45%', width: 'auto', background: 'none', boxShadow: 'none', border: 'none' }}
          >
            <FastImage 
              src={img.src} 
              alt={img.title}
              loading={idx < 2 ? "eager" : "lazy"}
              priority={idx < 2}
              style={{
                maxWidth: '100%',
                maxHeight: '320px',
                height: 'auto',
                width: 'auto',
                objectFit: 'contain',
                borderRadius: '18px',
                display: 'block',
                margin: '0 auto',
                background: 'none',
                boxShadow: 'none',
                padding: 0
              }}
            />
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {imgModal !== null && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged birthday poster"
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
              src={imgModal < 0 ? featuredImages[Math.abs(imgModal) - 1].src : examples[imgModal].src}
              alt={imgModal < 0 ? `Enlarged ${featuredImages[Math.abs(imgModal) - 1].title}` : `Enlarged example birthday poster ${imgModal + 1}`}
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
              onClick={() => setImgModal((prev) => (prev - 1 + featuredImages.length) % featuredImages.length)}
              className="modal-prev"
              aria-label="Previous image"
              style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', fontSize: '2em', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0 16px' }}
            >
              ‹
            </button>
            <button
              onClick={() => setImgModal((prev) => (prev + 1) % featuredImages.length)}
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