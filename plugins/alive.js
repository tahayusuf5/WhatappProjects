const debug = config.debug;
console.log(worktype, sudoUsers)
module.exports = {
    name: 'alive',
    async onMessage(msg) {
        if (msg.body.trim().toLowerCase() === `${config.prefix}alive`) {
            const BotId = msg.client.info.wid._serialized;
            var msgId = undefined;
            const chat = await msg.getChat();
            const chatId = chat.id._serialized;
            const aliveMessage = config.aliveMessage || 'Bot is alive!';
            if (chat.isGroup) {
                var msgId = msg.id.participant;
            }
            else {
                var msgId = msg.from;
            }
            if (debug) {
                console.log(msgId);
            }
            if (debug) {
                console.log(msgId);
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

            if (debug) {
                console.log(onay);
            }
            if (worktype === 'public') {
                await msg.client.sendMessage(chatId, aliveMessage);
            } else if (worktype === 'private') {
                if (debug) {
                    console.log('bot private 2. alana geçildi.');
                }

                if (onay) {
                    if (debug) {
                        console.log('onay tamamlandı');
                    }
                    await msg.client.sendMessage(chatId, aliveMessage);
                } else {
                    console.log(`onay hatası : ${onay}`);
                }          
            }
        }
    }
};
