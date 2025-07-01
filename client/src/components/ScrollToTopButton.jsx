import React, { useState, useEffect } from 'react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      style={{
        position: 'fixed',
        right: 24,
        bottom: 32,
        zIndex: 10000,
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        border: 'none',
        boxShadow: '0 4px 16px rgba(102,126,234,0.18)',
        display: visible ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s, transform 0.3s',
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
      }}
    >
      <span style={{ lineHeight: 1, fontWeight: 700 }}>&uarr;</span>
    </button>
  );
} 