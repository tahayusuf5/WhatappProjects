
let isafk = false;
let afkmsg = `Bu mesaj AFK olduğumun kanıtıdır.`;
const debug = config.debug;
module.exports = {
    async onMessage(msg) {
        if (msg.body.trim().startsWith(`${config.prefix}afk`)) {
            const botid = msg.client.info.wid._serialized;
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
            if (onay) {
                isafk = true;
                try {
                    const girdi = msg.body.trim();
                    afkmsg = girdi.replace(`${prefix}afk`, '').trim(); 
                    if (!afkmsg) { 
                        afkmsg = `Bu mesaj AFK olduğumun kanıtıdır.`;
                    }
                } catch (error) {
                    console.log(error);
                    afkmsg = `Şu anda AFK'yım. Merak etme bu bir bot otomasyon mesajıdır.`;
                }
                msg.client.sendMessage(chatId, `AFK mesajı olarak ayarlandı: ${afkmsg}`);
            }
        }
        if (isafk===true) {
            const gmsj = msg.body.trim();
            console.log(afkmsg)
            if (gmsj !== `AFK mesajı olarak ayarlandı: ${afkmsg}` && gmsj !== `${prefix}afk` && gmsj !== `${afkmsg}` && gmsj !== `${prefix}afk ${afkmsg}`) {
                const botid = msg.client.info.wid._serialized;
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
                if (onay) {
                    if (isafk) {
                        isafk = false;
                        msg.client.sendMessage(chatId, 'Yeni Değil Geri Geldim!!');
                    }
                } else {
                    msg.client.sendMessage(chatId, afkmsg);
                }
            }
        }
    }
};
