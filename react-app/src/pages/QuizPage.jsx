import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { genelSorular, techAltSorular } from '../data/quizData';
import { mentorsData } from '../data/mentorsData';
import { useAuth } from '../context/AuthContext';

export default function QuizPage() {
  const { user } = useAuth();
  const [stage, setStage] = useState('welcome'); // welcome | quiz | result
  const [track, setTrack] = useState('genel'); // genel | ozel-tech
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState({ tech: 0, social: 0, health: 0, siber: 0, backend: 0 });
  const [history, setHistory] = useState([]);

  const questions = track === 'genel' ? genelSorular : techAltSorular;

  const startQuiz = (selectedTrack) => {
    setTrack(selectedTrack);
    setCurrentIndex(0);
    setScores({ tech: 0, social: 0, health: 0, siber: 0, backend: 0 });
    setHistory([]);
    setStage('quiz');
  };

  const handleAnswer = (alan) => {
    const updatedScores = { ...scores, [alan]: (scores[alan] || 0) + 1 };
    setScores(updatedScores);
    setHistory([...history, { index: currentIndex, alan }]);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStage('result');
    }
  };

  const handleBack = () => {
    if (history.length === 0) {
      setStage('welcome');
      return;
    }
    const last = history[history.length - 1];
    setScores({ ...scores, [last.alan]: Math.max(0, scores[last.alan] - 1) });
    setHistory(history.slice(0, -1));
    setCurrentIndex(last.index);
  };

  const getResult = () => {
    if (track === 'ozel-tech') {
      if (scores.siber > scores.backend) {
        return {
          title: "Siber Güvenlik & Tehdit Avcılığı",
          field: "Yazılım / Bilgisayar Mühendisliği (Siber Güvenlik)",
          matchScore: 94,
          desc: "Detektiflik ruhun, sistem açıklarını yakalama arzun ve güvenlik reflekslerin çok güçlü! Siber güvenlik dünyasının aranan kalkanı olabilirsin.",
          skills: ['Linux & Bash', 'Wireshark & Ağ Analizi', 'Kriptografi', 'Sızma Testleri (Pentesting)'],
          suggestedMentorId: 'm3'
        };
      }
      return {
        title: "Backend Mimari & Bulut Sistemleri",
        field: "Yazılım / Bilgisayar Mühendisliği (Backend & Cloud)",
        matchScore: 96,
        desc: "Sistemlerin görünmez kahramanı, devasa verilerin ve yüksek performanslı sunucuların mimarı sensin! Backend & Bulut alanında harikalar yaratabilirsin.",
        skills: ['Node.js & Go', 'PostgreSQL & Redis', 'Docker & Kubernetes', 'REST & GraphQL'],
        suggestedMentorId: 'm2'
      };
    } else {
      const max = Math.max(scores.tech, scores.social, scores.health);
      if (scores.tech === max) {
        return {
          title: "Yazılım, Yapay Zeka & Bilgisayar Mühendisliği",
          field: "Bilgisayar & Yazılım Mühendisliği",
          matchScore: 92,
          desc: "Mantıksal problem çözme ve dijital dünyada yeni şeyler üretme potansiyelin çok yüksek. Kodlama, algoritmalar ve yapay zeka alanları tam sana göre!",
          skills: ['Python', 'Veri Yapıları', 'Yapay Zeka', 'Modern Web & Mobil'],
          showSubTest: true,
          suggestedMentorId: 'm1'
        };
      }
      if (scores.social === max) {
        return {
          title: "Endüstri & Yönetim Mühendisliği",
          field: "Endüstri Mühendisliği",
          matchScore: 90,
          desc: "İnsan ilişkileri, organizasyon, stratejik yönetim ve optimizasyon yönün çok kuvvetli. Süreç yönetimi, veri analitiği ve ürün liderliği senin alanın.",
          skills: ['Yöneylem Araştırması', 'Veri Analitiği (SQL/Power BI)', 'Tedarik Zinciri', 'Ürün Yönetimi'],
          suggestedMentorId: 'm7'
        };
      }
      return {
        title: "Biyomedikal & Sağlık Teknolojileri",
        field: "Biyomedikal Mühendisliği",
        matchScore: 88,
        desc: "Sağlık inovasyonları, medikal cihazlar ve biyoteknoloji laboratuvarları senin merak ve motivasyonunla kusursuz örtüşüyor.",
        skills: ['Biyomedikal Sinyal İşleme', 'Medikal Görüntüleme (MR/BT)', 'Biyomekanik', 'Tıbbi Cihaz Ar-Ge'],
        suggestedMentorId: 'm4'
      };
    }
  };

  const result = stage === 'result' ? getResult() : null;
  const matchedMentor = result ? mentorsData.find((m) => m.id === result.suggestedMentorId) || mentorsData[0] : null;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#ffffff', fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <h1 style={{
            fontSize: 'clamp(26px, 4vw, 36px)',
            fontWeight: 800,
            background: 'linear-gradient(to right, #06b6d4, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 10px 0'
          }}>
            Kariyer & Mühendislik Analizi
          </h1>

          {stage === 'quiz' && (
            <div>
              <div style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600, marginBottom: 8 }}>
                Soru {currentIndex + 1} / {questions.length} (%{progressPercent} Tamamlandı)
              </div>
              <div style={{
                width: '100%',
                height: 8,
                background: 'rgba(15, 23, 42, 0.8)',
                borderRadius: 10,
                overflow: 'hidden',
                border: '1px solid rgba(6, 182, 212, 0.2)'
              }}>
                <div style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(to right, #06b6d4, #10b981)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <div style={{ textAlign: 'left', marginTop: 12 }}>
                <button
                  onClick={handleBack}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#06b6d4',
                    fontSize: 13,
                    cursor: 'pointer',
                    fontWeight: 700,
                    padding: 0
                  }}
                >
                  <i className="fa-solid fa-arrow-left" /> Önceki Soruya Dön
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{
          background: 'rgba(15, 23, 42, 0.75)',
          border: '2px solid rgba(6, 182, 212, 0.3)',
          borderRadius: 24,
          padding: 'clamp(24px, 4vw, 40px)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
        }}>
          {stage === 'welcome' && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, textAlign: 'center', color: '#fff' }}>
                Hangi Kulvarda Analiz Yapmak İstersin?
              </h2>
              <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 14, marginBottom: 30 }}>
                Kişilik eğilimlerin, problem çözme alışkanlıkların ve ilgi alanların analiz edilerek sana en uygun mühendislik disiplini ve uzman mentorlar belirlenir.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <button
                  onClick={() => startQuiz('genel')}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(16, 185, 129, 0.1))',
                    border: '2px solid rgba(6, 182, 212, 0.35)',
                    borderRadius: 18,
                    padding: 24,
                    color: '#fff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.25s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#06b6d4'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#22d3ee', marginBottom: 6 }}>
                    🎯 Genel Mühendislik Uygunluk Testi (20 Soru)
                  </div>
                  <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                    Mühendislik dalları arasında kararsızım; yazılım, makine, elektronik, endüstri ve biyomedikal arasından bana en uygun rotayı keşfetmek istiyorum.
                  </div>
                </button>

                <button
                  onClick={() => startQuiz('ozel-tech')}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(16, 185, 129, 0.1))',
                    border: '2px solid rgba(16, 185, 129, 0.35)',
                    borderRadius: 18,
                    padding: 24,
                    color: '#fff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.25s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#10b981', marginBottom: 6 }}>
                    💻 Yazılım & Teknoloji Alt Alan Testi (20 Soru)
                  </div>
                  <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                    Yazılım ve bilişim alanında ilerlemek istiyorum; Siber Güvenlik mi, Backend & Bulut Mimarisi mi bana daha uygun?
                  </div>
                </button>
              </div>
            </div>
          )}

          {stage === 'quiz' && (
            <div>
              <h3 style={{
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 1.5,
                marginBottom: 28,
                color: '#f8fafc',
                textAlign: 'left'
              }}>
                {questions[currentIndex].soru}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {questions[currentIndex].secenekler.map((sec, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(sec.alan)}
                    style={{
                      width: '100%',
                      background: 'rgba(30, 41, 59, 0.8)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      borderRadius: 16,
                      padding: '18px 20px',
                      color: '#f1f5f9',
                      fontSize: 15,
                      fontWeight: 600,
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#06b6d4';
                      e.currentTarget.style.background = 'rgba(6, 182, 212, 0.18)';
                      e.currentTarget.style.transform = 'translateX(6px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.25)';
                      e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <span style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'rgba(6, 182, 212, 0.2)',
                      color: '#22d3ee',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 14,
                      flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{sec.metin}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {stage === 'result' && result && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <span style={{ fontSize: 54 }}>🎉</span>
                <div style={{
                  display: 'inline-block',
                  margin: '12px 0 6px 0',
                  padding: '4px 14px',
                  borderRadius: 20,
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  fontSize: 13,
                  fontWeight: 800
                }}>
                  Uyum Skoru: %{result.matchScore}
                </div>
                <h2 style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: '4px 0 12px 0' }}>
                  {result.title}
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
                  {result.desc}
                </p>
              </div>

              {/* Skills to develop */}
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: 20, borderRadius: 16, marginBottom: 24 }}>
                <strong style={{ color: '#22d3ee', display: 'block', marginBottom: 10, fontSize: 14 }}>
                  🚀 Sana Önerilen Kritik Beceriler & Odak Alanları:
                </strong>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {result.skills.map((skill) => (
                    <span key={skill} style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', color: '#67e8f9', padding: '6px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Matched Mentor */}
              {matchedMentor && (
                <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 18, padding: 20, marginBottom: 24 }}>
                  <div style={{ fontSize: 12, color: '#10b981', fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>
                    ✨ Bu Alanda Sana Yol Gösterecek Mentorun:
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ fontSize: 36, background: 'rgba(255,255,255,0.05)', padding: 8, borderRadius: '50%' }}>
                      {matchedMentor.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: 16, color: '#fff' }}>{matchedMentor.name}</h4>
                      <span style={{ fontSize: 12, color: '#06b6d4' }}>{matchedMentor.title} ({matchedMentor.company})</span>
                    </div>
                    <a
                      href="/kesfet?tab=mentorship"
                      style={{
                        padding: '8px 16px',
                        background: 'linear-gradient(135deg, #0891b2, #0f766e)',
                        color: '#fff',
                        borderRadius: 10,
                        textDecoration: 'none',
                        fontSize: 13,
                        fontWeight: 700
                      }}
                    >
                      Görüşme İste
                    </a>
                  </div>
                </div>
              )}

              {/* Sub-test trigger */}
              {result.showSubTest && (
                <div style={{ marginBottom: 24, textAlign: 'center' }}>
                  <button
                    onClick={() => startQuiz('ozel-tech')}
                    style={{
                      width: '100%',
                      padding: 14,
                      background: 'linear-gradient(to right, #06b6d4, #10b981)',
                      border: 'none',
                      color: '#fff',
                      fontSize: 15,
                      fontWeight: 700,
                      borderRadius: 12,
                      cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(6, 182, 212, 0.3)'
                    }}
                  >
                    🔍 Teknik Alt Alan Testini Başlat (Siber vs Backend)
                  </button>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setStage('welcome')}
                  style={{
                    flex: 1,
                    padding: 14,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#cbd5e1',
                    borderRadius: 12,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  🔄 Baştan Çöz
                </button>
                <a
                  href="/kesfet"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: 14,
                    background: 'linear-gradient(135deg, #0891b2, #0f766e)',
                    color: '#fff',
                    borderRadius: 12,
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  🧭 Disiplinleri İncele
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
