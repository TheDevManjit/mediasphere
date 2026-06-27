import {
  Cpu, Landmark, Trophy, TrendingUp,
  Clapperboard, HeartPulse, GraduationCap, Globe
} from 'lucide-react';
import { categories } from '../data/newsData';
import { useScrollReveal } from '../hooks/useScrollReveal';

const iconMap = { Cpu, Landmark, Trophy, TrendingUp, Clapperboard, HeartPulse, GraduationCap, Globe };

export default function CategoriesSection() {
  useScrollReveal();
  return (
    <section className="section" id="categories">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">श्रेणियां</div>
          <h2 className="section-title">विषय के अनुसार खबरें पढ़ें</h2>
          <p className="section-subtitle">अपनी पसंद के विषयों की गहराई में जाएं।</p>
        </div>
        <div className="categories-grid">
          {categories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Globe;
            return (
              <div key={cat.id} className="category-card reveal"
                id={`category-${cat.id}`}
                style={{ transitionDelay: `${idx * 50}ms` }}
                onMouseEnter={e => e.currentTarget.style.background = cat.gradient}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                <div className="category-icon-wrap"
                  style={{ background: cat.gradient, color: cat.color }}>
                  <Icon size={24} />
                </div>
                <div className="category-name">{cat.name}</div>
                <div className="category-count">{cat.count.toLocaleString('hi-IN')} लेख</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
