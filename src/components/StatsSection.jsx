import { useEffect, useRef, useState } from 'react';
import { Users, Eye, PenLine, Award } from 'lucide-react';
import { stats } from '../data/newsData';

const iconMap = { Users, Eye, PenLine, Award };

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-value">
      {count}
      <span className="stat-suffix">{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  return (
    <div className="stats-section" id="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon] || Users;
            return (
              <div key={stat.label} className="stat-item" id={`stat-${stat.label.replace(/\s+/g, '-').toLowerCase()}`}>
                <div className="stat-icon">
                  <Icon size={22} />
                </div>
                <Counter target={stat.value} suffix={stat.suffix} />
                <div className="stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
