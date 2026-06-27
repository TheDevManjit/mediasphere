import { useScrollReveal } from '../hooks/useScrollReveal';

export default function AdBanner() {
  useScrollReveal();
  return (
    <section className="section-sm" id="advertisement">
      <div className="container">
        <div className="ad-banner reveal">
          <div>
            <div className="ad-banner-label">विज्ञापन</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--secondary)', marginTop: 4 }}>
              आपका ब्रांड, 5 लाख+ पाठकों की नज़र में
            </div>
            <div style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: 4 }}>
              भारत समाचार के वैश्विक नेटवर्क पर प्रीमियम विज्ञापन स्थान।
            </div>
          </div>
          <button id="advertise-cta-btn"
            style={{
              background: 'var(--primary)', color: 'white', border: 'none',
              borderRadius: 8, padding: '12px 24px', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 250ms', flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >
            हमारे साथ विज्ञापन दें →
          </button>
        </div>
      </div>
    </section>
  );
}
