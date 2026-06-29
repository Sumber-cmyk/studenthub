import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const links = [
  { name: 'Нүүр', path: '/' },
  { name: 'Тэмцээнүүд', path: '/competitions' },
  { name: 'Тэтгэлэг', path: '/scholarships' },
  { name: 'Хуучин шалгалтууд', path: '/past-exams' },
  { name: 'Клубүүд', path: '/clubs' },
  { name: 'Суралцах орчин', path: '/study-spots' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent',
        scrolled ? 'bg-background/80 backdrop-blur-md border-card-border py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">StudentHub MN</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-1 bg-card/50 backdrop-blur-md border border-card-border rounded-full px-2 py-1">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
                isActive ? "text-white" : "text-muted hover:text-white"
              )}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <NavLink to="/dashboard" className="hidden sm:flex items-center justify-center px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors">
            Хянах самбар
          </NavLink>
          
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-card-border p-4 flex flex-col gap-2"
        >
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => cn(
                "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-white/10 text-white" : "text-muted hover:bg-white/5 hover:text-white"
              )}
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink 
            to="/dashboard" 
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 px-4 py-3 rounded-lg bg-white text-black text-center font-semibold text-sm"
          >
            Хянах самбар
          </NavLink>
        </motion.div>
      )}
    </motion.nav>
  );
}
