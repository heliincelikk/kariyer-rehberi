const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

// 🛡️ TARAYICI ENGELİNİ (CORS) ARKASINDAN DOLANARAK YIKAN ÖZEL AYAR
app.use((req, res, next) => {
    res.header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", "0");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Gelen verileri sunucunun anlayabilmesi için mutfak ayarı
app.use(express.json());
// HTML, CSS ve JS dosyalarını tarayıcıda sunabilmek için statik dosya ayarı 🌐
app.use(express.static(__dirname));

// VERİ TABANI BAĞLANTISI
const db = new sqlite3.Database('./kariyer_rehberi.db', (err) => {
    if (err) {
        console.error("Veri tabanına bağlanırken hata oluştu: ❌", err.message);
    } else {
        console.log("SQLite veri tabanı başarıyla bağlandı ve oluşturuldu! 💾✨");
    }
});

// 📌 Tablo oluşturma (email sütunu eklendi)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS kullanicilar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        kullanici_adi TEXT,
        email TEXT UNIQUE,
        department TEXT,
        rol TEXT,
        durum TEXT,
        okul TEXT,
        bolum TEXT,
        sinif TEXT,
        is_yeri TEXT,
        deneyim TEXT,
        sifre TEXT
    )`);
    // Mevcut tabloya email sütunu ekle (eğer yoksa)
    db.run(`ALTER TABLE kullanicilar ADD COLUMN email TEXT`, () => {});
});

// 🤵 KAYIT OL API KURALI
app.post('/api/kayit-ol', (req, res) => {
    const { kullanici_adi, email, department, rol, durum, okul, bolum, sinif, is_yeri, deneyim, sifre } = req.body;
    const sorgu = `INSERT INTO kullanicilar 
        (kullanici_adi, email, department, rol, durum, okul, bolum, sinif, is_yeri, deneyim, sifre) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(sorgu, [kullanici_adi, email, department, rol, durum, okul, bolum, sinif, is_yeri, deneyim, sifre], function(err) {
        if (err) {
            return res.status(400).json({ error: "Bu e-posta adresi zaten kayıtlı! ❌" });
        }
        res.json({ message: "Harika! Başarıyla kayıt oldun. Aramıza hoşgeldin! 💾✨" });
    });
});
// 🔑 GİRİŞ YAP API KURALI (email ile giriş)
app.post('/api/giris-yap', (req, res) => {
    const { email, sifre } = req.body;
    const sorgu = `SELECT * FROM kullanicilar WHERE email = ?`;

    db.get(sorgu, [email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Deftere bakarken hata çıktı! ❌" });
        }
        if (!row) {
            return res.status(400).json({ error: "Bu e-posta ile kayıtlı bir hesap bulunamadı! ❌" });
        }
        if (row.sifre !== sifre) {
            return res.status(400).json({ error: "Şifreni yanlış girdin, tekrar dene! ❌" });
        }
        res.json({
            message: `Harika! Tekrar hoş geldin ${row.kullanici_adi}! Girişin onaylandı. 🔑✨`,
            kullanici_adi: row.kullanici_adi,
            department: row.department,
            rol: row.rol,
            durum: row.durum,
            okul: row.okul,
            bolum: row.bolum,
            sinif: row.sinif,
            is_yeri: row.is_yeri,
            deneyim: row.deneyim
        });
    });
});

// 🔓 ŞİFREMİ UNUTTUM API (email ile)
app.post('/api/sifremi-unuttum', (req, res) => {
    const { email } = req.body;
    if (!email || email.trim() === '') {
        return res.status(400).json({ error: 'E-posta adresi boş bırakılamaz! ❌' });
    }
    const sorgu = `SELECT kullanici_adi, sifre FROM kullanicilar WHERE email = ?`;
    db.get(sorgu, [email.trim()], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Veri tabanında hata oluştu! ❌' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Bu e-posta adresiyle kayıtlı bir hesap bulunamadı! ❌' });
        }
        res.json({ kullanici_adi: row.kullanici_adi, sifre: row.sifre });
    });
});

app.listen(PORT, () => {
    console.log(`Backend sunucumuz ${PORT} portu üzerinde dinamik olarak çalışıyor! 🚀🌐`);

    setInterval(() => {
        // Sunucunun kapanmasını önleyen sihirli döngü
    }, 3600000);

    process.on('exit', (code) => {
        console.log(`Sunucu sessizce kapandı, çıkış kodu: ${code} 🕵️‍♀️`);
    });
});