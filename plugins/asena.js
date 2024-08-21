module.exports = {
    name: 'asena',
    async onMessage(msg) {
        if (msg.body.trim().toLowerCase() === `${config.prefix}asena`) {
            let BotId = msg.client.info.wid._serialized;
            const msgId = msg.from;
            var sudo = false;
            var onay = false;
            for (const i of config.sudoUsers) {
                if (i === msgId) {
                    var sudo = true;
                    var onay = true;
                }
            }
            if (!onay) {
                if (msgId === BotId) {
                    var onay = true;
                }
            }
            if (config.worktype==='public') {
                const chat = await msg.getChat();
                const chatId = chat.id._serialized;
                let response = '●▬▬▬ WhatsIc3zy Public ▬▬▬●\n\n';
                if (msg.fromMe || config.sudoUsers.includes(msg.from)) {
                    config.plugins.forEach((plugin) => {
                        if (plugin.dontAddCommandList || !plugin.name) return;
                        response += `*🛠: ${plugin.name}*\n💬: ${plugin.description}\n`;
                    });
                    msg.client.sendMessage(chatId, response);
                }
            } else if (worktype === 'private') {
                if (onay) {
                    const chat = await msg.getChat();
                    const chatId = chat.id._serialized;
                    let response = '●▬▬▬ WhatsIc3zy Public ▬▬▬●\n\n';
                    if (msg.fromMe || config.sudoUsers.includes(msg.from)) {
                        config.plugins.forEach((plugin) => {
                            if (plugin.dontAddCommandList || !plugin.name) return;
                            response += `*🛠: ${plugin.name}*\n💬: ${plugin.description}\n`;
                        });
                        msg.client.sendMessage(chatId, response);
                    }
                }
            }
        }
    }
};
