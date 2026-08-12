import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// 🎓 100% BİREBİR SEKTÖR MENTÖRLERİ VERİ SETİ
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
    deptLabel: '💻 Bilgisayar & Yazılım',
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
    deptLabel: '💻 Bulut & DevOps',
    activeMentees: 11,
    totalMentees: 29,
    acceptanceRate: '%94',
    responseTime: '~ 1 Saat',
    rating: '4.9 ⭐ (27 Değerlendirme)',
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Microservices'],
    bio: 'Küresel ölçekli bulut altyapıları, sunucusuz (serverless) mimariler ve CI/CD süreçlerini yönetiyorum. Mühendislik öğrencilerine Cloud ve DevOps kariyer haritası çizmeleri için mentörlük veriyorum.'
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
    deptLabel: '⚡ Elektrik-Elektronik',
    activeMentees: 16,
    totalMentees: 45,
    acceptanceRate: '%96',
    responseTime: '< 30 Dk',
    rating: '5.0 ⭐ (41 Değerlendirme)',
    skills: ['C/C++', 'RTOS', 'ARM Architecture', 'DSP', 'FPGA'],
    bio: 'ASELSAN bünyesinde kritik otonom haberleşme ve radar sinyal işleme projelerini yürütüyorum. Elektrik-Elektronik ve Haberleşme mühendisliği öğrencilerine savunma sanayi aday mühendislik hazırlığında yol gösteriyorum.'
  },
  {
    id: 'm4',
    name: 'Elif Şahin',
    company: 'Baykar Teknoloji',
    title: 'Otonom İHA Yapay Zeka Lideri',
    exp: '8 Yıl Deneyim',
    avatar: 'EŞ',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElifSahin',
    field: 'İHA Otonomi & Derin Öğrenme',
    dept: 'bilgisayar',
    deptLabel: '💻 Yapay Zeka & İHA',
    activeMentees: 18,
    totalMentees: 50,
    acceptanceRate: '%99',
    responseTime: '< 10 Dk',
    rating: '5.0 ⭐ (46 Değerlendirme)',
    skills: ['Python', 'PyTorch', 'ROS2', 'Computer Vision', 'CUDA'],
    bio: 'Milli İHA ve SİHA platformlarında otonom uçuş algoritmaları ve görüntü işleme yapay zeka modelleri geliştiriyorum. Havacılık ve Yazılım tutkunu öğrencilere teknik mülakat hazırlığı sunuyorum.'
  },
  {
    id: 'm5',
    name: 'Canan Dağdeviren',
    company: 'Google EMEA',
    title: 'Staff AI Research Scientist',
    exp: '10 Yıl Deneyim',
    avatar: 'CD',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CananDagdeviren',
    field: 'Büyük Dil Modelleri & NLP',
    dept: 'bilgisayar',
    deptLabel: '🌐 Global AI & NLP',
    activeMentees: 9,
    totalMentees: 31,
    acceptanceRate: '%92',
    responseTime: '~ 2 Saat',
    rating: '4.9 ⭐ (25 Değerlendirme)',
    skills: ['LLM', 'Transformers', 'NLP', 'TensorFlow', 'Research'],
    bio: 'Google Dublin merkezinde generative AI ve Türkçe dil modelleri üzerine araştırma ve ürün geliştirme liderliği yapıyorum. Yurt dışı yüksek lisans ve global staj hayali olan gençlere mentörlük yapıyorum.'
  },
  {
    id: 'm6',
    name: 'Volkan Kılıç',
    company: 'TOGG / Mercedes-Benz',
    title: 'Otomotiv Mekatronik & Batarya Lideri',
    exp: '9 Yıl Deneyim',
    avatar: 'VK',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VolkanKilic',
    field: 'Elektrikli Araçlar & BMS',
    dept: 'makine',
    deptLabel: '🏎️ Makine & Otomotiv',
    activeMentees: 10,
    totalMentees: 28,
    acceptanceRate: '%95',
    responseTime: '~ 45 Dk',
    rating: '4.8 ⭐ (22 Değerlendirme)',
    skills: ['BMS', 'SolidWorks', 'ANSYS', 'Elektrikli Araçlar', 'Mekatronik'],
    bio: 'Yerli otomobil TOGG ve Mercedes ekosisteminde batarya yönetim sistemleri (BMS) ve araç mekaniği tasarlıyorum. Makine ve Otomotiv mühendisliği öğrencilerine sektördeki dönüşümü aktarıyorum.'
  }
];

// 🏫 100% BİREBİR OKUL ARKADAŞLARI VERİ SETİ
const schoolPeersList = [
  { name: "Selin Yılmaz", dept: "Bilgisayar Müh.", classYear: "3. Sınıf", skills: "React, Node.js", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Selin" },
  { name: "Caner Demir", dept: "Makine Müh.", classYear: "4. Sınıf", skills: "SolidWorks, Ansys", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Caner" },
  { name: "Merve Öztürk", dept: "Elektrik-Elektronik Müh.", classYear: "2. Sınıf", skills: "PCB, C++", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Merve" },
  { name: "Barış Arslan", dept: "Havacılık Müh.", classYear: "3. Sınıf", skills: "Aerodinamik, ROS2", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Baris" },
  { name: "Ege Kaya", dept: "Endüstri Müh.", classYear: "4. Sınıf", skills: "Python, SQL, BI", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=EgeKaya" }
];

// 🏛️ KULÜPLER VERİ SETİ
const clubsList = [
  { name: "IEEE Öğrenci Kolu", members: "450+ Üye", field: "Yazılım, Robotik & Elektrik", desc: "Teknik atölyeler, robot yarışmaları ve sektör gezileri düzenleyen en aktif öğrenci topluluğu.", joined: true },
  { name: "Formula Student Takımı", members: "85 Üye", field: "Otomotiv, Makine & Gömülü", desc: "Elektrikli ve benzinli yarış aracı tasarlayıp Avrupa yarışlarında üniversitemizi temsil ediyoruz.", joined: false },
  { name: "Yazılım & Yapay Zeka Topluluğu", members: "320 Üye", field: "Yazılım, AI & Siber Güvenlik", desc: "Açık kaynak projeler, algoritma kulübü ve veri bilimi çalışma grupları.", joined: false }
];

// 📥 ADAY İSTEKLERİ VERİ SETİ (BEKLEYEN LİSE MENTEELERİ)
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
  {
    id: "job_1", title: "Teknofest Otonom İHA Takımı Yazılımcısı", type: "Proje Arkadaşı", domain: "Havacılık ve Uzay", skills: "Python, ROS2, OpenCV", desc: "Sürü İHA algoritmaları üzerine çalışacak bilgisayar/yazılım öğrencisi arıyoruz.", author: "Ahmet K. (İTÜ 3. Sınıf) • Senin İlanın", isUserCreated: true, company: "İTÜ Takımı", contact: "ahmet@itu.edu.tr", date: "Bugün", viewsCount: 48
  },
  { id: "job_2", title: "Trendyol Talent Tech - Frontend & Cloud Stajyeri", type: "Staj / Aday", domain: "Yazılım / Bilgisayar", skills: "React, Node.js, Cloud, Docker", desc: "Trendyol Maslak kampüsünde yüksek ölçekli e-ticaret mikroservislerinde deneyim kazanacak yazılım stajyerleri arıyoruz.", author: "Trendyol HR & Tech Team", company: "Trendyol", contact: "tech-talent@trendyol.com", date: "Bugün", viewsCount: 142 },
  { id: "job_3", title: "Google STEP 2026 Software Engineering Intern", type: "Staj / Aday", domain: "Yazılım / Bilgisayar", skills: "C++, Python, Java, Data Structures", desc: "Google mühendislik ekibiyle birlikte küresel altyapı ve yapay zeka projelerinde 12 haftalık ücretli yaz stajı.", author: "Google University Recruiting", company: "Google", contact: "step-recruiting@google.com", date: "Bugün", viewsCount: 230 },
  { id: "job_4", title: "ASELSAN a-Yetenek Gömülü Sistemler Stajyer Mühendis", type: "Staj / Aday", domain: "Elektrik-Elektronik", skills: "C/C++, STM32, ARM, RTOS", desc: "ASELSAN Macunköy tesislerinde radar ve elektronik harp projelerinde uzun dönem aday mühendislik stajı.", author: "ASELSAN İnsan Kaynakları", company: "ASELSAN", contact: "a-yetenek@aselsan.com.tr", date: "Dün", viewsCount: 185 }
];

// 🏢 REVAÇTA ŞİRKETLER VERİ SETİ
const revactaSirketlerData = [
  { id: 1, ad: "Aselsan", kategori: "savunma", logo: "🛡️", unvan: "Savunma Sanayii & Otonom Sistemler", konum: "Ankara / Türkiye", mentörSayisi: 12, ilanSayisi: 4, tanim: "Türkiye'nin lider savunma elektroniği ve otonom sistemler kuruluşu.", mentörler: [{ isim: "Murat Demir", unvan: "Kıdemli Gömülü Yazılım Mimarı", avatar: "MD" }, { isim: "Selin Kaya", unvan: "Sistem Tasarım Mühendisi", avatar: "SK" }] },
  { id: 2, ad: "Trendyol Tech", kategori: "teknoloji", logo: "🛍️", unvan: "E-Ticaret & Yüksek Ölçekli Yazılım", konum: "İstanbul / Remote", mentörSayisi: 18, ilanSayisi: 6, tanim: "Günde milyonlarca istek alan mikro-servis mimarisi ve veri analitiği merkezi.", mentörler: [{ isim: "Hande Erçel", unvan: "Lead Frontend Engineer", avatar: "HE" }, { isim: "Emre Arslan", unvan: "Backend Team Lead", avatar: "EA" }] },
  { id: 3, ad: "Baykar Teknoloji", kategori: "savunma", logo: "✈️", unvan: "İnsansız Hava Araçları & Yapay Zeka", konum: "İstanbul / Türkiye", mentörSayisi: 15, ilanSayisi: 5, tanim: "Milli İHA/SİHA teknolojileri, otonom yazılımlar ve havacılık Ar-Ge merkezi.", mentörler: [{ isim: "Selim Çetin", unvan: "Otonom Uçuş Yazılım Lideri", avatar: "SÇ" }] },
  { id: 4, ad: "Google Turkey / EMEA", kategori: "global", logo: "🌐", unvan: "Global Arama & Bulut Teknolojileri", konum: "İstanbul / Dublin / Remote", mentörSayisi: 8, ilanSayisi: 2, tanim: "Dünya çapında dağıtık sistemler ve yapay zeka altyapıları.", mentörler: [{ isim: "Canan Dağdeviren", unvan: "Senior Staff Software Engineer", avatar: "CD" }] }
];

export default function DashboardOgrenci() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Ana Menü ve Alt Açılır Menü State'leri
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

  // Mentör İçi Dinamik State'ler
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [pendingCandidates, setPendingCandidates] = useState(initialPendingCandidateRequests);
  const [acceptedCandidates, setAcceptedCandidates] = useState([]);

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

  // Profil Verileri
  const [profName, setProfName] = useState(user?.kullaniciAdi || 'Öğrenci Kullanıcımız');
  const [profEmail, setProfEmail] = useState('ogrenci@universite.edu.tr');
  const [profSchool, setProfSchool] = useState(user?.okul || 'Boğaziçi Üniversitesi');
  const [profDept, setProfDept] = useState(user?.bolum || 'Bilgisayar Mühendisliği');
  const [profGrade, setProfGrade] = useState('3. Sınıf');
  const [profCvName, setProfCvName] = useState(localStorage.getItem('kullaniciCVName') || null);

  // Form State (İlan Oluşturma)
  const [jobTitle, setJobTitle] = useState('');
  const [jobSkills, setJobSkills] = useState('');
  const [jobContact, setJobContact] = useState('');

  // AI Chat State
  const [aiChatMessages, setAiChatMessages] = useState([
    { sender: 'ai', text: 'Merhaba! Ben mühendislik öğrencilerine özel tasarlanmış AI Kariyer ve Ders Danışmanıyım. 🚀 Staj başvuruları, CV hazırlama, GitHub projeleri veya ders notları hakkında sorabilirsin!' }
  ]);
  const [aiInputText, setAiInputText] = useState('');

  // Live WhatsApp Chat State
  const [chatActivePeer, setChatActivePeer] = useState(null);
  const [peerMessages, setPeerMessages] = useState([
    { sender: 'them', text: 'Merhaba! Bölümünüz ve ders yoğunluğu hakkında konuşabilir miyiz?' }
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
        botReply = "📄 **Mühendislik Staj CV İpuçları:**\n1. Format: Tek sayfa, temiz ve sade bir LaTeX / PDF tasarım kullan.\n2. Projeler: Okul ve şahsi projelerini detaylandır.\n3. GitHub & LinkedIn profil bağlantılarını en üste ekle!";
      } else if (lower.includes('github') || lower.includes('proje')) {
        botReply = "🚀 **GitHub Portfolyo Tavsiyeleri:**\n• Her projenin ne iş yaptığını anlatan temiz bir README.md yaz.\n• 10 basit proje yerine veritabanı ve API entegrasyonu olan 2-3 tam proje yayınla.";
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

  const handleAcceptCandidate = (candidate) => {
    setPendingCandidates(prev => prev.filter(c => c.id !== candidate.id));
    setAcceptedCandidates(prev => [...prev, candidate]);
    alert(`✅ ${candidate.name} isimli aday öğrenci mentiniz olarak kabul edildi! Sohbet sekmesinden iletişim kurabilirsiniz.`);
  };

  const handleCreateJobSubmit = (e) => {
    e.preventDefault();
    alert(`🚀 "${jobTitle}" başlıklı ilanınız başarıyla oluşturuldu! Proje takımı arayan öğrenciler size ulaşacaktır.`);
    setIsCreateJobOpen(false);
    setJobTitle('');
    setJobSkills('');
    setJobContact('');
  };

  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfCvName(file.name);
      localStorage.setItem('kullaniciCVName', file.name);
      alert(`✅ "${file.name}" CV dosyanız yüklendi.`);
    }
  };

  const filteredCompanies = revactaSirketlerData.filter(c => companyCategory === 'hepsi' || c.kategori === companyCategory);
  const filteredMentors = sectorMentorsList.filter(m => selectedMentorDept === 'hepsi' || m.dept === selectedMentorDept);

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
                {schoolPeersList.map((peer, i) => (
                  <div key={i} className="premium-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <img src={peer.img} alt={peer.name} style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#0f172a', border: '2px solid #06b6d4' }} />
                      <div>
                        <h3 style={{ margin: 0, fontSize: '17px' }}>{peer.name}</h3>
                        <span style={{ color: '#06b6d4', fontSize: '13px' }}>{peer.dept} ({peer.classYear})</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '13px', color: '#cbd5e1', display: 'block', marginBottom: '15px' }}>Yetkinlikler: <strong>{peer.skills}</strong></span>
                    <button onClick={() => { setSchoolSubtab('chat'); setChatActivePeer(peer.name); }} className="submit-btn" style={{ marginTop: 0, padding: '8px 16px', fontSize: '13px' }}>Sohbet Başlat 💬</button>
                  </div>
                ))}
              </div>
            )}

            {schoolSubtab === 'announcements' && (
              <div className="premium-card">
                <h3 style={{ color: '#06b6d4', marginBottom: '15px' }}><i className="fa-solid fa-bullhorn"></i> Kampüs Duyuruları & Etkinlikler</h3>
                <div style={{ background: 'rgba(15,23,42,0.6)', borderLeft: '4px solid #06b6d4', padding: '16px', borderRadius: '12px', marginBottom: '15px' }}>
                  <strong style={{ color: '#fff', fontSize: '15px' }}>🏆 Mühendislik Bitirme Projeleri Sergisi & Yarışması</strong>
                  <p style={{ color: '#cbd5e1', fontSize: '13.5px', marginTop: '6px' }}>Kampüs mühendislik kulüpleri ortaklığında düzenlenen hackathon için takımlar kuruluyor.</p>
                </div>
              </div>
            )}

            {schoolSubtab === 'clubs' && (
              <div className="dashboard-grid">
                {clubsList.map((club, i) => (
                  <div key={i} className="premium-card">
                    <h3>{club.name}</h3>
                    <span style={{ color: '#06b6d4', fontSize: '13px', display: 'block', marginBottom: '6px' }}>👥 {club.members} • {club.field}</span>
                    <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '15px' }}>{club.desc}</p>
                    <button onClick={() => alert(`${club.name} topluluğuna katıldınız! 🎉`)} className="submit-btn" style={{ marginTop: 0, padding: '8px 16px' }}>{club.joined ? 'Üyesisiniz ✅' : 'Kulübe Katıl 🤝'}</button>
                  </div>
                ))}
              </div>
            )}

            {schoolSubtab === 'chat' && (
              <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: '500px', background: '#0f172a', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '20px', overflow: 'hidden' }}>
                <div style={{ borderRight: '1px solid rgba(255,255,255,0.08)', padding: '15px', background: 'rgba(30,41,59,0.4)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{ color: '#06b6d4', fontSize: '14px', margin: '0 0 10px 0' }}><i className="fa-solid fa-comments"></i> Okul Arkadaşların</h4>
                  {schoolPeersList.map((p, i) => (
                    <div key={i} onClick={() => setChatActivePeer(p.name)} style={{ padding: '12px', background: chatActivePeer === p.name ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.03)', borderRadius: '10px', cursor: 'pointer', borderLeft: chatActivePeer === p.name ? '3px solid #06b6d4' : 'none' }}>
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
                <option value="makine">🏎️ Makine & Otomotiv Müh.</option>
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
                    <img src={m.img} alt={m.name} style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#0f172a', border: '2px solid #06b6d4', margin: '0 auto 12px auto', display: 'block' }} />
                    <h3 style={{ margin: 0, fontSize: '18px' }}>{m.name}</h3>
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

        {/* TAB 4: ADAY İSTEKLERİ & MENTEELER */}
        {activeTab === 'mentor-candidates' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '24px', color: '#fff' }}>
                  <i className="fa-solid fa-user-graduate" style={{ color: '#a855f7', marginRight: '8px' }}></i>
                  Aday İstekleri & Rehberlik (Menteelerim) 🎓
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>Mühendislik hedefleyen lise öğrencilerine üniversite deneyimlerinizi aktarın.</p>
              </div>
            </div>

            <div className="showcase-tabs" style={{ justifyContent: 'flex-start', marginBottom: '25px' }}>
              <button className={`tab-btn ${candidateSubtab === 'pending' ? 'active' : ''}`} onClick={() => setCandidateSubtab('pending')}>📥 Bekleyen İstekler ({pendingCandidates.length})</button>
              <button className={`tab-btn ${candidateSubtab === 'accepted' ? 'active' : ''}`} onClick={() => setCandidateSubtab('accepted')}>✅ Menteelerim ({acceptedCandidates.length})</button>
            </div>

            {candidateSubtab === 'pending' && (
              <div className="dashboard-grid">
                {pendingCandidates.map(cand => (
                  <div key={cand.id} className="premium-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <img src={cand.img} alt={cand.name} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #a855f7' }} />
                      <div>
                        <h3 style={{ margin: 0, fontSize: '16px' }}>{cand.name}</h3>
                        <span style={{ color: '#a855f7', fontSize: '12px' }}>{cand.school}</span>
                      </div>
                    </div>
                    <span style={{ display: 'block', color: '#06b6d4', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>{cand.target}</span>
                    <span style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '12px' }}>{cand.nets}</span>
                    <p style={{ fontSize: '13.5px', color: '#cbd5e1', marginBottom: '15px' }}>"{cand.note}"</p>
                    <button onClick={() => handleAcceptCandidate(cand)} className="submit-btn" style={{ marginTop: 0, padding: '10px', background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>Talebi Kabul Et & Rehber Ol ✅</button>
                  </div>
                ))}
              </div>
            )}

            {candidateSubtab === 'accepted' && (
              <div className="dashboard-grid">
                {acceptedCandidates.length === 0 ? (
                  <p style={{ color: '#94a3b8' }}>Henüz kabul edilmiş bir menteeniz bulunmuyor.</p>
                ) : (
                  acceptedCandidates.map(cand => (
                    <div key={cand.id} className="premium-card">
                      <h3>{cand.name}</h3>
                      <span style={{ color: '#a855f7', fontSize: '13px' }}>{cand.target}</span>
                      <button onClick={() => { setActiveTab('school'); setSchoolSubtab('chat'); setChatActivePeer(cand.name); }} className="submit-btn" style={{ marginTop: '12px', padding: '8px 14px' }}>Sohbet Et 💬</button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: REVAÇTA ŞİRKETLER */}
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

        {/* TAB 6: STAJ & PROJE İLANLARI */}
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
              {defaultUserJobs.map(job => (
                <div key={job.id} className="premium-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '17px' }}>{job.title}</h3>
                    <span className="user-badge">{job.company}</span>
                  </div>
                  <span style={{ color: '#06b6d4', fontSize: '13px', display: 'block', marginBottom: '10px' }}>📍 {job.domain}</span>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '15px' }}>{job.desc}</p>
                  <button onClick={() => alert("Başvurunuz İK birimine iletildi! 🚀")} className="submit-btn" style={{ marginTop: 0, padding: '10px' }}>Başvur & Özgeçmiş İlet 🚀</button>
                </div>
              ))}
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
            <img src={selectedMentorDetailsModal.img} alt={selectedMentorDetailsModal.name} style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#0f172a', border: '3px solid #06b6d4', margin: '0 auto 15px auto', display: 'block' }} />
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
              <img src={sendReqNoteModalMentor.img} alt={sendReqNoteModalMentor.name} style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid #06b6d4' }} />
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
                  <button onClick={() => { handleOpenSendReqModal({ id: 'comp_m_' + idx, name: m.isim, company: selectedCompanyModal.ad, title: m.unvan, img: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(m.isim)}` }); setSelectedCompanyModal(null); }} className="submit-btn" style={{ marginTop: 0, padding: '6px 12px', fontSize: '12px' }}>İstek Gönder 🚀</button>
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
            <form onSubmit={(e) => { e.preventDefault(); alert("Profil güncellendi! ✅"); setIsEditProfileOpen(false); }}>
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
