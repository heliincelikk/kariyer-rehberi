import { useState } from 'react';

const genelSorular = [
  { soru: "Günde kaç saatini bilgisayar başında geçirmekten keyif alırsın?", secenekler: [{ metin: "5 saatten fazla! Dijital dünyayı keşfetmek harika.", alan: "tech" }, { metin: "En fazla 1-2 saat, insanlarla yüz yüze olmayı yeğlerim.", alan: "social" }] },
  { soru: "Bir problemle karşılaştığında hangisini çözmek seni daha çok tatmin eder?", secenekler: [{ metin: "Bir yazılım hatasını veya teknik bir problemi çözmek.", alan: "tech" }, { metin: "İnsanlar arasındaki bir anlaşmazlığı konuşarak çözmek.", alan: "social" }] },
  { soru: "Biyoloji, insan anatomisi veya laboratuvar araştırmaları ilgini çeker mi?", secenekler: [{ metin: "Evet, hastalıkların tedavisini ve bilimi incelemek heyecanlı.", alan: "health" }, { metin: "Pek sayılmaz, teknoloji veya sosyal dinamikler daha bana göre.", alan: "social" }] },
  { soru: "Bir projede hangi rolde olmak seni daha çok motive eder?", secenekler: [{ metin: "Arka planda teknik altyapıyı ve lojistiği kurmak.", alan: "tech" }, { metin: "Ekibi koordine etmek, sunum yapmak ve motivasyon sağlamak.", alan: "social" }] },
  { soru: "Boş zamanlarında hangisini araştırmak daha çok ilgini çeker?", secenekler: [{ metin: "Yeni çıkan yapay zeka araçlarını ve teknolojik cihazları.", alan: "tech" }, { metin: "İnsan psikolojisi, kişisel gelişim ve toplumsal trendleri.", alan: "social" }] },
  { soru: "Hastane, klinik veya araştırma laboratuvarı gibi ortamlarda çalışmak sence nasıl?", secenekler: [{ metin: "Topluma ve sağlığa doğrudan dokunabileceğim kutsal bir ortam.", alan: "health" }, { metin: "Bana göre çok kasvetli, modern bir ofis veya ev konforu daha iyi.", alan: "tech" }] },
  { soru: "Karmaşık veri tablolarını, grafikleri ve analiz sonuçlarını incelemekten sıkılır mısın?", secenekler: [{ metin: "Asla! O verilerin içindeki gizli örüntüleri bulmak çok keyifli.", alan: "tech" }, { metin: "Evet, veriler yerine doğrudan insan hikayelerine odaklanmak isterim.", alan: "social" }] },
  { soru: "Bir yakınınız hastalandığında veya yaralandığında ilk tepkiniz ne olur?", secenekler: [{ metin: "Soğukkanlılıkla ne olduğunu anlamaya çalışır, tıbbi çözümlere odaklanırım.", alan: "health" }, { metin: "Ona duygusal olarak destek olur, sakinleştirmeye çalışırım.", alan: "social" }] },
  { soru: "Yalnız başınıza derinlemesine odaklanarak çalışmak mı, yoksa kalabalık bir ekiple beyin fırtınası yapmak mı?", secenekler: [{ metin: "Sessizce kendi başıma teknik detaylara odaklanmak.", alan: "tech" }, { metin: "Sürekli iletişim halinde, dinamik bir ekiple çalışmak.", alan: "social" }] },
  { soru: "İlaçların yapısı, genetik kodlar veya biyoteknolojik gelişmeler ilgini çekiyor mu?", secenekler: [{ metin: "Kesinlikle, geleceğin dünyasını biyoteknolojinin şekillendireceğini düşünüyorum.", alan: "health" }, { metin: "Teknik veya sosyal inovasyonlar kadar ilgimi çekmiyor.", alan: "tech" }] },
  { soru: "Bir web sitesinin tasarımı ve arka planındaki algoritmalar sence ne kadar merak uyandırıcı?", secenekler: [{ metin: "Çok merak ediyorum, o sistemlerin nasıl çalıştığını çözmek isterim.", alan: "tech" }, { metin: "Sadece işlevsel olması yeterli, arkasındaki kodlarla pek ilgilenmem.", alan: "social" }] },
  { soru: "İnsanlara mentorluk yapmak, bir şeyler öğretmek veya onlara rehberlik etmek sence nasıl bir deneyim?", secenekler: [{ metin: "İnanılmaz tatmin edici, birinin hayatına dokunmak harika.", alan: "social" }, { metin: "Güzel ama ben nesnelerle veya dijital sistemlerle uğraşmayı tercih ederim.", alan: "tech" }] },
  { soru: "Gelecekte salgın hastalıkları önleyecek siber veya tıbbi bir sistemin parçası olmak ister miydin?", secenekler: [{ metin: "Evet, tıp ve laboratuvar dünyasında aktif rol alarak.", alan: "health" }, { metin: "Evet ama sadece yazılımsal ve teknolojik altyapısını kurarak.", alan: "tech" }] },
  { soru: "Bir kriz anında hangisini yönetmekte daha başarılısındır?", secenekler: [{ metin: "Teknik aksaklıkları ve sistem arızalarını hızlıca çözmekte.", alan: "tech" }, { metin: "Panik olmuş insanları sakinleştirip organize etmekte.", alan: "social" }] },
  { soru: "Mikroskop altında hücreleri incelemek mi, yoksa kod editöründe satırları taramak mı?", secenekler: [{ metin: "Hücreleri ve biyolojik gizemleri keşfetmek.", alan: "health" }, { metin: "Kod dünyasındaki mantıksal hataları yakalamak.", alan: "tech" }] },
  { soru: "Bir sosyal sorumluluk projesinde insanlarla birebir mülakat yapıp dertlerini dinlemek ister misin?", secenekler: [{ metin: "Evet, insanlara empatiyle yaklaşıp yardım etmek beni mutlu eder.", alan: "social" }, { metin: "Bunun yerine projenin dijital duyurularını ve sistemini yönetmek isterim.", alan: "tech" }] },
  { soru: "Yapay zekanın insan sağlığı üzerindeki teşhis yeteneklerini araştırmak ilgini çeker mi?", secenekler: [{ metin: "Evet, sağlık ve teknolojinin bu muazzam kesişimi harika.", alan: "health" }, { metin: "Ben sadece yapay zekanın saf mühendislik ve kod kısmıyla ilgilenirim.", alan: "tech" }] },
  { soru: "Bir topluluğun önünde etkili konuşmalar yapmak ve insanları ikna etmek senin için kolay mıdır?", secenekler: [{ metin: "Evet, kendimi ifade etmekte ve insanları etkilemekte iyiyimdir.", alan: "social" }, { metin: "Biraz çekinirim, fikirlerimi yazarak veya üreterek göstermeyi severim.", alan: "tech" }] },
  { soru: "Doğadaki bitkilerin şifalı özlerini veya kimyasal bileşenleri laboratuvarda test etmek ister miydin?", secenekler: [{ metin: "Çok isterdim, bilimsel araştırmalar bana büyük heyecan veriyor.", alan: "health" }, { metin: "Sosyal projeler geliştirmek ya da dijital oyun tasarlamak daha cazip.", alan: "social" }] },
  { soru: "Son olarak, seni en çok neyin takdir edilmesi mutlu eder?", secenekler: [{ metin: "Ürettiğim teknik bir sistemin veya çözümün kusursuz çalışması.", alan: "tech" }, { metin: "İnsanların hayatında yarattığım olumlu değişimin ve sevginin.", alan: "social" }] }
];

const techAltSorular = [
  { soru: "Sistemlerin açıklarını bulup sızma testleri yapmak mı, yoksa sıfırdan büyük veri tabanları kurup mimariyi yönetmek mi?", secenekler: [{ metin: "Açıkları yakalamak, defans ve ofans sistemleri kurmak!", alan: "siber" }, { metin: "Verileri organize etmek, API tasarlamak ve sunucu yönetmek!", alan: "backend" }] },
  { soru: "Bir bilgisayar korsanının (hacker) saldırı stratejisini çözmek mi daha heyecanlı, yoksa saniyede binlerce istek alan bir sitenin çökmesini engellemek mi?", secenekler: [{ metin: "Kesinlikle hacker hamlelerini bozmak ve siber kalkan olmak!", alan: "siber" }, { metin: "Arka plan mimarisini optimize etmek ve sunucuyu uçurmak!", alan: "backend" }] },
  { soru: "Linux terminal ekranında komutlar yazarak ağ trafiğini izlemek mi, yoksa SQL ile devasa tabloları birbirine bağlamak mı?", secenekler: [{ metin: "Terminalde Wireshark ile paket analizi yapmak.", alan: "siber" }, { metin: "SQLite veya PostgreSQL ile veri tabanı ilişkileri (ERD) kurmak.", alan: "backend" }] },
  { soru: "Bir şirkette hangi olay seni daha çok alarma geçirir?", secenekler: [{ metin: "Veri tabanındaki şifrelerin dışarı sızdırılma ihtimali.", alan: "siber" }, { metin: "Kullanıcı kayıt sisteminin yavaşlaması ve çökmesi.", alan: "backend" }] },
  { soru: "Kriptoloji (şifreleme bilimi) ve gizli mesajları çözmek mi, yoksa bir uygulamanın kayıt olma algoritmasını (Auth flow) sıfırdan yazmak mı?", secenekler: [{ metin: "Kriptografik algoritmalar ve şifre kırma yöntemleri.", alan: "siber" }, { metin: "Güvenli ve hızlı API uç noktaları (Endpoints) geliştirmek.", alan: "backend" }] },
  { soru: "Bir cihazın arkasında çalışan 'görünmez' mekanizmaları kodlamak mı, yoksa o cihaza dışarıdan gelebilecek port saldırılarını engellemek mi?", secenekler: [{ metin: "Portları taramak, güvenlik duvarı (Firewall) kurmak.", alan: "siber" }, { metin: "Server-side mantığını kurup sistemi ayağa kaldırmak.", alan: "backend" }] },
  { soru: "Sosyal mühendislik (insanları manipüle ederek bilgi sızdırma) yöntemlerini analiz etmek ilgini çeker mi?", secenekler: [{ metin: "Evet, siber güvenliğin en kritik insan faktörünü incelemek harika.", alan: "siber" }, { metin: "Pek değil, ben temiz kod yazmaya ve nesne yönelimli programlamaya (OOP) odaklanırım.", alan: "backend" }] },
  { soru: "Bir uygulamanın bulut sistemlerde (AWS, Azure) güvenle izole edilmesi mi, yoksa mikroservislerin birbiriyle hızlıca haberleşmesi mi?", secenekler: [{ metin: "Siber saldırılara karşı bulut mimarisini kilitlemek.", alan: "siber" }, { metin: "Docker ve Kubernetes ile backend servislerini dağıtmak.", alan: "backend" }] },
  { soru: "Hangisi kulağa daha çok bir dedektiflik hikayesi gibi geliyor?", secenekler: [{ metin: "Bir sisteme sızan zararlı yazılımın (malware) izini sürmek.", alan: "siber" }, { metin: "Sistem loglarını inceleyip hangi kod satırının performans darboğazı yarattığını bulmak.", alan: "backend" }] },
  { soru: "Sızma testi raporu hazırlamak mı, yoksa teknik staj defterine backend mimarisini şemalarla dökmek mi?", secenekler: [{ metin: "Siber açıklık raporları ve sızma haritaları çıkarma.", alan: "siber" }, { metin: "Sistem mimarisi, veri tabanı şemaları ve API dokümantasyonu.", alan: "backend" }] },
  { soru: "Bir ağa bağlı tüm akıllı cihazları (IoT) hacklenmeye karşı test etmek mi, yoksa o cihazların verilerini toplayan merkezi sunucuyu kodlamak mı?", secenekler: [{ metin: "IoT cihazların firmware açıklarını aramak.", alan: "siber" }, { metin: "Merkezi IoT veri toplama backend'ini inşa etmek.", alan: "backend" }] },
  { soru: "Siber istihbarat toplamak ve 'Dark Web' analizi yapmak mı, yoksa asenkron veri işleme mimarileri kurmak mı?", secenekler: [{ metin: "Tehdit aktörlerini ve dijital ayak izlerini takip etmek.", alan: "siber" }, { metin: "Redis veya RabbitMQ gibi kuyruk sistemleriyle veri akışı yönetmek.", alan: "backend" }] },
  { soru: "Bir bankacılık uygulamasında hangisini denetlemek istersin?", secenekler: [{ metin: "Para transferi esnasında araya girme (Man-in-the-Middle) açıklarını.", alan: "siber" }, { metin: "Aynı anda 1 milyon kişinin para transferi yapabilmesini sağlayan altyapıyı.", alan: "backend" }] },
  { soru: "Şifrelerin 'Hash'lenme yöntemlerini (MD5, SHA-256) incelemek mi, yoksa bir veriyi en hızlı şekilde cache'leme yöntemlerini bulmak mı?", secenekler: [{ metin: "Geri dönüştürülemeyen şifreleme ve hash mekanizmaları.", alan: "siber" }, { metin: "Performansı uçuracak caching stratejileri.", alan: "backend" }] },
  { soru: "Bir siber savaş senaryosunda 'Kırmızı Takım' (Saldırı) mı yoksa 'Mavi Takım' (Savunma) mı olmak istersin?", secenekler: [{ metin: "Fark etmez, siber operasyonların tam kalbinde olmak heyecanlı.", alan: "siber" }, { metin: "Ben sistemi ayakta tutan lojistik ekibin, yani mimarların yanında olurum.", alan: "backend" }] },
  { soru: "Web uygulamalarında XSS ve SQL Injection açıklarını aramak mı, yoksa bu açıkları engelleyecek temiz kod standartlarıyla backend mimarisi kurmak mı?", secenekler: [{ metin: "Açığı bulup sömürmek (Exploit yapmak).", alan: "siber" }, { metin: "Sistemi en baştan güvenli kod mimarisiyle inşa etmek.", alan: "backend" }] },
  { soru: "Bir sistem çöktüğünde ilk şüphen ne olur?", secenekler: [{ metin: "DDoS saldırısı mı alıyoruz acaba?", alan: "siber" }, { metin: "Bir yerlerde bellek sızıntısı (Memory leak) veya yanlış bir döngü mü var?", alan: "backend" }] },
  { soru: "Blockchain teknolojisinin şifreleme zincirleri mi ilgini çekiyor, yoksa akıllı kontratların backend işleyişi mi?", secenekler: [{ metin: "Kırılamaz kriptografik zincir mantığı.", alan: "siber" }, { metin: "Dağıtık sistemlerin arka planda veri işleme hızı.", alan: "backend" }] },
  { soru: "Ransomware (Fidye yazılımları) tarafından kilitlenen verileri kurtarma analizi mi, yoksa çöken bir veri tabanını yedekten ayağa kaldırmak mı?", secenekler: [{ metin: "Fidye yazılımı analizi ve tersine mühendislik.", alan: "siber" }, { metin: "Veri tabanı replikasyonu ve yedekleme sistemleri.", alan: "backend" }] },
  { soru: "Son olarak, bir yazılım projesinde seni en karizmatik gösteren rol hangisidir?", secenekler: [{ metin: "Görünmez siber kalkanları ve sistem güvenliğini yöneten siber uzmanı.", alan: "siber" }, { metin: "Tüm sistemin yükünü sırtında taşıyan, motoru kuran backend mühendisi.", alan: "backend" }] }
];

const uzmanlarDb = {
  siber: [
    { isim: "Okan Aslan", unvan: "Kıdemli Sızma Testi Uzmanı", avatar: "🥷", desc: "Siber güvenlik ekosisteminde yol almak, CTF yarışmalarına hazırlanmak ve defans stratejileri geliştirmek için yanındayım!" },
    { isim: "Buse Demir", unvan: "SOC Güvenlik Analisti", avatar: "🛡️", desc: "Tehdit avcılığı, malware analizi ve siber istihbarat alanında birlikte tırmanalım." }
  ],
  backend: [
    { isim: "Can Yılmaz", unvan: "Kıdemli Backend Mimarı", avatar: "👨‍💻", desc: "Node.js, Python, veri tabanı optimizasyonları ve mikroservis mimarileri konusunda projelerini uçuralım." },
    { isim: "Murat Kaya", unvan: "DevOps Mühendisi", avatar: "☁️", desc: "Sunucu yönetimi, Docker ve Kubernetes süreçlerinde mentörlük için buradayım." }
  ],
  tech_genel: [
    { isim: "Can Yılmaz", unvan: "Kıdemli Backend Mimarı", avatar: "👨‍💻", desc: "Teknoloji dünyasının kapılarını araladın! Yazılım ekosistemindeki tüm rolleri konuşmak için sabırsızlanıyorum." },
    { isim: "Okan Aslan", unvan: "Siber Güvenlik Direktörü", avatar: "🛡️", desc: "Mühendislik dünyasındaki teknik uzmanlık alanlarını keşfetmek için yol arkadaşın olmaya hazırım." }
  ],
  social: [
    { isim: "Selin Aktaş", unvan: "İK & Topluluk Yöneticisi", avatar: "👩‍💼", desc: "İletişim, liderlik, network büyütme ve insan kaynakları trendleri konusunda yol haritanı çizelim." }
  ],
  health: [
    { isim: "Dr. Elif Arslan", unvan: "Sağlık Teknolojileri Araştırmacısı", avatar: "👩‍⚕️", desc: "Biyoteknoloji, veri analitiği destekli tıp çözümleri ve laboratuvar inovasyonlarını keşfedelim." }
  ]
};

export default function Quiz() {
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
    const updatedScores = { ...scores, [alan]: scores[alan] + 1 };
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
          title: "Siber Güvenlik & Savunma Sistemleri",
          desc: "Detektiflik ruhun, sistem açıklarını yakalama arzun ve güvenlik reflekslerin çok güçlü! Siber güvenlik dünyasının aranan kalkanı olabilirsin.",
          uzmanKey: "siber"
        };
      }
      return {
        title: "Backend Mimarisi & Dağıtık Sistemler",
        desc: "Sistemlerin görünmez kahramanı, devasa verilerin ve yüksek performanslı sunucuların mimarı sensin! Backend & Bulut alanında harikalar yaratabilirsin.",
        uzmanKey: "backend"
      };
    } else {
      const max = Math.max(scores.tech, scores.social, scores.health);
      if (scores.tech === max) {
        return {
          title: "Yazılım, Teknoloji & Mühendislik",
          desc: "Mantıksal problem çözme ve dijital dünyada yeni şeyler üretme potansiyelin çok yüksek. Mühendislik ve yazılım alanları tam sana göre!",
          uzmanKey: "tech_genel",
          showSubTest: true
        };
      }
      if (scores.social === max) {
        return {
          title: "Yönetim, İletişim & Endüstriyel Süreçler",
          desc: "İnsan ilişkileri, organizasyon, stratejik yönetim ve liderlik yönün çok kuvvetli. Endüstri mühendisliği, ürün yönetimi ve operasyon rolleri senin alanın.",
          uzmanKey: "social"
        };
      }
      return {
        title: "Biyomedikal, Sağlık Teknolojileri & Biyomühendislik",
        desc: "Sağlık inovasyonları, biyoteknoloji ve laboratuvar temelli mühendislik disiplinleri senin merak ve motivasyonunla kusursuz örtüşüyor.",
        uzmanKey: "health"
      };
    }
  };

  const result = stage === 'result' ? getResult() : null;
  const mentors = result ? (uzmanlarDb[result.uzmanKey] || []) : [];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at center, #1e1b4b, #020617)',
      color: '#ffffff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      position: 'relative',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{
        position: 'absolute',
        top: 20,
        left: 24,
        zIndex: 10
      }}>
        <a href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          color: '#06b6d4',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: 15,
          background: 'rgba(15,23,42,0.6)',
          padding: '8px 16px',
          borderRadius: 12,
          border: '1px solid rgba(6,182,212,0.3)'
        }}>
          <i className="fa-solid fa-arrow-left" /> Ana Sayfa
        </a>
      </div>

      <div style={{
        width: '100%',
        maxWidth: 680,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        zIndex: 5
      }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 800,
            background: 'linear-gradient(to right, #06b6d4, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            EngineersPath Kariyer Analizi
          </h1>

          {stage === 'quiz' && (
            <>
              <div style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600 }}>
                Soru {currentIndex + 1} / {questions.length}
              </div>
              <div style={{
                width: '100%',
                height: 6,
                background: 'rgba(15, 23, 42, 0.6)',
                borderRadius: 10,
                overflow: 'hidden',
                border: '1px solid rgba(6, 182, 212, 0.15)'
              }}>
                <div style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(to right, #06b6d4, #10b981)',
                  transition: 'width 0.4s ease'
                }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <button onClick={handleBack} style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: 14,
                  cursor: 'pointer',
                  padding: 0,
                  fontWeight: 600
                }}>
                  <i className="fa-solid fa-arrow-left" /> Önceki soruya dön
                </button>
              </div>
            </>
          )}
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.65)',
          border: '2px solid rgba(6, 182, 212, 0.25)',
          borderRadius: 24,
          padding: 'clamp(24px, 4vw, 40px)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          textAlign: 'center'
        }}>
          {stage === 'welcome' && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 28, color: '#f8fafc' }}>
                Kariyer Yolculuğuna Nasıl Başlamak İstersin?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <button
                  onClick={() => startQuiz('genel')}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(16, 185, 129, 0.1))',
                    border: '2px solid rgba(6, 182, 212, 0.35)',
                    borderRadius: 16,
                    padding: 24,
                    color: '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#22d3ee', marginBottom: 4 }}>
                    🎯 Genel Mühendislik ve Kariyer Testi (20 Soru)
                  </div>
                  <div style={{ fontSize: 13, color: '#94a3b8' }}>
                    Alanımı henüz bilmiyorum, tüm disiplinler arasından bana en uygun rotayı keşfetmek istiyorum.
                  </div>
                </button>

                <button
                  onClick={() => startQuiz('ozel-tech')}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(16, 185, 129, 0.1))',
                    border: '2px solid rgba(6, 182, 212, 0.35)',
                    borderRadius: 16,
                    padding: 24,
                    color: '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#10b981', marginBottom: 4 }}>
                    💻 Teknoloji & Yazılım Odaklı Alt Alan Testi (20 Soru)
                  </div>
                  <div style={{ fontSize: 13, color: '#94a3b8' }}>
                    Siber Güvenlik mi, Backend & Bulut mu? Doğrudan teknik alt uzmanlık alanımı bul.
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
                marginBottom: 24,
                color: '#f8fafc'
              }}>
                {questions[currentIndex].soru}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {questions[currentIndex].secenekler.map((sec, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(sec.alan)}
                    style={{
                      width: '100%',
                      background: 'rgba(15, 23, 42, 0.75)',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                      borderRadius: 14,
                      padding: '16px 20px',
                      color: '#cbd5e1',
                      fontSize: 15,
                      fontWeight: 600,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12
                    }}
                  >
                    <span style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'rgba(6, 182, 212, 0.15)',
                      color: '#22d3ee',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 13,
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
            <div style={{ textAlign: 'left' }}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <span style={{ fontSize: 48 }}>🎉</span>
                <h2 style={{ fontSize: 24, color: '#10b981', fontWeight: 800, margin: '12px 0 8px 0' }}>
                  {result.title}
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.6 }}>
                  {result.desc}
                </p>
              </div>

              {result.showSubTest && (
                <div style={{ marginBottom: 24, textAlign: 'center' }}>
                  <button
                    onClick={() => startQuiz('ozel-tech')}
                    style={{
                      background: 'linear-gradient(to right, #06b6d4, #10b981)',
                      border: 'none',
                      color: 'white',
                      padding: '14px 20px',
                      fontSize: 15,
                      fontWeight: 700,
                      borderRadius: 12,
                      cursor: 'pointer',
                      width: '100%',
                      boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
                    }}
                  >
                    🚀 Teknoloji Alt Alan Testini Çöz (Siber vs Backend)
                  </button>
                </div>
              )}

              <div style={{
                fontSize: 16,
                color: '#06b6d4',
                fontWeight: 700,
                margin: '25px 0 12px 0',
                borderLeft: '3px solid #06b6d4',
                paddingLeft: 10
              }}>
                Bu Alanda Sana Rehberlik Edecek Mentörler
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {mentors.map((m, i) => (
                  <div key={i} style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 14,
                    padding: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15
                  }}>
                    <div style={{ fontSize: 32, background: 'rgba(255,255,255,0.04)', padding: 8, borderRadius: '50%' }}>
                      {m.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: 15, color: '#f8fafc', fontWeight: 700, margin: 0 }}>{m.isim}</h4>
                      <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>{m.unvan}</span>
                      <p style={{ fontSize: 13, color: '#94a3b8', margin: '4px 0 0 0', lineHeight: 1.4 }}>{m.desc}</p>
                    </div>
                    <a href="/kayit" style={{
                      padding: '8px 14px',
                      background: 'rgba(6,182,212,0.15)',
                      border: '1px solid #06b6d4',
                      color: '#67e8f9',
                      borderRadius: 10,
                      textDecoration: 'none',
                      fontSize: 12,
                      fontWeight: 700,
                      whiteSpace: 'nowrap'
                    }}>
                      İletişime Geç
                    </a>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button
                  onClick={() => setStage('welcome')}
                  style={{
                    flex: 1,
                    padding: 12,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#cbd5e1',
                    borderRadius: 12,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  🔄 Testi Baştan Çöz
                </button>
                <a
                  href="/kesfet"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: 12,
                    background: 'linear-gradient(135deg, #0891b2, #0f766e)',
                    color: '#ffffff',
                    borderRadius: 12,
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  🧭 Disiplinleri Keşfet
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
