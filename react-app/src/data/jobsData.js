export const seedJobs = [
  {
    id: 'job-1',
    title: 'Frontend Developer Stajyeri (React / TypeScript)',
    company: 'Trendyol Tech',
    type: 'Staj',
    field: 'Yazılım',
    location: 'İstanbul (Hibrit / Maslak)',
    deadline: '15 Mayıs 2026',
    stipend: 'Asgari Ücret + Yemek Kartı + Donanım Desteği',
    skills: 'React · TypeScript · CSS Grid / Flexbox · REST API · Git',
    description: 'Trendyol Web platformlarının kullanıcı arayüzlerini geliştirecek, yüksek performanslı bileşenler tasarlayacak 3. veya 4. sınıf stajyer mühendisler arıyoruz.',
    requirements: [
      'Üniversitelerin Bilgisayar/Yazılım Müh. 3. veya 4. sınıf öğrencisi olmak',
      'Temel JavaScript/TypeScript ve React bilgisine sahip olmak',
      'Portföyünde en az 2 adet çalışır durumda web projesi bulunmak',
      'Haftada en az 3 gün ofis/uzaktan hibrit çalışabilmek'
    ],
    applicantsCount: 42
  },
  {
    id: 'job-2',
    title: 'Otonom İHA ve Görüntü İşleme Proje Takımı Üyesi',
    company: 'İTÜ / TEKNOFEST Havacılık Takımı',
    type: 'Proje',
    field: 'Havacılık / Yazılım',
    location: 'İstanbul (İTÜ Ayazağa Atölyesi)',
    deadline: '30 Nisan 2026',
    stipend: 'TÜBİTAK 2209 Burs Desteği & Yarışma Ödül Paylaşımı',
    skills: 'Python · ROS2 · OpenCV · PyTorch / YOLO · Linux',
    description: 'TEKNOFEST Uluslararası İHA ve Savaşan İHA kategorilerinde yarışacak otonom hedef tespiti ve rota takip algoritmalarını geliştirecek takım arkadaşı arıyoruz.',
    requirements: [
      'Görüntü işleme ve derin öğrenmeye ilgi duymak',
      'Python ile OpenCV veya PyTorch deneyimi',
      'Haftalık atölye toplantılarına ve uçuş testlerine düzenli katılım',
      'Takım çalışmasına yatkın ve sorumluluk sahibi olmak'
    ],
    applicantsCount: 18
  },
  {
    id: 'job-3',
    title: 'Yapay Zeka & Büyük Veri Staj Programı',
    company: 'ASELSAN Ar-Ge',
    type: 'Staj',
    field: 'Yazılım / Elektronik',
    location: 'Ankara (Macunköy Tesisleri)',
    deadline: '20 Mayıs 2026',
    stipend: 'Kurumsal Stajyer Maaşı + Servis + Öğle Yemeği',
    skills: 'Python · NumPy / Pandas · Scikit-Learn · SQL · Docker',
    description: 'Savunma elektroniği ve radar verilerinin yapay zeka modelleriyle sınıflandırılması ve anomalilerin tespiti üzerine 12 haftalık yoğun staj programı.',
    requirements: [
      'Mühendislik fakültesi 3. veya 4. sınıf öğrencisi olmak (GANO >= 3.00)',
      'Veri analitiği ve makine öğrenmesi algoritmalarına hakimiyet',
      'Güvenlik soruşturmasından geçebilecek TC vatandaşı olmak'
    ],
    applicantsCount: 89
  },
  {
    id: 'job-4',
    title: 'Gömülü Sistemler & IoT Donanım Stajyeri',
    company: 'Baykar Teknoloji',
    type: 'Staj',
    field: 'Elektrik-Elektronik',
    location: 'İstanbul (Özdemir Bayraktar Milli Teknoloji Merkezi)',
    deadline: '25 Mayıs 2026',
    stipend: 'Dolgun Stajyer Bursu + Tam Donanım Seti',
    skills: 'C / C++ · STM32 · FreeRTOS · SPI / I2C / CAN-Bus · Altium',
    description: 'Milli İHA platformlarının sensör füzyonu, motor sürücü ve telemetri kartlarının test ve gömülü yazılım geliştirme aşamalarında yer alacak stajyerler.',
    requirements: [
      'Elektrik-Elektronik veya Mekatronik Müh. öğrencisi olmak',
      'C programlama diline ve mikrodenetleyici mimarilerine hakimiyet',
      'Laboratuvar osiloskop ve multimetre ölçüm tecrübesi'
    ],
    applicantsCount: 65
  },
  {
    id: 'job-5',
    title: 'Full-Stack Hackathon Ekip Arkadaşı (FinTech Projesi)',
    company: 'Öğrenci Girişim Takımı (EngineersPath Hub)',
    type: 'Proje',
    field: 'Yazılım',
    location: 'Uzaktan (Discord / GitHub)',
    deadline: '10 Mayıs 2026',
    stipend: 'Girişim Hissesi & Kuluçka Desteği',
    skills: 'Node.js · PostgreSQL · TailwindCSS · Next.js · Prisma',
    description: 'Üniversite öğrencileri için akıllı bütçe ve staj tasarruf platformu geliştiriyoruz. Yaklaşan üniversiteler arası fintek yarışması için backend ve UI yapacak ortak arıyoruz.',
    requirements: [
      'Haftada 8-10 saat proje geliştirmeye vakit ayırabilmek',
      'Modern web teknolojilerine hevesli ve hızlı öğrenen biri olmak',
      'GitHub ile versiyon kontrolü yapabilmek'
    ],
    applicantsCount: 12
  }
];

export const roadmapsData = [
  {
    id: 'roadmap-frontend',
    title: 'Modern Frontend & Web Geliştirme',
    icon: 'fa-code',
    totalWeeks: '16 Hafta',
    steps: [
      { id: 1, title: 'HTML5 Semantik Yapı & Modern CSS3', detail: 'Flexbox, CSS Grid, Responsive Tasarım, CSS Değişkenleri, Erişilebilirlik (a11y)', done: true },
      { id: 2, title: 'Modern JavaScript (ES6+)', detail: 'Async/Await, Promises, Closures, DOM Manipülasyonu, Array Metodları, Modüller', done: true },
      { id: 3, title: 'React Temelleri & Hook’lar', detail: 'useState, useEffect, useRef, useMemo, Custom Hook’lar, Props & State Yönetimi', done: false },
      { id: 4, title: 'State Yönetimi & Veri Çekme', detail: 'Context API, React Query / TanStack, Redux Toolkit, Axios / Fetch', done: false },
      { id: 5, title: 'Next.js & SSR / SSG', detail: 'App Router, Server Components, API Routes, SEO Optimizasyonu', done: false },
      { id: 6, title: 'TypeScript & Test Otomasyonu', detail: 'Tip tanımları, Generics, Jest, React Testing Library, Cypress', done: false },
      { id: 7, title: 'Portföy ve Canlı Proje Dağıtımı', detail: 'Vercel / Netlify deployment, CI/CD GitHub Actions, Lighthouse 90+ Performans', done: false }
    ]
  },
  {
    id: 'roadmap-backend',
    title: 'Backend Mimari, API & Bulut Sistemleri',
    icon: 'fa-server',
    totalWeeks: '20 Hafta',
    steps: [
      { id: 1, title: 'Programlama Dili & OOP Temelleri', detail: 'Node.js/TypeScript, Python veya Go ile nesne yönelimli ve fonksiyonel kod', done: true },
      { id: 2, title: 'RESTful API & HTTP Standartları', detail: 'Status kodları, Middleware, JWT / OAuth2 Kimlik Doğrulama, Rate Limiting', done: false },
      { id: 3, title: 'İlişkisel & NoSQL Veritabanları', detail: 'PostgreSQL, İndeksleme, Normalizasyon, Redis Caching, MongoDB', done: false },
      { id: 4, title: 'Sistem Tasarımı (System Design)', detail: 'Load Balancers, Mikroservisler, Mesaj Kuyrukları (RabbitMQ / Kafka)', done: false },
      { id: 5, title: 'Docker, Containerization & Linux', detail: 'Dockerfile, docker-compose, Linux bash scripting, sunucu konfigürasyonu', done: false },
      { id: 6, title: 'Bulut Bilişim & CI/CD (AWS / GCP)', detail: 'EC2, S3, RDS, Serverless Lambdas, GitHub Actions pipeline', done: false }
    ]
  },
  {
    id: 'roadmap-ai',
    title: 'Yapay Zeka & Veri Bilimi Yol Haritası',
    icon: 'fa-brain',
    totalWeeks: '24 Hafta',
    steps: [
      { id: 1, title: 'Matematik & İstatistik Temelleri', detail: 'Lineer Cebir, Olasılık Dağılımları, Çok Değişkenli Analiz, Optimizasyon', done: true },
      { id: 2, title: 'Python ile Veri Analitiği', detail: 'NumPy, Pandas, Matplotlib, Seaborn, Veri Temizleme ve Ön İşleme', done: true },
      { id: 3, title: 'Geleneksel Makine Öğrenmesi', detail: 'Regresyon, Karar Ağaçları, Random Forest, XGBoost, Scikit-Learn', done: false },
      { id: 4, title: 'Derin Öğrenme (PyTorch / TensorFlow)', detail: 'Yapay Sinir Ağları (ANN), CNN ile Görüntü İşleme, RNN/LSTM', done: false },
      { id: 5, title: 'LLM & Üretken Yapay Zeka (Generative AI)', detail: 'Transformers, HuggingFace, RAG (Retrieval Augmented Generation), LangChain', done: false },
      { id: 6, title: 'Model Dağıtımı & MLOps', detail: 'FastAPI ile model servis etme, ONNX, MLflow, Docker üzerinde çalıştırma', done: false }
    ]
  }
];
