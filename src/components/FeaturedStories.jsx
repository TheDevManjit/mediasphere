import { Clock, User, ArrowRight } from 'lucide-react';
import { featuredStories } from '../data/newsData';
import { useScrollReveal } from '../hooks/useScrollReveal';

function NewsCard({ story, size = 'medium' }) {
  return (
    <article className={`card card-${size} reveal`} id={`news-card-${story.id}`}>
      <div className="card-image-wrap">
        <img src={story.image} alt={story.title} loading="lazy" />
        <span className="card-category">{story.category}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{story.title}</h3>
        <p className="card-summary">{story.summary}</p>
        <div className="card-meta">
          <div className="card-meta-item"><User size={12} /><span>{story.author}</span></div>
          <div className="card-meta-item"><Clock size={12} /><span>{story.readTime}</span></div>
          <div className="card-meta-item"><span>{story.date}</span></div>
        </div>
        <a href="#" className="card-read-link">पूरी खबर <ArrowRight size={14} /></a>
      </div>
    </article>
  );
}

export default function FeaturedStories() {
  useScrollReveal();
  const [main, ...rest] = featuredStories;
  const secondary = rest.slice(0, 2);
  const small = rest.slice(2, 5);

  return (
    <section className="section" id="featured-stories">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">मुख्य खबरें</div>
          <h2 className="section-title">आज की प्रमुख खबरें</h2>
          <p className="section-subtitle">हमारी संपादकीय टीम द्वारा चुनी गईं — वे खबरें जो आपके लिए सबसे ज़रूरी हैं।</p>
        </div>
        <div className="featured-grid">
          <NewsCard story={main} size="large" />
          {secondary.map(s => <NewsCard key={s.id} story={s} size="medium" />)}
          {small.map(s => <NewsCard key={s.id} story={s} size="small" />)}
        </div>
      </div>
    </section>
  );
}
