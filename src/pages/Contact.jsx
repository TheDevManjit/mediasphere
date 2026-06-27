import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const officeInfo = [
  { icon: MapPin, label: 'मुख्यालय', value: 'भारत समाचार मुख्यालय, प्रेस एन्क्लेव', sub: 'नई दिल्ली - 110017, भारत' },
  { icon: Phone, label: 'फोन', value: '+91 11 4000 1234', sub: 'सोम–शुक्र, सुबह 9 बजे–शाम 6 बजे IST' },
  { icon: Mail, label: 'ईमेल', value: 'hello@bharatsamachar.in', sub: 'संपादकीय: editors@bharatsamachar.in' },
  { icon: Clock, label: 'कार्य समय', value: 'सोमवार – शुक्रवार: 9am – 6pm', sub: 'सप्ताहांत: केवल आपातकालीन कवरेज' },
];

export default function Contact() {
  useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); };

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="page-hero-label">संपर्क करें</div>
          <h1>भारत समाचार से<br />जुड़ें</h1>
          <p>
            कोई खबर टिप, प्रेस पूछताछ या प्रतिक्रिया? हमारी टीम सुनने के लिए तैयार है। हम 24 घंटे के भीतर जवाब देंगे।
          </p>
        </div>
      </div>

      <section className="section" id="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Form */}
            <div className="contact-form reveal-left">
              <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--secondary)', marginBottom: 4 }}>
                हमें संदेश भेजें
              </h3>
              <p style={{ fontSize: 14, color: 'var(--gray-400)', marginBottom: 28 }}>
                नीचे विवरण भरें, हम जल्द से जल्द वापस आएंगे।
              </p>

              {submitted ? (
                <div style={{
                  background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: 10, padding: '20px 24px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--secondary)' }}>संदेश भेजा गया!</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>
                    संपर्क करने के लिए धन्यवाद। हम 24 घंटे के भीतर जवाब देंगे।
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">पूरा नाम</label>
                      <input id="contact-name" name="name" type="text" className="form-input"
                        placeholder="राम कुमार" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">ईमेल पता</label>
                      <input id="contact-email" name="email" type="email" className="form-input"
                        placeholder="ram@example.com" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-subject">विषय</label>
                    <input id="contact-subject" name="subject" type="text" className="form-input"
                      placeholder="हम आपकी कैसे मदद कर सकते हैं?" value={form.subject} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">संदेश</label>
                    <textarea id="contact-message" name="message" className="form-textarea"
                      placeholder="अपना संदेश यहां लिखें..." value={form.message} onChange={handleChange} required />
                  </div>
                  <button type="submit" id="contact-submit-btn" className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}>
                    <Send size={16} /> संदेश भेजें
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="reveal-right">
              <div className="contact-info-card">
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--secondary)', marginBottom: 4 }}>
                  कार्यालय की जानकारी
                </h3>
                <p style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 8 }}>
                  हमसे मिलें या नीचे दिए किसी भी माध्यम से संपर्क करें।
                </p>
                {officeInfo.map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="contact-info-item">
                      <div className="contact-info-icon"><Icon size={20} /></div>
                      <div>
                        <div className="contact-info-label">{item.label}</div>
                        <div className="contact-info-value">{item.value}</div>
                        <div className="contact-info-sub">{item.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="map-wrap">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.267986624955!2d77.20950931508397!3d28.591648982437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2daa9eb4d0b%3A0x717971125923aadd!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1623000000000!5m2!1sen!2sin"
                  title="भारत समाचार कार्यालय स्थान — नई दिल्ली"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
