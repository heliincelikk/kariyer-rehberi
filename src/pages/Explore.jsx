import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const disciplinesData = [
  {
    id: 'computer',
    title: 'Bilgisayar Mühendisliği',
    tag: 'Yazılım & Donanım',
    icon: 'fa-laptop-code',
    desc: 'Yazılım geliştirme, yapay zeka, veri bilimi ve siber güvenlik alanlarında uzmanlaşan disiplin.',
    details: {
      about: 'Bilgisayar Mühendisliği; yazılım tasarımı, sistem mimarisi, yapay zeka, veri analitiği ve ağ sistemleri üzerine odaklanır.',
      courses: ['Veri Yapıları & Algoritmalar', 'İşletim Sistemleri', 'Yapay Zeka & Makine Öğrenmesi', 'Siber Güvenlik'],
      careers: ['Full-Stack Yazılım Geliştirici', 'Veri Bilimci', 'Yapay Zeka Mühendisi', 'DevOps / Cloud Uzmanı']
    }
  },
  {
    id: 'mechanical',
    title: 'Makine Mühendisliği',
    tag: 'Tasarım & Üretim',
    icon: 'fa-gears',
    desc: 'Mekanik sistemler, termodinamik, otomotiv ve savunma sanayii için tasarım yapan köklü disiplin.',
    details: {
      about: 'Makine Mühendisliği; enerji dönüşümleri, mekanik tasarım, CAD/CAM simülasyonları ve üretim süreçlerini inceler.',
      courses: ['Termodinamik', 'Akışkanlar Mekaniği', 'CAD / SolidWorks Tasarım', 'Makine Elemanları'],
      careers: ['Otomotiv Tasarım Mühendisi', 'AR-GE Uzmanı', 'Savunma Sanayii Mekanik Mühendisi', 'Enerji Sistemleri Mühendisi']
    }
  },
  {
    id: 'electrical',
    title: 'Elektrik-Elektronik',
    tag: 'Enerji & Gömülü',
    icon: 'fa-bolt',
    desc: 'Elektronik devreler, haberleşme, gömülü sistemler ve güç elektroniği geliştiren mühendislik dalı.',
    details: {
      about: 'Mikrodenetleyiciler, haberleşme protokolleri, sinyal işleme ve elektrik devre tasarımı uzmanlığı sağlar.',
      courses: ['Devre Teorisi', 'Sinyaller ve Sistemler', 'Gömülü Sistemler (C/C++)', 'Güç Elektroniği'],
      careers: ['Gömülü Sistemler Mühendisi', 'Haberleşme Uzmanı', 'Otonom Araç Radar / Sensör Mühendisi']
    }
  },
  {
    id: 'industrial',
    title: 'Endüstri Mühendisliği',
    tag: 'Optimizasyon & Süreç',
    icon: 'fa-chart-line',
    desc: 'İnsan, makine ve bilgi sistemlerini optimize eden, verimlilik ve tedarik zinciri odaklı disiplin.',
    details: {
      about: 'Süreç yönetimi, yöneylem araştırması, kalite kontrol ve veri analizi ile iş süreçlerini optimize eder.',
      courses: ['Yöneylem Araştırması', 'Tedarik Zinciri Yönetimi', 'Veri Analitiği', 'Kalite Kontrol'],
      careers: ['Tedarik Zinciri Yöneticisi', 'İş Analisti / Data Analyst', 'Üretim Planlama Mühendisi']
    }
  },
  {
    id: 'civil',
    title: 'İnşaat Mühendisliği',
    tag: 'Yapı & Altyapı',
    icon: 'fa-building',
    desc: 'Köprü, bina, baraj ve ulaşım altyapılarının tasarımı ve statik hesaplamalarını yapan disiplin.',
    details: {
      about: 'Statik analizler, malzeme bilimi, deprem mühendisliği ve şantiye yönetimi üzerine uzmanlaşır.',
      courses: ['Statik & Mukavemet', 'Betonarme', 'Geoteknik Mühendisliği', 'Deprem Mühendisliği'],
      careers: ['Statik Proje Mühendisi', 'Şantiye Şefi', 'Geoteknik Uzmanı', 'Yapı Denetim Uzmanı']
    }
  },
  {
    id: 'chemical',
    title: 'Kimya Mühendisliği',
    tag: 'Süreç & Malzeme',
    icon: 'fa-flask',
    desc: 'Kimyasal süreçler, reaktör tasarımı, ilaç ve biyoteknoloji üretimi gerçekleştiren disiplin.',
    details: {
      about: 'Hammadde işleme, polimer sanayii, ilaç üretimi ve petrokimya alanlarında reaktör ve süreç tasarlar.',
      courses: ['Kütle ve Isı Transferi', 'Reaktör Tasarımı', 'Termodinamik II', 'Polimer Teknolojisi'],
      careers: ['Proses Mühendisi', 'İlaç / Biyoteknoloji AR-GE Uzmanı', 'Petrokimya Mühendisi']
    }
  },
  {
    id: 'biomedical',
    title: 'Biyomedikal Mühendisliği',
    tag: 'Sağlık & Medikal',
    icon: 'fa-dna',
    desc: 'Tıbbi cihazlar, protezler ve yapay organ teknolojilerini geliştiren yenilikçi disiplin.',
    details: {
      about: 'Sağlık sektörü için protez, görüntüleme sistemleri (MR/BT), medikal sensörler geliştirir.',
      courses: ['Biyomedikal Sinyal İşleme', 'Biyomalzemeler', 'Tıbbi Görüntüleme', 'Anatomi & Fizyoloji'],
      careers: ['Tıbbi Cihaz Tasarım Uzmanı', 'Klinik Mühendisi', 'Biyosensör AR-GE Mühendisi']
    }
  },
  {
    id: 'aerospace',
    title: 'Havacılık ve Uzay',
    tag: 'Aerodinamik & Uydu',
    icon: 'fa-plane',
    desc: 'Uçak, İHA/SİHA, roket ve uydu sistemleri tasarımı yapan geleceğin mühendislik disiplini.',
    details: {
      about: 'Aerodinamik, itki sistemleri, roket teknolojileri ve otonom uçuş yazılımları geliştirir.',
      courses: ['Aerodinamik', 'İtki Sistemleri (Jet Engines)', 'Uçuş Dinamiği & Kontrol', 'Uzay Mekaniği'],
      careers: ['İHA / SİHA Tasarım Mühendisi', 'Aerodinamik Uzmanı', 'Uydu Sistemleri Mühendisi']
    }
  }
];

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);

  const filteredDisciplines = disciplinesData.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="page-banner">
        <h1>Mühendislik Disiplinlerini <span>Keşfet</span> 🔍</h1>
        <p>Geleceğine yön verecek mühendislik dallarını incele, derslerini öğren ve kariyer fırsatlarını gör.</p>
        
        <div style={{ maxWidth: '600px', margin: '30px auto 0 auto', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Disiplin veya yetenek ara (Örn: Yazılım, Tasarım, Aerodinamik)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '30px',
              border: '2px solid rgba(6, 182, 212, 0.4)',
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              color: '#fff',
              fontSize: '16px',
              outline: 'none',
              backdropFilter: 'blur(10px)'
            }}
          />
        </div>
      </div>

      <div className="showcase-section visible">
        <div className="discipline-grid">
          {filteredDisciplines.map(d => (
            <div key={d.id} className="discipline-card">
              <div>
                <div className="card-header-flex">
                  <div className="card-icon">
                    <i className={`fa-solid ${d.icon}`}></i>
                  </div>
                  <span className="discipline-tag">{d.tag}</span>
                </div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </div>
              <button 
                className="discipline-btn"
                onClick={() => setSelectedDiscipline(d)}
              >
                Detaylı Rehberi İncele <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* DİSİPLİN DETAY MODAL */}
      {selectedDiscipline && (
        <div className="modal-overlay active" onClick={() => setSelectedDiscipline(null)}>
          <div className="discipline-detail-modal-box" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={() => setSelectedDiscipline(null)}>&times;</span>
            <div className="detail-modal-header">
              <div className="detail-modal-icon">
                <i className={`fa-solid ${selectedDiscipline.icon}`}></i>
              </div>
              <div>
                <h2 style={{ margin: 0, textAlign: 'left' }}>{selectedDiscipline.title}</h2>
                <span className="discipline-tag" style={{ marginTop: '5px', display: 'inline-block' }}>{selectedDiscipline.tag}</span>
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ color: '#06b6d4', marginBottom: '10px', fontSize: '18px' }}>Genel Tanım</h3>
              <p style={{ color: '#cbd5e1', lineHeight: '1.7' }}>{selectedDiscipline.details.about}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: '#38bdf8', marginBottom: '12px' }}><i className="fa-solid fa-book-open"></i> Öne Çıkan Dersler</h4>
                <ul style={{ listStyle: 'none' }}>
                  {selectedDiscipline.details.courses.map((course, idx) => (
                    <li key={idx} style={{ color: '#e2e8f0', marginBottom: '8px', fontSize: '14px' }}>
                      <i className="fa-solid fa-check" style={{ color: '#10b981', marginRight: '8px' }}></i>
                      {course}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: '#10b981', marginBottom: '12px' }}><i className="fa-solid fa-briefcase"></i> Kariyer Fırsatları</h4>
                <ul style={{ listStyle: 'none' }}>
                  {selectedDiscipline.details.careers.map((career, idx) => (
                    <li key={idx} style={{ color: '#e2e8f0', marginBottom: '8px', fontSize: '14px' }}>
                      <i className="fa-solid fa-user-tie" style={{ color: '#06b6d4', marginRight: '8px' }}></i>
                      {career}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
