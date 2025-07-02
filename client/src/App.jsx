import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage.jsx';
import WeddingPosters from './pages/WeddingPosters.jsx';
import ChristeningPosters from './pages/ChristeningPosters.jsx';
import BirthdayPosters from './pages/BirthdayPosters.jsx';
import GraduationPosters from './pages/GraduationPosters.jsx';
import ExamPosters from './pages/ExamPosters.jsx';
import InspirationPosters from './pages/InspirationPosters.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import FloatingContactButton from './components/FloatingContactButton.jsx';

export default function App() {
  const [lang, setLang] = useState('sv');

  return (
    <Router>
      <ScrollToTopButton />
      <FloatingContactButton lang={lang} />
      <Routes>
        <Route path="/" element={<HomePage lang={lang} setLang={setLang} />} />
        <Route path="/wedding" element={<WeddingPosters lang={lang} setLang={setLang} />} />
        <Route path="/christening" element={<ChristeningPosters lang={lang} setLang={setLang} />} />
        <Route path="/birthday" element={<BirthdayPosters lang={lang} setLang={setLang} />} />
        <Route path="/graduation" element={<GraduationPosters lang={lang} setLang={setLang} />} />
        <Route path="/exam" element={<ExamPosters lang={lang} setLang={setLang} />} />
        <Route path="/inspiration" element={<InspirationPosters lang={lang} setLang={setLang} />} />
        <Route path="/about" element={<AboutPage lang={lang} setLang={setLang} />} />
      </Routes>
    </Router>
  );
}
