import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// 🎓 SEKTÖR MENTÖRLERİ VERİ SETİ
const sectorMentorsList = [
  {
    id: 'm1',
    name: 'Helin Çelik',
    company: 'Google / Trendyol',
    title: 'Senior Frontend Dev & UI Mimarı',
    exp: '7 Yıl Deneyim',
    avatar: 'HÇ',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HelinCelik',
    field: 'Frontend & Web Teknolojileri',
    dept: 'bilgisayar',
    activeMentees: 14,
    totalMentees: 38,
    acceptanceRate: '%98',
    responseTime: '< 15 Dk',
    rating: '5.0 ⭐ (32 Değerlendirme)',
    skills: ['React', 'TypeScript', 'Next.js', 'Frontend Perf', 'UI/UX Design'],
    bio: 'Yüksek ölçekli e-ticaret ve arama motoru frontend mimarilerinde 7 yıllık deneyime sahibim. Bilgisayar ve Yazılım öğrencilerine staj başvuruları, portfolyo inceleme ve modern JS/React ekosistemi üzerine danışmanlık sunuyorum.'
  },
  {
    id: 'm2',
    name: 'Murat Yılmaz',
    company: 'AWS / Microsoft',
    title: 'Principal Cloud & DevOps Architect',
    exp: '11 Yıl Deneyim',
    avatar: 'MY',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MuratYilmaz',
    field: 'Bulut Bilişim & Dağıtık Sistemler',
    dept: 'bilgisayar',
    activeMentees: 11,
    totalMentees: 29,
    acceptanceRate: '%94',
    responseTime: '~ 1 Saat',
    rating: '4.9 ⭐ (27 Değerlendirme)',
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Microservices'],
    bio: 'Küresel ölçekli bulut altyapıları ve sunucusuz mimarileri yönetiyorum. Mühendislik öğrencilerine Cloud ve DevOps kariyer haritası çiziyorum.'
  },
  {
    id: 'm3',
    name: 'Dr. Ahmet Kaya',
    company: 'ASELSAN Ar-Ge',
    title: 'Kıdemli Gömülü Yazılım & Sinyal Lideri',
    exp: '12 Yıl Deneyim',
    avatar: 'AK',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AhmetKaya',
    field: 'Savunma Sanayi & Gömülü Sistemler',
    dept: 'elektrik',
    activeMentees: 16,
    totalMentees: 45,
    acceptanceRate: '%96',
    responseTime: '< 30 Dk',
    rating: '5.0 ⭐ (41 Değerlendirme)',
    skills: ['C/C++', 'RTOS', 'ARM Architecture', 'DSP', 'FPGA'],
    bio: 'ASELSAN bünyesinde kritik otonom haberleşme ve radar sinyal işleme projelerini yürütüyorum.'
  }
];

// 🏫 OKUL ARKADAŞLARI VERİ SETİ
const schoolPeersList = [
  { id: 'sp1', name: "Selin Yılmaz", dept: "Bilgisayar Müh.", classYear: "3. Sınıf", skills: "React, Node.js", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Selin" },
  { id: 'sp2', name: "Caner Demir", dept: "Makine Müh.", classYear: "4. Sınıf", skills: "SolidWorks, Ansys", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Caner" },
  { id: 'sp3', name: "Merve Öztürk", dept: "Elektrik-Elektronik Müh.", classYear: "2. Sınıf", skills: "PCB, C++", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Merve" }
];

// 📥 ADAY İSTEKLERİ VERİ SETİ
const initialPendingCandidateRequests = [
  {
    id: 'c1',
    name: 'Arda Yılmaz',
    school: 'Atatürk Anadolu Lisesi (12. Sınıf)',
    target: 'İTÜ Bilgisayar Mühendisliği (Hedef: İlk 2.000)',
    nets: 'TYT: 98 Net • AYT: 72 Net',
    avatar: 'AY',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArdaYilmaz',
    note: 'Merhaba abi, İTÜ Bilgisayar hazırlık ve ders yoğunluğu hakkında tavsiyelerinizi almak istiyorum. Mentee talebimi kabul edebilir misiniz?'
  },
  {
    id: 'c2',
    name: 'Selin Karaca',
    school: 'Kadıköy Anadolu Lisesi (12. Sınıf)',
    target: 'ODTÜ Elektrik-Elektronik Mühendisliği',
    nets: 'TYT: 102 Net • AYT: 74 Net',
    avatar: 'SK',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SelinKaraca',
    note: 'Gömülü sistemler ve ODTÜ EEM laboratuvar imkanları konusunda bilgi almak istiyorum.'
  },
  {
    id: 'c3',
    name: 'Mert Aksoy',
    school: 'Ankara Fen Lisesi (Mezun)',
    target: 'Bilkent Endüstri Mühendisliği',
    nets: 'TYT: 105 Net • AYT: 76 Net',
    avatar: 'MA',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MertAksoy',
    note: 'Bilkent tam burslu endüstri hazırlık sınıfı ve çap imkanları hakkında danışmak istiyorum.'
  }
];

// 💼 STAJ & PROJE İLANLARI VERİ SETİ
const defaultUserJobs = [
  { id: "job_1", title: "Teknofest Otonom İHA Takımı Yazılımcısı", type: "Proje Arkadaşı", domain: "Havacılık ve Uzay", skills: "Python, ROS2, OpenCV", desc: "Sürü İHA algoritmaları üzerine çalışacak bilgisayar/yazılım öğrencisi arıyoruz.", author: "Ahmet K. (İTÜ 3. Sınıf)", company: "İTÜ Takımı", contact: "ahmet@itu.edu.tr", date: "Bugün" },
  { id: "job_2", title: "Trendyol Talent Tech - Frontend & Cloud Stajyeri", type: "Staj / Aday", domain: "Yazılım / Bilgisayar", skills: "React, Node.js, Cloud, Docker", desc: "Trendyol Maslak kampüsünde yüksek ölçekli e-ticaret mikroservislerinde deneyim kazanacak yazılım stajyerleri arıyoruz.", author: "Trendyol HR & Tech Team", company: "Trendyol", contact: "tech-talent@trendyol.com", date: "Bugün" },
  { id: "job_3", title: "Google STEP 2026 Software Engineering Intern", type: "Staj / Aday", domain: "Yazılım / Bilgisayar", skills: "C++, Python, Java, Data Structures", desc: "Google mühendislik ekibiyle birlikte küresel altyapı ve yapay zeka projelerinde 12 haftalık ücretli yaz stajı.", author: "Google Recruiting", company: "Google", contact: "step@google.com", date: "Bugün" }
];

// 🏢 REVAÇTA ŞİRKETLER VERİ SETİ
const revactaSirketlerData = [
  { id: 1, ad: "Aselsan", kategori: "savunma", logo: "🛡️", unvan: "Savunma Sanayii & Otonom Sistemler", ilanSayisi: 4, mentörSayisi: 12, tanim: "Türkiye'nin lider savunma elektroniği ve otonom sistemler kuruluşu.", mentörler: [{ isim: "Murat Demir", unvan: "Kıdemli Gömülü Yazılım Mimarı" }, { isim: "Selin Kaya", unvan: "Sistem Tasarım Mühendisi" }] },
  { id: 2, ad: "Trendyol Tech", kategori: "teknoloji", logo: "🛍️", unvan: "E-Ticaret & Yüksek Ölçekli Yazılım", ilanSayisi: 6, mentörSayisi: 18, tanim: "Günde milyonlarca istek alan mikro-servis mimarisi ve veri analitiği merkezi.", mentörler: [{ isim: "Hande Erçel", unvan: "Lead Frontend Engineer" }, { isim: "Emre Arslan", unvan: "Backend Team Lead" }] }
];

export default function DashboardOgrenci() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Ana Menü ve Alt Menüler
  const [activeTab, setActiveTab] = useState('panel'); 
  const [mentornetOpen, setMentornetOpen] = useState(true);
  const [industryOpen, setIndustryOpen] = useState(true);

  // Subnav State'leri
  const [schoolSubtab, setSchoolSubtab] = useState('peers'); // 'peers', 'announcements', 'clubs', 'chat'
  const [jobsSubtab, setJobsSubtab] = useState('all'); // 'all', 'mine'
  const [mentorSubtab, setMentorSubtab] = useState('all'); // 'all', 'requests'
  const [candidateSubtab, setCandidateSubtab] = useState('pending'); // 'pending', 'accepted', 'chat'
  const [companyCategory, setCompanyCategory] = useState('hepsi');
  const [selectedBolumKey, setSelectedBolumKey] = useState('bilgisayar');

  // Mentör & Aday State
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [pendingCandidates, setPendingCandidates] = useState(initialPendingCandidateRequests);
  const [acceptedCandidates, setAcceptedCandidates] = useState([]);

  // Modallar
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [selectedCompanyModal, setSelectedCompanyModal] = useState(null);
  const [selectedMentorDetailsModal, setSelectedMentorDetailsModal] = useState(null);
  const [selectedCandidateDetailModal, setSelectedCandidateDetailModal] = useState(null);
  const [sendReqNoteModalMentor, setSendReqNoteModalMentor] = useState(null);
  const [sendReqNoteText, setSendReqNoteText] = useState('');
  
  // Profil State
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profName, setProfName] = useState(user?.kullaniciAdi || 'Öğrenci Kullanıcımız');
  const [profSchool, setProfSchool] = useState(user?.okul || 'Boğaziçi Üniversitesi');
  const [profDept, setProfDept] = useState(user?.bolum || 'Bilgisayar Mühendisliği');
  const [profCvName, setProfCvName] = useState(localStorage.getItem('kullaniciCVName') || null);

  // Form State
  const [jobTitle, setJobTitle] = useState('');
  const [jobSkills, setJobSkills] = useState('');
  const [jobContact, setJobContact] = useState('');

  // AI & Chat State
  const [aiChatMessages, setAiChatMessages] = useState([
    { sender: 'ai', text: 'Merhaba! Ben mühendislik öğrencilerine özel tasarlanmış AI Kariyer ve Ders Danışmanıyım. 🚀 Staj başvuruları, CV hazırlama, GitHub projeleri veya ders notları hakkında sorabilirsin!' }
  ]);
  const [aiInputText, setAiInputText] = useState('');

  // Live Chat State
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'them', text: 'Merhaba! Rehberlik ve sorularınız için buradayım.' }
  ]);
  const [chatInputText, setChatInputText] = useState('');

  const handleAiSend = (query) => {
    const text = query || aiInputText;
    if (!text.trim()) return;

    setAiChatMessages(prev => [...prev, { sender: 'user', text }]);
    setAiInputText('');

    setTimeout(() => {
      let botReply = "Staj ararken LinkedIn profili, güncel bir GitHub portfolyosu ve sade bir PDF CV her zaman öne geçmeni sağlar.";
      if (text.toLowerCase().includes('cv')) {
        botReply = "📄 Mühendislik Staj CV İpuçları:\n1. Format: Tek sayfa temiz LaTeX/PDF kullan.\n2. Projeler: Okul ve kişisel projeleri öne çıkar.";
      }
      setAiChatMessages(prev => [...prev, { sender: 'ai', text: botReply }]);
    }, 600);
  };

  const handleChatSend = () => {
    if (!chatInputText.trim()) return;
    setChatMessages(prev => [...prev, { sender: 'me', text: chatInputText }]);
    setChatInputText('');
  };

  const handleAcceptCandidate = (candidate) => {
    setPendingCandidates(prev => prev.filter(c => c.id !== candidate.id));
    setAcceptedCandidates(prev => [...prev, candidate]);
    setSelectedCandidateDetailModal(null);
    alert(`✅ ${candidate.name} mentiniz olarak kabul edildi! Aday Sohbetleri sekmesinden mesajlaşabilirsiniz.`);
  };

  const handleConfirmSendRequest = () => {
    if (!sendReqNoteModalMentor) return;
    setOutgoingRequests(prev => [...prev, { mentorId: sendReqNoteModalMentor.id, name: sendReqNoteModalMentor.name, title: sendReqNoteModalMentor.company, note: sendReqNoteText }]);
    alert(`✅ ${sendReqNoteModalMentor.name} kişisine isteğiniz iletildi!`);
    setSendReqNoteModalMentor(null);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#020617', color: '#ffffff' }}>
      {/* 🌟 100% KAPLAYAN SIDEBAR */}
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
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>{profDept}</p>
          </div>

          <button onClick={() => { logout(); navigate('/'); }} className="menu-item logout-btn" style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
            <i className="fa-solid fa-right-from-bracket"></i> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* SAĞ ANA İÇERİK */}
      <main className="main-content">
        <div className="welcome-bar">
          <h1>Hoş Geldin, <span style={{ color: '#06b6d4' }}>{profName}</span>! 👋</h1>
          <div className="user-badge">Öğrenci Modu</div>
        </div>

        {/* TAB 1: KİŞİSELLEŞTİRİLMİŞ PANEL */}
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

        {/* TAB 2: ADAY İSTEKLERİ & REHBERLİK (MENTEELERİM) */}
        {activeTab === 'mentor-candidates' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '24px', color: '#fff' }}>
                  <i className="fa-solid fa-user-graduate" style={{ color: '#a855f7', marginRight: '8px' }}></i>
                  Aday İstekleri & Rehberlik (Menteelerim) 🎓
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>Mühendislik hedefleyen lise öğrencilerine üniversite ve meslek deneyimlerinizi aktarın.</p>
              </div>
            </div>

            <div className="showcase-tabs" style={{ justifyContent: 'flex-start', marginBottom: '25px' }}>
              <button className={`tab-btn ${candidateSubtab === 'pending' ? 'active' : ''}`} onClick={() => setCandidateSubtab('pending')}>📥 Bekleyen İstekler ({pendingCandidates.length})</button>
              <button className={`tab-btn ${candidateSubtab === 'accepted' ? 'active' : ''}`} onClick={() => setCandidateSubtab('accepted')}>✅ Menteelerim ({acceptedCandidates.length})</button>
              <button className={`tab-btn ${candidateSubtab === 'chat' ? 'active' : ''}`} onClick={() => setCandidateSubtab('chat')}>💬 Aday Sohbetleri (Canlı)</button>
            </div>

            {/* İSTEKLER GRID GÖRÜNÜMÜ */}
            {candidateSubtab === 'pending' && (
              <div className="dashboard-grid">
                {pendingCandidates.map(cand => (
                  <div key={cand.id} className="premium-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <img src={cand.img} alt={cand.name} style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px solid #a855f7' }} />
                      <div>
                        <h3 style={{ margin: 0, fontSize: '17px' }}>{cand.name}</h3>
                        <span style={{ color: '#a855f7', fontSize: '12px' }}>{cand.school}</span>
                      </div>
                    </div>
                    <span style={{ display: 'block', color: '#06b6d4', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>{cand.target}</span>
                    <span style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '12px' }}>{cand.nets}</span>
                    <p style={{ fontSize: '13.5px', color: '#cbd5e1', marginBottom: '15px' }}>"{cand.note}"</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => setSelectedCandidateDetailModal(cand)} className="subnav-btn" style={{ padding: '8px 12px', fontSize: '12px' }}>İncele 👁️</button>
                      <button onClick={() => handleAcceptCandidate(cand)} className="submit-btn" style={{ marginTop: 0, padding: '8px 14px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', fontSize: '12px' }}>Talebi Kabul Et ✅</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MENTEELERİM GRID GÖRÜNÜMÜ */}
            {candidateSubtab === 'accepted' && (
              <div className="dashboard-grid">
                {acceptedCandidates.length === 0 ? (
                  <p style={{ color: '#94a3b8' }}>Henüz kabul ettiğiniz mentee bulunmuyor.</p>
                ) : (
                  acceptedCandidates.map(cand => (
                    <div key={cand.id} className="premium-card">
                      <h3>{cand.name}</h3>
                      <span style={{ color: '#a855f7', fontSize: '13px' }}>{cand.target}</span>
                      <button onClick={() => { setCandidateSubtab('chat'); setActiveChatUser(cand.name); }} className="submit-btn" style={{ marginTop: '12px', padding: '8px 14px' }}>Sohbet Başlat 💬</button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 🌟 WHATSAPP TARZI CANLI SOHBET EKRANI */}
            {candidateSubtab === 'chat' && (
              <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr', height: '580px', background: '#0f172a', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '20px', overflow: 'hidden' }}>
                <div style={{ borderRight: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px', background: 'rgba(30, 41, 59, 0.7)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{ color: '#a855f7', fontSize: '14px', margin: '0 0 10px 0' }}><i className="fa-solid fa-comments"></i> Aday Sohbetleri</h4>
                  {initialPendingCandidateRequests.map(cand => (
                    <div key={cand.id} onClick={() => setActiveChatUser(cand.name)} style={{ padding: '12px', background: activeChatUser === cand.name ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', cursor: 'pointer', borderLeft: activeChatUser === cand.name ? '3px solid #a855f7' : 'none' }}>
                      <strong style={{ color: '#fff', fontSize: '14px', display: 'block' }}>{cand.name}</strong>
                      <span style={{ color: '#a855f7', fontSize: '11px' }}>{cand.school}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
                  {!activeChatUser ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', color: '#94a3b8', margin: 'auto' }}>
                      <i className="fa-solid fa-comments" style={{ fontSize: '48px', color: '#a855f7', marginBottom: '16px', opacity: 0.6 }}></i>
                      <h3 style={{ color: '#fff' }}>Sohbet Başlatmak İçin Bir Aday Seçin</h3>
                      <p style={{ fontSize: '13px', maxWidth: '320px' }}>Sol taraftaki listeden bir adaya tıklayarak rehberlik mesajı gönderebilirsiniz.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '12px' }}>
                        <h3 style={{ color: '#fff', fontSize: '18px', margin: 0 }}>{activeChatUser}</h3>
                        <span style={{ color: '#a855f7', fontSize: '12px' }}>🎓 Mühendislik Adayı Öğrenci</span>
                      </div>
                      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '15px' }}>
                        {chatMessages.map((m, idx) => (
                          <div key={idx} style={{ alignSelf: m.sender === 'me' ? 'flex-end' : 'flex-start', background: m.sender === 'me' ? '#a855f7' : 'rgba(30,41,59,0.8)', color: '#fff', padding: '10px 16px', borderRadius: '12px', fontSize: '14px', maxWidth: '75%' }}>
                            {m.text}
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" value={chatInputText} onChange={(e) => setChatInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleChatSend()} placeholder="Aday öğrenciye rehberlik mesajı yaz..." style={{ flex: 1, padding: '12px 16px', background: '#0f172a', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
                        <button onClick={handleChatSend} className="submit-btn" style={{ marginTop: 0, padding: '12px 24px', background: '#a855f7' }}>Gönder 🚀</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SEKTÖR MENTÖRLERİ */}
        {activeTab === 'mentor-sector' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px', background: 'rgba(30, 41, 59, 0.5)', padding: '18px 24px', borderRadius: '16px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
              <div>
                <h2 style={{ fontSize: '24px', color: '#fff', margin: 0 }}>
                  <i className="fa-solid fa-user-tie" style={{ color: '#06b6d4', marginRight: '8px' }}></i>
                  Sektör Mentörleri & Mentörlük Ağı 🤝
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>Sektördeki kıdemli mühendislerden danışmanlık alın.</p>
              </div>
            </div>

            <div className="showcase-tabs" style={{ justifyContent: 'flex-start', marginBottom: '25px' }}>
              <button className={`tab-btn ${mentorSubtab === 'all' ? 'active' : ''}`} onClick={() => setMentorSubtab('all')}>👥 Tüm Mentörler</button>
              <button className={`tab-btn ${mentorSubtab === 'requests' ? 'active' : ''}`} onClick={() => setMentorSubtab('requests')}>📩 Gönderilen İstekler ({outgoingRequests.length})</button>
            </div>

            {mentorSubtab === 'all' && (
              <div className="dashboard-grid">
                {sectorMentorsList.map(m => (
                  <div key={m.id} className="premium-card" style={{ textAlign: 'center' }}>
                    <img src={m.img} alt={m.name} style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#0f172a', border: '2px solid #06b6d4', margin: '0 auto 12px auto', display: 'block' }} />
                    <h3 style={{ margin: 0, fontSize: '18px' }}>{m.name}</h3>
                    <span style={{ color: '#06b6d4', fontSize: '13px', display: 'block', margin: '3px 0' }}>{m.company} • {m.title}</span>
                    <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '12px' }}>{m.exp}</span>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => setSelectedMentorDetailsModal(m)} className="subnav-btn" style={{ padding: '8px 14px', fontSize: '12px' }}>İncele 👁️</button>
                      <button onClick={() => setSendReqNoteModalMentor(m)} className="submit-btn" style={{ marginTop: 0, padding: '8px 14px', fontSize: '12px' }}>İstek Gönder 🚀</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {mentorSubtab === 'requests' && (
              <div className="dashboard-grid">
                {outgoingRequests.length === 0 ? (
                  <p style={{ color: '#94a3b8' }}>Henüz gönderilmiş bir mentörlük isteğiniz bulunmuyor.</p>
                ) : (
                  outgoingRequests.map((req, i) => (
                    <div key={i} className="premium-card">
                      <h3>{req.name}</h3>
                      <span style={{ color: '#06b6d4', fontSize: '13px', display: 'block', marginBottom: '10px' }}>{req.title}</span>
                      <p style={{ fontSize: '14px', color: '#cbd5e1' }}>"{req.note || 'İstek iletildi.'}"</p>
                      <span style={{ fontSize: '12px', color: '#10b981', display: 'block', marginTop: '10px' }}>✅ Yanıt Bekleniyor</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: OKULUNUZDAN */}
        {activeTab === 'school' && (
          <div>
            <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '20px' }}>
              <i className="fa-solid fa-graduation-cap" style={{ color: '#06b6d4', marginRight: '8px' }}></i>
              <span>{profSchool}</span> Ağı 🎓
            </h2>
            <div className="dashboard-grid">
              {schoolPeersList.map(peer => (
                <div key={peer.id} className="premium-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <img src={peer.img} alt={peer.name} style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#0f172a', border: '2px solid #06b6d4' }} />
                    <div>
                      <h3 style={{ margin: 0, fontSize: '17px' }}>{peer.name}</h3>
                      <span style={{ color: '#06b6d4', fontSize: '13px' }}>{peer.dept} ({peer.classYear})</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '13px', color: '#cbd5e1', display: 'block', marginBottom: '15px' }}>Yetkinlikler: <strong>{peer.skills}</strong></span>
                  <button onClick={() => { setActiveTab('mentor-candidates'); setCandidateSubtab('chat'); setActiveChatUser(peer.name); }} className="submit-btn" style={{ marginTop: 0, padding: '8px 16px' }}>Sohbet Et 💬</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: REVAÇTA ŞİRKETLER */}
        {activeTab === 'companies' && (
          <div>
            <h2 style={{ fontSize: '26px', color: '#fff', marginBottom: '20px' }}>
              <i className="fa-solid fa-building" style={{ color: '#06b6d4', marginRight: '10px' }}></i>
              Revaçta Şirketler & Staj Programları 🏢
            </h2>
            <div className="dashboard-grid">
              {revactaSirketlerData.map(comp => (
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

        {/* TAB 6: STAJ & PROJE İLANLARI */}
        {activeTab === 'jobs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ fontSize: '26px', color: '#fff' }}>
                <i className="fa-solid fa-briefcase" style={{ color: '#06b6d4', marginRight: '8px' }}></i>
                Staj & Proje Takımı İlanları 🚀
              </h2>
              <button onClick={() => setIsCreateJobOpen(true)} className="submit-btn" style={{ marginTop: 0, background: 'linear-gradient(135deg,#06b6d4,#3b82f6)' }}>
                + Yeni İlan Oluştur
              </button>
            </div>
            <div className="dashboard-grid">
              {defaultUserJobs.map(job => (
                <div key={job.id} className="premium-card">
                  <h3>{job.title}</h3>
                  <span style={{ color: '#06b6d4', fontSize: '13px', display: 'block', marginBottom: '10px' }}>{job.domain}</span>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '15px' }}>{job.desc}</p>
                  <button onClick={() => alert("Başvuru iletildi! 🚀")} className="submit-btn" style={{ marginTop: 0, padding: '10px' }}>Başvur & Özgeçmiş İlet 🚀</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: AI DANIŞMANI */}
        {activeTab === 'ai' && (
          <div className="premium-card" style={{ maxWidth: '850px', margin: '0 auto' }}>
            <h3 style={{ margin: 0, marginBottom: '15px' }}>AI Öğrenci & Kariyer Danışmanı 🤖</h3>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '16px', padding: '20px', minHeight: '260px', maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {aiChatMessages.map((msg, i) => (
                <div key={i} style={{ background: msg.sender === 'user' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)', borderLeft: msg.sender === 'ai' ? '3px solid #06b6d4' : 'none', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <strong style={{ color: '#06b6d4', display: 'block', marginBottom: '4px' }}>{msg.sender === 'ai' ? '🤖 AI Öğrenci Danışman:' : '👤 Sen:'}</strong>
                  {msg.text}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" value={aiInputText} onChange={(e) => setAiInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAiSend()} placeholder="Sorunuzu yazın..." style={{ flex: 1, padding: '12px 18px', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
              <button onClick={() => handleAiSend()} className="submit-btn" style={{ marginTop: 0, padding: '12px 24px' }}>Sor</button>
            </div>
          </div>
        )}

        {/* TAB 8: PROFİLİM */}
        {activeTab === 'profile' && (
          <div className="premium-card" style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', fontSize: '36px', fontWeight: 'bold' }}>🎓</div>
            <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '4px' }}>{profName}</h3>
            <p style={{ color: '#06b6d4', fontSize: '14px' }}>{profSchool} • {profDept}</p>
          </div>
        )}
      </main>

      {/* 🌟 MODAL: ADAY İSTEK DETAY İNCELEME (selectedCandidateDetailModal) */}
      {selectedCandidateDetailModal && (
        <div className="modal-overlay active" onClick={() => setSelectedCandidateDetailModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px', textAlign: 'center' }}>
            <span className="close-modal" onClick={() => setSelectedCandidateDetailModal(null)}>&times;</span>
            <img src={selectedCandidateDetailModal.img} alt={selectedCandidateDetailModal.name} style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid #a855f7', margin: '0 auto 15px auto', display: 'block' }} />
            <h3 style={{ fontSize: '22px', color: '#fff', margin: 0 }}>{selectedCandidateDetailModal.name}</h3>
            <span style={{ color: '#a855f7', fontSize: '14px', display: 'block', margin: '4px 0 16px 0' }}>{selectedCandidateDetailModal.school}</span>

            <div style={{ background: 'rgba(15,23,42,0.6)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(168,85,247,0.2)', marginBottom: '16px', textAlign: 'left' }}>
              <strong style={{ color: '#06b6d4', display: 'block', marginBottom: '4px' }}>🎯 Hedef Bölüm & Üniversite:</strong>
              <span style={{ color: '#fff', fontSize: '14px' }}>{selectedCandidateDetailModal.target}</span>
              <strong style={{ color: '#a855f7', display: 'block', marginTop: '10px', marginBottom: '4px' }}>📊 Deneme & YKS Netleri:</strong>
              <span style={{ color: '#fff', fontSize: '14px' }}>{selectedCandidateDetailModal.nets}</span>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', textAlign: 'left', background: 'rgba(15,23,42,0.6)', padding: '15px', borderRadius: '12px' }}>"{selectedCandidateDetailModal.note}"</p>

            <button onClick={() => handleAcceptCandidate(selectedCandidateDetailModal)} className="submit-btn" style={{ width: '100%', marginTop: 0, background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>Talebi Kabul Et & Rehber Ol ✅</button>
          </div>
        </div>
      )}

      {/* MODAL: SEKTÖR MENTÖR DETAY */}
      {selectedMentorDetailsModal && (
        <div className="modal-overlay active" onClick={() => setSelectedMentorDetailsModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px', textAlign: 'center' }}>
            <span className="close-modal" onClick={() => setSelectedMentorDetailsModal(null)}>&times;</span>
            <img src={selectedMentorDetailsModal.img} alt={selectedMentorDetailsModal.name} style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#0f172a', border: '3px solid #06b6d4', margin: '0 auto 15px auto', display: 'block' }} />
            <h3 style={{ fontSize: '22px', color: '#fff', margin: 0 }}>{selectedMentorDetailsModal.name}</h3>
            <span style={{ color: '#06b6d4', fontSize: '14px', display: 'block', margin: '4px 0 16px 0' }}>{selectedMentorDetailsModal.company} • {selectedMentorDetailsModal.title}</span>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', textAlign: 'left', background: 'rgba(15,23,42,0.6)', padding: '15px', borderRadius: '12px' }}>"{selectedMentorDetailsModal.bio}"</p>
            <button onClick={() => { setSendReqNoteModalMentor(selectedMentorDetailsModal); setSelectedMentorDetailsModal(null); }} className="submit-btn" style={{ width: '100%', marginTop: 0 }}>📩 Mentörlük İsteği Gönder 🚀</button>
          </div>
        </div>
      )}

      {/* MODAL: İSTEK NOTU */}
      {sendReqNoteModalMentor && (
        <div className="modal-overlay active" onClick={() => setSendReqNoteModalMentor(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <span className="close-modal" onClick={() => setSendReqNoteModalMentor(null)}>&times;</span>
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>{sendReqNoteModalMentor.name} Mentöre Not Yaz</h3>
            <textarea maxLength={500} value={sendReqNoteText} onChange={(e) => setSendReqNoteText(e.target.value)} placeholder="Mentöre notunuzu yazın..." style={{ width: '100%', height: '110px', background: '#0f172a', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '12px', color: '#fff', padding: '12px', outline: 'none', marginBottom: '15px' }} />
            <button onClick={handleConfirmSendRequest} className="submit-btn" style={{ width: '100%', marginTop: 0 }}>İstek & Notu Gönder 🚀</button>
          </div>
        </div>
      )}

      {/* MODAL: ŞİRKET MENTÖRLERİ */}
      {selectedCompanyModal && (
        <div className="modal-overlay active" onClick={() => setSelectedCompanyModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <span className="close-modal" onClick={() => setSelectedCompanyModal(null)}>&times;</span>
            <h2 style={{ textAlign: 'left', color: '#06b6d4', marginBottom: '15px' }}>{selectedCompanyModal.ad} Mentörleri</h2>
            {selectedCompanyModal.mentörler.map((m, idx) => (
              <div key={idx} style={{ background: '#0f172a', padding: '12px', borderRadius: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#fff', display: 'block' }}>{m.isim}</strong>
                  <span style={{ color: '#06b6d4', fontSize: '12px' }}>{m.unvan}</span>
                </div>
                <button onClick={() => { setSendReqNoteModalMentor({ id: 'comp_' + idx, name: m.isim, company: selectedCompanyModal.ad }); setSelectedCompanyModal(null); }} className="submit-btn" style={{ marginTop: 0, padding: '6px 12px', fontSize: '12px' }}>İstek Gönder 🚀</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
