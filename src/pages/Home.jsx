import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home({ isLoginOpen, setIsLoginOpen }) {
  const [activeTab, setActiveTab] = useState('features');
  const [showcaseVisible, setShowcaseVisible] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRevealShowcase = () => {
    setShowcaseVisible(true);
    setTimeout(() => {
      document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('/api/giris-yap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kullanici_adi: loginName, sifre: loginPassword })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        login({
          kullaniciAdi: loginName,
          rol: data.rol,
          durum: data.durum,
          department: data.department,
          okul: data.okul,
          bolum: data.bolum,
          sinif: data.sinif,
          is_yeri: data.is_yeri,
          deneyim: data.deneyim
        });
        setIsLoginOpen(false);

        if (data.rol === 'mentor') {
          navigate('/dashboard-mentor');
        } else if (data.durum === 'lise_ogrenci') {
          navigate('/dashboard-aday');
        } else {
          navigate('/dashboard-ogrenci');
        }
      } else {
        setErrorMessage(data.error || 'Giriş başarısız oldu.');
      }
    } catch (err) {
      console.error("Giriş Hatası:", err);
      setErrorMessage("Backend sunucusuna bağlanılamadı. (server.js açık mı?) ❌");
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ARKA PLANDA AKAN İKONLAR */}
      <div className="marquee-container">
        <div className="marquee-content">
          <i className="fa-solid fa-laptop-code"></i>
          <i className="fa-solid fa-microscope"></i>
          <i className="fa-solid fa-compass-drafting"></i>
          <i className="fa-solid fa-helmet-safety"></i>
          <i className="fa-solid fa-stethoscope"></i>
          <i className="fa-solid fa-tooth"></i>
          <i className="fa-solid fa-chart-pie"></i>
          <i className="fa-solid fa-palette"></i>
          <i className="fa-solid fa-dna"></i>
          <i className="fa-solid fa-laptop-code"></i>
          <i className="fa-solid fa-microscope"></i>
          <i className="fa-solid fa-compass-drafting"></i>
          <i className="fa-solid fa-helmet-safety"></i>
          <i className="fa-solid fa-stethoscope"></i>
          <i className="fa-solid fa-tooth"></i>
          <i className="fa-solid fa-chart-pie"></i>
          <i className="fa-solid fa-palette"></i>
          <i className="fa-solid fa-dna"></i>
        </div>
      </div>

      {/* KAHRAMAN ALANI */}
      <main className="hero-section">
        <h1>Mühendislik Kariyerini <span>Şansa Bırakma</span> 🎯</h1>
        
        <div className="description-text">
          <strong>EngineersPath</strong>, mühendislik öğrencileri ve mezunları için kurulmuş bir kariyer rehberliği platformudur. Yazılımdan makineye, elektrik-elektronikten inşaata, kimyadan havacılığa kadar tüm mühendislik dallarında "hangi alana yönelmeliyim?" sorusuna cevap arıyorsan doğru yerdesin.
          <br /><br />
          <strong>İster mentör ol, ister destek al;</strong> sektördeki deneyimli mühendislerle bağlantı kur, kariyer testiyle sana en uygun alanı keşfet, ve mühendislik dünyasındaki yolculuğuna kendini tanıyarak başla! 🚀
        </div>
        
        <Link to="/kesfet" className="cta-btn">Hemen Keşfetmeye Başla 🚀</Link>
        <button onClick={handleRevealShowcase} className="guest-link">
          Platformu İncele 🔍
        </button>
      </main>

      {/* PLATFORM SHOWCASE (TANITIM BÖLÜMÜ) */}
      <div id="showcase" className={`showcase-section ${showcaseVisible ? 'visible' : ''}`}>
        <div className="showcase-header">
          <h2>EngineersPath <span>Özellikleri</span> ⚙️</h2>
          <p>Kariyer basamaklarını tırmanırken ihtiyacın olan tüm araçlar tek bir platformda.</p>
        </div>

        <div className="showcase-tabs">
          <button 
            className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            <i className="fa-solid fa-star"></i> Temel Özellikler
          </button>
          <button 
            className={`tab-btn ${activeTab === 'mentorship' ? 'active' : ''}`}
            onClick={() => setActiveTab('mentorship')}
          >
            <i className="fa-solid fa-users"></i> Mentörlük Sistemi
          </button>
          <button 
            className={`tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            <i className="fa-solid fa-route"></i> Kariyer Haritası
          </button>
        </div>

        <div className="showcase-card">
          <div id="features" className={`showcase-tab-content ${activeTab === 'features' ? 'active' : ''}`}>
            <div className="tab-text">
              <h3><i className="fa-solid fa-rocket"></i> Neden EngineersPath?</h3>
              <p>Mühendislik disiplinlerini tanıtan rehberler, sektör analizleri ve kişiselleştirilmiş öğrenme yolları ile geleceğini şekillendir.</p>
              <ul className="feature-bullets">
                <li><i className="fa-solid fa-check"></i> 10+ Mühendislik Disiplini Detaylı Rehberi</li>
                <li><i className="fa-solid fa-check"></i> İnteraktif Kişilik & Alan Uyumluluk Testi</li>
                <li><i className="fa-solid fa-check"></i> Canlı Soru-Cevap ve Topluluk Desteği</li>
              </ul>
            </div>
            <div className="tab-visual">
              <div className="visual-badge">Gelişmiş Ekosistem</div>
              <div className="visual-stat-grid">
                <div className="stat-box">
                  <div className="number">10+</div>
                  <div className="label">Mühendislik Dalı</div>
                </div>
                <div className="stat-box">
                  <div className="number">%95</div>
                  <div className="label">Eşleşme Başarısı</div>
                </div>
              </div>
            </div>
          </div>

          <div id="mentorship" className={`showcase-tab-content ${activeTab === 'mentorship' ? 'active' : ''}`}>
            <div className="tab-text">
              <h3><i className="fa-solid fa-user-graduate"></i> Birebir Mentörlük</h3>
              <p>Sektördeki kıdemli mühendislerden birebir kariyer danışmanlığı al. CV incelemesi, mülakat simülasyonları ve teknik rehberlik seni bekliyor.</p>
              <ul className="feature-bullets">
                <li><i className="fa-solid fa-check"></i> Doğrulanmış Kıdemli Mühendisler</li>
                <li><i className="fa-solid fa-check"></i> Randevu & Görüşme Planlama</li>
                <li><i className="fa-solid fa-check"></i> Proje ve CV Geri Bildirimleri</li>
              </ul>
            </div>
            <div className="tab-visual">
              <div className="visual-badge">Mentör Ağı</div>
              <div className="visual-stat-grid">
                <div className="stat-box">
                  <div className="number">50+</div>
                  <div className="label">Aktif Mentör</div>
                </div>
                <div className="stat-box">
                  <div className="number">1:1</div>
                  <div className="label">Birebir Görüşme</div>
                </div>
              </div>
            </div>
          </div>

          <div id="roadmap" className={`showcase-tab-content ${activeTab === 'roadmap' ? 'active' : ''}`}>
            <div className="tab-text">
              <h3><i className="fa-solid fa-map-location-dot"></i> Adım Adım Yol Haritası</h3>
              <p>Hangi yazılım dilini öğrenmelisin? Hangi sertifikalar sektörde geçerli? Adım adım oluşturulmuş mühendislik yol haritalarını takip et.</p>
              <ul className="feature-bullets">
                <li><i className="fa-solid fa-check"></i> Güncel Sektör İhtiyaçlarına Uygun</li>
                <li><i className="fa-solid fa-check"></i> Pratik Proje Önerileri</li>
                <li><i className="fa-solid fa-check"></i> Ücretsiz Kaynak Önerileri</li>
              </ul>
            </div>
            <div className="tab-visual">
              <div className="visual-badge">Rehberler</div>
              <div className="visual-stat-grid">
                <div className="stat-box">
                  <div className="number">100+</div>
                  <div className="label">Kaynak & Kurs</div>
                </div>
                <div className="stat-box">
                  <div className="number">24/7</div>
                  <div className="label">Erişim</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA BANNER */}
      <div id="join" className={`cta-banner-section ${showcaseVisible ? 'visible' : ''}`}>
        <div className="cta-banner-box">
          <h2>Kariyerine Bugün <span>Yön Ver!</span> ✨</h2>
          <p>Hemen ücretsiz kayıt ol, mühendislik dünyasında fark yaratmaya başla.</p>
          <div className="cta-btn-group">
            <Link to="/register" className="primary-register-btn">
              <i className="fa-solid fa-user-plus"></i> Ücretsiz Kayıt Ol
            </Link>
            <button className="secondary-login-btn" onClick={() => setIsLoginOpen(true)}>
              <i className="fa-solid fa-right-to-bracket"></i> Giriş Yap
            </button>
          </div>
        </div>
      </div>

      {/* GİRİŞ YAP MODAL PENCERESİ */}
      <div className={`modal-overlay ${isLoginOpen ? 'active' : ''}`}>
        <div className="modal-box">
          <span className="close-modal" onClick={() => setIsLoginOpen(false)}>&times;</span>
          <h2>Tekrar <span>Hoş Geldin!</span></h2>
          
          {errorMessage && (
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#f87171', padding: '10px 15px', borderRadius: '10px', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Kullanıcı Adı (Ad Soyad)</label>
              <input 
                type="text" 
                value={loginName} 
                onChange={(e) => setLoginName(e.target.value)} 
                placeholder="Helin Çelik" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Şifre</label>
              <input 
                type="password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
                placeholder="••••••••" 
                required 
              />
            </div>
            <button type="submit" className="submit-btn">Giriş Yap</button>
          </form>
        </div>
      </div>
    </div>
  );
}
