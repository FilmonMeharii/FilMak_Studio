import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const translations = {
  sv: {
    wedding: 'Bröllop',
    christening: 'Dop',
    birthday: 'Födelsedag',
    graduation: 'Student',
    exam: 'Examen',
    inspiration: 'Inspiration',
  },
  en: {
    wedding: 'Wedding',
    christening: 'Baptism',
    birthday: 'Birthday',
    graduation: 'Graduation',
    exam: 'Exam',
    inspiration: 'Inspiration',
  },
  ti: {
    wedding: 'ብዓል',
    christening: 'ጥምቀት',
    birthday: 'ልደት',
    graduation: 'መመረቅታ',
    exam: 'ፈተና',
    inspiration: 'መጽሓፍ ቅዱስ',
  },
};

export default function Header({ lang, setLang }) {
  const t = translations[lang];
  const location = useLocation();

  const navItems = [
    { path: '/wedding', key: 'wedding' },
    { path: '/christening', key: 'christening' },
    { path: '/birthday', key: 'birthday' },
    { path: '/graduation', key: 'graduation' },
    { path: '/exam', key: 'exam' },
    { path: '/inspiration', key: 'inspiration' },
  ];

  return (
    <header className="header">
      <Link to="/" className="logo">
        FilMak<br/>Studio
      </Link>
      
      <nav className="nav">
        <div className="nav-links">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
            >
              {t[item.key]}
            </Link>
          ))}
        </div>
        
        <div className="language-switcher">
          <button 
            className={`lang-button ${lang === 'sv' ? 'active' : 'inactive'}`}
            onClick={() => setLang('sv')}
          >
            SV
          </button>
          <span className="lang-separator">|</span>
          <button 
            className={`lang-button ${lang === 'en' ? 'active' : 'inactive'}`}
            onClick={() => setLang('en')}
          >
            EN
          </button>
          <span className="lang-separator">|</span>
          <button 
            className={`lang-button ${lang === 'ti' ? 'active' : 'inactive'}`}
            onClick={() => setLang('ti')}
          >
            TI
          </button>
        </div>
      </nav>
    </header>
  );
} 