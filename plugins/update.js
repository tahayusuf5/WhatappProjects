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
                const commits = await git.log(['master..origin/master']);
                
                if (commits.total === 0) {
                    await msg.client.sendMessage(msg.from, 'Bot is already up to date.', { quoted: msg });
                } else {
                    let changelog = 'New updates available:\n';
                    commits.all.forEach(commit => {
                        changelog += `▫️ [${commit.date.substring(0, 10)}]: ${commit.message} <${commit.author_name}>\n`;
                    });

                    await msg.client.sendMessage(msg.from, changelog, { quoted: msg });
                }
            }
        } else if (msg.body.trim().toLowerCase() === `${prefix}update now`) {
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
                const commits = await git.log(['master..origin/master']);
                
                if (commits.total === 0) {
                    await msg.client.sendMessage(msg.from, 'Bot is already up to date.', { quoted: msg });
                } else {
                    const updateMessage = await msg.client.sendMessage(msg.from, 'Updating bot, please wait...', { quoted: msg });
                    
                    git.pull('origin', 'master', async (err, update) => {
                        if (update && update.summary.changes) {
                            await msg.client.sendMessage(msg.from, 'Bot has been updated successfully.', { quoted: msg });
                            exec('npm install', (error, stdout, stderr) => {
                                if (error) {
                                    return msg.client.sendMessage(msg.from, `Update failed with error: ${error.message}`, { quoted: msg });
                                }
                                msg.client.sendMessage(msg.from, 'Dependencies have been updated.', { quoted: msg });
                            });
                        } else if (err) {
                            await msg.client.sendMessage(msg.from, `Update failed: ${err.message}`, { quoted: msg });
                        }
                    });

                    await updateMessage.delete(true);
                }
            }
        }
    }
};
