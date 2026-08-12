import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register({ setIsLoginOpen }) {
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regStatus, setRegStatus] = useState('');
  const [regSchool, setRegSchool] = useState('');
  const [regDepartment, setRegDepartment] = useState('');
  const [regClassLevel, setRegClassLevel] = useState('');
  const [regWorkplace, setRegWorkplace] = useState('');
  const [regExperience, setRegExperience] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const departmentInput = regDepartment.toLowerCase();
    let department = 'tech';
    if (departmentInput.includes('tıp') || departmentInput.includes('doktor') || departmentInput.includes('sağlık')) {
      department = 'med';
    } else if (departmentInput.includes('hukuk') || departmentInput.includes('adalet')) {
      department = 'law';
    } else if (departmentInput.includes('işletme') || departmentInput.includes('iktisat') || departmentInput.includes('finans')) {
      department = 'business';
    }

    const rol = (regStatus === 'mentor') ? 'mentor' : 'ogrenci';

    try {
      const response = await fetch('/api/kayit-ol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kullanici_adi: regName,
          department: department,
          rol: rol,
          durum: regStatus,
          okul: regSchool || null,
          bolum: regDepartment || null,
          sinif: regClassLevel || null,
          is_yeri: regWorkplace || null,
          deneyim: regExperience || null,
          sifre: regPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        login({
          kullaniciAdi: regName,
          rol: rol,
          durum: regStatus,
          department: department,
          okul: regSchool,
          bolum: regDepartment,
          sinif: regClassLevel,
          is_yeri: regWorkplace,
          deneyim: regExperience
        });

        if (rol === 'mentor') {
          navigate('/dashboard-mentor');
        } else if (regStatus === 'lise_ogrenci') {
          navigate('/dashboard-aday');
        } else {
          navigate('/dashboard-ogrenci');
        }
      } else {
        setErrorMsg(data.error || 'Kayıt olunamadı.');
      }
    } catch (err) {
      console.error("Kayıt hatası:", err);
      setErrorMsg("Backend sunucusuna bağlanılamadı. (server.js açık mı?) ❌");
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', position: 'relative' }}>
      <Link to="/" className="back-home" style={{ position: 'absolute', top: '30px', left: '40px', color: '#06b6d4', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <i className="fa-solid fa-arrow-left"></i> Ana Sayfaya Dön
      </Link>

      <div className="register-container" style={{ background: '#1e293b', border: '2px solid rgba(6, 182, 212, 0.3)', borderRadius: '25px', width: '100%', maxWidth: '650px', padding: '40px', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(10px)' }}>
        <h2 style={{ color: '#ffffff', marginBottom: '25px', fontSize: '28px', textAlign: 'center' }}>
          Aramıza <span>Katıl & Keşfet!</span> 🚀
        </h2>

        {errorMsg && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#f87171', padding: '10px 15px', borderRadius: '10px', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit}>
          <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label>Ad Soyad</label>
              <input 
                type="text" 
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Helin Çelik" 
                required 
              />
            </div>
            <div className="form-group">
              <label>E-posta Adresi</label>
              <input 
                type="email" 
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="helin@universite.edu.tr" 
                required 
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Eğitim / Profesyonel Durum</label>
            <select value={regStatus} onChange={(e) => setRegStatus(e.target.value)} required>
              <option value="" disabled>Seçiniz...</option>
              <option value="uni_ogrenci">Üniversite Öğrencisi</option>
              <option value="lise_ogrenci">Lise Öğrencisi/mezunu</option>
              <option value="uni_mezun">Üniversite Mezunu</option>
              <option value="mentor">Mentörlük Yapmak İstiyorum</option>
            </select>
          </div>

          {regStatus && regStatus !== 'lise_ogrenci' && (
            <div className="form-group full-width">
              <label>
                {regStatus === 'uni_ogrenci' ? 'Okul Adı' : 'Mezun Olduğunuz Okul'}
              </label>
              <input 
                type="text" 
                value={regSchool}
                onChange={(e) => setRegSchool(e.target.value)}
                placeholder="Örn: Boğaziçi Üniversitesi"
                required
              />
            </div>
          )}

          {regStatus === 'lise_ogrenci' && (
            <div className="form-group full-width">
              <label>Lise / Mezun Olunan Lise</label>
              <input 
                type="text" 
                value={regSchool}
                onChange={(e) => setRegSchool(e.target.value)}
                placeholder="Örn: Kadıköy Anadolu Lisesi"
                required
              />
            </div>
          )}

          {(regStatus === 'uni_ogrenci' || regStatus === 'uni_mezun' || regStatus === 'mentor') && (
            <div className="form-group full-width">
              <label>
                {regStatus === 'uni_ogrenci' ? 'Bölüm Adı' : 'Mezun Olduğunuz Bölüm'}
              </label>
              <input 
                type="text" 
                value={regDepartment}
                onChange={(e) => setRegDepartment(e.target.value)}
                placeholder="Örn: Bilgisayar Mühendisliği"
                required
              />
            </div>
          )}

          {regStatus === 'uni_ogrenci' && (
            <div className="form-group full-width">
              <label>Sınıf / Seviye</label>
              <select value={regClassLevel} onChange={(e) => setRegClassLevel(e.target.value)} required>
                <option value="" disabled>Seviye Seç...</option>
                <option value="0">Hazırlık</option>
                <option value="1">1. Sınıf</option>
                <option value="2">2. Sınıf</option>
                <option value="3">3. Sınıf</option>
                <option value="4">4. Sınıf</option>
              </select>
            </div>
          )}

          {regStatus === 'mentor' && (
            <>
              <div className="form-group full-width">
                <label>Çalıştığınız İş Yeri / Kurum (Opsiyonel)</label>
                <input 
                  type="text" 
                  value={regWorkplace}
                  onChange={(e) => setRegWorkplace(e.target.value)}
                  placeholder="Örn: Tech Company / Hastane"
                />
              </div>

              <div className="form-group full-width">
                <label>Deneyim Süresi</label>
                <select value={regExperience} onChange={(e) => setRegExperience(e.target.value)}>
                  <option value="" disabled>Süre Seçiniz...</option>
                  <option value="0-1">0 - 1 Yıl</option>
                  <option value="1-3">1 - 3 Yıl</option>
                  <option value="3-5">3 - 5 Yıl</option>
                  <option value="5-10">5 - 10 Yıl</option>
                  <option value="10+">10+ Yıl</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group full-width">
            <label>Şifre Oluştur</label>
            <input 
              type="password" 
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              placeholder="••••••••" 
              required 
            />
          </div>

          <button type="submit" className="submit-btn" style={{ width: '100%', background: 'linear-gradient(to right, #06b6d4, #10b981)', color: '#ffffff', padding: '15px', border: 'none', borderRadius: '15px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            Kayıt İşlemini Tamamla 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
