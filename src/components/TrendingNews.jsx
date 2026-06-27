import { Eye } from 'lucide-react';
import { trendingNews } from '../data/newsData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function TrendingNews() {
  useScrollReveal();
  return (
    <section className="section section-bg" id="trending">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">ट्रेंडिंग</div>
          <h2 className="section-title">अभी सबसे ज़्यादा पढ़ी जा रही खबरें</h2>
          <p className="section-subtitle">वे खबरें जो इस वक्त पूरी दुनिया का ध्यान खींच रही हैं।</p>
        </div>
        <div className="trending-grid">
          {trendingNews.map((item, idx) => (
            <div key={item.id} className="trending-item reveal" id={`trending-item-${item.id}`}
              style={{ transitionDelay: `${idx * 60}ms` }}>
              <span className="trending-rank">{String(item.rank).padStart(2, '0')}</span>
              <img src={item.image} alt={item.title} className="trending-image" loading="lazy" />
              <div className="trending-content">
                <div className="trending-category">{item.category}</div>
                <div className="trending-title">{item.title}</div>
                <div className="trending-meta">
                  <span>{item.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Eye size={11} /> {item.views}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
