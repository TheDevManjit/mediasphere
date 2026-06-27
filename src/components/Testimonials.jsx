import { testimonials } from '../data/newsData';
import { useScrollReveal } from '../hooks/useScrollReveal';

function Stars({ count }) {
  return (
    <div className="star-rating">
      {Array.from({ length: count }).map((_, i) => <span key={i} className="star">★</span>)}
    </div>
  );
}

export default function Testimonials() {
  useScrollReveal();
  return (
    <section className="section section-bg" id="testimonials">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">पाठकों की राय</div>
          <h2 className="section-title">दुनिया भर में लाखों लोगों का विश्वास</h2>
          <p className="section-subtitle">शिक्षाविदों से नीति-निर्माताओं तक — भारत समाचार सबकी पहली पसंद है।</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <div key={t.id} className="testimonial-card reveal" id={`testimonial-${t.id}`}
              style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="testimonial-quote">"</div>
              <div className="testimonial-text">{t.text}</div>
              <div className="testimonial-author">
                <img src={t.avatar} alt={t.name} className="testimonial-avatar" loading="lazy" />
                <div>
                  <Stars count={t.rating} />
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
