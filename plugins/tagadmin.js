module.exports = {
    name: 'tagadmin',
    async onMessage(msg) {
        if (msg.body.startsWith(`${config.prefix}tagadmin`)) {
            const chat = await msg.getChat();
            const chatId = chat.id._serialized;
            if (chat.isGroup) {
                const participants = chat.participants;
                const messageContent = msg.body.replace(`${config.prefix}tagadmin`, '').trim();
                let message = '';
                let mentions = [];
                if (messageContent) {
                    for (let i = 0; i < participants.length; i++) {
                        const participant = participants[i];
                        const contactId = participant.id._serialized;
                        message += `@${participant.id.user}\n`;
                        mentions.push(await msg.client.getContactById(contactId));
                    }
                    await msg.client.sendMessage(chatId, messageContent, {
                        mentions: mentions
                    });
                } else {
                    for (let i = 0; i < participants.length; i++) {
                        const participant = participants[i];
                        const contactId = participant.id._serialized;
                        message += `@${participant.id.user}\n`;
                        mentions.push(await msg.client.getContactById(contactId));
                    }
                    await msg.client.sendMessage(chatId, message, {
                        mentions: mentions
                    });
                }
            } else {
                await msg.client.sendMessage(msg.from, 'Bu komut sadece grup sohbetlerinde kullanılabilir.');
            }
        }
    }
};
