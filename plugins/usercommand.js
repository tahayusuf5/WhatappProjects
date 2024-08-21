const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');
const { MessageMedia } = require('whatsapp-web.js');
const debug = config.debug;
module.exports = {
    name: 'kickme',
    async onMessage(msg) {
        if (msg.body.trim().startsWith(`${prefix}kickme`) || msg.body.trim().startsWith(`${prefix}pp`)) {
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
            if (msg.body.trim().toLowerCase() === `${prefix}kickme`) {
                if (onay) {
                    const chat = await msg.getChat();
                    const chatId = chat.id._serialized;
                    const gbmsg = config.kickmeMessage || 'görüşürüz.';
                    if (chat.isGroup) {
                        await msg.client.sendMessage(chatId, gbmsg);
                        await sleep(200);
                        await chat.leave();
                    } else {
                        await msg.client.sendMessage(chatId, 'Bu komut sadece grup sohbetlerinde kullanılabilir.');
                    }
                }
            } else if (msg.body.trim().toLowerCase() === `${prefix}pp`) {
                if (onay) {
                    const quotedMsg = await msg.getQuotedMessage();
                    const media = await quotedMsg.downloadMedia();
                    const chat = await msg.getChat();
                    const chatId = chat.id._serialized;
                    const quotedMsgId = msg.id._serialized;
                    if (quotedMsg.hasMedia && media) {
                        const mediaPath = path.join(__dirname, './temp', 'profile-pic.jpg');
                        fs.writeFileSync(mediaPath, media.data, { encoding: 'base64' });
                        try {
                            const image = await Jimp.read(mediaPath);
                            image.resize(640, 640)
                                .cover(640, 640)
                                .quality(80)
                                .write(mediaPath);
                            const mediaData = fs.readFileSync(mediaPath, { encoding: 'base64' });
                            const newProfilePic = new MessageMedia('image/jpeg', mediaData);
                            await msg.client.setProfilePicture(newProfilePic);
                            msg.client.sendMessage(chatId, 'Profil fotoğrafınız başarıyla güncellendi!', { QuotedMessageId: quotedMsgId});
                        } catch (error) {
                            console.error('Profil fotoğrafı ayarlanamadı:', error);
                            await msg.reply('Profil fotoğrafı ayarlanırken bir hata oluştu.');
                        } finally {
                            fs.unlinkSync(mediaPath);
                        }
                    } else {
                        await msg.reply('Medyayı indirme sırasında bir sorun oluştu.');
                    }
                }
            }
        }
    }
};
