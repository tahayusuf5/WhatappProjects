module.exports = {
    name: 'tagadmin',
    async onMessage(msg) {
        const [command, ...textArray] = msg.body.trim().split('\n');
        const text = textArray.join('\n').trim();
        if (command.toLowerCase() === `${prefix}tagadmin`) {
            if (worktype === 'public') {
                const chat = await msg.getChat();
                const chatId = chat.id._serialized;
                if (chat.isGroup) {
                    const participants = chat.participants;
                    let message = '';
                    let mentions = [];
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
                        let invisibleText = '⠀'; 
                        if (text) {
                            message = `${text}\n\n${message}`; 
                        }
                        await msg.client.sendMessage(chatId, invisibleText + message, {
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
