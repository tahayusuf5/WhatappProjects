module.exports = {
    worktype: 'private', // public || private
    prefix: '.',
    aliveMessage: `Tanrı Türk'ü Korusun. 🐺 Asena Hizmetinde!\n\n*Version:* 0.0.2 Public Beta\n*Branch:* Beta\n*Telegram Group:* https://t.me/AsenaSupport\n*Telegram Channel:* https://t.me/asenaremaster`,
    sudoUsers: ['905510310485@c.us','90512345678@c.us'], // Numaranızın sonuna  @c.us eklmelisiniz
    botNumber: `905510310485@c.us`,
    kickmeMessage: `Elveda ben kaçar.`, // Kickme mesajıdır.
    debug: true, // Geliştiricilere özeldir. true || false
    plugins: [ 
        { name: 'add', description: 'Gruba Kişi eklemenizi sağlar örn: .add 905510310485' },
        { name: 'alive', description: 'Botun çalışıp çalışmadığını kontrol eder.' },
        { name: 'asena', description: 'Tüm komutları gösterir.' },
        { name: 'attp', description: 'Yazılan mesajı hareketli sticker yapar. Örn: .attp Ic3zy' },
        { name: 'ban', description: 'Gruptan kişi banlamanızı sağlar' },
        { name: 'demote', description: 'Yanıt verilen kişiyi adminlikten çıkartır.'},
        { name: 'gruplink', description: 'Grubun davet bağlantısını yollar.'},
        { name: 'info', description: 'Geliştiricilere özeldir.' },
        { name: 'kickme', description: 'Sizi komutu yazdığınız gruptan çıkarır.'},
        { name: 'promote', description: 'Yanıt verilen kişiyi admin yapar.'},
        { name: 'sticker', description: 'Yanıt verilen medyayı sticker yapar.' },
        { name: 'videosticker', description: 'Yanıt verilen hareketli stickeri video yapar.' },
        { name: 'imagesticker', description: 'Yanıt verilen hareketsiz stickeri resim yapar.'},
        { name: 'pp', description: 'Yanıt verdiğiniz medyayı profil fotoğrafınız olarak günceller' }
    ]
};
