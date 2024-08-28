const debug = config.debug;
module.exports = {
    name: 'asena',
    async onMessage(msg) {
        if (msg.body.trim().toLowerCase() === `${config.prefix}asena`) {
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
            if (config.worktype==='public') {
                let response = '●▬▬▬ Ic3zybots Public ▬▬▬●\n\n';
                config.plugins.forEach((plugin) => {
                    if (plugin.dontAddCommandList || !plugin.name) return;
                    response += `*🛠: ${plugin.name}*\n💬: ${plugin.description}\n`;
                });
                msg.client.sendMessage(chatId, response);
            } else if (worktype === 'private') {
                if (onay) {
                    let response = '●▬▬▬ Ic3zybots Public ▬▬▬●\n\n';
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
