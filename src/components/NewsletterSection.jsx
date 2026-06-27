import { useState } from 'react';
import { Send, Mail } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function NewsletterSection() {
  useScrollReveal();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="container">
        <div className="newsletter-inner reveal">
          <div className="newsletter-label"><Mail size={14} />न्यूज़लेटर</div>
          <h2 className="newsletter-title">
            हर सुबह ताज़ा खबरें<br />सीधे आपके इनबॉक्स में
          </h2>
          <p className="newsletter-subtitle">
            5 लाख+ पाठकों के साथ जुड़ें जो हमारा दैनिक समाचार सारांश हर सुबह पढ़ते हैं।
          </p>

          {submitted ? (
            <div style={{
              background: 'rgba(255,255,255,0.15)', borderRadius: 12,
              padding: '20px 32px', color: 'white', fontSize: 16, fontWeight: 600,
              display: 'inline-block', backdropFilter: 'blur(8px)',
            }}>
              ✅ आप सफलतापूर्वक सब्सक्राइब हो गए! अपना इनबॉक्स जांचें।
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit} id="newsletter-form">
              <input type="email" className="newsletter-input"
                placeholder="अपना ईमेल पता दर्ज करें"
                value={email} onChange={e => setEmail(e.target.value)}
                required id="newsletter-email" />
              <button type="submit" className="newsletter-btn" id="newsletter-submit">
                <Send size={16} /> मुफ्त सब्सक्राइब करें
              </button>
            </form>
          )}
          <p className="newsletter-note">कोई स्पैम नहीं। कभी भी अनसब्सक्राइब करें। हमारी गोपनीयता नीति पढ़ें।</p>
        </div>
      </div>
    </section>
  );
}
