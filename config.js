module.exports = {
    worktype: 'public', // public || private
    prefix: '.',
    aliveMessage: `Tanrı Türk'ü Korusun. 🐺 Asena Hizmetinde!\n\n*Version:* 0.0.2 Public Beta\n*Branch:* Beta\n*Telegram Group:* https://t.me/AsenaSupport\n*Telegram Channel:* https://t.me/asenaremaster`,
    sudoUsers: ['9055xxxxxxxx@c.us'], // Numaranızın sonuna  @c.us eklmelisiniz
    kickmeMessage: `Elveda ben kaçar.`, // Kickme mesajıdır.
    debug: true, // Geliştiricilere özeldir. true || false
    chromepath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // bilgisayarınızda chrome kurulu değil ise boş bırakınız.
    headless: false, // false ise client görünür mod da açılır. false || true
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
        { name: 'pp', description: 'Yanıt verdiğiniz medyayı profil fotoğrafınız olarak günceller' },
        { name: 'setvar_sudo', description: `Sudo'ları değiştirmek için kullanılır. Örnek: .setvar_sudo '905510310485@c.us','90512345678@c.us'` },
        { name: 'setvar_alivemsg', description: 'Alive mesajını değiştirmek için kullanabilirsiniz.' },
        { name: 'setvar_kickmemsg', description: 'Kickme mesajınızı değiştirmenizi sağlar.' },
        { name: 'setvar_worktype', description: 'Worktype değiştirmenizi sağlar örn: setvar_worktype private // veya public olarak değiştirebilirsiniz.' },
        { name: 'setvar_prefix', description: 'Prefixinizi güncellemenizi sağlar. örn: .setvar_prefix !' },
        { name: 'update', description: 'Bota update gelip gelmediğini kontrol eder.' },
        { name: 'update now', description: 'Eğer update gelmiş ise updte etmek için kullanılır.' },
        { name: 'afk', description: 'Sizi afk yapar. Afk yazdıktan sonra argüman vermez iseniz main afk mesajını kullanacaktır. Örnek: .afk Şu anda afkyım // yada .afk' },
        { name: 'blockk', description: 'Yanıt verdiğiniz, etiketlediğiniz veya yazdığınız chatteki kullanıcıyı engeller.' },
        { name: 'unblock', description: 'Yanıt verdiğiniz veya etiketlediğiniz kullanıcının engelini kaldırır.' },
        { name: 'pmsend', description: 'Yanıt verdiğiniz veya etiketlediğiniz kullanıcıya özelden mesaj gönderir. Örnek: .pmsend @Ic3zy Selamın Aleyküm.' }
    ]
};
