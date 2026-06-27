import { Clock, User, ArrowRight } from 'lucide-react';
import { featuredStories } from '../data/newsData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function LatestArticles() {
  useScrollReveal();
  const articles = [...featuredStories].reverse();

  return (
    <section className="section" id="latest-articles">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">ताज़ा</div>
          <h2 className="section-title">नवीनतम लेख</h2>
          <p className="section-subtitle">हमारी सबसे हाल ही में प्रकाशित गहन रिपोर्टिंग से अपडेट रहें।</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {articles.map((story, idx) => (
            <article key={story.id} className="reveal" id={`latest-article-${story.id}`}
              style={{
                transitionDelay: `${idx * 70}ms`,
                display: 'flex', gap: 24, padding: '20px 0',
                borderBottom: '1px solid var(--gray-200)', cursor: 'pointer',
              }}>
              <div style={{ width: 140, height: 100, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                <img src={story.image} alt={story.title} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: 'rgba(11,95,255,0.1)', color: 'var(--primary)',
                  fontSize: 10, fontWeight: 700, letterSpacing: '1.5px',
                  textTransform: 'uppercase', padding: '3px 9px', borderRadius: 100, marginBottom: 8,
                }}>
                  {story.category}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700,
                  color: 'var(--secondary)', lineHeight: 1.35, marginBottom: 6, transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = ''}
                >
                  {story.title}
                </h3>
                <p style={{
                  fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 10,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {story.summary}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--gray-400)' }}>
                    <User size={12} /> {story.author}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--gray-400)' }}>
                    <Clock size={12} /> {story.readTime}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{story.date}</div>
                  <a href="#" style={{
                    marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: 'var(--primary)',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    पूरी खबर <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button id="load-more-btn"
            style={{
              background: 'transparent', border: '2px solid var(--gray-300)',
              color: 'var(--gray-600)', padding: '12px 32px', borderRadius: 8,
              fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 250ms',
              fontFamily: 'var(--font-primary)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = ''; }}
          >
            और खबरें लोड करें
          </button>
        </div>
      </div>
    </section>
  );
}
