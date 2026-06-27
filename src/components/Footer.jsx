import { Link } from 'react-router-dom';
import { Share2, ExternalLink, MessageSquareShare, Rss, Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { label: 'हमारे बारे में', path: '/about' },
  { label: 'संपर्क करें', path: '/contact' },
  { label: 'विज्ञापन', path: '/contact' },
  { label: 'करियर', path: '/' },
  { label: 'प्रेस रूम', path: '/' },
];

const categories = [
  'तकनीक', 'राजनीति', 'व्यापार', 'खेल',
  'मनोरंजन', 'स्वास्थ्य', 'शिक्षा', 'विश्व',
];

const legal = [
  { label: 'गोपनीयता नीति', path: '/' },
  { label: 'उपयोग की शर्तें', path: '/' },
  { label: 'कुकी सेटिंग्स', path: '/' },
];

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">भारत<span>समाचार</span></div>
            <p>
              भारत समाचार एक पुरस्कार विजेता डिजिटल मीडिया कंपनी है जो 120+ देशों के पाठकों को विश्वसनीय और प्रभावशाली पत्रकारिता प्रदान करती है। हम तथ्यों से संचालित दुनिया में विश्वास करते हैं।
            </p>
            <div className="footer-social">
              {[
                { Icon: MessageSquareShare, href: '#', id: 'footer-twitter', label: 'Twitter' },
                { Icon: Share2, href: '#', id: 'footer-facebook', label: 'Facebook' },
                { Icon: ExternalLink, href: '#', id: 'footer-instagram', label: 'Instagram' },
                { Icon: Rss, href: '#', id: 'footer-rss', label: 'RSS Feed' },
              ].map(({ Icon, href, id, label }) => (
                <a key={id} href={href} id={id} className="footer-social-btn" aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>त्वरित लिंक</h4>
            <div className="footer-links">
              {quickLinks.map((l) => (
                <Link key={l.label} to={l.path} className="footer-link">{l.label}</Link>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>श्रेणियां</h4>
            <div className="footer-links">
              {categories.map((c) => (
                <a key={c} href="#" className="footer-link">{c}</a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>संपर्क करें</h4>
            <div className="footer-links">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 }}>
                <MapPin size={14} style={{ marginTop: 3, flexShrink: 0, color: 'var(--primary)' }} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  भारत समाचार मुख्यालय,<br />प्रेस एन्क्लेव, नई दिल्ली,<br />दिल्ली - 110017
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Phone size={14} style={{ flexShrink: 0, color: 'var(--primary)' }} />
                <a href="tel:+911140001234" className="footer-link">+91 11 4000 1234</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={14} style={{ flexShrink: 0, color: 'var(--primary)' }} />
                <a href="mailto:hello@bharatsamachar.in" className="footer-link">hello@bharatsamachar.in</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} भारत समाचार प्राइवेट लिमिटेड। सर्वाधिकार सुरक्षित।
          </p>
          <div className="footer-bottom-links">
            {legal.map((l) => (
              <Link key={l.label} to={l.path} className="footer-bottom-link">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
