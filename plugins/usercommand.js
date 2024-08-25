const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');
const { MessageMedia } = require('whatsapp-web.js');
const debug = config.debug;
module.exports = {
    name: 'kickme',
    async onMessage(msg) {
        if (msg.body.trim().startsWith(`${prefix}kickme`) || msg.body.trim().startsWith(`${prefix}pp`) || msg.body.trim().startsWith(`${prefix}creategroup`) || msg.body.trim().startsWith(`${prefix}block`) || msg.body.trim().startsWith(`${prefix}unblock`)  || msg.body.trim().startsWith(`${prefix}pmsend`)) {
            let BotId = msg.client.info.wid._serialized;
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
            } else if (msg.body.trim().startsWith(`${prefix}creategroup`)) {
                    if (onay) {
                    const chat = await msg.getChat();
                    const chatId = chat.id._serialized;
                    let mesaj = msg.body.trim();
                    let params = mesaj.replace(`${prefix}creategroup `, '').split(',');
                    if (params.length < 2) {
                        return msg.reply('Lütfen grup adı ve en az bir numara belirtin.\nÖrnek: .creategroup GrupAdı, 905510310485, 905351567597');
                    }
                    let groupName = params[0].trim(); 
                    let participantNumbers = params.slice(1).map(number => number.trim() + '@c.us');
                    try {
                        let group = await msg.client.createGroup(groupName, participantNumbers);
                        msg.client.sendMessage(chatId, `Grup başarıyla oluşturuldu!\nGrup Adı: ${groupName}\nKatılımcılar: ${participantNumbers.join(', ')}`);
                    } catch (error) {
                        console.error('Grup oluşturma hatası:', error);
                        msg.client.sendMessage(chatId, 'Grup oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
                    }
                }
            } else if (msg.body.trim().startsWith(`${prefix}block`)) {
                if (onay) {
                    var go = true;
                    if (debug) {
                        console.log('Onaylandı\n', onay);
                    }
                    if (!chat.isGroup) {
                        var msgId = msg.to;
                    }
                    else if (chat.isGroup) {
                        if (msg.hasQuotedMsg) {
                            const quotedMsg = await msg.getQuotedMessage();
                            const quotedUserId = quotedMsg.author || quotedMsg.from;
                            var msgId = quotedUserId;
                            console.log('isgroup');
                        } else {
                            var msj = msg.body.trim();
                            var msj = msj.replace('@','')
                            var tmsj = msj.split(' ');
                            try {
                                var len = tmsj.length;
                            } catch (error) {
                                var len = 0;
                            }
                            if (len > 1 || len === 1) {
                                var msgId = `${tmsj[1]}@c.us`;
                                console.log(msgId);
                            }
                            else {
                                if (chat.isGroup) {
                                    msg.client.sendMessage(chatId, 'Lütfen bir kişiyi etiketleyin yada yanıt verin.');
                                    var go = false;
                                } else {
                                    msg.client.sendMessage(chatId, 'Id alınırken bir sorun oluştu\nOwner: wa.me/905510310485');
                                    var go = false;
                                }
                            }
                        }
                    }
                    console.log(msgId);
                    const contactId = msgId;
                    const contact = await msg.client.getContactById(contactId);
                    try {
                        if (msgId !== botid && go) {
                            await contact.block();
                        }
                        else {
                            if (go) {
                                msg.client.sendMessage(chatId, 'Lütfen bir kişiye yanıt verin veya etiketleyin.');
                            }
                        }
                        if (chat.isGroup && go) {
                            msg.client.sendMessage(chatId, 'Kişi engellendi.');
                        }
                        else {
                            if (go) {
                                msg.client.sendMessage(BotId, `${msgId} Kişisi engellendi. Bilginize.`);
                            }
                        }
                    } catch (error) {
                        msg.client.sendMessage(chatId, `Kişi engellenirken bir sorun oluştu\nAlınan Id: ${msgId}\n${error}`);
                    }
                }  
            } else if (msg.body.trim().startsWith(`${prefix}unblock`)) {
                if (onay) {
                    var go = true;
                    if (debug) {
                        console.log('Onaylandı\n', onay);
                    }
                    if (!chat.isGroup) {
                        var msgId = msg.to;
                    }
                    else if (chat.isGroup) {
                        if (msg.hasQuotedMsg) {
                            const quotedMsg = await msg.getQuotedMessage();
                            const quotedUserId = quotedMsg.author || quotedMsg.from;
                            var msgId = quotedUserId;
                            console.log('isgroup');
                        } else {
                            var msj = msg.body.trim();
                            var msj = msj.replace('@','')
                            var tmsj = msj.split(' ');
                            try {
                                var len = tmsj.length;
                            } catch (error) {
                                var len = 0;
                            }
                            if (len > 1 || len === 1) {
                                var msgId = `${tmsj[1]}@c.us`;
                                console.log(msgId);
                            }
                            else {
                                if (chat.isGroup) {
                                    msg.client.sendMessage(chatId, 'Lütfen bir kişiyi etiketleyin yada yanıt verin.');
                                    var go = false;
                                } else {
                                    msg.client.sendMessage(chatId, 'Id alınırken bir sorun oluştu\nOwner: wa.me/905510310485');
                                    var go = false;
                                }
                            }
                        }
                    }
                    console.log(msgId);
                    const contactId = msgId;
                    const contact = await msg.client.getContactById(contactId);
                    try {
                        if (msgId !== botid && go) {
                            await contact.unblock();
                        }
                        else {
                            if (go) {
                                msg.client.sendMessage(chatId, 'Lütfen bir kişiye yanıt verin veya etiketleyin.');
                            }
                        }
                        if (chat.isGroup && go) {
                            msg.client.sendMessage(chatId, 'Kişi engeli açıldı.');
                        }
                        else {
                            if (go) {
                                msg.client.sendMessage(BotId, `${msgId} Kişisinin engeli açıldı Bilginize.`);
                            }
                        }
                    } catch (error) {
                        msg.client.sendMessage(chatId, `Kişi engeli açılırken bir sorun oluştu\nAlınan Id: ${msgId}\n${error}`);
                    }
                }
            } else if (msg.body.trim().startsWith(`${prefix}pmsend`)) {
                if (onay) {
                    if (chat.isGroup) {
                        if (msg.hasQuotedMsg) {
                            const quotedMsg = await msg.getQuotedMessage();
                            const quotedUserId = quotedMsg.author || quotedMsg.from;
                            var msgId = quotedUserId;
                            var msj = msg.body.trim();
                            var tmsj = msj.split(' ');
                            var len = tmsj.length;
                            if (len>1 || len === 1) {
                                var arg = msj.replace(`${prefix}pmsend`, '');
                                msg.client.sendMessage(chatId, 'Mesaj gönderiyorum...');
                                msg.client.sendMessage(msgId, arg);
                            }
                        } else {
                            var msj = msg.body.trim().replace('@', '');
                            var tmsj = msj.split(' ');
                            var len = tmsj.length;
                            if (len>2 || len ===2) {
                                var authId = `${tmsj[1]}@c.us`;
                                var gmsj = msj.replace(`${prefix}pmsend`, '');
                                var gmsj = gmsj.replace(`${tmsj[1]}`, '');
                                var gmsj = gmsj.replace(' ', '');
                                var gmsj = gmsj.replace(' ', '');
                                try {
                                    msg.client.sendMessage(chatId, 'Mesajı gönderiyorum...');
                                    msg.client.sendMessage(authId, gmsj);
                                } catch (error) {
                                    msg.client.sendMessage(chatId, 'Yanlış kullanım tespit edildi! Örnek kullanım .pmsend @Ic3zy Selamın Aleyküm, //veya bir mesaja yanıt vererek. .pmsend Selamın Aleyküm.')
                                }
                            } else {
                                msg.client.sendMessage(chatId, 'Yanlış kullanım tespit edildi! Örnek kullanım .pmsend @Ic3zy Selamın Aleyküm, //veya bir mesaja yanıt vererek. .pmsend Selamın Aleyküm.')
                            }
                        }
                    } 
                }
            }
        }
    }
};