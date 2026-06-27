import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function PageLoader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <div className="page-loader" id="page-loader">
      <div className="loader-logo">भारत<span>समाचार</span></div>
      <div className="loader-bar"><div className="loader-bar-fill" /></div>
    </div>
  );
}

function StubPage({ title }) {
  return (
    <div style={{ padding: '160px 0 80px', textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 48, color: 'var(--secondary)', marginBottom: 16 }}>
        {title}
      </h1>
      <p style={{ color: 'var(--gray-400)', fontSize: 16 }}>
        यह अनुभाग जल्द आएगा। नवीनतम खबरों के लिए हमारे होमपेज पर जाएं।
      </p>
    </div>
  );
}

function AppInner() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDark = () => {
    setDarkMode(prev => {
      const next = !prev;
      document.documentElement.setAttribute('data-theme', next ? 'dark' : '');
      return next;
    });
  };

  return (
    <>
      <PageLoader />
      <ScrollToTop />
      <Navbar darkMode={darkMode} toggleDark={toggleDark} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/latest" element={<StubPage title="ताज़ा खबरें" />} />
        <Route path="/politics" element={<StubPage title="राजनीति" />} />
        <Route path="/business" element={<StubPage title="व्यापार" />} />
        <Route path="/technology" element={<StubPage title="तकनीक" />} />
        <Route path="/sports" element={<StubPage title="खेल" />} />
        <Route path="/entertainment" element={<StubPage title="मनोरंजन" />} />
        <Route path="/health" element={<StubPage title="स्वास्थ्य" />} />
        <Route path="/world" element={<StubPage title="विश्व" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return <BrowserRouter><AppInner /></BrowserRouter>;
}
