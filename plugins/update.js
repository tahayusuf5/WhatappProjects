const simpleGit = require('simple-git');
const {exec} = require('child_process')
const git = simpleGit();
module.exports = {
    name: 'update',
    description: 'Check for updates and update the bot if necessary.',
    async onMessage(msg) {
        if (msg.body.trim().toLowerCase() === `${prefix}update`) {
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
            if (onay) {
                await git.fetch();
                const commits = await git.log(['master..origin/master']);

                if (commits.total === 0) {
                    await msg.client.sendMessage(chatId, 'Bot is already up to date.', { quoted: msg });
                } else {
                    let changelog = 'New updates available:\n';
                    commits.all.forEach(commit => {
                        changelog += `▫️ [${commit.date.substring(0, 10)}]: ${commit.message} <${commit.author_name}>\n`;
                    });

                    await msg.client.sendMessage(chatId, changelog, { quoted: msg });
                }
            }
        } else if (msg.body.trim().toLowerCase() === `${prefix}update now`) {
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
            if (onay) {
                await git.fetch();
                const commits = await git.log(['master..origin/master']);

                if (commits.total === 0) {
                    await msg.client.sendMessage(chatId, 'Botunuz Güncel!', { quoted: msg });
                } else {
                    const updateMessage = await msg.client.sendMessage(chatId, 'Bot güncelleniyor lütfen bekleyiniz...', { quoted: msg });

                    git.pull('origin', 'master', async (err, update) => {
                        if (update && update.summary.changes) {
                            await msg.client.sendMessage(chatId, 'Bot güncellemesi başarılı oldu!', { quoted: msg });
                            exec('npm install', (error, stdout, stderr) => {
                                if (error) {
                                    return msg.client.sendMessage(msg.from, `Güncelleme sırasında bir hata oluştu: ${error.message}`, { quoted: msg });
                                }
                                msg.client.sendMessage(chatId, 'Kütüphaneler güncellendi.', { quoted: msg });
                            });
                        } else if (err) {
                            await msg.client.sendMessage(chatId, `Güncelleme sırasında bir hata oluştu: ${err.message}`, { quoted: msg });
                        }
                    });
                    await updateMessage.delete(true);
                }
            }
        }
    }
};
