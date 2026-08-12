import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// 🎓 Sektör Mentörleri Veri Seti (Tüm Detaylarıyla)
const initialSectorMentors = [
  { id: 'm1', name: "Selin Çeliker", company: "Google", title: "Staff Software Engineer", exp: "8+ Yıl Deneyim", avatar: "SÇ", field: "Bilgisayar & Yazılım Müh.", activeMentees: 12, totalMentees: 34, acceptanceRate: "%98", responseTime: "< 1 Saat", rating: "4.9 ⭐ (24 Yorum)", bio: "Google EMEA bölgesinde sistem geliştirme ve mikroservis mimarisi üzerine çalışıyorum. YKS tercihlerinde ve teknik mülakatlarda mentörlük sunuyorum.", skills: ['React', 'TypeScript', 'System Design', 'Algorithms', 'Go'] },
  { id: 'm2', name: "Barış Arslan", company: "Aselsan", title: "Gömülü Sistemler Ar-Ge Lideri", exp: "10+ Yıl Deneyim", avatar: "BA", field: "Elektrik-Elektronik Müh.", activeMentees: 15, totalMentees: 42, acceptanceRate: "%96", responseTime: "~10 Dk", rating: "5.0 ⭐ (30 Yorum)", bio: "Savunma sanayi otonom sistemleri, C/C++ ve RTOS konularında lisans öğrencilerine mentörlük sağlıyorum.", skills: ['C/C++', 'STM32', 'RTOS', 'FPGA', 'DSP'] },
  { id: 'm3', name: "Zeynep Yılmaz", company: "Trendyol Tech", title: "Data Science Manager", exp: "6+ Yıl Deneyim", avatar: "ZY", field: "Endüstri & Veri Müh.", activeMentees: 8, totalMentees: 22, acceptanceRate: "%94", responseTime: "~15 Dk", rating: "4.8 ⭐ (18 Yorum)", bio: "Büyük veri işleme, Python ve makine öğrenmesi algoritmaları alanında kariyer tavsiyeleri sunuyorum.", skills: ['Python', 'PyTorch', 'Spark', 'SQL', 'Data Pipeline'] }
];

// 🏫 Okul Arkadaşları Veri Seti
const initialSchoolPeers = [
  { id: 'p1', name: "Selin Yılmaz", dept: "Bilgisayar Müh.", classYear: "3. Sınıf", skills: "React, Node.js", bio: "Frontend geliştirme ve okul topluluklarında aktif." },
  { id: 'p2', name: "Caner Demir", dept: "Makine Müh.", classYear: "4. Sınıf", skills: "SolidWorks, Ansys", bio: "Otonom araç projesinde mekatronik tasarımı yapıyor." },
  { id: 'p3', name: "Merve Öztürk", dept: "Elektrik-Elektronik Müh.", classYear: "2. Sınıf", skills: "PCB, C++", bio: "Gömülü sistemler ve robotik kulübü üyesi." }
];

// 🏢 Revaçta Şirketler Veri Seti
const revactaSirketlerData = [
  { id: 1, ad: "Aselsan", kategori: "savunma", logo: "🛡️", unvan: "Savunma Sanayii & Otonom Sistemler", konum: "Ankara / Türkiye", mentörSayisi: 12, ilanSayisi: 4, tanim: "Türkiye'nin lider savunma elektroniği ve otonom sistemler kuruluşu.", mentörler: [{ isim: "Murat Demir", unvan: "Kıdemli Gömülü Yazılım Mimarı", avatar: "MD" }, { isim: "Selin Kaya", unvan: "Sistem Tasarım Mühendisi", avatar: "SK" }] },
  { id: 2, ad: "Trendyol Tech", kategori: "teknoloji", logo: "🛍️", unvan: "E-Ticaret & Yüksek Ölçekli Yazılım", konum: "İstanbul / Remote", mentörSayisi: 18, ilanSayisi: 6, tanim: "Günde milyonlarca istek alan mikro-servis mimarisi ve veri analitiği merkezi.", mentörler: [{ isim: "Hande Erçel", unvan: "Lead Frontend Engineer", avatar: "HE" }, { isim: "Emre Arslan", unvan: "Backend Team Lead", avatar: "EA" }] },
  { id: 3, ad: "Baykar Teknoloji", kategori: "savunma", logo: "✈️", unvan: "İnsansız Hava Araçları & Yapay Zeka", konum: "İstanbul / Türkiye", mentörSayisi: 15, ilanSayisi: 5, tanim: "Milli İHA/SİHA teknolojileri, otonom yazılımlar ve havacılık Ar-Ge merkezi.", mentörler: [{ isim: "Selim Çetin", unvan: "Otonom Uçuş Yazılım Lideri", avatar: "SÇ" }] },
  { id: 4, ad: "Google Turkey / EMEA", kategori: "global", logo: "🌐", unvan: "Global Arama & Bulut Teknolojileri", konum: "İstanbul / Dublin / Remote", mentörSayisi: 8, ilanSayisi: 2, tanim: "Dünya çapında dağıtık sistemler ve yapay zeka altyapıları.", mentörler: [{ isim: "Canan Dağdeviren", unvan: "Senior Staff Software Engineer", avatar: "CD" }] }
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

export default function DashboardOgrenci() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Ana Sekme State'i
  const [activeTab, setActiveTab] = useState('panel'); // 'panel', 'school', 'jobs', 'companies', 'discover', 'mentor-sector', 'mentor-candidates', 'ai', 'profile'
  const [mentornetOpen, setMentornetOpen] = useState(true);
  const [industryOpen, setIndustryOpen] = useState(true);

  // Subnav State'leri
  const [schoolSubtab, setSchoolSubtab] = useState('peers'); // 'peers', 'announcements', 'clubs', 'chat'
  const [jobsSubtab, setJobsSubtab] = useState('all'); // 'all', 'mine', 'chat'
  const [mentorSubtab, setMentorSubtab] = useState('all'); // 'all', 'requests', 'mine', 'chat'
  const [candidateSubtab, setCandidateSubtab] = useState('pending'); // 'pending', 'accepted', 'chat'
  const [companyCategory, setCompanyCategory] = useState('hepsi');
  const [selectedBolumKey, setSelectedBolumKey] = useState('bilgisayar');
  const [selectedMentorDept, setSelectedMentorDept] = useState('hepsi');

  // Mentör İstekleri State
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [acceptedMentors, setAcceptedMentors] = useState([]);

  // Modallar
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [selectedCompanyModal, setSelectedCompanyModal] = useState(null);
  const [selectedMentorDetailsModal, setSelectedMentorDetailsModal] = useState(null);
  const [sendReqNoteModalMentor, setSendReqNoteModalMentor] = useState(null);
  const [sendReqNoteText, setSendReqNoteText] = useState('');
  
  // Profil Modalları
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isMenteesModalOpen, setIsMenteesModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [isAppliedJobsModalOpen, setIsAppliedJobsModalOpen] = useState(false);

  // Profil Verileri
  const [profName, setProfName] = useState(user?.kullaniciAdi || 'Öğrenci Kullanıcımız');
  const [profEmail, setProfEmail] = useState('ogrenci@universite.edu.tr');
  const [profSchool, setProfSchool] = useState(user?.okul || 'Boğaziçi Üniversitesi');
  const [profDept, setProfDept] = useState(user?.bolum || 'Bilgisayar Mühendisliği');
  const [profGrade, setProfGrade] = useState('3. Sınıf');
  const [profCvName, setProfCvName] = useState(localStorage.getItem('kullaniciCVName') || null);

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

  // Live WhatsApp Chat State
  const [chatActivePeer, setChatActivePeer] = useState(null);
  const [peerMessages, setPeerMessages] = useState([
    { sender: 'them', text: 'Merhaba! Proje ve mentörlük hakkında konuşabiliriz.' }
  ]);
  const [peerChatInput, setPeerChatInput] = useState('');

  const handleAiSend = (query) => {
    const text = query || aiInputText;
    if (!text.trim()) return;

    setAiChatMessages(prev => [...prev, { sender: 'user', text }]);
    setAiInputText('');

    setTimeout(() => {
      let botReply = "Mühendislik eğitimin boyunca başarılar dilerim! Staj ararken LinkedIn profili, güncel bir GitHub portfolyosu ve sade bir PDF CV her zaman öne geçmeni sağlar.";
      const lower = text.toLowerCase();
      if (lower.includes('cv') || lower.includes('staj')) {
        botReply = "📄 Mühendislik Staj CV İpuçları:\n1. Format: Tek sayfa, temiz ve sade bir tasarım kullan.\n2. Projeler: Okul ve şahsi projelerini detaylandır.\n3. GitHub & LinkedIn linklerini eklemeyi unutma!";
      } else if (lower.includes('github') || lower.includes('proje')) {
        botReply = "🚀 GitHub Portfolyo Tavsiyeleri:\n• Temiz bir README.md yaz.\n• 10 basit proje yerine veritabanı ve API entegrasyonu olan 2-3 tam proje koy.";
      }
      setAiChatMessages(prev => [...prev, { sender: 'ai', text: botReply }]);
    }, 600);
  };

  const handlePeerSend = () => {
    if (!peerChatInput.trim()) return;
    setPeerMessages(prev => [...prev, { sender: 'me', text: peerChatInput }]);
    setPeerChatInput('');
  };

  const handleOpenSendReqModal = (mentor) => {
    setSendReqNoteModalMentor(mentor);
    setSendReqNoteText('');
    setSelectedMentorDetailsModal(null);
  };

  const handleConfirmSendRequest = () => {
    if (!sendReqNoteModalMentor) return;

    const newReq = {
      mentorId: sendReqNoteModalMentor.id,
      name: sendReqNoteModalMentor.name,
      title: `${sendReqNoteModalMentor.company} • ${sendReqNoteModalMentor.title}`,
      note: sendReqNoteText,
      hasCv: !!profCvName
    };

    setOutgoingRequests(prev => [...prev, newReq]);
    alert(`✅ ${sendReqNoteModalMentor.name} kişisine mentörlük isteğin ve özel notun başarıyla iletildi!`);
    setSendReqNoteModalMentor(null);
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

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert("Profil bilgileriniz başarıyla güncellendi! ✅");
    setIsEditProfileOpen(false);
  };

  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfCvName(file.name);
      localStorage.setItem('kullaniciCVName', file.name);
      alert(`✅ "${file.name}" dosyanız profilinize eklendi.`);
    }
  };

  const filteredCompanies = revactaSirketlerData.filter(c => companyCategory === 'hepsi' || c.kategori === companyCategory);
  const filteredMentors = initialSectorMentors.filter(m => selectedMentorDept === 'hepsi' || m.field.toLowerCase().includes(selectedMentorDept));

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

        {/* TAB 2: OKULUNUZDAN */}
        {activeTab === 'school' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '24px', color: '#fff' }}>
                  <i className="fa-solid fa-graduation-cap" style={{ color: '#06b6d4', marginRight: '8px' }}></i>
                  <span>{profSchool}</span> Ağı & Toplulukları 🎓
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>Okulunuzdaki diğer öğrencilerle doğrudan sohbet edin, duyuruları takip edin.</p>
              </div>
            </div>

            <div className="showcase-tabs" style={{ justifyContent: 'flex-start', marginBottom: '25px' }}>
              <button className={`tab-btn ${schoolSubtab === 'peers' ? 'active' : ''}`} onClick={() => setSchoolSubtab('peers')}>👥 Öğrenci Arkadaşların</button>
              <button className={`tab-btn ${schoolSubtab === 'announcements' ? 'active' : ''}`} onClick={() => setSchoolSubtab('announcements')}>📢 Duyurular & Etkinlikler</button>
              <button className={`tab-btn ${schoolSubtab === 'clubs' ? 'active' : ''}`} onClick={() => setSchoolSubtab('clubs')}>🏛️ Kulüpler & Topluluklar</button>
              <button className={`tab-btn ${schoolSubtab === 'chat' ? 'active' : ''}`} onClick={() => setSchoolSubtab('chat')}>💬 Okul Ağınız (Sohbet)</button>
            </div>

            {schoolSubtab === 'peers' && (
              <div className="dashboard-grid">
                {initialSchoolPeers.map(peer => (
                  <div key={peer.id} className="premium-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#06b6d4', color: '#0f172a', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{peer.name.split(' ').map(n=>n[0]).join('')}</div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '17px' }}>{peer.name}</h3>
                        <span style={{ color: '#06b6d4', fontSize: '13px' }}>{peer.dept} ({peer.classYear})</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '10px' }}>{peer.bio}</p>
                    <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '15px' }}>Yetkinlikler: {peer.skills}</span>
                    <button onClick={() => { setSchoolSubtab('chat'); setChatActivePeer(peer.name); }} className="submit-btn" style={{ marginTop: 0, padding: '8px 16px', fontSize: '13px' }}>Sohbet Başlat 💬</button>
                  </div>
                ))}
              </div>
            )}

            {schoolSubtab === 'announcements' && (
              <div className="premium-card">
                <h3 style={{ color: '#06b6d4', marginBottom: '15px' }}><i className="fa-solid fa-bullhorn"></i> Kampüs Duyuruları & Etkinlikler</h3>
                <div style={{ background: 'rgba(15,23,42,0.6)', borderLeft: '4px solid #06b6d4', padding: '16px', borderRadius: '12px', marginBottom: '15px' }}>
                  <strong style={{ color: '#fff', fontSize: '15px' }}>🏆 Mühendislik Hackathon & Proje Yarışması Başladı!</strong>
                  <p style={{ color: '#cbd5e1', fontSize: '13.5px', marginTop: '6px' }}>Kampüs mühendislik kulüpleri ortaklığında düzenlenen hackathon için takımlar kuruluyor.</p>
                </div>
              </div>
            )}

            {schoolSubtab === 'clubs' && (
              <div className="dashboard-grid">
                <div className="premium-card">
                  <h3>IEEE Öğrenci Kulübü</h3>
                  <span style={{ color: '#06b6d4', fontSize: '13px', display: 'block', marginBottom: '10px' }}>Yazılım, Siber Güvenlik & Otonom Komitesi</span>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '15px' }}>Haftalık kodlama atölyeleri ve sektör söyleşileri düzenliyor.</p>
                  <button onClick={() => alert("Kulüp WhatsApp grubuna katılım bağlantısı iletildi!")} className="submit-btn" style={{ marginTop: 0, padding: '8px 16px' }}>Kulübe Katıl 🤝</button>
                </div>
              </div>
            )}

            {schoolSubtab === 'chat' && (
              <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: '500px', background: '#0f172a', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '20px', overflow: 'hidden' }}>
                <div style={{ borderRight: '1px solid rgba(255,255,255,0.08)', padding: '15px', background: 'rgba(30,41,59,0.4)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{ color: '#06b6d4', fontSize: '14px', margin: '0 0 10px 0' }}><i className="fa-solid fa-comments"></i> Okul Arkadaşların</h4>
                  {initialSchoolPeers.map(p => (
                    <div key={p.id} onClick={() => setChatActivePeer(p.name)} style={{ padding: '12px', background: chatActivePeer === p.name ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.03)', borderRadius: '10px', cursor: 'pointer', borderLeft: chatActivePeer === p.name ? '3px solid #06b6d4' : 'none' }}>
                      <strong style={{ color: '#fff', fontSize: '14px', display: 'block' }}>{p.name}</strong>
                      <span style={{ color: '#94a3b8', fontSize: '12px' }}>{p.dept}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
                  {!chatActivePeer ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyCenter: 'center', height: '100%', textAlignment: 'center', color: '#94a3b8', margin: 'auto' }}>
                      <i className="fa-solid fa-comments" style={{ fontSize: '48px', color: '#06b6d4', marginBottom: '15px', opacity: 0.6 }}></i>
                      <h3>Sohbet Başlatmak İçin Bir Arkadaşını Seç</h3>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '15px' }}>{chatActivePeer}</h3>
                      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '15px' }}>
                        {peerMessages.map((m, idx) => (
                          <div key={idx} style={{ alignSelf: m.sender === 'me' ? 'flex-end' : 'flex-start', background: m.sender === 'me' ? '#06b6d4' : 'rgba(30,41,59,0.8)', color: m.sender === 'me' ? '#0f172a' : '#fff', padding: '10px 16px', borderRadius: '12px', fontSize: '14px', maxWidth: '75%' }}>
                            {m.text}
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" value={peerChatInput} onChange={(e) => setPeerChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handlePeerSend()} placeholder="Mesajını yaz..." style={{ flex: 1, padding: '12px 16px', background: '#0f172a', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '12px', color: '#fff', outline: 'none' }} />
                        <button onClick={handlePeerSend} className="submit-btn" style={{ marginTop: 0, padding: '12px 20px' }}>Gönder 🚀</button>
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
              <select value={selectedMentorDept} onChange={(e) => setSelectedMentorDept(e.target.value)} style={{ padding: '10px 16px', background: '#0f172a', border: '1px solid #06b6d4', borderRadius: '12px', color: '#fff', outline: 'none', cursor: 'pointer' }}>
                <option value="hepsi">🌐 Tüm Mühendislik Branşları</option>
                <option value="bilgisayar">💻 Bilgisayar & Yazılım Müh.</option>
                <option value="elektrik">⚡ Elektrik-Elektronik Müh.</option>
                <option value="endustri">📊 Endüstri & Veri Müh.</option>
              </select>
            </div>

            <div className="showcase-tabs" style={{ justifyContent: 'flex-start', marginBottom: '25px' }}>
              <button className={`tab-btn ${mentorSubtab === 'all' ? 'active' : ''}`} onClick={() => setMentorSubtab('all')}>👥 Tüm Mentörler</button>
              <button className={`tab-btn ${mentorSubtab === 'requests' ? 'active' : ''}`} onClick={() => setMentorSubtab('requests')}>📩 Gönderilen İstekler ({outgoingRequests.length})</button>
            </div>

            {mentorSubtab === 'all' && (
              <div className="dashboard-grid">
                {filteredMentors.map(m => (
                  <div key={m.id} className="premium-card" style={{ textAlign: 'center' }}>
                    <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', color: '#fff', fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>{m.avatar}</div>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>{m.isim}</h3>
                    <span style={{ color: '#06b6d4', fontSize: '13px', display: 'block', margin: '3px 0' }}>{m.company} • {m.title}</span>
                    <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '12px' }}>{m.exp}</span>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => setSelectedMentorDetailsModal(m)} className="subnav-btn" style={{ padding: '8px 14px', fontSize: '12px' }}>İncele 👁️</button>
                      <button onClick={() => handleOpenSendReqModal(m)} className="submit-btn" style={{ marginTop: 0, padding: '8px 14px', fontSize: '12px' }}>İstek Gönder 🚀</button>
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

        {/* TAB 4: REVAÇTA ŞİRKETLER */}
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
              <select value={companyCategory} onChange={(e) => setCompanyCategory(e.target.value)} style={{ padding: '10px 16px', background: '#0f172a', border: '1px solid #06b6d4', borderRadius: '12px', color: '#fff', outline: 'none', cursor: 'pointer' }}>
                <option value="hepsi">🌐 Tüm Sektörler</option>
                <option value="teknoloji">💻 Teknoloji & E-Ticaret</option>
                <option value="global">🌐 Global Teknoloji Devleri</option>
                <option value="savunma">🛡️ Savunma Sanayii & Otonom</option>
              </select>
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

        {/* TAB 5: STAJ & PROJE İLANLARI */}
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

        {/* TAB 6: ADAY İSTEKLERİ & MENTEELER */}
        {activeTab === 'mentor-candidates' && (
          <div>
            <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '10px' }}>
              <i className="fa-solid fa-user-graduate" style={{ color: '#a855f7', marginRight: '8px' }}></i>
              Aday İstekleri & Rehberlik (Menteelerim) 🎓
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Mühendislik hedefleyen lise öğrencilerine üniversite deneyimlerinizi aktarın.</p>
            <div className="dashboard-grid">
              <div className="premium-card">
                <h3>Ayşe Demir</h3>
                <span className="user-badge" style={{ color: '#a855f7' }}>YKS Adayı • 12. Sınıf</span>
                <p style={{ marginTop: '10px', fontSize: '14px', color: '#cbd5e1' }}>"Boğaziçi Bilgisayar ders yükü ve hazırlık muafiyeti hakkında soru sormak istiyorum."</p>
                <button onClick={() => alert("Mentörlük talebini kabul ettiniz! 🤝")} className="submit-btn" style={{ marginTop: '15px', padding: '10px' }}>Talebi Kabul Et & Rehber Ol ✅</button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: BÖLÜM ROTALARI & KEŞİF */}
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

        {/* TAB 8: AI DANIŞMANI */}
        {activeTab === 'ai' && (
          <div className="premium-card" style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div className="card-icon" style={{ margin: 0 }}><i className="fa-solid fa-robot"></i></div>
              <div>
                <h3 style={{ margin: 0 }}>AI Öğrenci & Kariyer Danışmanı 🤖</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Staj mülakatı, CV ve ders rehberi</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <button className="subnav-btn" onClick={() => handleAiSend('Staj için etkili bir mühendislik CV\'si nasıl hazırlanır?')}>📄 Mühendislik CV İpuçları</button>
              <button className="subnav-btn" onClick={() => handleAiSend('GitHub portfolyomda hangi projeler olmalı?')}>🚀 GitHub & Portfolyo Projeleri</button>
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

        {/* TAB 9: PROFİLİM */}
        {activeTab === 'profile' && (
          <div className="premium-card" style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', fontSize: '36px', fontWeight: 'bold' }}>
              🎓
            </div>
            <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '4px' }}>{profName}</h3>
            <span className="user-badge" style={{ display: 'inline-block', marginBottom: '22px' }}>🎓 Mühendislik Öğrencisi & Mentör</span>

            {/* Kişisel & Akademik Bilgiler */}
            <div style={{ textAlign: 'left', background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(6, 182, 212, 0.15)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ color: '#06b6d4', fontSize: '13px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>👤 Akademik Bilgileriniz</h4>
                <button onClick={() => setIsEditProfileOpen(true)} className="subnav-btn" style={{ padding: '4px 12px', fontSize: '12px' }}>✏️ Düzenle</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', color: '#64748b', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '2px' }}>Ad Soyad</label>
                  <p style={{ color: '#f1f5f9', fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{profName}</p>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#64748b', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '2px' }}>E-Posta</label>
                  <p style={{ color: '#38bdf8', fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{profEmail}</p>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#64748b', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '2px' }}>Üniversite</label>
                  <p style={{ color: '#f1f5f9', fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{profSchool}</p>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#64748b', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '2px' }}>Bölüm & Sınıf</label>
                  <p style={{ color: '#06b6d4', fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{profDept} ({profGrade})</p>
                </div>
              </div>
            </div>

            {/* Özgeçmiş CV Yükleme Alanı */}
            <div style={{ textAlign: 'left', background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(6, 182, 212, 0.15)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ color: '#06b6d4', fontSize: '13px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>📄 Özgeçmiş / CV Dosyanız</h4>
                <span className="user-badge" style={{ fontSize: '11px' }}>{profCvName ? '✅ Yüklü' : 'Yüklenmedi'}</span>
              </div>
              {profCvName ? (
                <p style={{ color: '#10b981', fontSize: '13.5px' }}>Dosya: <strong>{profCvName}</strong></p>
              ) : (
                <p style={{ color: '#94a3b8', fontSize: '13px' }}>Mentörlük isteklerinde kullanılmak üzere PDF CV ekleyebilirsiniz.</p>
              )}
              <label className="subnav-btn" style={{ display: 'inline-block', marginTop: '10px', cursor: 'pointer' }}>
                {profCvName ? 'CV Dosyasını Değiştir' : 'PDF CV Yükle'}
                <input type="file" accept=".pdf" onChange={handleCvUpload} style={{ display: 'none' }} />
              </label>
            </div>

            {/* İnteraktif İstatistikler */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' }}>
              <div onClick={() => setIsMenteesModalOpen(true)} style={{ background: 'rgba(168,85,247,0.1)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(168,85,247,0.3)', cursor: 'pointer' }}>
                <span style={{ color: '#c084fc', fontSize: '11px', display: 'block', marginBottom: '4px' }}>🎓 Rehberlik Edilen Aday</span>
                <strong style={{ color: '#fff', fontSize: '15px' }}>2 Aday Mentee &rarr;</strong>
              </div>
              <div onClick={() => setIsReviewsModalOpen(true)} style={{ background: 'rgba(245,158,11,0.1)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.3)', cursor: 'pointer' }}>
                <span style={{ color: '#f59e0b', fontSize: '11px', display: 'block', marginBottom: '4px' }}>⭐ Adaylardan Aldığım Puan</span>
                <strong style={{ color: '#f59e0b', fontSize: '15px' }}>4.9 / 5.0 (6 Yorum) &rarr;</strong>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: SEKTÖR MENTÖRÜ DETAY (sectorMentorDetailsModal) */}
      {selectedMentorDetailsModal && (
        <div className="modal-overlay active" onClick={() => setSelectedMentorDetailsModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px', textAlign: 'center' }}>
            <span className="close-modal" onClick={() => setSelectedMentorDetailsModal(null)}>&times;</span>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', color: '#fff', fontSize: '28px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}>{selectedMentorDetailsModal.avatar}</div>
            <h3 style={{ fontSize: '22px', color: '#fff', margin: 0 }}>{selectedMentorDetailsModal.name}</h3>
            <span style={{ color: '#06b6d4', fontSize: '14px', display: 'block', margin: '4px 0 16px 0' }}>{selectedMentorDetailsModal.company} • {selectedMentorDetailsModal.title}</span>

            {/* Metrikler */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(15,23,42,0.6)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(6,182,212,0.15)' }}>
                <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Kabul Oranı</span>
                <strong style={{ color: '#10b981', fontSize: '14px' }}>{selectedMentorDetailsModal.acceptanceRate}</strong>
              </div>
              <div style={{ background: 'rgba(15,23,42,0.6)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(6,182,212,0.15)' }}>
                <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Yanıt Süresi</span>
                <strong style={{ color: '#06b6d4', fontSize: '14px' }}>{selectedMentorDetailsModal.responseTime}</strong>
              </div>
              <div style={{ background: 'rgba(15,23,42,0.6)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(6,182,212,0.15)' }}>
                <span style={{ color: '#64748b', fontSize: '10px', display: 'block' }}>Mentee Sayısı</span>
                <strong style={{ color: '#f59e0b', fontSize: '14px' }}>{selectedMentorDetailsModal.totalMentees}</strong>
              </div>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', textAlign: 'left', background: 'rgba(15,23,42,0.6)', padding: '15px', borderRadius: '12px' }}>"{selectedMentorDetailsModal.bio}"</p>

            <button onClick={() => handleOpenSendReqModal(selectedMentorDetailsModal)} className="submit-btn" style={{ width: '100%', marginTop: 0 }}>📩 Mentörlük İsteği Gönder 🚀</button>
          </div>
        </div>
      )}

      {/* MODAL: MENTÖRE ÖZEL NOT İLE İSTEK GÖNDERME (sendRequestNoteModal) */}
      {sendReqNoteModalMentor && (
        <div className="modal-overlay active" onClick={() => setSendReqNoteModalMentor(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', textAlign: 'left' }}>
            <span className="close-modal" onClick={() => setSendReqNoteModalMentor(null)}>&times;</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg,#06b6d4,#3b82f6)', color: '#fff', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {sendReqNoteModalMentor.avatar || '👔'}
              </div>
              <div>
                <h3 style={{ color: '#fff', fontSize: '18px', margin: '0 0 2px 0' }}>{sendReqNoteModalMentor.name}</h3>
                <span style={{ color: '#06b6d4', fontSize: '12px', fontWeight: 'bold' }}>{sendReqNoteModalMentor.company} • {sendReqNoteModalMentor.title}</span>
              </div>
            </div>

            <label style={{ color: '#cbd5e1', fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
              ✍️ Mentöre Özel Notunuz (Opsiyonel - Max 500 Karakter):
            </label>
            <textarea maxLength={500} value={sendReqNoteText} onChange={(e) => setSendReqNoteText(e.target.value)} placeholder="Örn: Merhaba! Kariyer yolculuğunuzu okudum ve çok ilham aldım. Staj ve mülakat sürecinde tavsiyelerinizi almak isterim..." style={{ width: '100%', height: '110px', background: '#0f172a', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '12px', color: '#fff', padding: '12px', fontSize: '13px', outline: 'none', resize: 'none', marginBottom: '10px' }} />

            <div style={{ background: 'rgba(15,23,42,0.6)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(6,182,212,0.2)', marginBottom: '16px' }}>
              <span style={{ color: '#cbd5e1', fontSize: '12px' }}>📄 CV Dosya Eki: <strong>{profCvName ? profCvName : 'CV Yüklenmedi (Opsiyonel)'}</strong></span>
            </div>

            <button onClick={handleConfirmSendRequest} className="submit-btn" style={{ width: '100%', marginTop: 0 }}>🚀 İstek & Özel Notu Gönder</button>
          </div>
        </div>
      )}

      {/* MODAL: ŞİRKET MENTÖRLERİ */}
      {selectedCompanyModal && (
        <div className="modal-overlay active" onClick={() => setSelectedCompanyModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <span className="close-modal" onClick={() => setSelectedCompanyModal(null)}>&times;</span>
            <h2 style={{ textAlign: 'left', color: '#06b6d4', marginBottom: '5px' }}>{selectedCompanyModal.ad} Mentörleri</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>{selectedCompanyModal.unvan}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedCompanyModal.mentörler.map((m, idx) => (
                <div key={idx} style={{ background: '#0f172a', padding: '14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#fff', display: 'block' }}>{m.isim}</strong>
                    <span style={{ color: '#06b6d4', fontSize: '12px' }}>{m.unvan}</span>
                  </div>
                  <button onClick={() => { handleOpenSendReqModal({ id: 'comp_m_' + idx, name: m.isim, company: selectedCompanyModal.ad, title: m.unvan, avatar: m.avatar }); setSelectedCompanyModal(null); }} className="submit-btn" style={{ marginTop: 0, padding: '6px 12px', fontSize: '12px' }}>İstek Gönder 🚀</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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

      {/* MODAL: PROFİL DÜZENLEME */}
      {isEditProfileOpen && (
        <div className="modal-overlay active" onClick={() => setIsEditProfileOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <span className="close-modal" onClick={() => setIsEditProfileOpen(false)}>&times;</span>
            <h2 style={{ textAlign: 'left', color: '#06b6d4', marginBottom: '20px' }}>Akademik Profil Düzenle ✏️</h2>
            <form onSubmit={handleSaveProfile}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>Ad Soyad</label>
                <input type="text" value={profName} onChange={(e) => setProfName(e.target.value)} required style={{ width: '100%', padding: '10px 14px', background: '#0f172a', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '10px', color: '#fff', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>Üniversite</label>
                <input type="text" value={profSchool} onChange={(e) => setProfSchool(e.target.value)} required style={{ width: '100%', padding: '10px 14px', background: '#0f172a', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '10px', color: '#fff', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>Bölüm</label>
                <input type="text" value={profDept} onChange={(e) => setProfDept(e.target.value)} required style={{ width: '100%', padding: '10px 14px', background: '#0f172a', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '10px', color: '#fff', outline: 'none' }} />
              </div>
              <button type="submit" className="submit-btn" style={{ width: '100%', marginTop: 0 }}>Değişiklikleri Kaydet ✅</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MENTEELERİM LİSTESİ */}
      {isMenteesModalOpen && (
        <div className="modal-overlay active" onClick={() => setIsMenteesModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <span className="close-modal" onClick={() => setIsMenteesModalOpen(false)}>&times;</span>
            <h2 style={{ textAlign: 'left', color: '#a855f7', marginBottom: '15px' }}>🎓 Menteelerim (Aday Öğrenciler)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#0f172a', padding: '12px', borderRadius: '10px' }}>
                <strong style={{ color: '#fff', display: 'block' }}>Ayşe Demir</strong>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>Kadıköy Anadolu Lisesi • YKS 2026</span>
              </div>
              <div style={{ background: '#0f172a', padding: '12px', borderRadius: '10px' }}>
                <strong style={{ color: '#fff', display: 'block' }}>Can Yılmaz</strong>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>Atatürk Fen Lisesi • YKS 2026</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ANONİM YORUMLAR */}
      {isReviewsModalOpen && (
        <div className="modal-overlay active" onClick={() => setIsReviewsModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <span className="close-modal" onClick={() => setIsReviewsModalOpen(false)}>&times;</span>
            <h2 style={{ textAlign: 'left', color: '#f59e0b', marginBottom: '15px' }}>⭐ Adaylardan Aldığınız Yorumlar</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#0f172a', padding: '12px', borderRadius: '10px' }}>
                <strong style={{ color: '#f59e0b', fontSize: '13px' }}>⭐ 5.0 — "Çok yardımcı oldu!"</strong>
                <p style={{ color: '#cbd5e1', fontSize: '13px', margin: '4px 0 0 0' }}>Boğaziçi Bilgisayar tercih dönemimde aklımdaki tüm soruları giderdi.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
