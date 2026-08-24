import { createContext, useContext, useEffect, useState } from 'react';
import { seedJobs } from '../data/jobsData';
import { mentorsData } from '../data/mentorsData';

const DashboardContext = createContext();

const initialNotifications = [
  { id: 'n1', title: 'Yeni Mentorluk İsteği', text: 'Bora Aydın (12. Sınıf) sana bir rehberlik talebi gönderdi.', time: '10 dk önce', read: false, tab: 'candidates' },
  { id: 'n2', title: 'Staj Başvuru Güncellemesi', text: 'Trendyol Tech staj başvurunuz İK tarafından incelemeye alındı.', time: '1 saat önce', read: false, tab: 'jobs' },
  { id: 'n3', title: 'Etkinlik Hatırlatması', text: 'Yapay Zeka ve Kariyer Zirvesi webinarı yarın 19:00’da başlıyor.', time: '3 saat önce', read: false, tab: 'school' },
  { id: 'n4', title: 'Yeni Proje Takım İlanı', text: 'TEKNOFEST İHA Takımı ekibine yeni üyeler arıyor.', time: 'Dün', read: true, tab: 'jobs' },
  { id: 'n5', title: 'Anonim Öğrenci Değerlendirmesi', text: 'Bir lise öğrencisi mentörlük görüşmeniz için ⭐⭐⭐⭐⭐ puan verdi.', time: '2 gün önce', read: true, tab: 'candidates' }
];

export function DashboardProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [jobs, setJobs] = useState(seedJobs);
  const [appliedJobIds, setAppliedJobIds] = useState(['job-1']);
  const [savedJobIds, setSavedJobIds] = useState(['job-2', 'job-3']);
  const [mentorRequests, setMentorRequests] = useState([
    { mentorId: 'm1', mentorName: 'Helin Çelik', note: 'Frontend mimarisi ve React projeleri için görüşmek istiyorum.', status: 'Kabul Edildi', date: '22 Ağustos 2026' }
  ]);
  const [candidateRequests, setCandidateRequests] = useState([
    { id: 'c1', name: 'Bora Aydın', grade: '12. Sınıf / Sayısal', goal: 'İTÜ Bilgisayar Müh.', text: 'YKS tercihleri ve İTÜ hazırlık sınavı hakkında sorularım var.', status: 'pending' },
    { id: 'c2', name: 'Nehir Ak', grade: 'Mezun Seviye', goal: 'ODTÜ Elektrik-Elektronik', text: 'Mühendislik okurken staj bulma ve ders yoğunluğu nasıl oluyor?', status: 'pending' }
  ]);
  const [acceptedMentees, setAcceptedMentees] = useState([
    { id: 'c3', name: 'Kaan Arda', grade: '12. Sınıf', goal: 'Boğaziçi Bilgisayar Müh.', text: 'Yazılım ve AI odaklı çalışmalar yapıyorum.' }
  ]);
  const [chats, setChats] = useState({
    'global-ai': [
      { id: 'm1', sender: 'ai', text: 'Merhaba! Ben EngineersPath AI Kariyer Danışmanınım. Hangi mühendislik disiplini, staj veya üniversite hakkında bilgi almak istersin? 🚀' }
    ]
  });

  const notify = (text, tab = 'overview') => {
    const newNotice = {
      id: 'notif-' + Date.now(),
      title: 'Bildirim',
      text,
      time: 'Az önce',
      read: false,
      tab
    };
    setNotifications((prev) => [newNotice, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const applyJob = (jobId, note = '') => {
    if (!appliedJobIds.includes(jobId)) {
      setAppliedJobIds((prev) => [...prev, jobId]);
      const job = jobs.find((j) => j.id === jobId);
      notify(`${job?.title || 'İlan'} için başvurunuz başarıyla alındı!`, 'jobs');
    }
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const createJob = (newJobData) => {
    const newJob = {
      id: 'custom-' + Date.now(),
      applicantsCount: 0,
      ...newJobData
    };
    setJobs((prev) => [newJob, ...prev]);
    notify(`"${newJob.title}" ilanı yayına alındı!`, 'jobs');
  };

  const sendMentorRequest = (mentor, note) => {
    const existing = mentorRequests.find((r) => r.mentorId === mentor.id);
    if (!existing) {
      setMentorRequests((prev) => [
        ...prev,
        { mentorId: mentor.id, mentorName: mentor.name, note, status: 'İstek Gönderildi', date: 'Bugün' }
      ]);
      notify(`${mentor.name} için mentorluk talebiniz iletildi.`, 'mentors');
    }
  };

  const acceptCandidate = (candidate) => {
    setCandidateRequests((prev) => prev.filter((c) => c.id !== candidate.id));
    setAcceptedMentees((prev) => [...prev, candidate]);
    notify(`${candidate.name} mentee olarak kabul edildi! Sohbet başlatabilirsiniz.`, 'candidates');
  };

  const rejectCandidate = (candidateId) => {
    setCandidateRequests((prev) => prev.filter((c) => c.id !== candidateId));
    notify('Mentee talebi yanıtlandı.', 'candidates');
  };

  const sendMessage = (threadId, text) => {
    if (!text.trim()) return;
    const userMsg = { id: 'msg-' + Date.now(), sender: 'user', text };
    setChats((prev) => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), userMsg]
    }));

    // AI or simulated auto-reply
    setTimeout(() => {
      let replyText = 'Mesajını aldım! En kısa sürede detaylı dönüş yapacağım. Başarılar dilerim! 🌟';
      if (threadId.includes('ai')) {
        const lower = text.toLowerCase();
        if (lower.includes('yazılım') || lower.includes('kod') || lower.includes('react') || lower.includes('python')) {
          replyText = 'Yazılım ve Bilgisayar Mühendisliği için algoritmalar, veri yapıları ve gerçek projeler geliştirmek çok önemlidir. GitHub portföyünü güçlendirmeni öneririm!';
        } else if (lower.includes('staj') || lower.includes('cv') || lower.includes('mülakat')) {
          replyText = 'Staj başvurularında ATS uyumlu CV ve en az 2 tamamlanmış proje öne çıkar. EngineersPath üzerindeki staj ilanlarına doğrudan başvurabilirsin!';
        } else if (lower.includes('yks') || lower.includes('net') || lower.includes('üniversite') || lower.includes('sıralama')) {
          replyText = 'YKS hedefin için düzenli TYT/AYT denemeleri çözmek ve zayıf konuları analiz etmek kritik. İTÜ, ODTÜ ve Boğaziçi gibi üniversitelerin taban puanlarını panelinden inceleyebilirsin.';
        } else {
          replyText = 'Harika bir soru! Mühendislik kariyer yolculuğunda sana en doğru kaynakları ve mentorları sunmak için buradayım. Başka ne öğrenmek istersin?';
        }
      }

      const replyMsg = { id: 'reply-' + Date.now(), sender: threadId.includes('ai') ? 'ai' : 'peer', text: replyText };
      setChats((prev) => ({
        ...prev,
        [threadId]: [...(prev[threadId] || []), replyMsg]
      }));
    }, 600);
  };

  return (
    <DashboardContext.Provider
      value={{
        notifications,
        notify,
        markAllAsRead,
        jobs,
        appliedJobIds,
        savedJobIds,
        applyJob,
        toggleSaveJob,
        createJob,
        mentorRequests,
        sendMentorRequest,
        candidateRequests,
        acceptedMentees,
        acceptCandidate,
        rejectCandidate,
        chats,
        sendMessage
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
