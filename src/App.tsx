import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { GradientBackground } from './components/GradientBackground';
import Home from './pages/Home';
import Competitions from './pages/Competitions';
import Scholarships from './pages/Scholarships';
import PastExams from './pages/PastExams';
import Clubs from './pages/Clubs';
import StudySpots from './pages/StudySpots';
import Dashboard from './pages/Dashboard';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen relative flex flex-col pt-24">
      <GradientBackground />
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AnimatePresence mode="wait">
          {/* @ts-expect-error - key is valid on elements in React */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/past-exams" element={<PastExams />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/study-spots" element={<StudySpots />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
