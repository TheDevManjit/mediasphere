import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X, Bell, Rss } from 'lucide-react';

const navLinks = [
  { label: 'होम', path: '/' },
  { label: 'ताज़ा खबरें', path: '/latest' },
  { label: 'राजनीति', path: '/politics' },
  { label: 'व्यापार', path: '/business' },
  { label: 'तकनीक', path: '/technology' },
  { label: 'खेल', path: '/sports' },
  { label: 'मनोरंजन', path: '/entertainment' },
  { label: 'स्वास्थ्य', path: '/health' },
  { label: 'विश्व', path: '/world' },
  { label: 'संपर्क', path: '/contact' },
];

export default function Navbar({ darkMode, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleSearchKey = useCallback((e) => {
    if (e.key === 'Escape') setSearchOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleSearchKey);
    return () => document.removeEventListener('keydown', handleSearchKey);
  }, [handleSearchKey]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            भारत<span>समाचार</span>
          </Link>

          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <button id="nav-search-btn" className="nav-icon-btn"
              onClick={() => setSearchOpen(true)} aria-label="खोजें">
              <Search size={18} />
            </button>
            <button id="nav-dark-toggle" className="nav-icon-btn"
              onClick={toggleDark} aria-label="डार्क मोड">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="nav-icon-btn" aria-label="सूचनाएं">
              <Bell size={18} />
            </button>
            <Link to="/contact" className="nav-subscribe-btn">
              सब्सक्राइब
            </Link>
            <button id="nav-hamburger" className="nav-hamburger nav-icon-btn"
              onClick={() => setMobileOpen(!mobileOpen)} aria-label="मेनू">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-nav-inner">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="mobile-nav-link">
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="nav-subscribe-btn" style={{ marginTop: 8 }}>
            सब्सक्राइब
          </Link>
        </div>
      </div>

      {/* Search Overlay */}
      <div
        className={`search-overlay ${searchOpen ? 'open' : ''}`}
        onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
      >
        <div className="search-box">
          <div className="search-input-wrapper">
            <Search size={22} color="var(--gray-400)" />
            <input
              autoFocus={searchOpen}
              type="text"
              placeholder="खबरें, विषय, पत्रकार खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-input"
            />
            <button onClick={() => setSearchOpen(false)} style={{ color: 'var(--gray-400)' }}>
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
