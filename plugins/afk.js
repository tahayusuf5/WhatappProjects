
let isafk = false;
let afkmsg = `Şu anda AFK'yım. Merak etme bu bir bot otomasyon mesajıdır.`;
const debug = config.debug;
module.exports = {
    async onMessage(msg) {
        if (msg.body.trim().startsWith(`${config.prefix}afk`)) {
            console.log('tewts');
            const chat = await msg.getChat();
            const chatId = chat.id._serialized;
            isafk = true;
            try {
                const girdi = msg.body.trim();
                afkmsg = girdi.replace(`${prefix}afk`, '').trim(); 
                if (!afkmsg) { 
                    afkmsg = `Şu anda AFK'yım. Merak etme bu bir bot otomasyon mesajıdır.`;
                }
            } catch (error) {
                console.log(error);
                afkmsg = `Şu anda AFK'yım. Merak etme bu bir bot otomasyon mesajıdır.`;
            }
            msg.client.sendMessage(chatId, `AFK mesajı olarak ayarlandı: ${afkmsg}`);
        }
        if (isafk===true) {
            const gmsj = msg.body.trim();
            console.log(afkmsg)
            if (gmsj !== `AFK mesajı olarak ayarlandı: ${afkmsg}` && gmsj !== `${prefix}afk` && gmsj !== `${afkmsg}` && gmsj !== `${prefix}afk ${afkmsg}`) {
                const botid = msg.client.info.wid._serialized;
                const msgId = msg.from;
                const chat = await msg.getChat();
                const chatId = chat.id._serialized;
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
                if (onay) {
                    if (isafk) {
                        isafk = false;
                        msg.client.sendMessage(chatId, 'Artık afk değilim!!');
                    }
                } else {
                    msg.client.sendMessage(chatId, afkmsg);
                }
            }
        }
    }
};
