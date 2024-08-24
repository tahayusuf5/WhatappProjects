const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '..' ,'config.js');
const debug = config.debug;
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = {
   async onMessage(msg) {
        if (msg.body.trim().startsWith(`${prefix}setvar_sudo`) || msg.body.trim().startsWith(`${prefix}setvar_worktype`) || msg.body.trim().startsWith(`${prefix}setvar_prefix`) || msg.body.trim().startsWith(`${prefix}setvar_alivemsg`) ||  msg.body.trim().startsWith(`${prefix}setvar_kickmemsg`) || msg.body.trim().startsWith(`${prefix}reload`)) {
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
            if (msg.body.trim().startsWith(`${prefix}setvar_sudo`)) {
                if (onay) {
                    let mesaj = msg.body.trim();
                    let imesaj = mesaj.replace(`${prefix}setvar_sudo `, '');
                    let tmesaj = imesaj.replace(` `, ``);
                    if (tmesaj !== "" && tmesaj !== " ") {
                        try {
                            let configFileContent = fs.readFileSync(configPath, 'utf8');
                            let updatedConfigContent = configFileContent.replace(/sudoUsers:\s*\[.*?\],/, `sudoUsers: [${tmesaj}],`);
                            fs.writeFileSync(configPath, updatedConfigContent, 'utf8');
                            if (debug) {
                                console.log('Config dosyası güncellendi.');
                            }
                            msg.client.sendMessage(chatId, 'Sudo kullanıcılarınız güncellendi!');
                            msg.client.sendMessage(chatId, 'Yeniden Yükleniyor...');
                            await wait(500);
                            reloadConfigAndPlugins(); 
                        } catch (error) {
                            msg.client.sendMessage(chatId, 'Config dosyası güncellenirken bir hata oluştu.');
                            console.error('Config güncelleme hatası:', error);
                        }
                    }
                }
            } else if (msg.body.trim().startsWith(`${prefix}setvar_worktype`)) {
                if (onay) {
                    let mesaj = msg.body.trim();
                    let tmesaj = mesaj.replace(`${prefix}setvar_worktype `, '');
                    if (tmesaj !== "" && tmesaj !== " ") {
                        let configFileContent = fs.readFileSync(configPath, 'utf8');
                        configFileContent = configFileContent.replace(/worktype: '.*',/, `worktype: '${tmesaj}',`);
                        fs.writeFileSync(configPath, configFileContent, 'utf8');
                        if (debug) {
                            console.log('Config dosyası güncellendi.');
                        }
                        msg.client.sendMessage(chatId, `worktype güncellendi!`);
                        msg.client.sendMessage(chatId, 'Yeniden Yükleniyor...');
                        reloadConfigAndPlugins();
                    } else {
                        msg.client.sendMessage(chatId, 'yanlış argüman!')
                    }
                }
            } else if (msg.body.trim().startsWith(`${prefix}setvar_prefix`)) {
                if (onay) {
                    let mesaj = msg.body.trim();
                    let tmesaj = mesaj.replace(`${prefix}setvar_prefix `, '');
                    if (tmesaj !== "" && tmesaj !== " ") {
                        let configFileContent = fs.readFileSync(configPath, 'utf8');
                        configFileContent = configFileContent.replace(/prefix: '.*',/, `prefix: '${tmesaj}',`);
                        fs.writeFileSync(configPath, configFileContent, 'utf8');
                        if (debug) {
                            console.log('Config dosyası güncellendi.');
                        }
                        msg.client.sendMessage(chatId, `prefix'in güncellendi güncellendi!`);
                        msg.client.sendMessage(chatId, 'Yeniden Yükleniyor...');
                        reloadConfigAndPlugins();
                    } else {
                        msg.client.sendMessage(chatId, 'yanlış argüman!')
                    }
                }
            } else if (msg.body.trim().startsWith(`${prefix}setvar_alivemsg`)) {
                if (onay) {
                    let mesaj = msg.body.trim();
                    let tmesaj = mesaj.replace(`${prefix}setvar_alivemsg `, '');
                    if (tmesaj !== "" && tmesaj !== " ") {
                        let configFileContent = fs.readFileSync(configPath, 'utf8');
                        configFileContent = configFileContent.replace(/aliveMessage: '.*',/, `aliveMessage: '${tmesaj}',`);
                        fs.writeFileSync(configPath, configFileContent, 'utf8');
                        if (debug) {
                            console.log('Config dosyası güncellendi.');
                        }
                        msg.client.sendMessage(chatId, `Alive mesajın güncellendi güncellendi!`);
                        msg.client.sendMessage(chatId, 'Yeniden Yükleniyor...');
                        reloadConfigAndPlugins();
                    } else {
                        msg.client.sendMessage(chatId, 'yanlış argüman!')
                    }
                }
            } else if (msg.body.trim().startsWith(`${prefix}setvar_kickmemsg`)) {
                if (onay) {
                    let mesaj = msg.body.trim();
                    let tmesaj = mesaj.replace(`${prefix}setvar_kickmemsg `, '');
                    if (tmesaj !== "" && tmesaj !== " ") {
                        let configFileContent = fs.readFileSync(configPath, 'utf8');
                        configFileContent = configFileContent.replace(/kickmeMessage: '.*',/, `kickmeMessage: '${tmesaj}',`);
                        fs.writeFileSync(configPath, configFileContent, 'utf8');
                        if (debug) {
                            console.log('Config dosyası güncellendi.');
                        }
                        msg.client.sendMessage(chatId, `Kickme Mesajın güncellendi güncellendi!`);
                        msg.client.sendMessage(chatId, 'Yeniden Yükleniyor...');
                        reloadConfigAndPlugins();
                    } else {
                        msg.client.sendMessage(chatId, 'yanlış argüman!')
                    }
                }
            } else if (msg.body.trim().startsWith(`${prefix}reload`)) {
                if (onay) {
                    msg.client.sendMessage(chatId ,'Bot yeniden başlatılıyor lütfen bekleyiniz')
                    reloadConfigAndPlugins();
                }
            }
        }
    }
};