import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TiltCard from '../components/TiltCard';
import ThreeBackground from '../components/ThreeBackground';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    tone: 'teal',
    icon: 'fa-compass',
    title: 'Disiplin Keşfi',
    text: 'Tüm mühendislik disiplinlerini keşfet, iş olanakları, müfredatlar ve kariyer yollarını detaylıca incele.',
    items: ['Detaylı alan açıklamaları', 'Kariyer haritaları', 'Güncel sektör & maaş verileri'],
    link: '/kesfet'
  },
  {
    tone: 'amber',
    icon: 'fa-users',
    title: 'Mentor Bağlantısı',
    text: 'Sektörde deneyimli mühendisler ve üniversiteli üst sınıflarla iletişim kur, kariyer tavsiyeleri al.',
    items: ['Deneyimli mentörler', 'Birebir rehberlik', 'Sektörel içgörüler & mülakat desteği'],
    link: '/kesfet?tab=mentorship'
  },
  {
    tone: 'green',
    icon: 'fa-building-columns',
    title: 'Üniversiteler & Sıralamalar',
    text: 'Türkiye’nin önde gelen teknik üniversitelerini, başarı sıralamalarını ve taban puanlarını karşılaştır.',
    items: ['ÖSYM & YÖK Atlas verileri', 'Kampüs ve kulüp olanakları', 'Bölüm bazlı sıralama analizi'],
    link: '/kesfet'
  }
];

const stats = [
  { target: 15, suffix: '', label: 'Mühendislik Dalı' },
  { target: 500, suffix: '+', label: 'Aktif Kullanıcı' },
  { target: 50, suffix: '+', label: 'Deneyimli Mentor' },
  { target: 1200, suffix: '+', label: 'Kariyer Etkileşimi' }
];

function Counter({ target, suffix }) {
  const ref = useRef(null);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const draw = (now) => {
        const p = Math.min((now - start) / 2000, 1);
        setNumber(Math.floor((1 - Math.pow(2, -10 * p)) * target));
        if (p < 1) requestAnimationFrame(draw);
      };
      requestAnimationFrame(draw);
      observer.disconnect();
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="stat-number">{number}{suffix}</div>;
}

export default function HomePage() {
  const { login } = useAuth();
  const [modal, setModal] = useState(null); // 'login' | 'forgot'
  const [scrolled, setScrolled] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', sifre: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotResult, setForgotResult] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await fetch('/api/giris-yap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Giriş yapılamadı!');
        setLoginLoading(false);
        return;
      }
      login({
        name: data.kullanici_adi,
        email: loginForm.email,
        role: data.rol,
        status: data.durum,
        department: data.department || data.bolum,
        school: data.okul,
        level: data.sinif,
        workplace: data.is_yeri,
        experience: data.deneyim
      });
      const targetPath = data.rol === 'mentor' ? '/panel/mentor' : data.durum === 'lise_ogrenci' ? '/panel/aday' : '/panel/ogrenci';
      window.location.href = targetPath;
    } catch {
      setLoginError('Sunucuya bağlanılamadı. Backend açık mı?');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotResult({ loading: true });
    try {
      const res = await fetch('/api/sifremi-unuttum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setForgotResult({ success: true, ...data });
      } else {
        setForgotResult({ error: data.error });
      }
    } catch {
      setForgotResult({ error: 'Sunucuya ulaşılamadı!' });
    }
  };

  return (
    <>
      <ThreeBackground />
      <div className="main-content home-page">
        <Navbar onOpenLogin={() => { setLoginError(''); setModal('login'); }} scrolled={scrolled} />

        <main>
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-badge">
              <i className="fa-solid fa-circle" style={{ color: '#10b981', fontSize: 10 }} /> Mühendislik Kariyer Platformu
            </div>
            <h1 className="hero-title">
              Mühendislik Kariyerini<br />
              <span className="highlight">Şansa Bırakma</span>
            </h1>
            <TiltCard className="hero-desc-card">
              <p>
                <strong>EngineersPath</strong>, mühendislik öğrencileri ve mezunları için kurulmuş bir kariyer rehberliği platformudur. Yazılımdan makineye, elektrik-elektronikten inşaata, kimyadan havacılığa kadar tüm mühendislik dallarında “hangi alana yönelmeliyim?” sorusuna cevap arıyorsan doğru yerdesin.
                <br /><br />
                <strong>İster mentör ol, ister destek al;</strong> sektördeki deneyimli mühendislerle bağlantı kur, disiplinleri keşfet ve mühendislik dünyasındaki yolculuğuna kendini tanıyarak başla!
              </p>
            </TiltCard>

            <div className="hero-actions" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
              <a href="/kesfet" className="btn-hero-primary">
                <i className="fa-solid fa-rocket" /> Hemen Keşfet
              </a>
              <a href="/kayit" className="btn-hero-secondary">
                <i className="fa-solid fa-user-plus" /> Üye Ol
              </a>
            </div>
          </section>

          {/* Features Section */}
          <section className="section">
            <div className="section-header">
              <div className="section-label">Neler Sunuyoruz</div>
              <h2 className="section-title">
                Kariyer Yolculuğunu <span className="highlight">Güçlendir</span>
              </h2>
              <p className="section-desc">
                Mühendislik kariyerinde yol gösterici araçlar ve deneyimli mentörlerle bağlantı kur.
              </p>
            </div>

            <div className="features-grid">
              {features.map((feat) => (
                <TiltCard
                  key={feat.title}
                  onClick={() => { window.location.href = feat.link; }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={'feature-icon feature-icon-' + feat.tone}>
                    <i className={'fa-solid ' + feat.icon} />
                  </div>
                  <h3>{feat.title}</h3>
                  <p>{feat.text}</p>
                  <ul className="feature-list">
                    {feat.items.map((item) => (
                      <li key={item}><i className="fa-solid fa-check" /> {item}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 16, color: '#22d3ee', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                    İncele <i className="fa-solid fa-arrow-right" style={{ fontSize: 12 }} />
                  </div>
                </TiltCard>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            <div className="stats-grid">
              {stats.map((st) => (
                <div className="stat-card revealed" key={st.label}>
                  <Counter target={st.target} suffix={st.suffix} />
                  <div className="stat-label">{st.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="cta-box revealed">
              <h2>Kariyer Yolculuğuna <span className="highlight">Bugün Başla</span></h2>
              <p>
                Mühendislik dünyasında doğru adımları atmak için EngineersPath seni bekliyor. Hemen üye ol, keşfetmeye başla!
              </p>
              <div className="cta-buttons">
                <a href="/kayit" className="btn-cta-primary" style={{ textDecoration: 'none' }}>
                  <i className="fa-solid fa-rocket" /> Hemen Üye Ol
                </a>
                <button className="btn-cta-secondary" onClick={() => setModal('login')}>
                  <i className="fa-solid fa-right-to-bracket" /> Giriş Yap
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {/* Login Modal */}
      {modal === 'login' && (
        <Modal title="Tekrar Hoş Geldin! 👋" onClose={() => setModal(null)}>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group" style={{ marginBottom: 18 }}>
              <label htmlFor="loginEmail">E-posta Adresi</label>
              <input
                id="loginEmail"
                type="email"
                required
                placeholder="ornek@universite.edu.tr"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 18 }}>
              <label htmlFor="loginPassword">Şifre</label>
              <input
                id="loginPassword"
                type="password"
                required
                placeholder="••••••••"
                value={loginForm.sifre}
                onChange={(e) => setLoginForm({ ...loginForm, sifre: e.target.value })}
              />
            </div>

            {loginError && (
              <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 14, fontWeight: 600 }}>
                <i className="fa-solid fa-circle-exclamation" /> {loginError}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <button
                type="button"
                className="forgot-password-link"
                onClick={() => { setForgotResult(null); setModal('forgot'); }}
                style={{ background: 'none', border: 'none', color: '#06b6d4', cursor: 'pointer', fontSize: 13, padding: 0 }}
              >
                <i className="fa-solid fa-key" /> Şifremi Unuttum
              </button>

              <a href="/kayit" style={{ color: '#94a3b8', fontSize: 13, textDecoration: 'none' }}>
                Hesabın yok mu? <strong style={{ color: '#22d3ee' }}>Kayıt Ol</strong>
              </a>
            </div>

            <button className="submit-btn" disabled={loginLoading} style={{ width: '100%' }}>
              {loginLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </Modal>
      )}

      {/* Forgot Password Modal */}
      {modal === 'forgot' && (
        <Modal title="Şifremi Unuttum 🔑" onClose={() => setModal(null)}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
            Kayıtlı e-posta adresinizi girin, hesap bilgilerinizi hemen kontrol edelim.
          </p>

          <form onSubmit={handleForgotSubmit}>
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label htmlFor="forgotEmail">E-posta Adresi</label>
              <input
                id="forgotEmail"
                type="email"
                required
                placeholder="ornek@universite.edu.tr"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </div>

            <button className="submit-btn" style={{ width: '100%' }}>
              Şifremi Göster
            </button>
          </form>

          {forgotResult && (
            <div style={{
              marginTop: 20,
              padding: 16,
              borderRadius: 14,
              background: forgotResult.error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              border: forgotResult.error ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(16, 185, 129, 0.4)',
              color: '#fff',
              fontSize: 14
            }}>
              {forgotResult.loading ? (
                'Hesap aranıyor...'
              ) : forgotResult.error ? (
                <><i className="fa-solid fa-circle-xmark" style={{ color: '#ef4444' }} /> {forgotResult.error}</>
              ) : (
                <>
                  <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: 6 }}>
                    <i className="fa-solid fa-circle-check" /> Hesap bulundu!
                  </div>
                  <div>Merhaba <strong>{forgotResult.kullanici_adi}</strong>, Şifreniz:</div>
                  <div style={{
                    marginTop: 8,
                    padding: '8px 12px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    borderRadius: 8,
                    fontFamily: 'monospace',
                    fontSize: 16,
                    color: '#22d3ee',
                    textAlign: 'center',
                    letterSpacing: 2
                  }}>
                    {forgotResult.sifre}
                  </div>
                </>
              )}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button
              onClick={() => setModal('login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#06b6d4',
                cursor: 'pointer',
                fontSize: 13
              }}
            >
              <i className="fa-solid fa-arrow-left" /> Giriş ekranına dön
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
