import { useMemo, useState } from 'react';
import Modal from '../components/Modal';
import { seedJobs, roadmapsData } from '../data/jobsData';
import { mentorsData } from '../data/mentorsData';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';

export default function StudentDashboardPage() {
  const { user, updateProfile } = useAuth();
  const {
    jobs,
    appliedJobIds,
    savedJobIds,
    applyJob,
    toggleSaveJob,
    createJob,
    candidateRequests,
    acceptedMentees,
    acceptCandidate,
    rejectCandidate,
    mentorRequests,
    sendMentorRequest,
    notify
  } = useDashboard();

  const [currentTab, setCurrentTab] = useState('panel'); // panel | jobs | roadmaps | candidates | mentors | company | school | ai | profile
  const [jobSubTab, setJobSubTab] = useState('all'); // all | saved | applied | mine
  const [jobTypeFilter, setJobTypeFilter] = useState('Tümü');
  const [jobSearch, setJobSearch] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);

  // Modals
  const [applyModalJob, setApplyModalJob] = useState(null);
  const [applyCoverNote, setApplyCoverNote] = useState('');
  const [aiMatchJob, setAiMatchJob] = useState(null);
  const [createJobModal, setCreateJobModal] = useState(false);
  const [newJobForm, setNewJobForm] = useState({ title: '', type: 'Staj', company: 'Öğrenci Projesi', skills: '', description: '', location: 'Uzaktan / Hibrit' });
  const [mentorModal, setMentorModal] = useState(null);
  const [mentorNote, setMentorNote] = useState('');
  const [activeChatModal, setActiveChatModal] = useState(null);
  const [showAnonymousReviews, setShowAnonymousReviews] = useState(false);
  const [showMyMenteesModal, setShowMyMenteesModal] = useState(false);
  const [showAppliedJobsModal, setShowAppliedJobsModal] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'ASELSAN Staj Başvurusu Alındı', text: 'Gömülü Yazılım Stajyeri başvurunuz inceleniyor.', time: '10 dk önce', unread: true },
    { id: 2, title: 'Bora Akın (Lise 12. Sınıf) rehberlik istedi', text: 'İTÜ Bilgisayar tercih süreci hakkında soru sordu.', time: '30 dk önce', unread: true },
    { id: 3, title: 'Can Yılmaz TEKNOFEST ekibine katıldı', text: 'Savaşan İHA takımı oluşturuldu.', time: 'Dün', unread: false },
    { id: 4, title: 'Yeni İlan: Trendyol Tech Frontend Stajyeri', text: 'React ve Next.js bilen stajyer aranıyor.', time: '2 gün önce', unread: true }
  ]);

  // Roadmaps progress
  const [roadmaps, setRoadmaps] = useState(roadmapsData);
  const toggleRoadmapStep = (roadmapId, stepId) => {
    setRoadmaps((prev) =>
      prev.map((r) => {
        if (r.id !== roadmapId) return r;
        const updatedSteps = r.steps.map((s) => (s.id === stepId ? { ...s, done: !s.done } : s));
        return { ...r, steps: updatedSteps };
      })
    );
  };

  // Student Profile
  const [profile, setProfile] = useState({
    name: user?.name || 'Mühendis Adayı',
    school: user?.school || 'İstanbul Teknik Üniversitesi',
    department: user?.department || 'Bilgisayar Mühendisliği',
    level: user?.level || '3. Sınıf',
    gpa: user?.gpa || '3.42',
    bio: user?.bio || 'Full-stack web geliştirme ve yapay zeka alanında projeler üretiyorum. Açık kaynak kodlu projelere katkı sağlamayı seviyorum.',
    cvFile: 'Helin_Celik_CV_Mühendislik.pdf'
  });

  const unreadCount = notifications.filter((n) => n.unread).length;
  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const anonymousReviews = [
    { rating: 5, date: '10 Ağustos 2026', text: 'Tercih dönemimde Bilgisayar Mühendisliği ders yoğunluğu, hazırlık sınavı ve kampüs ortamı hakkında harika bilgiler verdi. Çok samimi bir rehber!', author: 'Anonim YKS Öğrencisi (12. Sınıf)' },
    { rating: 5, date: '04 Ağustos 2026', text: 'YKS deneme netlerimi nasıl artırabileceğim konusunda çalışma programı taktiği verdi. Kendisine tavsiyeleri için çok teşekkür ederim.', author: 'Anonim YKS Öğrencisi (Mezun Seviye)' },
    { rating: 4.8, date: '28 Temmuz 2026', text: 'Mühendislik okumak isteyen adaylar için çok motivasyon verici konuştu. Sorularıma anında içtenlikle yanıt verdi.', author: 'Anonim YKS Öğrencisi (11. Sınıf)' }
  ];

  const companies = [
    { name: 'Trendyol Tech', tag: 'E-Ticaret & FinTech', openRoles: 3, logo: '🛍️' },
    { name: 'ASELSAN', tag: 'Savunma Sanayii & Radar', openRoles: 5, logo: '🛡️' },
    { name: 'Baykar Teknoloji', tag: 'İHA & Otonom Sistemler', openRoles: 4, logo: '✈️' },
    { name: 'HAVELSAN', tag: 'Yazılım & Simülasyon', openRoles: 2, logo: '💻' },
    { name: 'TÜBİTAK BİLGEM', tag: 'Kriptoloji & Ar-Ge', openRoles: 3, logo: '🔬' }
  ];

  const studentPeers = [
    { name: 'Ayşe Demir', dept: 'İTÜ Bilgisayar Müh. (4. Sınıf)', project: 'Bitirme Tezi için React & Node.js ortak geliştirici arıyor' },
    { name: 'Can Yalçın', dept: 'ODTÜ Elektrik-Elektronik (3. Sınıf)', project: 'TEKNOFEST Savaşan İHA gömülü yazılım ekibi kuruyor' },
    { name: 'Elif Öz', dept: 'YTÜ Mekatronik Müh. (3. Sınıf)', project: 'Otonom robotik kol simülasyonu üzerinde çalışıyor' }
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSub =
        jobSubTab === 'all'
          ? true
          : jobSubTab === 'applied'
          ? appliedJobIds.includes(job.id)
          : jobSubTab === 'saved'
          ? savedJobIds.includes(job.id)
          : job.mine;
      const matchesType = jobTypeFilter === 'Tümü' || job.type === jobTypeFilter;
      const matchesSearch =
        job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
        job.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
        job.skills.toLowerCase().includes(jobSearch.toLowerCase());
      return matchesSub && matchesType && matchesSearch;
    });
  }, [jobs, jobSubTab, jobTypeFilter, jobSearch, appliedJobIds, savedJobIds]);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyModalJob) return;
    applyJob(applyModalJob.id, applyCoverNote);
    setApplyModalJob(null);
    setApplyCoverNote('');
  };

  const handleCreateJobSubmit = (e) => {
    e.preventDefault();
    createJob({
      ...newJobForm,
      deadline: '30 Haziran 2026',
      stipend: 'Proje Payı / Burs',
      mine: true
    });
    setCreateJobModal(false);
    setNewJobForm({ title: '', type: 'Staj', company: 'Öğrenci Projesi', skills: '', description: '', location: 'Uzaktan / Hibrit' });
  };

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: '#ffffff', display: 'flex', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand" style={{ fontSize: 18, color: '#06b6d4', fontWeight: 900, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="fa-solid fa-compass" /> EngineersPath
        </div>

        <div className="menu-items" style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          <div className="menu-group-label" style={{ fontSize: 11, color: '#64748b', fontWeight: 800, padding: '4px 12px' }}>GENEL</div>
          <div className={`menu-item ${currentTab === 'panel' ? 'active' : ''}`} onClick={() => setCurrentTab('panel')}>
            <i className="fa-solid fa-gauge-high" /> Öğrenci Paneli
          </div>

          <div className="menu-group-label" style={{ fontSize: 11, color: '#64748b', fontWeight: 800, padding: '12px 12px 4px' }}>STAJ & PROJE</div>
          <div className={`menu-item ${currentTab === 'jobs' ? 'active' : ''}`} onClick={() => setCurrentTab('jobs')}>
            <i className="fa-solid fa-briefcase" /> Staj & Projeler ({jobs.length})
          </div>
          <div className={`menu-item ${currentTab === 'roadmaps' ? 'active' : ''}`} onClick={() => setCurrentTab('roadmaps')}>
            <i className="fa-solid fa-route" /> Kariyer Yol Haritası
          </div>

          <div className="menu-group-label" style={{ fontSize: 11, color: '#64748b', fontWeight: 800, padding: '12px 12px 4px' }}>AĞIM & İLETİŞİM</div>
          <div className={`menu-item ${currentTab === 'candidates' ? 'active' : ''}`} onClick={() => setCurrentTab('candidates')}>
            <i className="fa-solid fa-user-graduate" /> Liseli Rehberliği ({candidateRequests.length})
          </div>
          <div className={`menu-item ${currentTab === 'mentors' ? 'active' : ''}`} onClick={() => setCurrentTab('mentors')}>
            <i className="fa-solid fa-user-tie" /> Kıdemli Mentor Ağı 🤝
          </div>
          <div className={`menu-item ${currentTab === 'company' ? 'active' : ''}`} onClick={() => setCurrentTab('company')}>
            <i className="fa-solid fa-building" /> Şirketinizden 💼
          </div>
          <div className={`menu-item ${currentTab === 'school' ? 'active' : ''}`} onClick={() => setCurrentTab('school')}>
            <i className="fa-solid fa-users" /> Okul & Akran Ağı 🏫
          </div>

          <div className="menu-group-label" style={{ fontSize: 11, color: '#64748b', fontWeight: 800, padding: '12px 12px 4px' }}>ARAÇLAR</div>
          <div className={`menu-item ${currentTab === 'ai' ? 'active' : ''}`} onClick={() => setCurrentTab('ai')}>
            <i className="fa-solid fa-robot" /> AI Öğrenci Danışmanı 🤖
          </div>

          <div
            className="profile-section"
            style={{ marginTop: 'auto', marginBottom: 10, padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: 12, cursor: 'pointer' }}
            onClick={() => setCurrentTab('profile')}
          >
            <h4 style={{ fontSize: 14, color: '#fff', margin: '0 0 3px 0' }}><i className="fa-solid fa-id-card" /> Profilim & CV</h4>
            <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>{profile.school}</p>
          </div>

          <a
            href="/"
            className="menu-item logout-btn"
            style={{ color: '#ef4444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.2)' }}
            onClick={() => localStorage.clear()}
          >
            <i className="fa-solid fa-right-from-bracket" /> Çıkış Yap
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content" style={{ flex: 1, padding: '36px 40px', overflowY: 'auto', maxHeight: '100vh' }}>
        {/* Welcome Bar */}
        <div className="welcome-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 35, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: 20 }}>
          <h1 style={{ fontSize: 28, color: '#fff', margin: 0 }}>
            Hoş Geldin, <span style={{ color: '#06b6d4' }}>{profile.name}!</span> 👋
          </h1>

          <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            <button
              className="notification-button"
              onClick={() => setNotifOpen(!notifOpen)}
              style={{ width: 44, height: 44, position: 'relative', borderRadius: 12, border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(15,23,42,0.72)', color: '#cbd5e1', cursor: 'pointer' }}
            >
              <i className="fa-solid fa-bell" />
              {unreadCount > 0 && (
                <span className="notification-count" style={{ position: 'absolute', top: -7, right: -7, minWidth: 20, height: 20, borderRadius: 999, background: '#ef4444', color: '#fff', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div
                className="notification-panel open"
                style={{ position: 'absolute', top: 54, right: 0, zIndex: 100, width: 360, padding: 14, border: '1px solid rgba(6,182,212,0.3)', borderRadius: 16, background: '#0f172a', boxShadow: '0 18px 48px rgba(0,0,0,0.5)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 8 }}>
                  <strong style={{ fontSize: 14, color: '#fff' }}>Bildirimler ({unreadCount})</strong>
                  <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: '#06b6d4', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                    Tümünü okundu say
                  </button>
                </div>
                <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                  {notifications.map((n) => (
                    <div key={n.id} onClick={() => { setCurrentTab('jobs'); setNotifOpen(false); }} style={{ padding: 10, borderRadius: 10, background: n.unread ? 'rgba(6,182,212,0.12)' : 'transparent', border: n.unread ? '1px solid rgba(6,182,212,0.3)' : 'none', marginBottom: 6, cursor: 'pointer' }}>
                      <strong style={{ color: '#fff', fontSize: 13, display: 'block' }}>{n.title}</strong>
                      <p style={{ margin: '3px 0 0 0', color: '#94a3b8', fontSize: 12 }}>{n.text}</p>
                      <span style={{ fontSize: 10, color: '#64748b', marginTop: 4, display: 'block' }}>{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="user-badge" style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '8px 16px', borderRadius: 20, fontSize: 14, fontWeight: 600, color: '#06b6d4' }}>
              Öğrenci Modu
            </div>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {currentTab === 'panel' && (
          <div>
            {/* Academic Info Banner */}
            <div style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(15, 23, 42, 0.9))', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 20, padding: 24, marginBottom: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
              <div>
                <span style={{ fontSize: 12, color: '#22d3ee', fontWeight: 800 }}>🎓 AKADEMİK BİLGİLER</span>
                <h2 style={{ fontSize: 22, color: '#fff', margin: '4px 0 2px 0' }}>{profile.school}</h2>
                <div style={{ fontSize: 14, color: '#94a3b8' }}>{profile.department} · {profile.level}</div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ background: '#0f172a', padding: '12px 20px', borderRadius: 14, border: '1px solid rgba(6, 182, 212, 0.25)', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#10b981' }}>{profile.gpa}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>GENEL GANO / 4.00</div>
                </div>
                <div style={{ background: '#0f172a', padding: '12px 20px', borderRadius: 14, border: '1px solid rgba(6, 182, 212, 0.25)', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#22d3ee' }}>142</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>TAMAMLANAN AKTS</div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 32 }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 22 }}>
                <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>BAŞVURULAN İLANLAR</div>
                <div style={{ fontSize: 24, color: '#22d3ee', fontWeight: 900, margin: '8px 0 4px 0' }}>{appliedJobIds.length} Başvuru</div>
                <button onClick={() => setShowAppliedJobsModal(true)} style={{ background: 'none', border: 'none', color: '#06b6d4', padding: 0, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  Başvuruları Gör →
                </button>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 22 }}>
                <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>REHBERLİK EDİLEN ADAYLAR</div>
                <div style={{ fontSize: 24, color: '#10b981', fontWeight: 900, margin: '8px 0 4px 0' }}>{acceptedMentees.length} Mentee</div>
                <button onClick={() => setShowMyMenteesModal(true)} style={{ background: 'none', border: 'none', color: '#10b981', padding: 0, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  Menteeleri İncele →
                </button>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 22 }}>
                <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>LİSELİ DEĞERLENDİRMELERİ</div>
                <div style={{ fontSize: 24, color: '#f59e0b', fontWeight: 900, margin: '8px 0 4px 0' }}>4.9 / 5.0 ⭐</div>
                <button onClick={() => setShowAnonymousReviews(true)} style={{ background: 'none', border: 'none', color: '#f59e0b', padding: 0, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  Yorumları Oku (3 Yorum) →
                </button>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 22 }}>
                <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>KAYDEDİLEN İLANLAR</div>
                <div style={{ fontSize: 24, color: '#fff', fontWeight: 900, margin: '8px 0 4px 0' }}>{savedJobIds.length} İlan</div>
                <button onClick={() => { setCurrentTab('jobs'); setJobSubTab('saved'); }} style={{ background: 'none', border: 'none', color: '#22d3ee', padding: 0, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  Kayıtlı İlanları Aç →
                </button>
              </div>
            </div>

            {/* Featured Opportunities */}
            <h3 style={{ fontSize: 18, color: '#fff', fontWeight: 800, marginBottom: 16 }}>🚀 Öne Çıkan Fırsatlar</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {jobs.slice(0, 3).map((job) => (
                <div key={job.id} style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 18, padding: 22 }}>
                  <span style={{ background: 'rgba(6, 182, 212, 0.12)', color: '#22d3ee', padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 800 }}>{job.type}</span>
                  <h4 style={{ fontSize: 16, color: '#fff', margin: '8px 0 4px 0' }}>{job.title}</h4>
                  <div style={{ fontSize: 13, color: '#06b6d4', fontWeight: 600, marginBottom: 12 }}>{job.company}</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => setAiMatchJob(job)} style={{ flex: 1, padding: '8px', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid #06b6d4', color: '#22d3ee', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                      AI CV Uyumu
                    </button>
                    <button onClick={() => setApplyModalJob(job)} style={{ flex: 1, padding: '8px', background: 'linear-gradient(135deg, #0891b2, #0f766e)', border: 'none', color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                      Başvur
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: JOBS & PROJECTS */}
        {currentTab === 'jobs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  ['all', `🌐 Tüm İlanlar (${jobs.length})`],
                  ['saved', `⭐ Kaydedilenler (${savedJobIds.length})`],
                  ['applied', `💼 Başvurularım (${appliedJobIds.length})`],
                  ['mine', '📋 İlanlarım']
                ].map(([sub, label]) => (
                  <button
                    key={sub}
                    onClick={() => setJobSubTab(sub)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 10,
                      border: jobSubTab === sub ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.08)',
                      background: jobSubTab === sub ? '#06b6d4' : 'rgba(30,41,59,0.5)',
                      color: jobSubTab === sub ? '#0f172a' : '#94a3b8',
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: 'pointer'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCreateJobModal(true)}
                style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: '#fff', borderRadius: 12, fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <i className="fa-solid fa-plus" /> Yeni İlan / Takım Oluştur
              </button>
            </div>

            <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Tümü', 'Staj', 'Proje'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setJobTypeFilter(type)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 16,
                      border: jobTypeFilter === type ? '1px solid #22d3ee' : '1px solid rgba(255,255,255,0.1)',
                      background: jobTypeFilter === type ? 'rgba(6,182,212,0.2)' : 'transparent',
                      color: jobTypeFilter === type ? '#22d3ee' : '#94a3b8',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <input
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                placeholder="Pozisyon, şirket veya yetkinlik ara..."
                style={{ flex: 1, minWidth: 220, padding: '10px 16px', borderRadius: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff', fontSize: 13, outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filteredJobs.map((job) => {
                const isApplied = appliedJobIds.includes(job.id);
                const isSaved = savedJobIds.includes(job.id);
                return (
                  <div
                    key={job.id}
                    style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 18, padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}
                  >
                    <div style={{ flex: '1 1 350px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <span style={{ background: job.type === 'Staj' ? 'rgba(16,185,129,0.15)' : 'rgba(6,182,212,0.15)', color: job.type === 'Staj' ? '#10b981' : '#22d3ee', padding: '3px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                          {job.type}
                        </span>
                        <h3 style={{ fontSize: 18, color: '#fff', margin: 0 }}>{job.title}</h3>
                      </div>
                      <div style={{ color: '#06b6d4', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                        {job.company} · <span style={{ color: '#94a3b8' }}>{job.location}</span>
                      </div>
                      <p style={{ color: '#94a3b8', fontSize: 13, margin: '0 0 10px 0', lineHeight: 1.5 }}>
                        {job.description}
                      </p>
                      <div style={{ fontSize: 12, color: '#cbd5e1' }}>
                        <strong style={{ color: '#22d3ee' }}>Yetkinlikler:</strong> {job.skills}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                      <div style={{ fontSize: 12, color: '#f59e0b' }}>Son Başvuru: {job.deadline}</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => toggleSaveJob(job.id)}
                          style={{ padding: '8px 12px', background: isSaved ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.05)', border: isSaved ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)', color: isSaved ? '#f59e0b' : '#94a3b8', borderRadius: 10, cursor: 'pointer', fontSize: 13 }}
                        >
                          <i className={isSaved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'} />
                        </button>
                        <button
                          onClick={() => setAiMatchJob(job)}
                          style={{ padding: '8px 14px', background: 'rgba(6,182,212,0.15)', border: '1px solid #06b6d4', color: '#22d3ee', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                        >
                          ✨ AI CV Uyumu
                        </button>
                        <button
                          onClick={() => setApplyModalJob(job)}
                          disabled={isApplied}
                          style={{
                            padding: '8px 20px',
                            background: isApplied ? 'rgba(16,185,129,0.2)' : 'linear-gradient(135deg, #0891b2, #0f766e)',
                            border: isApplied ? '1px solid #10b981' : 'none',
                            color: isApplied ? '#10b981' : '#fff',
                            borderRadius: 10,
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: isApplied ? 'default' : 'pointer'
                          }}
                        >
                          {isApplied ? '✅ Başvuruldu' : 'Başvur'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: CAREER ROADMAPS */}
        {currentTab === 'roadmaps' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {roadmaps.map((rm) => {
                const doneCount = rm.steps.filter((s) => s.done).length;
                const percent = Math.round((doneCount / rm.steps.length) * 100);
                return (
                  <div key={rm.id} style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: 20, padding: 26 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <i className={`fa-solid ${rm.icon}`} style={{ color: '#06b6d4', fontSize: 22 }} />
                        <h3 style={{ fontSize: 19, color: '#fff', margin: 0 }}>{rm.title}</h3>
                      </div>
                      <span style={{ fontSize: 12, color: '#10b981', fontWeight: 700, background: 'rgba(16,185,129,0.15)', padding: '4px 12px', borderRadius: 10 }}>
                        {doneCount}/{rm.steps.length} Adım Tamamlandı (%{percent})
                      </span>
                    </div>

                    <div style={{ width: '100%', height: 6, background: '#0f172a', borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
                      <div style={{ height: '100%', width: `${percent}%`, background: 'linear-gradient(to right, #06b6d4, #10b981)', transition: 'width 0.3s' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {rm.steps.map((st) => (
                        <div
                          key={st.id}
                          onClick={() => toggleRoadmapStep(rm.id, st.id)}
                          style={{
                            background: st.done ? 'rgba(16, 185, 129, 0.08)' : 'rgba(30, 41, 59, 0.5)',
                            border: st.done ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: 12,
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14,
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ width: 22, height: 22, borderRadius: 6, border: st.done ? '2px solid #10b981' : '2px solid #64748b', background: st.done ? '#10b981' : 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>
                            {st.done && <i className="fa-solid fa-check" />}
                          </div>
                          <div>
                            <strong style={{ color: st.done ? '#10b981' : '#fff', fontSize: 14 }}>{st.id}. {st.title}</strong>
                            <p style={{ margin: '2px 0 0 0', color: '#94a3b8', fontSize: 12 }}>{st.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: CANDIDATE GUIDANCE */}
        {currentTab === 'candidates' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 18, color: '#fff', margin: 0 }}>Gelen Liseli Aday Talepleri</h3>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: '4px 0 0 0' }}>Bölümünüz ve üniversiteniz hakkında tavsiye isteyen liseli adaylar.</p>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setShowMyMenteesModal(true)} style={{ padding: '8px 16px', background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.4)', color: '#c084fc', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                  🎓 Menteelerim ({acceptedMentees.length})
                </button>
                <button onClick={() => setShowAnonymousReviews(true)} style={{ padding: '8px 16px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', color: '#f59e0b', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                  ⭐ Değerlendirmeler
                </button>
              </div>
            </div>

            {candidateRequests.length === 0 ? (
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 32, textAlign: 'center', color: '#94a3b8' }}>
                🎉 Bekleyen yeni aday talebi yok. Tüm istekleri yanıtladınız!
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                {candidateRequests.map((c) => (
                  <div key={c.id} style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: 18, padding: 22 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <span style={{ fontSize: 11, color: '#10b981', fontWeight: 800 }}>{c.grade}</span>
                      <span style={{ fontSize: 11, color: '#94a3b8' }}>{c.goal}</span>
                    </div>
                    <h4 style={{ fontSize: 17, color: '#fff', margin: '0 0 6px 0' }}>{c.name}</h4>
                    <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.5, marginBottom: 18 }}>"{c.text}"</p>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={() => rejectCandidate(c.id)} style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#cbd5e1', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                        Reddet
                      </button>
                      <button onClick={() => acceptCandidate(c)} style={{ flex: 2, padding: '8px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                        ✅ Kabul Et
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: MENTORS */}
        {currentTab === 'mentors' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {mentorsData.map((m) => {
              const requested = mentorRequests.some((r) => r.mentorId === m.id);
              return (
                <div key={m.id} style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 18, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <div style={{ fontSize: 32, background: 'rgba(255,255,255,0.05)', padding: 6, borderRadius: '50%' }}>{m.avatar}</div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: 16, color: '#fff' }}>{m.name}</h4>
                        <span style={{ fontSize: 12, color: '#06b6d4' }}>{m.company}</span>
                      </div>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5, marginBottom: 14 }}>{m.bio}</p>
                  </div>
                  <button
                    onClick={() => setMentorModal(m)}
                    disabled={requested}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: requested ? 'rgba(16, 185, 129, 0.2)' : 'linear-gradient(135deg, #0891b2, #0f766e)',
                      border: requested ? '1px solid #10b981' : 'none',
                      color: requested ? '#10b981' : '#fff',
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: requested ? 'default' : 'pointer'
                    }}
                  >
                    {requested ? '✅ Talep Gönderildi' : 'Görüşme İsteği Gönder'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 6: COMPANY */}
        {currentTab === 'company' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {companies.map((comp) => (
              <div key={comp.name} style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: 18, padding: 22 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{comp.logo}</div>
                <h4 style={{ fontSize: 18, color: '#fff', margin: '0 0 4px 0' }}>{comp.name}</h4>
                <div style={{ fontSize: 12, color: '#06b6d4', marginBottom: 12 }}>{comp.tag}</div>
                <div style={{ fontSize: 13, color: '#10b981', fontWeight: 600, marginBottom: 16 }}>🎯 {comp.openRoles} Aktif Staj Programı</div>
                <button
                  onClick={() => { setCurrentTab('jobs'); setJobSearch(comp.name); }}
                  style={{ width: '100%', padding: '9px', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid #06b6d4', color: '#22d3ee', borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
                >
                  Açık İlanları İncele
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 7: SCHOOL */}
        {currentTab === 'school' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {studentPeers.map((p) => (
              <div key={p.name} style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 18, padding: 22 }}>
                <div style={{ fontSize: 11, color: '#10b981', fontWeight: 700 }}>🟢 ÇEVRİMİÇİ PROJE ORTAĞI</div>
                <h4 style={{ fontSize: 17, color: '#fff', margin: '4px 0 2px 0' }}>{p.name}</h4>
                <div style={{ fontSize: 12, color: '#06b6d4', marginBottom: 10 }}>{p.dept}</div>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>{p.project}</p>
                <button
                  onClick={() => setActiveChatModal(p.name)}
                  style={{ width: '100%', padding: '9px', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid #06b6d4', color: '#22d3ee', borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
                >
                  Ortak Proje Sohbeti Başlat
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 8: AI */}
        {currentTab === 'ai' && (
          <div className="premium-card" style={{ maxWidth: 850, margin: '0 auto', background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 20, padding: 30 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 20 }}>
              <div className="card-icon" style={{ width: 44, height: 44, background: 'rgba(6, 182, 212, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', fontSize: 22 }}>
                <i className="fa-solid fa-robot" />
              </div>
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: 18, color: '#fff' }}>AI Öğrenci & Mülakat Danışmanı 🤖</h3>
                <p style={{ margin: 0, fontSize: 13, color: '#94a3b8' }}>Staj başvuruları, CV analizi ve teknik mülakat hazırlığı</p>
              </div>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 16, padding: 20, minHeight: 240, marginBottom: 16 }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.1)', borderLeft: '3px solid #06b6d4', padding: '12px 16px', borderRadius: 12, fontSize: 14 }}>
                <strong style={{ color: '#06b6d4', display: 'block', marginBottom: 4 }}>🤖 AI Danışman:</strong>
                Merhaba! Staj CV’ni güçlendirmek, GitHub portföyünü düzenlemek veya şirketlerin teknik mülakatlarına hazırlanmak için bana soru sorabilirsin.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <input placeholder="Staj veya kariyer hedeflerinle ilgili bir soru yaz..." style={{ flex: 1, padding: 12, background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 10, color: '#fff', outline: 'none' }} />
              <button style={{ padding: '0 20px', background: '#06b6d4', border: 'none', borderRadius: 10, color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}>Sor</button>
            </div>
          </div>
        )}

        {/* TAB 9: PROFILE */}
        {currentTab === 'profile' && (
          <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 20, padding: 32, maxWidth: 650 }}>
            <h2 style={{ fontSize: 20, color: '#fff', fontWeight: 800, marginBottom: 20 }}>
              Profil ve CV Bilgilerimi Düzenle
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Üniversite</label>
                <input value={profile.school} onChange={(e) => setProfile({ ...profile, school: e.target.value })} style={{ width: '100%', padding: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 10, color: '#fff' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Bölüm</label>
                  <input value={profile.department} onChange={(e) => setProfile({ ...profile, department: e.target.value })} style={{ width: '100%', padding: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 10, color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>GANO</label>
                  <input value={profile.gpa} onChange={(e) => setProfile({ ...profile, gpa: e.target.value })} style={{ width: '100%', padding: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 10, color: '#fff' }} />
                </div>
              </div>
              <button onClick={() => notify('Profil bilgileri kaydedildi!', 'profile')} style={{ padding: 12, background: 'linear-gradient(135deg, #0891b2, #0f766e)', border: 'none', color: '#fff', borderRadius: 10, fontWeight: 800, cursor: 'pointer' }}>
                💾 Bilgileri Kaydet
              </button>
            </div>
          </div>
        )}
      </main>

      {/* AI Match Modal */}
      {aiMatchJob && (
        <Modal title="AI CV & Yetkinlik Analizi" onClose={() => setAiMatchJob(null)}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 44, color: '#10b981', fontWeight: 900 }}>%86</div>
            <div style={{ fontSize: 14, color: '#fff', fontWeight: 700 }}>{aiMatchJob.title} Pozisyonuna Uygunluk</div>
          </div>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: 14, borderRadius: 10, marginBottom: 14 }}>
            <strong style={{ color: '#10b981', display: 'block', fontSize: 13 }}>✅ Eşleşen Yetkinlikler:</strong>
            <span style={{ fontSize: 13, color: '#cbd5e1' }}>React, JavaScript/TypeScript, Git, Temel Proje Deneyimi</span>
          </div>
          <button onClick={() => { setApplyModalJob(aiMatchJob); setAiMatchJob(null); }} className="submit-btn" style={{ width: '100%' }}>
            Bu İlana Başvur
          </button>
        </Modal>
      )}

      {/* Apply Modal */}
      {applyModalJob && (
        <Modal title={`${applyModalJob.title} - Başvuru`} onClose={() => setApplyModalJob(null)}>
          <form onSubmit={handleApplySubmit}>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14 }}>
              <strong>{applyModalJob.company}</strong> için başvuru ön yazınızı yazın.
            </p>
            <textarea
              required
              rows={4}
              value={applyCoverNote}
              onChange={(e) => setApplyCoverNote(e.target.value)}
              placeholder="Örn: Projedeki React mimarisi ve bileşen geliştirme üzerinde deneyim sahibiyim..."
              style={{ width: '100%', padding: 12, borderRadius: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.3)', color: '#fff', outline: 'none', marginBottom: 16 }}
            />
            <button className="submit-btn" style={{ width: '100%' }}>
              Başvuruyu Tamamla
            </button>
          </form>
        </Modal>
      )}

      {/* Create Job Modal */}
      {createJobModal && (
        <Modal title="Yeni İlan / Proje Takımı Oluştur" onClose={() => setCreateJobModal(false)}>
          <form onSubmit={handleCreateJobSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>İlan Başlığı</label>
              <input required value={newJobForm.title} onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })} placeholder="Örn: React Native Mobil Geliştirici" style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Beceriler</label>
              <input required value={newJobForm.skills} onChange={(e) => setNewJobForm({ ...newJobForm, skills: e.target.value })} placeholder="React · Node.js" style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Açıklama</label>
              <textarea required rows={3} value={newJobForm.description} onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })} placeholder="Takım hedefleri..." style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0f172a', border: '1px solid rgba(6,182,212,0.25)', color: '#fff' }} />
            </div>
            <button className="submit-btn" style={{ width: '100%', marginTop: 8 }}>
              İlanı Yayınla
            </button>
          </form>
        </Modal>
      )}

      {/* Anonymous Reviews Modal */}
      {showAnonymousReviews && (
        <Modal title="⭐ Liseli Öğrenci Değerlendirmeleri" onClose={() => setShowAnonymousReviews(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {anonymousReviews.map((rev, i) => (
              <div key={i} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: 14, borderRadius: 12, border: '1px solid rgba(245,158,11,0.2)' }}>
                <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: 13 }}>⭐⭐⭐⭐⭐ ({rev.rating}/5)</span>
                <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.5, margin: '6px 0' }}>"{rev.text}"</p>
                <span style={{ color: '#94a3b8', fontSize: 11 }}>— {rev.author}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Applied Jobs Modal */}
      {showAppliedJobsModal && (
        <Modal title="💼 Başvurduğunuz İlanlar" onClose={() => setShowAppliedJobsModal(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {jobs.filter((j) => appliedJobIds.includes(j.id)).map((j) => (
              <div key={j.id} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: 14, borderRadius: 12, border: '1px solid rgba(6,182,212,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#fff', fontSize: 14 }}>{j.title}</strong>
                  <div style={{ color: '#06b6d4', fontSize: 12 }}>{j.company}</div>
                </div>
                <span style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 8 }}>
                  ✅ Başvuru Alındı
                </span>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* My Mentees Modal */}
      {showMyMenteesModal && (
        <Modal title="🎓 Rehberlik Ettiğiniz Menteeler" onClose={() => setShowMyMenteesModal(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {acceptedMentees.map((m) => (
              <div key={m.id || m.name} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: 14, borderRadius: 12, border: '1px solid rgba(168,85,247,0.3)' }}>
                <strong style={{ color: '#fff', fontSize: 14 }}>{m.name}</strong>
                <div style={{ color: '#c084fc', fontSize: 12 }}>{m.grade} · {m.goal}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Mentor Request Modal */}
      {mentorModal && (
        <Modal title={`${mentorModal.name} ile Mentorluk`} onClose={() => setMentorModal(null)}>
          <form onSubmit={(e) => { e.preventDefault(); sendMentorRequest(mentorModal, mentorNote); setMentorModal(null); setMentorNote(''); }}>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14 }}>
              {mentorModal.title} ({mentorModal.company}) için görüşme talebinizi iletin.
            </p>
            <textarea
              required
              rows={4}
              value={mentorNote}
              onChange={(e) => setMentorNote(e.target.value)}
              placeholder="Kariyer tavsiyesi, staj ve portföy danışmanlığı hakkında notunuz..."
              style={{ width: '100%', padding: '12px', borderRadius: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.3)', color: '#fff', outline: 'none', marginBottom: 16 }}
            />
            <button className="submit-btn" style={{ width: '100%' }}>
              Talebi Gönder
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
