const { exec } = require('child_process');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');
const debug = config.debug
module.exports = {
    async onMessage(msg) {
        if (msg.body.trim().startsWith(`${config.prefix}attp`)) {
            if (worktype === 'public') {
                const chat = await msg.getChat();
                const chatId = chat.id._serialized;
                const glnmsg = msg.body.trim();
                const tmzlislm = glnmsg.replace(`${config.prefix}attp`, '');
                const tmzmsg = tmzlislm.trim();
                console.log(glnmsg, 'Temiz mesaj:', tmzmsg);
                const gfbpath = path.join(__dirname, '..', 'gifbase.py');
                const pth = (`"`+gfbpath+`"`)
                console.log(pth)
                exec(`python ${pth} ${tmzmsg}`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Python script error: ${error}`);
                        return;
                    }
                    if (stderr) {
                        console.error(`Python script stderr: ${stderr}`);
                        return;
                    }
                    if (debug) {
                        console.log(`Python script stdout: ${stdout}`);
                    }
                    const webp = MessageMedia.fromFilePath('plugins/temp/attp.webp');
                    msg.client.sendMessage(chatId, webp, { 
                        sendMediaAsSticker: true,
                        stickerAuthor: 'Made by: WhatsIc3zy\nCoded by: Ic3zy',
                        stickerName: 'StickerArchive'
                    })
                        .then(() => {
                            console.log('Sticker başarıyla gönderildi!');
                        })
                        .catch(err => {
                            console.error('Sticker gönderme hatası:', err);
                        });
                });
            } else if (worktype === 'private') {
                const botid = msg.client.info.wid._serialized;
                const msgId = msg.from;
                if (debug) {
                    console.log(msgId);
                }
                var sudo = false;
                var onay = false;
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
                    const chat = await msg.getChat();
                    const chatId = chat.id._serialized;
                    const glnmsg = msg.body.trim();
                    const tmzlislm = glnmsg.replace(`${config.prefix}attp`, '');
                    const tmzmsg = tmzlislm.trim();
                    console.log(glnmsg, 'Temiz mesaj:', tmzmsg);
                    const gfbpath = path.join(__dirname, '..', 'gifbase.py');
                    const pth = (`"`+gfbpath+`"`)
                    console.log(pth)
                    exec(`python ${pth} ${tmzmsg}`, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Python script error: ${error}`);
                            return;
                        }
                        if (stderr) {
                            console.error(`Python script stderr: ${stderr}`);
                            return;
                        }
                        if (debug) {
                            console.log(`Python script stdout: ${stdout}`);
                        }
                        const webp = MessageMedia.fromFilePath('plugins/temp/attp.webp');
                        msg.client.sendMessage(chatId, webp, { 
                            sendMediaAsSticker: true,
                            stickerAuthor: 'Made by: WhatsIc3zy\nCoded by: Ic3zy',
                            stickerName: 'StickerArchive'
                        })
                            .then(() => {
                                console.log('Sticker başarıyla gönderildi!');
                            })
                            .catch(err => {
                                console.error('Sticker gönderme hatası:', err);
                            });
                    });
                }
            }
        }
    }
};
