const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

// 🛡️ TARAYICI ENGELİNİ (CORS) ARKASINDAN DOLANARAK YIKAN ÖZEL AYAR
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Gelen verileri sunucunun anlayabilmesi için mutfak ayarı
app.use(express.json());

// VERİ TABANI BAĞLANTISI
const db = new sqlite3.Database('./kariyer_rehberi.db', (err) => {
    if (err) {
        console.error("Veri tabanına bağlanırken hata oluştu: ❌", err.message);
    } else {
        console.log("SQLite veri tabanı başarıyla bağlandı ve oluşturuldu! 💾✨");
    }
});

// Tablo oluşturma (Türkçe karakter hatası düzeltildi)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS kullanicilar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        kullanici_adi TEXT UNIQUE,
        sifre TEXT
    )`);
});

// 🤵 KAYIT OL API KURALI
app.post('/api/kayit-ol', (req, res) => {
    const { kullanici_adi, sifre } = req.body;
    const sorgu = `INSERT INTO kullanicilar (kullanici_adi, sifre) VALUES (?, ?)`;
    
    db.run(sorgu, [kullanici_adi, sifre], function(err) {
        if (err) {
            return res.status(400).json({ error: "Bu kullanıcı adı zaten kapılmış aşkım! ❌" });
        }
        res.json({ message: "Harika! Başarıyla kayıt oldun aşkım. Deftere yazıldın! 💾✨" });
    });
});

// 🔑 GİRİŞ YAP API KURALI
app.post('/api/giris-yap', (req, res) => {
    const { kullanici_adi, sifre } = req.body;
    const sorgu = `SELECT * FROM kullanicilar WHERE kullanici_adi = ?`;
    
    db.get(sorgu, [kullanici_adi], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Deftere bakarken hata çıktı aşkım! ❌" });
        }
        if (!row) {
            return res.status(400).json({ error: "Böyle bir kullanıcı bulamadım aşkım, önce kayıt ol! ❌" });
        }
        if (row.sifre !== sifre) {
            return res.status(400).json({ error: "Şifreni yanlış girdin aşkım, tekrar dene! ❌" });
        }
        res.json({ message: `Harika! Tekrar hoş geldin ${kullanici_adi}! Girişin onaylandı. 🔑✨` });
    });
});

app.listen(PORT, () => {
    console.log(`Backend sunucumuz ${PORT} portu üzerinde dinamik olarak çalişiyor! 🚀🌐`);
    // 🛡️ SUNUCUNUN KENDİ KENDİNE KAPANMASINI ENGELLEYEN SİHİRLİ ZIRH
setInterval(() => {
    // Bu boş döngü arka planda her 1 saatte bir tıklar 
    // ve Node.js'e "Hâlâ yapacak işimiz var, sakın kapanma!" der.
}, 3600000);

// Sunucu kazara kapanmaya çalışırsa terminale nedenini yazdıralım
process.on('exit', (code) => {
    console.log(`Sunucu sessizce kapandı, çıkış kodu: ${code} 🕵️‍♀️`);
});
});