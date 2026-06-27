import { useState, useEffect, useCallback } from 'react';
import { Play, X, RefreshCw, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Demo: Aaj Tak (Hindi News) — swap CHANNEL_ID to use your own channel
const CHANNEL_ID = 'UCt4t-jeY85JegMlZ-E5UWtA';   // Aaj Tak
const CHANNEL_NAME = 'आज तक';
const CHANNEL_URL = `https://www.youtube.com/channel/${CHANNEL_ID}`;

// Reliable hardcoded fallback video IDs from Aaj Tak (shown if RSS fails)
const FALLBACK_VIDEOS = [
  { id: 'fv3OQB_4oLc', title: 'आज तक लाइव: ताज़ा समाचार बुलेटिन' },
  { id: 'ckKSdXTjQQg', title: 'भारत की बड़ी खबरें: विशेष रिपोर्ट' },
  { id: 'nCcSQFhcFRc', title: 'राजनीतिक समीक्षा: विशेषज्ञों की राय' },
  { id: 'Q_HHjH5D5EU', title: 'खेल जगत: आज की बड़ी खबरें' },
  { id: 'ZNWEerNFLMc', title: 'देश-विदेश: ताज़ा अपडेट्स' },
  { id: 'Tey4nKw5ebM', title: 'विशेष साक्षात्कार: प्रमुख नेता' },
  { id: 'SqcY0GlETPk', title: 'व्यापार और अर्थव्यवस्था: विशेष रिपोर्ट' },
  { id: 'e7wBRpYZGow', title: 'स्वास्थ्य और विज्ञान: नई खोजें' },
].map(v => ({
  ...v,
  youtubeId: v.id,
  thumbnail: `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`,
  channel: CHANNEL_NAME,
  channelUrl: CHANNEL_URL,
  link: `https://www.youtube.com/watch?v=${v.id}`,
  published: new Date(Date.now() - Math.random() * 7 * 86400000).toISOString(),
  isFallback: true,
}));

// ─── YOUTUBE SVG ICON ────────────────────────────────────────────────────────
function YoutubeIcon({ size = 16, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function extractVideoId(link = '') {
  const match = link.match(/watch\?v=([^&]+)/);
  return match ? match[1] : null;
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)} मिनट पहले`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} घंटे पहले`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} दिन पहले`;
  return new Date(dateStr).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ─── FETCH STRATEGY ──────────────────────────────────────────────────────────
// Strategy 1: allorigins.win CORS proxy → parse YouTube XML directly
// Strategy 2: rss2json.com (JSON API)
// Strategy 3: Fallback to hardcoded popular video IDs

async function fetchViaAllOrigins() {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
  const res = await fetch(proxy, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error('allorigins failed');
  const json = await res.json();
  if (!json.contents) throw new Error('No content from allorigins');

  const parser = new DOMParser();
  const xml = parser.parseFromString(json.contents, 'text/xml');
  const entries = Array.from(xml.querySelectorAll('entry'));
  if (!entries.length) throw new Error('No entries in feed');

  return entries.slice(0, 8).map(entry => {
    const videoId = entry.querySelector('videoId')?.textContent
      || extractVideoId(entry.querySelector('link')?.getAttribute('href') || '');
    if (!videoId) return null;
    return {
      id: videoId,
      youtubeId: videoId,
      title: entry.querySelector('title')?.textContent || 'शीर्षक उपलब्ध नहीं',
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      published: entry.querySelector('published')?.textContent || new Date().toISOString(),
      channel: CHANNEL_NAME,
      channelUrl: CHANNEL_URL,
      link: `https://www.youtube.com/watch?v=${videoId}`,
    };
  }).filter(Boolean);
}

async function fetchViaRss2Json() {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=8`;
  const res = await fetch(apiUrl, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error('rss2json failed');
  const data = await res.json();
  if (data.status !== 'ok' || !data.items?.length) throw new Error('rss2json returned no items');

  return data.items.map(item => {
    const videoId = extractVideoId(item.link);
    if (!videoId) return null;
    return {
      id: videoId,
      youtubeId: videoId,
      title: item.title,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      published: item.pubDate,
      channel: CHANNEL_NAME,
      channelUrl: CHANNEL_URL,
      link: item.link,
    };
  }).filter(Boolean);
}

// ─── SKELETON ────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="video-card" style={{ pointerEvents: 'none' }}>
      <div className="video-thumb-wrap"
        style={{ background: 'var(--gray-200)', animation: 'skeletonPulse 1.5s ease-in-out infinite' }} />
      <div className="video-body">
        {[100, 70].map((w, i) => (
          <div key={i} style={{
            height: 13, background: 'var(--gray-200)', borderRadius: 4,
            width: `${w}%`, marginBottom: 8,
            animation: 'skeletonPulse 1.5s ease-in-out infinite',
          }} />
        ))}
        <div style={{
          height: 11, background: 'var(--gray-100)', borderRadius: 4,
          width: '50%', animation: 'skeletonPulse 1.5s ease-in-out infinite',
        }} />
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function VideoSection() {
  useScrollReveal();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('');   // 'live' | 'fallback'
  const [activeVideo, setActiveVideo] = useState(null);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setSource('');
    try {
      // Try allorigins first, then rss2json, then fallback
      let items = null;
      try { items = await fetchViaAllOrigins(); setSource('live'); }
      catch { /* try next */ }

      if (!items?.length) {
        try { items = await fetchViaRss2Json(); setSource('live'); }
        catch { /* try next */ }
      }

      if (!items?.length) {
        items = FALLBACK_VIDEOS;
        setSource('fallback');
      }

      setVideos(items);
    } catch {
      setVideos(FALLBACK_VIDEOS);
      setSource('fallback');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setActiveVideo(null); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <style>{`
        @keyframes skeletonPulse {
          0%,100% { opacity:1 } 50% { opacity:.4 }
        }
      `}</style>

      <section className="section section-bg" id="video-news">
        <div className="container">

          {/* ── Section Header ── */}
          <div className="section-header reveal"
            style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
            <div>
              <div className="section-label" style={{ display:'flex', alignItems:'center', gap:8 }}>
                <YoutubeIcon size={14} style={{ color:'#FF0000' }} />
                YouTube से सीधे
              </div>
              <h2 className="section-title">आज तक के ताज़ा वीडियो</h2>
              <p className="section-subtitle">
                <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                  style={{ color:'var(--primary)', fontWeight:600 }}>
                  {CHANNEL_NAME} YouTube चैनल
                </a>{' '}
                से सीधे लाए गए नवीनतम वीडियो।{' '}
                {source === 'fallback' && (
                  <span style={{ color:'var(--accent-amber)', fontSize:12, fontWeight:600 }}>
                    ⚡ ऑफलाइन मोड — चुनिंदा वीडियो दिखाए जा रहे हैं
                  </span>
                )}
              </p>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
              {!loading && (
                <button id="refresh-videos-btn" onClick={fetchVideos}
                  title="वीडियो रीफ्रेश करें"
                  style={{
                    display:'flex', alignItems:'center', gap:6,
                    background:'var(--gray-100)', border:'1px solid var(--gray-200)',
                    borderRadius:8, padding:'8px 14px', fontSize:13, fontWeight:600,
                    color:'var(--gray-600)', cursor:'pointer', transition:'all 200ms',
                    fontFamily:'var(--font-primary)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background='var(--gray-200)'}
                  onMouseLeave={e => e.currentTarget.style.background='var(--gray-100)'}
                >
                  <RefreshCw size={14} /> रीफ्रेश
                </button>
              )}
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                id="visit-channel-btn"
                style={{
                  display:'flex', alignItems:'center', gap:6,
                  background:'#FF0000', color:'white', borderRadius:8,
                  padding:'8px 16px', fontSize:13, fontWeight:700, transition:'all 200ms',
                  whiteSpace:'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity='0.85'; e.currentTarget.style.transform='translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform=''; }}
              >
                <YoutubeIcon size={15} /> चैनल देखें
              </a>
            </div>
          </div>

          {/* ── Loading ── */}
          {loading && (
            <div className="video-grid">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* ── Video Grid ── */}
          {!loading && videos.length > 0 && (
            <div className="video-grid">
              {videos.map((vid, idx) => (
                <div key={vid.id} className="video-card reveal"
                  id={`video-card-${vid.id}`}
                  style={{ transitionDelay:`${idx * 60}ms`, cursor:'pointer' }}
                  onClick={() => setActiveVideo(vid)}
                >
                  <div className="video-thumb-wrap">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      loading="lazy"
                      onError={e => {
                        // maxresdefault → hqdefault → mqdefault
                        if (e.currentTarget.src.includes('maxresdefault')) {
                          e.currentTarget.src = `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`;
                        } else if (e.currentTarget.src.includes('hqdefault')) {
                          e.currentTarget.src = `https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`;
                        }
                      }}
                    />
                    <div className="video-play-btn" aria-label="वीडियो चलाएं">
                      <Play size={20} fill="currentColor" />
                    </div>
                    {/* LIVE badge for very recent videos */}
                    {!vid.isFallback && ((Date.now() - new Date(vid.published)) / 3600000) < 3 && (
                      <span style={{
                        position:'absolute', top:10, left:10,
                        background:'#FF0000', color:'white',
                        fontSize:10, fontWeight:800, letterSpacing:'1.5px',
                        textTransform:'uppercase', padding:'3px 8px', borderRadius:4,
                        display:'flex', alignItems:'center', gap:5,
                      }}>
                        <span style={{ width:6, height:6, background:'white', borderRadius:'50%', animation:'pulse 1.4s infinite' }} />
                        LIVE
                      </span>
                    )}
                  </div>
                  <div className="video-body">
                    <div className="video-title">{vid.title}</div>
                    <div className="video-meta">
                      <span style={{ display:'flex', alignItems:'center', gap:5 }}>
                        <YoutubeIcon size={12} style={{ color:'#FF0000' }} />
                        {vid.channel}
                      </span>
                      <span>{timeAgo(vid.published)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── View More ── */}
          {!loading && videos.length > 0 && (
            <div style={{ textAlign:'center', marginTop:40 }}>
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
                id="view-more-youtube-btn"
                style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  background:'transparent', border:'2px solid var(--gray-300)',
                  borderRadius:8, padding:'12px 28px', fontSize:14, fontWeight:600,
                  color:'var(--gray-600)', transition:'all 250ms',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#FF0000'; e.currentTarget.style.color='#FF0000'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=''; e.currentTarget.style.color=''; }}
              >
                <ExternalLink size={15} /> YouTube पर सभी वीडियो देखें
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── Video Modal ── */}
      <div className={`video-modal-overlay ${activeVideo ? 'open' : ''}`}
        onClick={e => e.target === e.currentTarget && setActiveVideo(null)}
        id="video-modal"
      >
        <div className="video-modal-inner">
          <button className="video-modal-close" onClick={() => setActiveVideo(null)} id="video-modal-close">
            <X size={16} /> बंद करें (Esc)
          </button>
          {activeVideo && (
            <>
              <div className="video-iframe-wrap">
                <iframe
                  key={activeVideo.youtubeId}
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div style={{ marginTop:16, display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16 }}>
                <div>
                  <div style={{ fontSize:16, fontWeight:700, color:'white', lineHeight:1.4, marginBottom:4 }}>
                    {activeVideo.title}
                  </div>
                  <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)' }}>
                    {activeVideo.channel} • {timeAgo(activeVideo.published)}
                  </div>
                </div>
                <a href={activeVideo.link} target="_blank" rel="noopener noreferrer"
                  style={{
                    flexShrink:0, background:'#FF0000', color:'white',
                    borderRadius:6, padding:'8px 14px', fontSize:12, fontWeight:700,
                    display:'flex', alignItems:'center', gap:6,
                  }}
                >
                  <YoutubeIcon size={13} /> YouTube पर देखें
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
