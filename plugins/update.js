const simpleGit = require('simple-git');
const {exec} = require('child_process')
const git = simpleGit();
module.exports = {
    name: 'update',
    description: 'Check for updates and update the bot if necessary.',
    async onMessage(msg) {
        if (msg.body.trim().toLowerCase() === `${prefix}update`) {
            const BotId = msg.client.info.wid._serialized;
            const msgId = msg.from;
            const chat = await msg.getChat();
            const chatId = chat.id._serialized;
            let sudo = false;
            let onay = false;

            for (const i of sudoUser) {
                if (i === msgId) {
                    sudo = true;
                    onay = true;
                }
            }

            if (!onay && msgId === BotId) {
                onay = true;
            }

            if (onay) {
                await git.fetch();
                const commits = await git.log(['master..origin/Koyeb-Deploy']);
                
                if (commits.total === 0) {
                    await msg.client.sendMessage(chatId, 'Bot zaten güncel.', { quoted: msg });
                } else {
                    let changelog = 'Yeni update yüklenebilir.:\n';
                    commits.all.forEach(commit => {
                        changelog += `▫️ [${commit.date.substring(0, 10)}]: ${commit.message} <${commit.author_name}>\n`;
                    });

                    await msg.client.sendMessage(chatId, changelog, { quoted: msg });
                }
            }
        } else if (msg.body.trim().toLowerCase() === `${prefix}update now`) {
            const chat = await msg.getChat();
            const chatId = chat.id._serialized;
            const BotId = msg.client.info.wid._serialized;
            const msgId = msg.from;
            let sudo = false;
            let onay = false;

            for (const i of sudoUser) {
                if (i === msgId) {
                    sudo = true;
                    onay = true;
                }
            }

            if (!onay && msgId === BotId) {
                onay = true;
            }

            if (onay) {
                await git.fetch();
                const commits = await git.log(['master..origin/Koyeb-Deploy']);
                
                if (commits.total === 0) {
                    await msg.client.sendMessage(chatId, 'Bot zaten güncel', { quoted: msg });
                } else {
                    const updateMessage = await msg.client.sendMessage(chatId, 'Updating bot, lütfen bekleyin...', { quoted: msg });
                    
                    git.pull('origin', 'master', async (err, update) => {
                        if (update && update.summary.changes) {
                            await msg.client.sendMessage(chatId, 'Update başarı ile tamamlandı', { quoted: msg });
                            exec('npm install', (error, stdout, stderr) => {
                                if (error) {
                                    return msg.client.sendMessage(chatId, `Update hata verdi: ${error.message}`, { quoted: msg });
                                }
                                msg.client.sendMessage(chatId, 'Bot güncellendi.', { quoted: msg });
                            });
                        } else if (err) {
                            await msg.client.sendMessage(chatId, `Update Hata verdi: ${err.message}`, { quoted: msg });
                        }
                    });

                    await updateMessage.delete(true);
                }
            }
        }
    }
};
