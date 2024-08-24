module.exports = {
    name: 'tagadmin',
    async onMessage(msg) {
        if (msg.body.trim().toLowerCase() === `${prefix}tagadmin`) {
            const BotId = msg.client.info.wid._serialized;
            const msgId = msg.from;
            if (config.debug) {
                console.log(`Message from: ${msgId}`);
            }

            let sudo = false;
            let onay = false;
            for (const i of sudoUsers) {
                if (i === msgId) {
                    sudo = true;
                    onay = true;
                    break;
                }
            }

            if (!onay && msgId === BotId) {
                onay = true;
            }

            if (config.debug) {
                console.log(`Onay: ${onay}`);
            }

            const chat = await msg.getChat();
            const chatId = chat.id._serialized;

            if (chat.isGroup) {
                const admins = await chat.getAdministrators();
                let mentions = admins.map(admin => admin.id._serialized);
                mentions = mentions.length > 0 ? mentions : [msgId]; 
                
                await msg.client.sendMessage(chatId, config.tagMessage, {
                    mentions: mentions
                });

                if (config.debug) {
                    console.log('Adminler etiketlendi.');
                }
            } else {
                if (config.debug) {
                    console.log('Bu komut yalnızca grup sohbetlerinde çalışır.');
                }
                await msg.reply('Bu komut yalnızca grup sohbetlerinde çalışır.');
            }
        }
    }
};
