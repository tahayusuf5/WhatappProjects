module.exports = {
    name: 'tagadmin',
    async onMessage(msg) {
        if (msg.body.trim().startsWith(`{prefix}tagadmin`)) {
            const chat = await msg.getChat();
            const chatId = chat.id._serialized;
            if (chat.isGroup) {
                const participants = chat.participants;
                const messageContent = msg.body.replace(command, '').trim();
                let message = '';
                let mentions = [];

                const admins = participants.filter(participant => participant.isAdmin);
                if (messageContent) {
                    for (let i = 0; i < admins.length; i++) {
                        const admin = admins[i];
                        const contactId = admin.id._serialized;

                        message += `@${admin.id.user}\n`;
                        mentions.push(await msg.client.getContactById(contactId));
                    }
                    await msg.client.sendMessage(chatId, messageContent, {
                        mentions: mentions
                    });
                } else {
                    for (let i = 0; i < admins.length; i++) {
                        const admin = admins[i];
                        const contactId = admin.id._serialized;

                        message += `@${admin.id.user}\n`;
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
