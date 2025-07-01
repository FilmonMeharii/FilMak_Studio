import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import WeddingPosters from './pages/WeddingPosters.jsx';
import ChristeningPosters from './pages/ChristeningPosters.jsx';
import BirthdayPosters from './pages/BirthdayPosters.jsx';
import GraduationPosters from './pages/GraduationPosters.jsx';
import ExamPosters from './pages/ExamPosters.jsx';
import InspirationPosters from './pages/InspirationPosters.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';

export default function App() {
  return (
    <Router basename="/FilMak_Studio">
      <ScrollToTopButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wedding" element={<WeddingPosters />} />
        <Route path="/christening" element={<ChristeningPosters />} />
        <Route path="/birthday" element={<BirthdayPosters />} />
        <Route path="/graduation" element={<GraduationPosters />} />
        <Route path="/exam" element={<ExamPosters />} />
        <Route path="/inspiration" element={<InspirationPosters/>} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}
