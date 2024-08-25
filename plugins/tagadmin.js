const debug = config.debug;
module.exports = {
    name: 'tagadmin',
    async onMessage(msg) {
        const command = `${prefix}tagadmin`;
        if (msg.body.startsWith(command)) {
            let BotId = msg.client.info.wid._serialized;
            let botid = msg.client.info.wid._serialized;
            var msgId = undefined;
            const chat = await msg.getChat();
            const chatId = chat.id._serialized;
            if (chat.isGroup) {
                var msgId = msg.id.participant;
            }
            else {
                var msgId = msg.from;
            }
            if (debug) {
                console.log(msgId);
            }
            let sudo = false;
            let onay = false;
            for (const i of config.sudoUsers) {
                if (i === msgId) {
                    sudo = true;
                    onay = true;
                    break;
                }
            }
            if (!onay && msgId === botid) {
                onay = true;
            }
            if (debug) {
                console.log(onay);
            }
            if (chat.isGroup) {
                if (onay) {
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
    }
};
