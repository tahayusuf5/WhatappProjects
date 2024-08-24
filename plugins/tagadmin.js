const config = require('./config'); // Yapılandırma dosyasını yükleyin
const { prefix, worktype, debug } = config;

module.exports = {
    name: 'tagadmin',
    async onMessage(msg) {
        // Komut kontrolü
        if (msg.body.trim().toLowerCase() === `${prefix}tagadmin`) {
            if (worktype === 'public') {
                const chat = await msg.getChat();
                const chatId = chat.id._serialized;

                // Grubun yöneticilerini kontrol et
                if (chat.isGroup) {
                    const participants = chat.participants;
                    let message = '';
                    let mentions = [];

                    // Yöneticileri etiketle
                    for (let i = 0; i < participants.length; i++) {
                        const participant = participants[i];
                        if (participant.isAdmin) {
                            const contactId = participant.id._serialized;
                            message += `• @${participant.id.user}`;
                            if (i < participants.length - 1) {
                                message += '\n'; 
                            }

                            mentions.push(await msg.client.getContactById(contactId));
                        }
                    }

                    if (mentions.length > 0) {
                        // Yöneticileri etiketleyerek mesaj gönder
                        await msg.client.sendMessage(chatId, message, {
                            mentions: mentions
                        });
                    } else {
                        await msg.client.sendMessage(chatId, 'Bu grup içinde admin bulunmuyor.');
                    }
                } else {
                    await msg.client.sendMessage(msg.from, 'Bu komutu kullanabilmeniz için grup sohbetinde olmanız gerekmektedir.');
                }
            }
        }
    }
};
