import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    status: 'uni_ogrenci', // uni_ogrenci | lise_ogrenci | uni_mezun | mentor
    school: '',
    department: '',
    level: '1',
    workplace: '',
    experience: '1 - 3 Yıl',
    password: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const student = form.status === 'uni_ogrenci';
  const graduate = form.status === 'uni_mezun';
  const mentor = form.status === 'mentor';
  const highSchool = form.status === 'lise_ogrenci';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    try {
      const res = await fetch('/api/kayit-ol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kullanici_adi: form.name,
          email: form.email,
          department: form.department || 'Genel Mühendislik',
          rol: mentor ? 'mentor' : 'ogrenci',
          durum: form.status,
          okul: form.school || null,
          bolum: form.department || null,
          sinif: form.level || null,
          is_yeri: form.workplace || null,
          deneyim: form.experience || null,
          sifre: form.password
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Kayıt sırasında bir hata oluştu!' });
        setLoading(false);
        return;
      }

      login({
        name: form.name,
        email: form.email,
        role: mentor ? 'mentor' : 'ogrenci',
        status: form.status,
        department: form.department,
        school: form.school,
        level: form.level,
        workplace: form.workplace,
        experience: form.experience
      });

      setMessage({ type: 'success', text: data.message || 'Harika! Başarıyla kayıt oldun.' });
      setTimeout(() => {
        const dest = mentor ? '/panel/mentor' : highSchool ? '/panel/aday' : '/panel/ogrenci';
        window.location.href = dest;
      }, 1000);
    } catch {
      setMessage({ type: 'error', text: 'Sunucuya bağlanılamadı. Backend çalışıyor mu?' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#ffffff', fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <main style={{ maxWidth: 650, margin: '0 auto', padding: '120px 24px 80px 24px' }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          borderRadius: 24,
          padding: 'clamp(24px, 4vw, 40px)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <span style={{ fontSize: 42 }}>🚀</span>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: '8px 0 6px 0' }}>
              EngineersPath’e <span style={{ color: '#22d3ee' }}>Katıl</span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 14 }}>
              Mühendislik topluluğumuza katıl, hedeflerine giden yolda ilk adımı at.
            </p>
          </div>

          {/* Role selector tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, background: 'rgba(30, 41, 59, 0.6)', padding: 6, borderRadius: 14, marginBottom: 24 }}>
            {[
              ['uni_ogrenci', 'Üniversiteli'],
              ['lise_ogrenci', 'Aday / Liseli'],
              ['uni_mezun', 'Mezun'],
              ['mentor', 'Mentor']
            ].map(([id, label]) => (
              <button
                type="button"
                key={id}
                onClick={() => setForm({ ...form, status: id })}
                style={{
                  padding: '8px 4px',
                  borderRadius: 10,
                  border: 'none',
                  background: form.status === id ? '#06b6d4' : 'transparent',
                  color: form.status === id ? '#0f172a' : '#94a3b8',
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  textAlign: 'center'
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>Ad Soyad</label>
                <input
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Ad Soyad"
                  style={{ width: '100%', padding: '12px', borderRadius: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>E-posta Adresi</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="ornek@universite.edu.tr"
                  style={{ width: '100%', padding: '12px', borderRadius: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>
                {highSchool ? 'Lisenizin Adı / Mezuniyet Lisesi' : 'Üniversite Adı'}
              </label>
              <input
                required
                value={form.school}
                onChange={update('school')}
                placeholder={highSchool ? 'Örn: Kadıköy Anadolu Lisesi' : 'Örn: İstanbul Teknik Üniversitesi'}
                style={{ width: '100%', padding: '12px', borderRadius: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff', outline: 'none' }}
              />
            </div>

            {!highSchool && (
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>Bölüm</label>
                <input
                  required
                  value={form.department}
                  onChange={update('department')}
                  placeholder="Örn: Bilgisayar Mühendisliği"
                  style={{ width: '100%', padding: '12px', borderRadius: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff', outline: 'none' }}
                />
              </div>
            )}

            {student && (
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>Sınıf / Seviye</label>
                <select
                  value={form.level}
                  onChange={update('level')}
                  style={{ width: '100%', padding: '12px', borderRadius: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff', outline: 'none' }}
                >
                  <option value="0">Hazırlık Sınıfı</option>
                  <option value="1">1. Sınıf</option>
                  <option value="2">2. Sınıf</option>
                  <option value="3">3. Sınıf</option>
                  <option value="4">4. Sınıf / Mezuniyet Yılı</option>
                </select>
              </div>
            )}

            {mentor && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>Çalıştığınız Kurum</label>
                  <input
                    required
                    value={form.workplace}
                    onChange={update('workplace')}
                    placeholder="Örn: Savunma / Teknoloji Şirketi"
                    style={{ width: '100%', padding: '12px', borderRadius: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>Deneyim Süresi</label>
                  <select
                    value={form.experience}
                    onChange={update('experience')}
                    style={{ width: '100%', padding: '12px', borderRadius: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff', outline: 'none' }}
                  >
                    <option>0 - 1 Yıl</option>
                    <option>1 - 3 Yıl</option>
                    <option>3 - 5 Yıl</option>
                    <option>5 - 10 Yıl</option>
                    <option>10+ Yıl</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>Şifre Oluştur</label>
              <input
                required
                type="password"
                minLength={6}
                value={form.password}
                onChange={update('password')}
                placeholder="En az 6 karakter"
                style={{ width: '100%', padding: '12px', borderRadius: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff', outline: 'none' }}
              />
            </div>

            {message.text && (
              <div style={{
                padding: 12,
                borderRadius: 10,
                background: message.type === 'error' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
                border: message.type === 'error' ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(16,185,129,0.3)',
                color: message.type === 'error' ? '#ef4444' : '#10b981',
                fontSize: 13,
                fontWeight: 600
              }}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 8,
                padding: '14px',
                background: 'linear-gradient(135deg, #0891b2, #0f766e)',
                border: 'none',
                color: '#fff',
                borderRadius: 12,
                fontWeight: 800,
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(6,182,212,0.25)'
              }}
            >
              {loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol ve Panele Geç 🚀'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
