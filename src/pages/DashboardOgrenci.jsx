import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// 🏢 Revaçta Şirketler Veri Seti
const revactaSirketlerData = [
  { id: 1, ad: "Aselsan", kategori: "savunma", logo: "🛡️", unvan: "Savunma Sanayii & Otonom Sistemler", konum: "Ankara / Türkiye", mentörSayisi: 12, ilanSayisi: 4, tanim: "Türkiye'nin lider savunma elektroniği ve otonom sistemler kuruluşu.", mentörler: [{ isim: "Murat Demir", unvan: "Kıdemli Gömülü Yazılım Mimarı", avatar: "MD" }] },
  { id: 2, ad: "Trendyol Tech", kategori: "teknoloji", logo: "🛍️", unvan: "E-Ticaret & Yüksek Ölçekli Yazılım", konum: "İstanbul / Remote", mentörSayisi: 18, ilanSayisi: 6, tanim: "Günde milyonlarca istek alan mikro-servis mimarisi ve veri analitiği merkezi.", mentörler: [{ isim: "Hande Erçel", unvan: "Lead Frontend Engineer", avatar: "HE" }] },
  { id: 3, ad: "Baykar Teknoloji", kategori: "savunma", logo: "✈️", unvan: "İnsansız Hava Araçları & Yapay Zeka", konum: "İstanbul / Türkiye", mentörSayisi: 15, ilanSayisi: 5, tanim: "Milli İHA/SİHA teknolojileri, otonom yazılımlar ve havacılık Ar-Ge merkezi.", mentörler: [{ isim: "Selim Çetin", unvan: "Otonom Uçuş Yazılım Lideri", avatar: "SÇ" }] },
  { id: 4, ad: "Google Turkey / EMEA", kategori: "global", logo: "🌐", unvan: "Global Arama & Bulut Teknolojileri", konum: "İstanbul / Dublin / Remote", mentörSayisi: 8, ilanSayisi: 2, tanim: "Dünya çapında dağıtık sistemler ve yapay zeka altyapıları.", mentörler: [{ isim: "Canan Dağdeviren", unvan: "Senior Staff Software Engineer", avatar: "CD" }] },
  { id: 5, ad: "Roketsan", kategori: "savunma", logo: "🚀", unvan: "Füze Sistemleri & Mekatronik Ar-Ge", konum: "Ankara / Türkiye", mentörSayisi: 9, ilanSayisi: 3, tanim: "Mekanik tasarım, aerodinamik ve güdüm kontrol sistemleri.", mentörler: [{ isim: "Emre Kaya", unvan: "Mekatronik Tasarım Uzmanı", avatar: "EK" }] },
  { id: 6, ad: "Amazon AWS", kategori: "global", logo: "☁️", unvan: "Cloud Computing & Dağıtık Mimari", konum: "Lüksemburg / Remote", mentörSayisi: 6, ilanSayisi: 2, tanim: "Bulut altyapısı, devasa veri işleme ve DevOps ekosistemi.", mentörler: [{ isim: "Oğuz Kara", unvan: "Solutions Architect", avatar: "OK" }] }
];

// 🌐 Bölümlere Özel Uzmanlık Rotaları
const bolumRotalariData = {
  bilgisayar: [
    { title: "Yapay Zeka & Derin Öğrenme Mühendisliği", desc: "PyTorch, TensorFlow, LLM modelleri ve görüntü işleme algoritmaları.", skills: "Python, PyTorch, Linear Algebra, CUDA, OpenCV", icon: "fa-brain" },
    { title: "Full-Stack & Bulut Yazılım Mimari", desc: "React, Node.js, Microservices, Docker, Kubernetes ve AWS.", skills: "TypeScript, React, Go/Node, PostgreSQL, Docker", icon: "fa-code" },
    { title: "Siber Güvenlik & Penetrasyon Testi", desc: "Ağ güvenliği, kriz analizi, zararlı yazılım inceleme ve sızma testleri.", skills: "Linux, Wireshark, Python, Metasploit, Cryptography", icon: "fa-shield-halved" }
  ],
  elektrik: [
    { title: "Gömülü Sistemler & IoT Tasarımı", desc: "Mikrodenetleyiciler, C/C++, RTOS ve PCB devre kartı tasarımı.", skills: "C/C++, STM32, ESP32, KiCAD, SPI/I2C", icon: "fa-microchip" },
    { title: "Güç Elektroniği & Yenilenebilir Enerji", desc: "Elektrikli araç şarj istasyonları, inverters ve batarya yönetim sistemleri (BMS).", skills: "MATLAB, Simulink, PCB, HV Systems", icon: "fa-bolt" }
  ],
  makine: [
    { title: "Otonom Araç & Robotik Tasarım", desc: "CAD/CAM simülasyonları, kinematik, SolidWorks ve ROS2 mekatronik kontrol.", skills: "SolidWorks, ANSYS, ROS2, C++", icon: "fa-robot" },
    { title: "Termodinamik & Isıl Analiz Uzmanlığı", desc: "HVAC iklimlendirme, aerodinamik akışkanlar mekaniği ve motor tasarımları.", skills: "CFD, OpenFOAM, Thermodynamics, Heat Transfer", icon: "fa-fire-flame-curved" }
  ]
};

// 🎓 Sektör Mentörleri Veri Seti
const sektorMentorleriData = [
  { id: 1, isim: "Selin Çeliker", şirket: "Google", unvan: "Staff Software Engineer", bolum: "bilgisayar", tecrube: "8+ Yıl Deneyim", avatar: "SÇ", bio: "Yurt dışı yüksek lisans, Google mülakat süreçleri ve büyük ölçekli sistemler." },
  { id: 2, isim: "Barış Arslan", şirket: "Aselsan", unvan: "Gömülü Sistemler Ar-Ge Lideri", bolum: "elektrik", tecrube: "10+ Yıl Deneyim", avatar: "BA", bio: "Savunma sanayii stajları, C++ ve gerçek zamanlı işletim sistemleri (RTOS)." },
  { id: 3, isim: "Zeynep Yılmaz", şirket: "Trendyol Tech", unvan: "Data Science Manager", bolum: "endustri", tecrube: "6+ Yıl Deneyim", avatar: "ZY", bio: "Veri analitiği, makine öğrenmesi ve e-ticaret tavsiye sistemleri." }
];

export default function DashboardOgrenci() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Menü ve Sekme Kontrolleri
  const [activeTab, setActiveTab] = useState('panel'); // 'panel', 'school', 'jobs', 'companies', 'discover', 'mentor-sector', 'mentor-candidates', 'ai', 'profile'
  const [mentornetOpen, setMentornetOpen] = useState(true);
  const [industryOpen, setIndustryOpen] = useState(true);

  // Subnav State'leri
  const [schoolSubtab, setSchoolSubtab] = useState('peers');
  const [companyCategory, setCompanyCategory] = useState('hepsi');
  const [selectedBolumKey, setSelectedBolumKey] = useState('bilgisayar');
  const [selectedMentorDept, setSelectedMentorDept] = useState('hepsi');

  // Modallar
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [selectedCompanyModal, setSelectedCompanyModal] = useState(null);
  const [selectedMentorModal, setSelectedMentorModal] = useState(null);

  // Form State (İlan Oluşturma)
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('Proje Arkadaşı');
  const [jobDomain, setJobDomain] = useState('Yazılım / Bilgisayar');
  const [jobSkills, setJobSkills] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobContact, setJobContact] = useState('');

  // AI Chat State
  const [aiChatMessages, setAiChatMessages] = useState([
    { sender: 'ai', text: 'Merhaba! Ben mühendislik öğrencilerine özel tasarlanmış AI Kariyer ve Ders Danışmanıyım. 🚀 Staj başvuruları, CV hazırlama, GitHub projeleri veya ders notları hakkında sorabilirsin!' }
  ]);
  const [aiInputText, setAiInputText] = useState('');

  // Kullanıcı bilgileri
  const userName = user?.kullaniciAdi || 'Değerli Öğrenci';
  const userSchool = user?.okul || 'Boğaziçi Üniversitesi';
  const userDept = user?.bolum || 'Bilgisayar Mühendisliği';

  const handleAiSend = (query) => {
    const text = query || aiInputText;
    if (!text.trim()) return;

    setAiChatMessages(prev => [...prev, { sender: 'user', text }]);
    setAiInputText('');

    setTimeout(() => {
      setAiChatMessages(prev => [...prev, {
        sender: 'ai',
        text: 'Staj ve teknik mülakatlarda başarılı olmak için veri yapıları (Data Structures) ve algoritma karmaşıklığı (Big-O) konularını tekrar etmenizi öneririm!'
      }]);
    }, 600);
  };

  const handleCreateJobSubmit = (e) => {
    e.preventDefault();
    alert(`🚀 "${jobTitle}" başlıklı ilanınız başarıyla oluşturuldu! Proje takımı arayan öğrenciler size ulaşacaktır.`);
    setIsCreateJobOpen(false);
    setJobTitle('');
    setJobDesc('');
    setJobSkills('');
    setJobContact('');
  };

  const filteredCompanies = revactaSirketlerData.filter(c => companyCategory === 'hepsi' || c.kategori === companyCategory);
  const filteredMentors = sektorMentorleriData.filter(m => selectedMentorDept === 'hepsi' || m.bolum === selectedMentorDept);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#020617', color: '#ffffff' }}>
      {/* SOL SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <i className="fa-solid fa-compass"></i> EngineersPath
        </div>
        <div className="menu-items">
          <div className={`menu-item ${activeTab === 'panel' ? 'active' : ''}`} onClick={() => setActiveTab('panel')}>
            <i className="fa-solid fa-chart-pie"></i> Kişiselleştirilmiş Panel
          </div>

          <div className={`menu-item ${activeTab === 'school' ? 'active' : ''}`} onClick={() => setActiveTab('school')}>
            <i className="fa-solid fa-graduation-cap"></i> Okulunuzdan 🎓
          </div>

          {/* MENTÖRLÜK AĞI AÇILIR MENÜ */}
          <div className="menu-item" onClick={() => setMentornetOpen(!mentornetOpen)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <span><i className="fa-solid fa-users-rectangle" style={{ color: '#06b6d4' }}></i> Mentörlük Ağı 🤝</span>
            <i className={`fa-solid fa-chevron-${mentornetOpen ? 'down' : 'right'}`} style={{ fontSize: '12px' }}></i>
          </div>
          {mentornetOpen && (
            <div style={{ paddingLeft: '14px', borderLeft: '2px solid rgba(6, 182, 212, 0.3)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
              <div className={`menu-item ${activeTab === 'mentor-sector' ? 'active' : ''}`} onClick={() => setActiveTab('mentor-sector')} style={{ fontSize: '13.5px', padding: '10px 14px' }}>
                <i className="fa-solid fa-user-tie" style={{ color: '#06b6d4' }}></i> Sektör Mentörleri
              </div>
              <div className={`menu-item ${activeTab === 'mentor-candidates' ? 'active' : ''}`} onClick={() => setActiveTab('mentor-candidates')} style={{ fontSize: '13.5px', padding: '10px 14px' }}>
                <i className="fa-solid fa-user-graduate" style={{ color: '#a855f7' }}></i> Aday İstekleri & Menteeler
              </div>
            </div>
          )}

          {/* SEKTÖR & FIRSAT AĞI AÇILIR MENÜ */}
          <div className="menu-item" onClick={() => setIndustryOpen(!industryOpen)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <span><i className="fa-solid fa-briefcase" style={{ color: '#38bdf8' }}></i> Sektör & Fırsat Ağı 🚀</span>
            <i className={`fa-solid fa-chevron-${industryOpen ? 'down' : 'right'}`} style={{ fontSize: '12px' }}></i>
          </div>
          {industryOpen && (
            <div style={{ paddingLeft: '14px', borderLeft: '2px solid rgba(56, 189, 248, 0.3)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
              <div className={`menu-item ${activeTab === 'jobs' ? 'active' : ''}`} onClick={() => setActiveTab('jobs')} style={{ fontSize: '13.5px', padding: '10px 14px' }}>
                <i className="fa-solid fa-rocket" style={{ color: '#38bdf8' }}></i> Staj & Proje İlanları
              </div>
              <div className={`menu-item ${activeTab === 'companies' ? 'active' : ''}`} onClick={() => setActiveTab('companies')} style={{ fontSize: '13.5px', padding: '10px 14px' }}>
                <i className="fa-solid fa-building" style={{ color: '#06b6d4' }}></i> Revaçta Şirketler
              </div>
            </div>
          )}

          <div className={`menu-item ${activeTab === 'discover' ? 'active' : ''}`} onClick={() => setActiveTab('discover')}>
            <i className="fa-solid fa-globe"></i> Bölüm Rotaları & Keşif 🌐
          </div>
          <div className={`menu-item ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>
            <i className="fa-solid fa-robot"></i> AI Öğrenci Danışmanı 🤖
          </div>

          <div className="profile-section" style={{ marginTop: 'auto', marginBottom: '10px', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('profile')}>
            <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '3px' }}><i className="fa-solid fa-user-graduate"></i> Profilim</h4>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>{userDept}</p>
          </div>

          <button onClick={() => { logout(); navigate('/'); }} className="menu-item logout-btn" style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
            <i className="fa-solid fa-right-from-bracket"></i> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* SAĞ ANA İÇERİK */}
      <main className="main-content">
        <div className="welcome-bar">
          <h1>Hoş Geldin, <span style={{ color: '#06b6d4' }}>{userName}</span>! 👋</h1>
          <div className="user-badge">Öğrenci Modu</div>
        </div>

        {/* SEKME 1: KİŞİSELLEŞTİRİLMİŞ PANEL */}
        {activeTab === 'panel' && (
          <div className="dashboard-grid">
            <div className="premium-card">
              <div className="card-icon"><i className="fa-solid fa-robot"></i></div>
              <h3>AI Öğrenci & Kariyer Danışmanı 🤖</h3>
              <p>Staj mülakatları, CV hazırlama, GitHub projeleri ve ders tavsiyeleri için yapay zeka ile sohbet et.</p>
              <button onClick={() => setActiveTab('ai')} className="discipline-btn" style={{ color: '#06b6d4', fontWeight: 'bold' }}>Danışmana Sor &rarr;</button>
            </div>

            <div className="premium-card" onClick={() => setActiveTab('jobs')} style={{ cursor: 'pointer' }}>
              <div className="card-icon"><i className="fa-solid fa-bullhorn" style={{ color: '#06b6d4' }}></i></div>
              <h3>Önerilen Staj Fırsatları 💼</h3>
              <p>Kendi mühendislik alanında aktif olan staj ve yetenek programı (Aselsan, Baykar, Trendyol vb.) ilanlarını incele.</p>
              <button className="discipline-btn" style={{ color: '#06b6d4', fontWeight: 'bold' }}>İlanları Gör &rarr;</button>
            </div>

            <div className="premium-card" onClick={() => setActiveTab('mentor-sector')} style={{ cursor: 'pointer' }}>
              <div className="card-icon"><i className="fa-solid fa-users-rectangle" style={{ color: '#10b981' }}></i></div>
              <h3>Sektör Mentörlerinden Destek Al 🤝</h3>
              <p>Google, Aselsan, Trendyol gibi şirketlerde çalışan kıdemli mühendislerden staj, kariyer ve mülakat tavsiyesi al.</p>
              <button className="discipline-btn" style={{ color: '#06b6d4', fontWeight: 'bold' }}>Tüm Mentörler &rarr;</button>
            </div>

            <div className="premium-card" onClick={() => setActiveTab('mentor-candidates')} style={{ cursor: 'pointer' }}>
              <div className="card-icon"><i className="fa-solid fa-graduation-cap" style={{ color: '#a855f7' }}></i></div>
              <h3>Aday Öğrencilerle İletişime Geç 🎓</h3>
              <p>Mühendislik hedefleyen lise adaylarından sana gelen soruları yanıtla, geleceğin mühendislerine mentörlük yap.</p>
              <button className="discipline-btn" style={{ color: '#06b6d4', fontWeight: 'bold' }}>Aday Öğrenciler &rarr;</button>
            </div>
          </div>
        )}

        {/* SEKME: REVAÇTA ŞİRKETLER */}
        {activeTab === 'companies' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h2 style={{ fontSize: '26px', color: '#fff' }}>
                  <i className="fa-solid fa-building" style={{ color: '#06b6d4', marginRight: '10px' }}></i>
                  Revaçta Şirketler & Staj Programları 🏢
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>Mühendislik öğrencilerine staj sunan şirketler ve bünyelerindeki mentörler.</p>
              </div>
              <div>
                <select value={companyCategory} onChange={(e) => setCompanyCategory(e.target.value)} style={{ padding: '10px 16px', background: '#0f172a', border: '1px solid #06b6d4', borderRadius: '12px', color: '#fff', outline: 'none', cursor: 'pointer' }}>
                  <option value="hepsi">🌐 Tüm Sektörler</option>
                  <option value="teknoloji">💻 Teknoloji & E-Ticaret</option>
                  <option value="global">🌐 Global Teknoloji Devleri</option>
                  <option value="savunma">🛡️ Savunma Sanayii & Otonom</option>
                </select>
              </div>
            </div>

            <div className="dashboard-grid">
              {filteredCompanies.map(comp => (
                <div key={comp.id} className="premium-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '32px' }}>{comp.logo}</span>
                    <span className="user-badge">{comp.ilanSayisi} Staj İlanı</span>
                  </div>
                  <h3 style={{ fontSize: '20px', margin: '0 0 4px 0' }}>{comp.ad}</h3>
                  <span style={{ color: '#06b6d4', fontSize: '13px', display: 'block', marginBottom: '10px' }}>{comp.unvan}</span>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '15px' }}>{comp.tanim}</p>
                  <button onClick={() => setSelectedCompanyModal(comp)} className="submit-btn" style={{ marginTop: 0, padding: '10px' }}>Şirket Mentörlerini Gör ({comp.mentörSayisi})</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEKME: STAJ & PROJE İLANLARI */}
        {activeTab === 'jobs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h2 style={{ fontSize: '26px', color: '#fff' }}>
                  <i className="fa-solid fa-briefcase" style={{ color: '#06b6d4', marginRight: '8px' }}></i>
                  Staj & Proje Takımı İlanları 🚀
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '15px' }}>Projeniz için takım arkadaşı arayın veya aktif ilanlara başvurun.</p>
              </div>
              <button onClick={() => setIsCreateJobOpen(true)} className="submit-btn" style={{ marginTop: 0, background: 'linear-gradient(135deg,#06b6d4,#3b82f6)', padding: '12px 24px', fontSize: '14px' }}>
                <i className="fa-solid fa-plus"></i> Yeni İlan Oluştur
              </button>
            </div>

            <div className="dashboard-grid">
              <div className="premium-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0 }}>Yazılım & Yapay Zeka Stajyeri</h3>
                  <span className="user-badge">Aselsan</span>
                </div>
                <span style={{ color: '#06b6d4', fontSize: '13px', display: 'block', marginBottom: '10px' }}>📍 Ankara / Hibrit</span>
                <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '15px' }}>Python, PyTorch ve C++ ile otonom sistemlerde görüntü işleme stajı.</p>
                <button onClick={() => alert("Başvurunuz Aselsan İK birimine iletildi! 🚀")} className="submit-btn" style={{ marginTop: 0, padding: '10px' }}>Başvur & Özgeçmiş İlet 🚀</button>
              </div>

              <div className="premium-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0 }}>Otonom İHA Takım Arkadaşı</h3>
                  <span className="user-badge" style={{ color: '#a855f7' }}>Öğrenci Projesi</span>
                </div>
                <span style={{ color: '#06b6d4', fontSize: '13px', display: 'block', marginBottom: '10px' }}>📍 İTÜ Teknokent / Kampüs</span>
                <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '15px' }}>Teknofest yarışması için ROS2 ve C++ bilen yazılımcı aranıyor.</p>
                <button onClick={() => alert("Proje liderine mesajınız gönderildi!")} className="submit-btn" style={{ marginTop: 0, padding: '10px' }}>Takıma Katıl İsteği Gönder 🤝</button>
              </div>
            </div>
          </div>
        )}

        {/* SEKME: SEKTÖR MENTÖRLERİ */}
        {activeTab === 'mentor-sector' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h2 style={{ fontSize: '24px', color: '#fff' }}>
                  <i className="fa-solid fa-user-tie" style={{ color: '#06b6d4', marginRight: '8px' }}></i>
                  Sektör Mentörleri & Mentörlük Ağı 🤝
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>Sektördeki kıdemli mühendislerden danışmanlık alın.</p>
              </div>
              <div>
                <select value={selectedMentorDept} onChange={(e) => setSelectedMentorDept(e.target.value)} style={{ padding: '10px 16px', background: '#0f172a', border: '1px solid #06b6d4', borderRadius: '12px', color: '#fff', outline: 'none', cursor: 'pointer' }}>
                  <option value="hepsi">🌐 Tüm Mühendislik Branşları</option>
                  <option value="bilgisayar">💻 Bilgisayar & Yazılım Müh.</option>
                  <option value="elektrik">⚡ Elektrik-Elektronik Müh.</option>
                  <option value="endustri">📊 Endüstri & Veri Müh.</option>
                </select>
              </div>
            </div>

            <div className="dashboard-grid">
              {filteredMentors.map(m => (
                <div key={m.id} className="premium-card" style={{ textAlign: 'center' }}>
                  <div style={{ width: '65px', height: '65px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', color: '#fff', fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>{m.avatar}</div>
                  <h3 style={{ margin: 0, fontSize: '18px' }}>{m.isim}</h3>
                  <span style={{ color: '#06b6d4', fontSize: '13px', display: 'block', margin: '3px 0' }}>{m.unvan} @ {m.şirket}</span>
                  <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '12px' }}>{m.tecrube}</span>
                  <button onClick={() => setSelectedMentorModal(m)} className="submit-btn" style={{ marginTop: 0, padding: '8px 16px', fontSize: '13px' }}>Mentörlük İsteği Gönder 📩</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEKME: BÖLÜM ROTALARI & KEŞİF */}
        {activeTab === 'discover' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', background: 'rgba(30, 41, 59, 0.5)', padding: '18px 24px', borderRadius: '16px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
              <div>
                <h2 style={{ fontSize: '22px', color: '#fff', margin: 0 }}>Kariyer Rotaları & Alt Uzmanlık Alanları</h2>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: '4px 0 0 0' }}>Seçtiğin disipline özel uzmanlık yollarını incele.</p>
              </div>
              <select value={selectedBolumKey} onChange={(e) => setSelectedBolumKey(e.target.value)} style={{ padding: '10px 16px', background: '#0f172a', border: '1px solid #06b6d4', borderRadius: '12px', color: '#fff', outline: 'none', cursor: 'pointer' }}>
                <option value="bilgisayar">Bilgisayar / Yazılım Mühendisliği</option>
                <option value="elektrik">Elektrik-Elektronik Mühendisliği</option>
                <option value="makine">Makine Mühendisliği</option>
              </select>
            </div>

            <div className="dashboard-grid">
              {(bolumRotalariData[selectedBolumKey] || []).map((rota, idx) => (
                <div key={idx} className="premium-card">
                  <div className="card-icon"><i className={`fa-solid ${rota.icon}`}></i></div>
                  <h3>{rota.title}</h3>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '15px' }}>{rota.desc}</p>
                  <strong style={{ color: '#06b6d4', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Gerekli Beceriler & Yetkinlikler:</strong>
                  <span style={{ fontSize: '13px', color: '#e2e8f0' }}>{rota.skills}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEKME: AI DANIŞMANI */}
        {activeTab === 'ai' && (
          <div className="premium-card" style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div className="card-icon" style={{ margin: 0 }}><i className="fa-solid fa-robot"></i></div>
              <div>
                <h3 style={{ margin: 0 }}>AI Öğrenci & Kariyer Danışmanı 🤖</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Staj mülakatı, CV ve ders rehberi</p>
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '16px', padding: '20px', minHeight: '260px', maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {aiChatMessages.map((msg, i) => (
                <div key={i} style={{ background: msg.sender === 'user' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)', borderLeft: msg.sender === 'ai' ? '3px solid #06b6d4' : 'none', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <strong style={{ color: '#06b6d4', display: 'block', marginBottom: '4px' }}>{msg.sender === 'ai' ? '🤖 AI Öğrenci Danışman:' : '👤 Sen:'}</strong>
                  {msg.text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" value={aiInputText} onChange={(e) => setAiInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAiSend()} placeholder="Staj veya dersler hakkında sor..." style={{ flex: 1, padding: '12px 18px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none' }} />
              <button onClick={() => handleAiSend()} className="submit-btn" style={{ marginTop: 0, padding: '12px 24px' }}><i className="fa-solid fa-paper-plane"></i> Sor</button>
            </div>
          </div>
        )}

        {/* SEKME: PROFİLİM */}
        {activeTab === 'profile' && (
          <div className="premium-card" style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', fontSize: '36px', fontWeight: 'bold' }}>
              🎓
            </div>
            <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '4px' }}>{userName}</h3>
            <span className="user-badge" style={{ display: 'inline-block', marginBottom: '25px' }}>Mühendislik Öğrencisi Modu</span>

            <div style={{ textAlign: 'left', background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(6, 182, 212, 0.15)' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#64748b', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Üniversite / Okul</label>
                <p style={{ color: '#f1f5f9', fontSize: '15px', fontWeight: '500' }}>{userSchool}</p>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#64748b', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Bölüm & Sınıf</label>
                <p style={{ color: '#06b6d4', fontSize: '15px', fontWeight: '500' }}>{userDept}</p>
              </div>
              <div>
                <label style={{ display: 'block', color: '#64748b', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Hedeflenen Uzmanlık</label>
                <p style={{ color: '#f1f5f9', fontSize: '15px', fontWeight: '500' }}>Yapay Zeka & Full-Stack Yazılım Mühendisliği</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: İLAN OLUŞTURMA */}
      {isCreateJobOpen && (
        <div className="modal-overlay active" onClick={() => setIsCreateJobOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <span className="close-modal" onClick={() => setIsCreateJobOpen(false)}>&times;</span>
            <h2 style={{ textAlign: 'left', color: '#06b6d4', marginBottom: '20px' }}>Proje / Takım İlanı Oluştur 🚀</h2>
            <form onSubmit={handleCreateJobSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>İlan Başlığı</label>
                <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required placeholder="Örn: Otonom İHA Takımına Yazılımcı Aranıyor" style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '10px', color: '#fff', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>Aranan Beceriler</label>
                <input type="text" value={jobSkills} onChange={(e) => setJobSkills(e.target.value)} required placeholder="Örn: Python, ROS2, OpenCV" style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '10px', color: '#fff', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>İletişim Adresi</label>
                <input type="text" value={jobContact} onChange={(e) => setJobContact(e.target.value)} required placeholder="Örn: ahmet@student.itu.edu.tr" style={{ width: '100%', padding: '12px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '10px', color: '#fff', outline: 'none' }} />
              </div>
              <button type="submit" className="submit-btn" style={{ width: '100%', marginTop: 0 }}>İlanı Yayınla 🚀</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MENTÖR DETAY */}
      {selectedMentorModal && (
        <div className="modal-overlay active" onClick={() => setSelectedMentorModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', textAlign: 'center' }}>
            <span className="close-modal" onClick={() => setSelectedMentorModal(null)}>&times;</span>
            <div style={{ width: '75px', height: '75px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', color: '#fff', fontSize: '26px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}>{selectedMentorModal.avatar}</div>
            <h3 style={{ fontSize: '22px', color: '#fff', margin: 0 }}>{selectedMentorModal.isim}</h3>
            <span style={{ color: '#06b6d4', fontSize: '14px', display: 'block', margin: '4px 0 15px 0' }}>{selectedMentorModal.unvan} @ {selectedMentorModal.şirket}</span>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>"{selectedMentorModal.bio}"</p>
            <button onClick={() => { alert(`${selectedMentorModal.isim} isimli mentöre isteğiniz iletildi! 📩`); setSelectedMentorModal(null); }} className="submit-btn" style={{ width: '100%', marginTop: 0 }}>Birebir Mentörlük İstegi Gönder 📩</button>
          </div>
        </div>
      )}
    </div>
  );
}
