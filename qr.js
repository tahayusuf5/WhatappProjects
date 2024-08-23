const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const SESSION_FILE_PATH = './session.json';

// Oturum bilgilerini JSON dosyasından yükleyin
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    try {
        sessionData = JSON.parse(fs.readFileSync(SESSION_FILE_PATH, 'utf8'));
    } catch (e) {
        console.error('Session dosyası okuma hatası:', e);
        sessionData = null; // Bozuk dosya nedeniyle yeni bir oturum oluşturulacak
    }
}

const client = new Client({
    session: sessionData,
    puppeteer: {
        args: ['--no-sandbox'],
    }
});

client.on('qr', (qr) => {
    // QR kodunu terminalde gösterir
    qrcode.generate(qr, { small: true });
    console.log('QR kodu aşağıda görüntüleniyor. Lütfen QR kodunu WhatsApp uygulamanızla taratın.');
});

client.on('authenticated', (session) => {
    console.log('Oturum başarıyla doğrulandı.');

    try {
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
            if (err) {
                console.error('Oturum verileri kaydedilemedi:', err);
            } else {
                console.log('Oturum verileri kaydedildi.');
            }
        });
    } catch (error) {
        console.error(error)
    }
});

client.on('ready', () => {
    console.log('WhatsApp Web.js botu başarıyla başlatıldı!');
});

client.on('auth_failure', () => {
    console.error('Oturum doğrulama başarısız oldu.');
});

// Botu başlat
client.initialize();
