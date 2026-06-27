import { CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const features = [
  'आपकी रुचि के अनुसार व्यक्तिगत समाचार फ़ीड',
  'लंबी यात्राओं के लिए ऑफलाइन पढ़ने की सुविधा',
  'ब्रेकिंग न्यूज़ की तुरंत पुश नोटिफिकेशन',
  'विशेष पत्रकार पॉडकास्ट और ऑडियो रिपोर्ट',
];

export default function AppPromo() {
  useScrollReveal();
  return (
    <section className="app-promo" id="app-promo">
      <div className="container">
        <div className="app-promo-grid">
          <div className="app-promo-text reveal-left">
            <div className="section-label" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              सभी डिवाइस पर उपलब्ध
            </div>
            <h2>कहीं भी, कभी भी<br />खबरें पढ़ें</h2>
            <p>
              भारत समाचार ऐप प्रीमियम पत्रकारिता को सीधे आपकी जेब में पहुंचाता है।
              पुरस्कार विजेता डिज़ाइन के साथ विश्वस्तरीय रिपोर्टिंग — iOS और Android दोनों पर।
            </p>
            <div className="app-features">
              {features.map((f, i) => (
                <div key={i} className="app-feature">
                  <div className="app-feature-icon"><CheckCircle size={14} /></div>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <div className="app-download-btns">
              <button className="app-btn" id="app-store-btn">
                <span className="app-btn-icon">🍎</span>
                <div className="app-btn-text">
                  <span>डाउनलोड करें</span>
                  <strong>App Store</strong>
                </div>
              </button>
              <button className="app-btn" id="google-play-btn">
                <span className="app-btn-icon">▶</span>
                <div className="app-btn-text">
                  <span>प्राप्त करें</span>
                  <strong>Google Play</strong>
                </div>
              </button>
            </div>
          </div>
          <div className="app-image reveal-right">
            <img src="/app_mockup_1782550424997.png" alt="भारत समाचार मोबाइल ऐप" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
