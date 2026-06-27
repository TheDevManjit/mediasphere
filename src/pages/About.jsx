import { teamMembers } from '../data/newsData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Share2, ExternalLink, Target, Eye, Shield, Zap } from 'lucide-react';

const timeline = [
  { year: '2008', event: 'भारत समाचार की स्थापना', desc: 'प्रमुख वैश्विक न्यूजरूम के अनुभवी पत्रकारों की एक टीम ने डिजिटल-फर्स्ट प्रकाशन के रूप में लॉन्च किया।' },
  { year: '2011', event: 'पहला अंतरराष्ट्रीय ब्यूरो', desc: 'लंदन और सिंगापुर में कार्यालय खोले, पहली बार सही मायनों में वैश्विक कवरेज स्थापित की।' },
  { year: '2015', event: 'राष्ट्रीय पत्रकारिता पुरस्कार', desc: 'हमारी खोजी टीम ने व्यवस्थित कॉर्पोरेट भ्रष्टाचार को उजागर करने के लिए राष्ट्रीय पत्रकारिता पुरस्कार जीता।' },
  { year: '2018', event: '50 लाख सब्सक्राइबर', desc: 'पाँच मिलियन भुगतान करने वाले डिजिटल सब्सक्राइबर का मील का पत्थर पार किया।' },
  { year: '2021', event: 'AI-संवर्धित न्यूजरूम', desc: 'तथ्य-जांच, अनुवाद और दर्शकों की जानकारी के लिए AI टूल का जिम्मेदार एकीकरण किया।' },
  { year: '2024', event: '5 लाख दैनिक पाठक', desc: 'वेब, ऐप और न्यूज़लेटर पर 5 लाख दैनिक सक्रिय पाठकों तक पहुंचे — स्वतंत्रता से समझौता किए बिना।' },
];

const values = [
  { icon: Target, title: 'सटीकता सर्वोपरि', desc: 'हम जो भी दावा प्रकाशित करते हैं उसे कम से कम दो स्वतंत्र स्रोतों से सत्यापित किया जाता है।' },
  { icon: Eye, title: 'पूर्ण पारदर्शिता', desc: 'हम अपनी संपादकीय नीतियां, फंडिंग स्रोत और स्वामित्व संरचना खुले तौर पर प्रकाशित करते हैं।' },
  { icon: Shield, title: 'संपादकीय स्वतंत्रता', desc: 'हमारी पत्रकारिता कभी विज्ञापनदाताओं, सरकारों या निवेशकों से प्रभावित नहीं होती।' },
  { icon: Zap, title: 'बिना समझौते के तेज़', desc: 'हम ब्रेकिंग न्यूज़ पर तेज़ी से काम करते हैं लेकिन सत्यापन और संदर्भ की बलि नहीं देते।' },
];

export default function About() {
  useScrollReveal();

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="page-hero-label">हमारी कहानी</div>
          <h1>पत्रकारिता जो<br />फर्क डालती है</h1>
          <p>
            15 से अधिक वर्षों से, भारत समाचार डिजिटल पत्रकारिता के अग्रभाग में है — ऐसी खबरें तोड़ रहा है जो मायने रखती हैं, सत्ता को जवाबदेह ठहरा रहा है।
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="section" id="mission">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="reveal">
            <div>
              <div className="section-label">हम कौन हैं</div>
              <h2 className="section-title">सत्य की शक्ति में विश्वास पर निर्मित</h2>
              <p style={{ fontSize: 16, color: 'var(--gray-500)', lineHeight: 1.8, marginTop: 16, marginBottom: 24 }}>
                भारत समाचार की स्थापना इस सिद्धांत पर हुई कि स्वतंत्र, तथ्यात्मक पत्रकारिता लोकतंत्र की आधारशिला है। 2008 में आठ पत्रकारों की एक छोटी टीम से आज 200 से अधिक के वैश्विक न्यूजरूम तक — हम अपने मिशन से कभी नहीं भटके।
              </p>
              <p style={{ fontSize: 16, color: 'var(--gray-500)', lineHeight: 1.8 }}>
                हम 12 देशों में काम करते हैं, जलवायु परिवर्तन और भू-राजनीति से लेकर विज्ञान में सफलताओं तक — उन कहानियों को कवर करते हैं जो दुनिया को आकार देती हैं।
              </p>
            </div>
            <div>
              <img src="/hero_slide_1_1782550173856.png" alt="भारत समाचार न्यूजरूम"
                style={{ width: '100%', borderRadius: 16, objectFit: 'cover', height: 340, boxShadow: 'var(--shadow-xl)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section-bg" id="values">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">हमारे मूल्य</div>
            <h2 className="section-title">हम किसके लिए खड़े हैं</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="reveal"
                  style={{
                    transitionDelay: `${i * 80}ms`,
                    background: 'var(--white)', border: '1px solid var(--gray-200)',
                    borderRadius: 14, padding: '28px 24px',
                    display: 'flex', gap: 20, alignItems: 'flex-start', transition: 'all 250ms',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = ''; }}
                >
                  <div style={{ width: 48, height: 48, background: 'rgba(11,95,255,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--primary)' }}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--secondary)', marginBottom: 6 }}>{v.title}</div>
                    <div style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.65 }}>{v.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" id="timeline">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <div className="reveal-left">
              <div className="section-label">हमारी यात्रा</div>
              <h2 className="section-title">वे पड़ाव जिन्होंने<br />हमें गढ़ा</h2>
              <p style={{ fontSize: 15, color: 'var(--gray-500)', marginTop: 16, lineHeight: 1.7 }}>
                एक छोटे स्टार्टअप से पुरस्कार विजेता वैश्विक न्यूजरूम तक — भारत समाचार को परिभाषित करने वाले पल।
              </p>
            </div>
            <div className="timeline reveal-right">
              {timeline.map(item => (
                <div key={item.year} className="timeline-item">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-event">{item.event}</div>
                  <div className="timeline-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section section-bg" id="team">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">संपादकीय टीम</div>
            <h2 className="section-title">पत्रकारों से मिलें</h2>
            <p className="section-subtitle">हमारी पुरस्कार विजेता संपादकीय टीम दशकों के अनुभव को अथक जिज्ञासा के साथ जोड़ती है।</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <div key={member.id} className="team-card reveal" id={`team-${member.id}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <img src={member.image} alt={member.name} className="team-avatar" loading="lazy" />
                <div className="team-name">{member.name}</div>
                <div className="team-role">{member.role}</div>
                <div className="team-bio">{member.bio}</div>
                <div className="team-socials">
                  <a href={member.twitter} className="team-social-btn" aria-label="Twitter"><Share2 size={14} /></a>
                  <a href={member.linkedin} className="team-social-btn" aria-label="LinkedIn"><ExternalLink size={14} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
