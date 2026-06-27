import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Clock, User, Zap } from 'lucide-react';
import { heroSlides } from '../data/newsData';

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % heroSlides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + heroSlides.length) % heroSlides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="hero-slider">
      {heroSlides.map((slide, idx) => (
        <div key={slide.id} className={`hero-slide ${idx === current ? 'active' : ''}`}>
          <img src={slide.image} alt={slide.headline} className="hero-slide-image"
            loading={idx === 0 ? 'eager' : 'lazy'} />
          <div className="hero-content">
            <div className="hero-badges">
              <span className="hero-badge">
                <span className="hero-badge-dot" />
                {slide.badge}
              </span>
              <span className="hero-category">{slide.category}</span>
            </div>

            <h1 className="hero-headline">{slide.headline}</h1>
            <p className="hero-summary">{slide.summary}</p>

            <div className="hero-meta">
              <div className="hero-meta-item"><User size={13} /><span>{slide.author}</span></div>
              <div className="hero-meta-item"><Clock size={13} /><span>{slide.readTime}</span></div>
              <div className="hero-meta-item"><span>{slide.date}</span></div>
            </div>

            <div className="hero-actions">
              <Link to="/" className="btn-primary" id={`hero-read-more-${slide.id}`}>
                पूरी खबर पढ़ें <ArrowRight size={16} />
              </Link>
              <Link to="/" className="btn-outline-white" id={`hero-updates-${slide.id}`}>
                <Zap size={16} /> ताज़ा अपडेट
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="slider-controls">
        <button className="slider-nav-btn" onClick={prev} id="hero-prev-btn" aria-label="पिछला">
          <ChevronLeft size={20} />
        </button>
        {heroSlides.map((_, idx) => (
          <button key={idx} className={`slider-dot ${idx === current ? 'active' : ''}`}
            onClick={() => goTo(idx)} id={`hero-dot-${idx}`} aria-label={`स्लाइड ${idx + 1}`} />
        ))}
        <button className="slider-nav-btn" onClick={next} id="hero-next-btn" aria-label="अगला">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
