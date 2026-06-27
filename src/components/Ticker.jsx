import { tickerItems } from '../data/newsData';

export default function Ticker() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div className="ticker-bar">
      <div className="ticker-label">लाइव</div>
      <div className="ticker-track">
        <div className="ticker-content">
          {doubled.map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span style={{ marginLeft: 24, color: 'rgba(255,255,255,0.2)' }}>|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
