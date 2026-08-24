export const disciplinesData = [
  {
    id: 'yazilim',
    slug: 'yazilim-bilgisayar',
    name: 'Yazılım / Bilgisayar Mühendisliği',
    category: 'Yazılım & AI',
    icon: 'fa-laptop-code',
    tagline: 'Dijital geleceğin mimarisi, algoritmalar ve yapay zeka sistemleri.',
    overview: 'Yazılım ve Bilgisayar Mühendisliği; modern dünyanın altyapısını oluşturan işletim sistemleri, yapay zeka modelleri, bulut altyapıları, web/mobil uygulamalar ve büyük veri mimarilerini tasarlar ve geliştirir.',
    subfields: [
      { name: 'Yapay Zeka & Makine Öğrenmesi', desc: 'Derin öğrenme, doğal dil işleme (NLP) ve bilgisayarlı görü sistemleri.' },
      { name: 'Backend & Dağıtık Sistemler', desc: 'Mikroservisler, yüksek hacimli API mimarileri ve veritabanı optimizasyonu.' },
      { name: 'Frontend & UI/UX Mühendisliği', desc: 'Modern web arayüzleri, reaktif tasarım ve performans odaklı kullanıcı deneyimi.' },
      { name: 'Siber Güvenlik & Kriptoloji', desc: 'Sızma testleri, tehdit avcılığı ve güvenlik mimarisi tasarımı.' },
      { name: 'Mobil Uygulama Geliştirme', desc: 'iOS (Swift) ve Android (Kotlin/Flutter) yerel ve hibrit mobil çözümler.' }
    ],
    tools: ['Python', 'JavaScript / TypeScript', 'React / Next.js', 'Go / Rust', 'Docker & Kubernetes', 'PostgreSQL / MongoDB', 'Git & GitHub'],
    courses: [
      'Veri Yapıları ve Algoritmalar',
      'Nesne Yönelimli Programlama (OOP)',
      'İşletim Sistemleri',
      'Veritabanı Yönetim Sistemleri',
      'Bilgisayar Ağları ve Güvenlik',
      'Yazılım Mimarisi ve Tasarım Kalıpları'
    ],
    careerPaths: ['Senior Backend Engineer', 'AI / ML Scientist', 'DevOps & Cloud Architect', 'Mobile Lead Developer', 'Chief Technology Officer (CTO)'],
    salaryRange: '35.000 ₺ - 160.000 ₺+ / Ay (Globalde: $60k - $180k+ / Yıl)',
    workTypes: ['Tam Zamanlı', 'Uzaktan / Hibrit (Remote)', 'Freelance / Danışmanlık', 'Global İhracat'],
    topUniversities: ['İTÜ', 'ODTÜ', 'Boğaziçi Üniversitesi', 'Bilkent Üniversitesi', 'Koç Üniversitesi']
  },
  {
    id: 'elektrik',
    slug: 'elektrik-elektronik',
    name: 'Elektrik-Elektronik Mühendisliği',
    category: 'Enerji & Sistem',
    icon: 'fa-bolt',
    tagline: 'Mikroçiplerden dev enerji santrallerine, elektroniğin yön verdiği dünya.',
    overview: 'Elektrik-Elektronik Mühendisliği; nano ölçekli yarı iletkenlerden yüksek gerilim şebekelerine, robotik kontrol sistemlerinden telekomünikasyon uydularına kadar elektrik ve elektromanyetik enerjiyi kontrol eden sistemleri geliştirir.',
    subfields: [
      { name: 'Gömülü Sistemler (Embedded)', desc: 'Mikrodenetleyiciler, gerçek zamanlı işletim sistemleri (RTOS) ve IoT donanımları.' },
      { name: 'Yarı İletken & Çip Tasarımı', desc: 'FPGA, ASIC ve mikroelektronik devre entegrasyonu.' },
      { name: 'Yenilenebilir Enerji & Güç Elektroniği', desc: 'Güneş, rüzgar santralleri ve batarya yönetim sistemleri (BMS).' },
      { name: 'Haberleşme & RF Mühendisliği', desc: '5G/6G haberleşme protokolleri, radar ve mikrodalga sistemleri.' },
      { name: 'Endüstriyel Otomasyon & PLC', desc: 'Fabrika otomasyonu, SCADA ve endüstriyel robot kontrolü.' }
    ],
    tools: ['C / C++', 'MATLAB / Simulink', 'Altium Designer', 'KiCad', 'Verilog / VHDL', 'LabVIEW', 'Python'],
    courses: [
      'Devre Analizi ve Teorisi',
      'Analog ve Sayısal Elektronik',
      'Sinyaller ve Sistemler',
      'Elektromanyetik Alanlar',
      'Mikroişlemciler ve Mikrodenetleyiciler',
      'Otomatik Kontrol Sistemleri'
    ],
    careerPaths: ['Gömülü Yazılım Mühendisi', 'Donanım Tasarım Mühendisi', 'Güç Sistemleri Uzmanı', 'Aviyonik Sistem Mühendisi', 'Telekomünikasyon Mimarı'],
    salaryRange: '32.000 ₺ - 145.000 ₺+ / Ay',
    workTypes: ['Ar-Ge Merkezleri', 'Savunma Sanayii', 'Otomotiv / Elektrikli Araçlar', 'Enerji Üretim Tesisleri'],
    topUniversities: ['ODTÜ', 'İTÜ', 'Bilkent Üniversitesi', 'Boğaziçi Üniversitesi', 'YTÜ']
  },
  {
    id: 'makine',
    slug: 'makine',
    name: 'Makine Mühendisliği',
    category: 'Tasarım & Üretim',
    icon: 'fa-gears',
    tagline: 'Fikirleri hareketli mekanizmalara, analizi somut makinelere dönüştürün.',
    overview: 'Makine Mühendisliği; termodinamik, akışkanlar mekaniği, malzeme bilimi ve mukavemet prensiplerini kullanarak otomotivden savunmaya, robotikten biyomekaniğe kadar her türlü fiziksel ürünün tasarımını, analizini ve üretimini gerçekleştirir.',
    subfields: [
      { name: 'CAD / CAM & Mekanik Tasarım', desc: '3D parametrik modelleme, sonlu elemanlar analizi (FEA) ve prototipleme.' },
      { name: 'Termodinamik & Isı Transferi', desc: 'HVAC sistemleri, ısı değiştiriciler, motor ve enerji dönüşüm teknolojileri.' },
      { name: 'Mekatronik & Robotik Sistemler', desc: 'Mekanik yapıların sensör ve aktüatörlerle entegre akıllı hareket kontrolü.' },
      { name: 'İmalat Yöntemleri & Metalurji', desc: 'CNC işleme, talaşlı/talaşsız imalat ve 3D metal yazıcı teknolojileri.' },
      { name: 'Otomotiv Mühendisliği', desc: 'Şasi, aerodinamik, süspansiyon ve elektrikli araç aktarma organları.' }
    ],
    tools: ['SolidWorks', 'CATIA', 'ANSYS Mechanical / Fluent', 'AutoCAD', 'MATLAB', 'Siemens NX', 'Mastercam'],
    courses: [
      'Statik ve Dinamik',
      'Mukavemet',
      'Termodinamik I & II',
      'Akışkanlar Mekaniği',
      'Makine Elemanları',
      'İmal Usulleri'
    ],
    careerPaths: ['Mekanik Tasarım Uzmanı', 'Simülasyon / FEA Mühendisi', 'Üretim & Kalite Yöneticisi', 'Otomotiv Sistemleri Mühendisi', 'Ar-Ge Proje Lideri'],
    salaryRange: '30.000 ₺ - 130.000 ₺+ / Ay',
    workTypes: ['Otomotiv Fabrikaları', 'Havacılık & Savunma', 'Beyaz Eşya', 'Ağır Sanayi ve Enerji'],
    topUniversities: ['İTÜ', 'ODTÜ', 'YTÜ', 'Gazi Üniversitesi', 'Bilkent Üniversitesi']
  },
  {
    id: 'endustri',
    slug: 'endustri',
    name: 'Endüstri Mühendisliği',
    category: 'Veri & Yönetim',
    icon: 'fa-sitemap',
    tagline: 'Süreçleri optimize et, maliyetleri düşür, geleceğin veri odaklı lideri ol.',
    overview: 'Endüstri Mühendisliği; insan, makine, malzeme, enerji ve finans kaynaklarının entegre sistemlerini tasarlar, iyileştirir ve yönetir. Matematiksel modelleme, optimizasyon ve veri analitiğiyle işletmelerin en verimli şekilde çalışmasını sağlar.',
    subfields: [
      { name: 'Yöneylem Araştırması & Optimizasyon', desc: 'Doğrusal programlama, ağ modelleri ve karar destek sistemleri.' },
      { name: 'Tedarik Zinciri & Lojistik', desc: 'Depo yönetimi, rota optimizasyonu ve talep tahmin algoritmaları.' },
      { name: 'Veri Analitiği & İş Zekası', desc: 'Büyük veri madenciliği, KPI panelleri ve tahminleme modelleri.' },
      { name: 'Yalın Üretim & Kalite Yönetimi', desc: 'Six Sigma, Kaizen, 5S ve israfı önleyici üretim standartları.' },
      { name: 'Ürün ve Proje Yönetimi', desc: 'Agile/Scrum metodolojileri, finansal fizibilite ve operasyon liderliği.' }
    ],
    tools: ['Python / R', 'SQL', 'GAMS / CPLEX', 'Power BI / Tableau', 'SAP ERP', 'Arena Simulation', 'Excel Advanced'],
    courses: [
      'Yöneylem Araştırması I & II',
      'Mühendislik İstatistiği ve Olasılık',
      'Üretim Planlama ve Kontrol',
      'Tesis Planlama ve Tasarımı',
      'Kalite Güvence ve Güvenilirlik',
      'Mühendislik Ekonomisi'
    ],
    careerPaths: ['Data Analyst / Business Intelligence Lead', 'Supply Chain Strategist', 'Product Manager (PM)', 'Management Consultant', 'Operations Director'],
    salaryRange: '33.000 ₺ - 150.000 ₺+ / Ay',
    workTypes: ['E-Ticaret & Teknoloji', 'Bankacılık & Finans', 'Üretim Tesisleri', 'Uluslararası Danışmanlık'],
    topUniversities: ['Boğaziçi Üniversitesi', 'Bilkent Üniversitesi', 'ODTÜ', 'İTÜ', 'Koç Üniversitesi']
  },
  {
    id: 'insaat',
    slug: 'insaat',
    name: 'İnşaat Mühendisliği',
    category: 'Yapı & Proje',
    icon: 'fa-compass-drafting',
    tagline: 'Depreme dayanıklı yapılar, mega köprüler ve akıllı şehirlerin inşası.',
    overview: 'İnşaat Mühendisliği; insanların yaşamını sürdürebileceği binalar, köprüler, tüneller, barajlar, havalimanları ve su/ulaşım altyapılarını güvenli, ekonomik ve çevreye duyarlı biçimde planlar, hesaplar ve inşa eder.',
    subfields: [
      { name: 'Yapı Statiği & Deprem Mühendisliği', desc: 'Betonarme, çelik yapı analizi ve sismik izolatör teknolojileri.' },
      { name: 'Geoteknik & Zemin Mekaniği', desc: 'Zemin dayanımı, kazık temeller ve şev stabilitesi hesaplamaları.' },
      { name: 'Ulaştırma & Altyapı', desc: 'Karayolu, demiryolu ve akıllı trafik yönetim sistemleri.' },
      { name: 'Hidrolik & Su Kaynakları', desc: 'Barajlar, arıtma tesisleri, taşkın kontrolü ve boru hatları.' },
      { name: 'BIM & Proje Yönetimi', desc: 'Yapı Bilgi Modellemesi (BIM 4D/5D), metraj ve şantiye koordinasyonu.' }
    ],
    tools: ['AutoCAD', 'SAP2000', 'ETABS', 'Revit (BIM)', 'Primavera P6', 'Civil 3D', 'MS Project'],
    courses: [
      'Yapı Statiği I & II',
      'Betonarme Yapı Tasarımı',
      'Zemin Mekaniği ve Temel Mühendisliği',
      'Çelik Yapılar',
      'Akışkanlar Mekaniği ve Hidrolik',
      'Şantiye Yönetimi ve İş Güvenliği'
    ],
    careerPaths: ['Statik Proje Mühendisi', 'BIM Yöneticisi', 'Şantiye Şefi / Proje Müdürü', 'Geoteknik Danışmanı', 'Altyapı Kontrol Amiri'],
    salaryRange: '28.000 ₺ - 130.000 ₺+ / Ay (Yurtdışı Şantiyelerde: $3.000 - $10.000 / Ay)',
    workTypes: ['Şantiyeler (Yurtiçi / Yurtdışı)', 'Statik Proje Ofisleri', 'Müşavirlik Firmaları', 'Kamu / Karayolları / DSİ'],
    topUniversities: ['İTÜ', 'ODTÜ', 'Boğaziçi Üniversitesi', 'YTÜ', 'Ege Üniversitesi']
  },
  {
    id: 'kimya',
    slug: 'kimya',
    name: 'Kimya Mühendisliği',
    category: 'Proses & Malzeme',
    icon: 'fa-flask',
    tagline: 'Molekülleri dev ölçekli endüstriyel ürünlere ve enerjiye dönüştürün.',
    overview: 'Kimya Mühendisliği; hammaddeleri fiziksel ve kimyasal süreçlerden geçirerek ilaç, kozmetik, batarya, polimer, gıda ve petrokimya gibi hayatın merkezindeki ürünlere dönüştüren proseslerin tasarımı ve optimizasyonuyla ilgilenir.',
    subfields: [
      { name: 'Proses Tasarımı & Simülasyonu', desc: 'Kimyasal reaktörler, damıtma kuleleri ve ısı entegrasyonu.' },
      { name: 'Batarya & Enerji Depolama', desc: 'Lityum-iyon piller, hidrojen yakıt hücreleri ve elektrokimya.' },
      { name: 'İlaç & Biyoteknoloji', desc: 'Biyo-reaktörler, aşı üretim hatları ve saflaştırma adımları.' },
      { name: 'Polimer & İleri Malzemeler', desc: 'Bozunabilir plastikler, kompozitler ve nano-kaplamalar.' },
      { name: 'Sürdürülebilirlik & Çevre Prosesleri', desc: 'Karbon yakalama, yeşil enerji ve atık geri kazanım sistemleri.' }
    ],
    tools: ['Aspen Plus / HYSYS', 'ChemCAD', 'MATLAB', 'COMSOL Multiphysics', 'Minitab', 'SuperPro Designer'],
    courses: [
      'Kimyasal Reaksiyon Mühendisliği',
      'Kütle Transferi ve Ayırma İşlemleri',
      'Isı Transferi',
      'Kimya Mühendisliği Termodinamiği',
      'Proses Dinamiği ve Kontrol',
      'Tesis Tasarımı ve Ekonomisi'
    ],
    careerPaths: ['Proses Mühendisi', 'Ar-Ge Formülasyon Uzmanı', 'Kalite Güvence Müdürü', 'Tesis İşletme Yöneticisi', 'Sürdürülebilirlik Lideri'],
    salaryRange: '30.000 ₺ - 125.000 ₺+ / Ay',
    workTypes: ['Petrokimya (Tüpraş, Petkim)', 'İlaç Sanayii', 'Gıda & Kozmetik', 'Boya & Kimya Tesisleri'],
    topUniversities: ['ODTÜ', 'Boğaziçi Üniversitesi', 'İTÜ', 'Hacettepe Üniversitesi', 'Ege Üniversitesi']
  },
  {
    id: 'biyomedikal',
    slug: 'biyomedikal',
    name: 'Biyomedikal Mühendisliği',
    category: 'Sağlık & Medikal',
    icon: 'fa-heart-pulse',
    tagline: 'Mühendislik ile tıbbın kesiştiği noktada insan hayatına dokunan teknolojiler.',
    overview: 'Biyomedikal Mühendisliği; sağlık sektöründeki tanı ve tedavi süreçlerini iyileştirmek için yapay organlar, protezler, medikal görüntüleme cihazları (MR, BT), robotik cerrahi ve biyosensörler geliştiren multidisipliner bir alandır.',
    subfields: [
      { name: 'Tıbbi Cihaz Tasarımı', desc: 'Ventilatörler, EKG/EMG monitörleri ve cerrahi robotik sistemler.' },
      { name: 'Biyosinyal & Medikal Görüntü İşleme', desc: 'MR ve ultrason görüntülerinde yapay zeka destekli tümör tespiti.' },
      { name: 'Biyomekanik & Akıllı Protezler', desc: 'Miyoelektrik kontrollü biyonik kollar, bacaklar ve ortopedik implantlar.' },
      { name: 'Doku Mühendisliği & Biyomalzeme', desc: '3D biyo-yazıcılar ile yapay damar ve doku iskelesi üretimi.' },
      { name: 'Klinik Mühendislik & Kalibrasyon', desc: 'Hastanelerdeki kritik tıbbi cihaz altyapısının yönetimi ve akreditasyonu.' }
    ],
    tools: ['MATLAB / Simulink', 'LabVIEW', 'Python (PyTorch / OpenCV)', 'SolidWorks Medical', 'DICOM Tools', 'SPSS'],
    courses: [
      'Biyomedikal Sinyal İşleme',
      'Tıbbi Görüntüleme Sistemleri',
      'Biyomalzemeler ve Biyo-uyumluluk',
      'İnsan Anatomisi ve Fizyolojisi',
      'Biyomekanik',
      'Tıbbi Cihaz Tasarım Prensipleri'
    ],
    careerPaths: ['Tıbbi Cihaz Ar-Ge Mühendisi', 'Medikal Görüntüleme Uzmanı', 'Klinik Mühendisi', 'Regülasyon & CE Uzmanı', 'Biyoteknoloji Danışmanı'],
    salaryRange: '29.000 ₺ - 120.000 ₺+ / Ay',
    workTypes: ['Medikal Cihaz Üreticileri', 'Şehir Hastaneleri / Özel Klinikler', 'Biyoteknoloji Laboratuvarları', 'Sağlık Yazılım Şirketleri'],
    topUniversities: ['TOBB ETÜ', 'İTÜ', 'Yeditepe Üniversitesi', 'Başkent Üniversitesi', 'Erciyes Üniversitesi']
  },
  {
    id: 'havacilik',
    slug: 'havacilik-uzay',
    name: 'Havacılık ve Uzay Mühendisliği',
    category: 'Savunma & Uzay',
    icon: 'fa-plane',
    tagline: 'Sınırları aşın: İHA’lar, savaş jetleri, roketler ve uzay uyduları.',
    overview: 'Havacılık ve Uzay Mühendisliği; atmosfer içinde veya uzay ortamında hareket eden hava ve uzay araçlarının aerodinamik, itki, aviyonik, yapısal dayanım ve otonom uçuş kontrol sistemlerini tasarlar ve doğrular.',
    subfields: [
      { name: 'Aerodinamik & Hesaplamalı Akışkanlar (CFD)', desc: 'Kanat profili tasarımı, süpersonik akış ve sürtünme azaltımı.' },
      { name: 'İtki Sistemleri & Roket Motorları', desc: 'Turbojet, turbofan, ramjet ve katı/sıvı yakıtlı roket itki sistemleri.' },
      { name: 'Uçuş Dinamiği & Otonom Kontrol', desc: 'Otopilot algoritmaları, İHA kararlılığı ve yönelim kontrolü.' },
      { name: 'Aviyonik & Uydu Sistemleri', desc: 'Küpsat uyduları, telemetri, GPS/INS navigasyon donanımları.' },
      { name: 'Hafif Yapılar & Kompozit Malzemeler', desc: 'Karbon fiber gövde tasarımı, aeroelastisite ve yorulma testleri.' }
    ],
    tools: ['ANSYS Fluent', 'OpenFOAM', 'CATIA V5', 'MATLAB / Simulink', 'XFLR5', 'ROS (Robot Operating System)', 'C++'],
    courses: [
      'Aerodinamik I & II',
      'Uçak ve Uzay Yapıları',
      'Uçuş Mekaniği ve Dinamiği',
      'Gaz Türbinli ve Roket İtki Sistemleri',
      'Aviyonik ve Navigasyon',
      'Yörünge Mekaniği'
    ],
    careerPaths: ['Aerodinamik Mühendisi', 'Uçuş Kontrol ve Güdüm Uzmanı', 'İHA Sistem Mühendisi', 'İtki & Motor Tasarımcısı', 'Uzay Sistemleri Analisti'],
    salaryRange: '40.000 ₺ - 170.000 ₺+ / Ay',
    workTypes: ['Savunma Devleri (Baykar, TUSAŞ, ASELSAN, ROKETSAN)', 'TÜRKSAT / Uzay Ajansı', 'Sivil Havacılık Şirketleri'],
    topUniversities: ['ODTÜ', 'İTÜ', 'Türk Hava Kurumu Üniversitesi', 'Gazi Üniversitesi', 'Gebze Teknik']
  },
  {
    id: 'gemi',
    slug: 'gemi-deniz',
    name: 'Gemi & Deniz Teknolojisi Mühendisliği',
    category: 'Denizcilik & Offshore',
    icon: 'fa-ship',
    tagline: 'Açık denizlerde dev kargo gemileri, lüks mega yatlar ve petrol platformları.',
    overview: 'Gemi ve Deniz Teknolojisi Mühendisliği; ticari gemilerden askeri fırkateynlere, mega yatlardan açık deniz rüzgar türbini platformlarına kadar her türlü yüzen yapının hidrodinamik dizaynını, yapısal analizini ve tersane üretimini yönetir.',
    subfields: [
      { name: 'Gemi Dizaynı & Hidrodinamik', desc: 'Gövde formu optimizasyonu, direnç-sevk hesapları ve dalga etkileşimi.' },
      { name: 'Yat Tasarımı & Üretimi', desc: 'Özel kompozit/çelik lüks yat iç mimarisi ve denizcilik performansı.' },
      { name: 'Açık Deniz (Offshore) Yapıları', desc: 'Petrol/doğalgaz sondaj platformları ve açık deniz rüzgar çiftlikleri.' },
      { name: 'Tersane İşletmesi & Üretim Planlama', desc: 'Blok montaj, kızak operasyonları ve klas kuruluşu denetimleri.' },
      { name: 'Marin Sevk & Makine Dairesi', desc: 'Dizel motorlar, LNG/Hibrit elektrikli marin motor sistemleri.' }
    ],
    tools: ['Maxsurf', 'Rhino 3D', 'AutoCAD Marine', 'ANSYS Hydrodynamics', 'SolidWorks', 'Python'],
    courses: [
      'Gemi Hidrodinamiği ve Direnç',
      'Gemi Statiği ve Denge',
      'Gemi Mukavemeti ve Yapısal Elemanlar',
      'Tersane Organizasyonu ve Gemi İnşaatı',
      'Gemi Sevk Sistemleri',
      'Açık Deniz Yapıları Tasarımı'
    ],
    careerPaths: ['Gemi Dizayn Mühendisi', 'Yat Tasarımcısı & Proje Lideri', 'Tersane Üretim Şefi', 'Klas Sörveyörü (DNV, Lloyd\'s)', 'Offshore Enerji Uzmanı'],
    salaryRange: '32.000 ₺ - 140.000 ₺+ / Ay',
    workTypes: ['Tuzla & Yalova Tersaneleri', 'Gemi Dizayn Büroları', 'Uluslararası Klas Kuruluşları', 'Deniz Taşımacılık Filoları'],
    topUniversities: ['İTÜ (Gemi İnşaatı Fakültesi)', 'Yıldız Teknik Üniversitesi', 'Piri Reis Üniversitesi', 'Karadeniz Teknik']
  }
];
