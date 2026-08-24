import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { disciplinesData } from '../data/disciplinesData';
import { mentorsData } from '../data/mentorsData';
import { seedJobs } from '../data/jobsData';
import { useDashboard } from '../context/DashboardContext';

export default function ExplorePage() {
  const urlTab = new URLSearchParams(window.location.search).get('tab');
  const [activeMainTab, setActiveMainTab] = useState(
    ['disciplines', 'mentorship', 'opportunities', 'compare'].includes(urlTab) ? urlTab : 'disciplines'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [detailModalDiscipline, setDetailModalDiscipline] = useState(null);
  const [detailActiveTab, setDetailActiveTab] = useState('overview'); // overview | courses | tools | career | universities
  const [mentorModal, setMentorModal] = useState(null);
  const [mentorNote, setMentorNote] = useState('');
  const [compareFields, setCompareFields] = useState(['yazilim', 'makine']);

  const { sendMentorRequest, applyJob, appliedJobIds } = useDashboard();

  const categories = ['Tümü', 'Yazılım & AI', 'Enerji & Sistem', 'Tasarım & Üretim', 'Veri & Yönetim', 'Yapı & Proje', 'Sağlık & Medikal', 'Savunma & Uzay'];

  const filteredDisciplines = disciplinesData.filter((d) => {
    const matchesCategory = selectedCategory === 'Tümü' || d.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleMentorRequestSubmit = (e) => {
    e.preventDefault();
    if (!mentorModal) return;
    sendMentorRequest(mentorModal, mentorNote);
    setMentorModal(null);
    setMentorNote('');
  };

  const comp1 = disciplinesData.find((d) => d.id === compareFields[0]) || disciplinesData[0];
  const comp2 = disciplinesData.find((d) => d.id === compareFields[1]) || disciplinesData[1];

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f1f5f9', fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px 24px' }}>
        {/* Header Banner */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            color: '#22d3ee',
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 16
          }}>
            🧭 Mühendislik Evreni
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, margin: '0 0 12px 0' }}>
            Mühendislik Disiplinlerini <span style={{ color: '#22d3ee' }}>Keşfet</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            Yazılımdan makineye, elektronikten biyomühendisliğe tüm alanların müfredatlarını, araçlarını ve kariyer yollarını incele.
          </p>
        </div>

        {/* Main Tab Nav */}
        <div style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          marginBottom: 32,
          flexWrap: 'wrap'
        }}>
          {[
            ['disciplines', '📐 Tüm Disiplinler (9+)'],
            ['compare', '⚖️ Karşılaştırma Aracı'],
            ['mentorship', '👥 Mentor & Uzman Ağı'],
            ['opportunities', '💼 Staj & Proje Fırsatları']
          ].map(([tabKey, label]) => (
            <button
              key={tabKey}
              onClick={() => setActiveMainTab(tabKey)}
              style={{
                padding: '12px 22px',
                borderRadius: 14,
                border: activeMainTab === tabKey ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.08)',
                background: activeMainTab === tabKey ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(13, 148, 136, 0.2))' : 'rgba(15, 23, 42, 0.6)',
                color: activeMainTab === tabKey ? '#fff' : '#94a3b8',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.25s'
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* TAB 1: Disciplines Explorer */}
        {activeMainTab === 'disciplines' && (
          <div>
            {/* Filter and Search */}
            <div style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 30,
              flexWrap: 'wrap'
            }}>
              {/* Category Pills */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 20,
                      border: selectedCategory === cat ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: selectedCategory === cat ? '#06b6d4' : 'rgba(30, 41, 59, 0.5)',
                      color: selectedCategory === cat ? '#0f172a' : '#cbd5e1',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative', minWidth: 260, flex: '1 1 260px', maxWidth: 360 }}>
                <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: 14, top: 14, color: '#64748b' }} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Disiplin, araç veya ders ara..."
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 40px',
                    borderRadius: 12,
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(6, 182, 212, 0.25)',
                    color: '#fff',
                    fontSize: 14,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Grid of Disciplines */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 24
            }}>
              {filteredDisciplines.map((item) => (
                <article
                  key={item.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    borderRadius: 20,
                    padding: 26,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.2s, border-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#06b6d4';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <span style={{
                        background: 'rgba(6, 182, 212, 0.12)',
                        color: '#22d3ee',
                        padding: '4px 12px',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 700
                      }}>
                        {item.category}
                      </span>
                      <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: 'rgba(6, 182, 212, 0.1)',
                        color: '#06b6d4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20
                      }}>
                        <i className={'fa-solid ' + item.icon} />
                      </div>
                    </div>

                    <h3 style={{ fontSize: 20, color: '#fff', fontWeight: 800, margin: '0 0 8px 0' }}>
                      {item.name}
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: '0 0 16px 0' }}>
                      {item.tagline}
                    </p>

                    {/* Tool tags */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                      {item.tools.slice(0, 4).map((tool) => (
                        <span
                          key={tool}
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#cbd5e1',
                            fontSize: 12,
                            padding: '3px 8px',
                            borderRadius: 6
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                      {item.tools.length > 4 && (
                        <span style={{ color: '#06b6d4', fontSize: 12, padding: '3px 4px' }}>
                          +{item.tools.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setDetailModalDiscipline(item);
                      setDetailActiveTab('overview');
                    }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'linear-gradient(135deg, #0891b2, #0f766e)',
                      border: 'none',
                      color: '#fff',
                      borderRadius: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: 14,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8
                    }}
                  >
                    Detaylı İncele <i className="fa-solid fa-arrow-right" style={{ fontSize: 12 }} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Compare Tool */}
        {activeMainTab === 'compare' && (
          <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: 24, padding: 32 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20, textAlign: 'center' }}>
              ⚖️ İki Mühendislik Alanını Karşılaştır
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8, fontWeight: 700 }}>1. Alanı Seç:</label>
                <select
                  value={compareFields[0]}
                  onChange={(e) => setCompareFields([e.target.value, compareFields[1]])}
                  style={{ width: '100%', padding: '12px', borderRadius: 12, background: '#0f172a', color: '#fff', border: '1px solid #06b6d4', outline: 'none' }}
                >
                  {disciplinesData.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8, fontWeight: 700 }}>2. Alanı Seç:</label>
                <select
                  value={compareFields[1]}
                  onChange={(e) => setCompareFields([compareFields[0], e.target.value])}
                  style={{ width: '100%', padding: '12px', borderRadius: 12, background: '#0f172a', color: '#fff', border: '1px solid #10b981', outline: 'none' }}
                >
                  {disciplinesData.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Table */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {[comp1, comp2].map((comp, idx) => (
                <div key={comp.id} style={{ background: 'rgba(30, 41, 59, 0.5)', padding: 24, borderRadius: 16, border: idx === 0 ? '1px solid rgba(6,182,212,0.3)' : '1px solid rgba(16,185,129,0.3)' }}>
                  <h3 style={{ fontSize: 20, color: idx === 0 ? '#22d3ee' : '#10b981', margin: '0 0 12px 0' }}>
                    {comp.name}
                  </h3>
                  <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6, marginBottom: 16 }}>{comp.overview}</p>

                  <div style={{ marginBottom: 16 }}>
                    <strong style={{ fontSize: 13, color: '#fff', display: 'block', marginBottom: 6 }}>💰 Ortalama Maaş Skalası:</strong>
                    <span style={{ fontSize: 13, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '4px 8px', borderRadius: 6 }}>{comp.salaryRange}</span>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <strong style={{ fontSize: 13, color: '#fff', display: 'block', marginBottom: 6 }}>🛠️ Öne Çıkan Araçlar:</strong>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {comp.tools.map((t) => (
                        <span key={t} style={{ fontSize: 12, background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 4 }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <strong style={{ fontSize: 13, color: '#fff', display: 'block', marginBottom: 6 }}>📚 Kritik Dersler:</strong>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#cbd5e1', lineHeight: 1.5 }}>
                      {comp.courses.slice(0, 4).map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Mentors */}
        {activeMainTab === 'mentorship' && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 24
            }}>
              {mentorsData.map((m) => (
                <div
                  key={m.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 20,
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                      <div style={{ fontSize: 36, background: 'rgba(255,255,255,0.05)', padding: 8, borderRadius: '50%' }}>
                        {m.avatar}
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: 17, color: '#fff' }}>{m.name}</h3>
                        <span style={{ fontSize: 12, color: '#06b6d4', fontWeight: 600 }}>{m.company}</span>
                        <div style={{ fontSize: 12, color: '#f59e0b', marginTop: 2 }}>
                          ⭐ {m.rating} ({m.reviewCount} Görüşme)
                        </div>
                      </div>
                    </div>

                    <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5, marginBottom: 16 }}>
                      {m.bio}
                    </p>

                    <div style={{ fontSize: 12, color: '#cbd5e1', marginBottom: 16 }}>
                      <strong style={{ color: '#22d3ee', display: 'block', marginBottom: 4 }}>Uzmanlık Konuları:</strong>
                      {m.topics.slice(0, 2).map((top) => (
                        <div key={top}>• {top}</div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setMentorModal(m)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: 'rgba(6, 182, 212, 0.15)',
                      border: '1px solid #06b6d4',
                      color: '#22d3ee',
                      borderRadius: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: 13
                    }}
                  >
                    Birebir Mentorluk İste
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Opportunities */}
        {activeMainTab === 'opportunities' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {seedJobs.map((job) => {
              const isApplied = appliedJobIds.includes(job.id);
              return (
                <div
                  key={job.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    borderRadius: 18,
                    padding: 24,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 16
                  }}
                >
                  <div style={{ flex: '1 1 320px' }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ background: job.type === 'Staj' ? 'rgba(16,185,129,0.15)' : 'rgba(6,182,212,0.15)', color: job.type === 'Staj' ? '#10b981' : '#22d3ee', padding: '3px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                        {job.type}
                      </span>
                      <strong style={{ color: '#fff', fontSize: 18 }}>{job.title}</strong>
                    </div>
                    <div style={{ color: '#06b6d4', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                      {job.company} · <span style={{ color: '#94a3b8' }}>{job.location}</span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: 13, margin: '0 0 10px 0', lineHeight: 1.5 }}>
                      {job.description}
                    </p>
                    <div style={{ fontSize: 12, color: '#cbd5e1' }}>
                      <strong>Gereken Beceriler:</strong> {job.skills}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: '#f59e0b', marginBottom: 8 }}>
                      Son Başvuru: {job.deadline}
                    </div>
                    <button
                      onClick={() => applyJob(job.id)}
                      disabled={isApplied}
                      style={{
                        padding: '10px 24px',
                        background: isApplied ? 'rgba(16, 185, 129, 0.2)' : 'linear-gradient(135deg, #0891b2, #0f766e)',
                        border: isApplied ? '1px solid #10b981' : 'none',
                        color: isApplied ? '#10b981' : '#fff',
                        borderRadius: 12,
                        fontWeight: 700,
                        cursor: isApplied ? 'default' : 'pointer',
                        fontSize: 14
                      }}
                    >
                      {isApplied ? '✅ Başvuruldu' : 'Hemen Başvur'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />

      {/* Discipline Detail Modal */}
      {detailModalDiscipline && (
        <Modal
          title={`${detailModalDiscipline.name}`}
          onClose={() => setDetailModalDiscipline(null)}
          maxWidth={750}
        >
          <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 12, marginBottom: 20, overflowX: 'auto' }}>
            {[
              ['overview', 'Genel Bakış'],
              ['courses', 'Dersler & Müfredat'],
              ['tools', 'Kullanılan Araçlar'],
              ['career', 'Kariyer & Maaş'],
              ['universities', 'Öne Çıkan Üniversiteler']
            ].map(([k, label]) => (
              <button
                key={k}
                onClick={() => setDetailActiveTab(k)}
                style={{
                  background: detailActiveTab === k ? '#06b6d4' : 'transparent',
                  color: detailActiveTab === k ? '#0f172a' : '#94a3b8',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {detailActiveTab === 'overview' && (
            <div>
              <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
                {detailModalDiscipline.overview}
              </p>
              <h4 style={{ color: '#22d3ee', fontSize: 16, marginBottom: 12 }}>Alt Uzmanlık Alanları:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {detailModalDiscipline.subfields.map((sub, i) => (
                  <div key={i} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: 12, borderRadius: 10 }}>
                    <strong style={{ color: '#fff', fontSize: 14 }}>{sub.name}:</strong>
                    <span style={{ color: '#94a3b8', fontSize: 13, marginLeft: 8 }}>{sub.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailActiveTab === 'courses' && (
            <div>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>
                Bu disiplinde 4 yıl boyunca göreceğiniz en kritik temel mühendislik dersleri:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {detailModalDiscipline.courses.map((course, i) => (
                  <div key={i} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px 16px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <i className="fa-solid fa-book-bookmark" style={{ color: '#06b6d4' }} />
                    <span style={{ color: '#f8fafc', fontSize: 13, fontWeight: 600 }}>{course}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailActiveTab === 'tools' && (
            <div>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>
                Sektörde aranan en popüler diller, simülasyon ve CAD araçları:
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {detailModalDiscipline.tools.map((tool) => (
                  <span key={tool} style={{ background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#22d3ee', padding: '8px 16px', borderRadius: 10, fontSize: 14, fontWeight: 700 }}>
                    <i className="fa-solid fa-code" style={{ marginRight: 6 }} /> {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {detailActiveTab === 'career' && (
            <div>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: 16, borderRadius: 12, marginBottom: 20 }}>
                <strong style={{ color: '#10b981', display: 'block', fontSize: 13 }}>💰 Sektör Maaş Skalası:</strong>
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{detailModalDiscipline.salaryRange}</span>
              </div>
              <h4 style={{ color: '#fff', fontSize: 15, marginBottom: 10 }}>Geleceğin Pozisyonları:</h4>
              <ul style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, paddingLeft: 20 }}>
                {detailModalDiscipline.careerPaths.map((pos) => (
                  <li key={pos}>{pos}</li>
                ))}
              </ul>
            </div>
          )}

          {detailActiveTab === 'universities' && (
            <div>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>
                Türkiye’de bu alanda en güçlü akademik kadroya ve laboratuvarlara sahip üniversiteler:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {detailModalDiscipline.topUniversities.map((uni, i) => (
                  <div key={i} style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px 16px', borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{uni}</span>
                    <span style={{ color: '#06b6d4', fontSize: 12, fontWeight: 600 }}>Detayları Gör →</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal>
      )}

      {/* Mentor Request Modal */}
      {mentorModal && (
        <Modal title={`${mentorModal.name} ile Görüşme Talebi`} onClose={() => setMentorModal(null)}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 18 }}>
            {mentorModal.title} ({mentorModal.company}) için görüşme konunuzu ve öğrenmek istediklerinizi yazın.
          </p>

          <form onSubmit={handleMentorRequestSubmit}>
            <div className="form-group" style={{ marginBottom: 18 }}>
              <label>Görüşme Notunuz ve Sorularınız</label>
              <textarea
                required
                rows={4}
                value={mentorNote}
                onChange={(e) => setMentorNote(e.target.value)}
                placeholder="Örn: Kariyer hedeflerim, staj fırsatları ve portföyüm hakkında tavsiye almak istiyorum..."
                style={{ width: '100%', padding: 12, borderRadius: 10, background: '#0f172a', border: '1px solid rgba(6,182,212,0.3)', color: '#fff', outline: 'none' }}
              />
            </div>

            <button className="submit-btn" style={{ width: '100%' }}>
              Talebi Gönder
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
