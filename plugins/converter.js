const { exec } = require('child_process');
const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');
const { worktype } = require('../config');
const { config } = require('process');
const debug = config.debug
module.exports = {
    name: 'convert',
    async onMessage(msg) {
        if (msg.body.trim().toLowerCase() === `${prefix}videosticker`) {
            if (worktype === 'public') {
                const chat = await msg.getChat();
                const chatId = chat.id._serialized;
                msg.client.sendMessage(chatId, "dönüştürme işlemi başladı...")
                if (debug) {
                    console.log("Chat ID: ", chatId);
                    console.log("Lütfen bekleyin");
                }
                const quotedMsg = await msg.getQuotedMessage();
                if (debug) {
                    console.log(quotedMsg);
                }
                if (quotedMsg.hasMedia) {
                    if (debug) {
                        console.log("Medya algılandı, işleniyor...");
                    }
                    const media = await quotedMsg.downloadMedia();
                    const fileName = 'sticker.webp';
                    const inputFilePath = path.join(__dirname, 'temp', fileName);
                    require('fs').writeFileSync(inputFilePath, media.data, 'base64');
                    const pythonScript = path.join(__dirname, '..', 'convert.py');
                    const command = `python "${pythonScript}" "${inputFilePath}"`;
                    exec(command, (error, stdout, stderr) => {
                        if (debug) {
                            console.log(`stdout: ${stdout}`);
                            console.error(`stderr: ${stderr}`);
                        }
                        if (error) {
                            if (debug) {
                                console.error(`Error: ${error}`);
                            }
                            return msg.reply('Dönüştürme sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
                        }
                        const fixedFilePath = path.join(__dirname, 'temp', ';converted.mp4');
                        if (debug) {
                            console.log(`Checking if file exists at: ${fixedFilePath}`);
                        }
                        if (!require('fs').existsSync(fixedFilePath)) {
                            if (debug) {
                                console.log('File does not exist, checking directory contents...');
                            }
                            require('fs').readdir(path.dirname(fixedFilePath), (err, files) => {
                                if (err) {
                                    if (debug) {
                                        console.error(`Error reading directory: ${err}`);
                                    }
                                } else {
                                    if (debug) {
                                        console.log('Directory contents:', files);
                                    }
                                }
                            });
                            msg.client(chatId, 'Dönüştürme tamamlanamadı.');
                        }
                        try {
                            const msgmedia = MessageMedia.fromFilePath(fixedFilePath);
                            msg.client.sendMessage(chatId, msgmedia, { caption: '*Madeby: WhatsAsena*' });
                            require('fs').unlinkSync(fixedFilePath); 
                            require('fs').unlinkSync(inputFilePath); 
                        }
                        catch {
                            msg.client.sendMessage(chatId, "Lütfen hareketli bir stickera yanıt verin")
                        }
                    });
                }
            } else if (worktype === 'private') {
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
                    msg.client.sendMessage(chatId, "dönüştürme işlemi başladı...")
                    if (debug) {
                        console.log("Chat ID: ", chatId);
                        console.log("Lütfen bekleyin");
                    }
                    const quotedMsg = await msg.getQuotedMessage();
                    if (debug) {
                        console.log(quotedMsg);
                    }
                    if (quotedMsg.hasMedia) {
                        if (debug) {
                            console.log("Medya algılandı, işleniyor...");
                        }
                        const media = await quotedMsg.downloadMedia();
                        const fileName = 'sticker.webp';
                        const inputFilePath = path.join(__dirname, 'temp', fileName);
                        require('fs').writeFileSync(inputFilePath, media.data, 'base64');
                        const pythonScript = path.join(__dirname, '..', 'convert.py');
                        const command = `python "${pythonScript}" "${inputFilePath}"`;
                        exec(command, (error, stdout, stderr) => {
                            if (debug) {
                                console.log(`stdout: ${stdout}`);
                                console.error(`stderr: ${stderr}`);
                            }
                            if (error) {
                                if (debug) {
                                    console.error(`Error: ${error}`);
                                }
                                return msg.reply('Dönüştürme sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
                            }
                            const fixedFilePath = path.join(__dirname, 'temp', ';converted.mp4');
                            if (debug) {
                                console.log(`Checking if file exists at: ${fixedFilePath}`);
                            }
                            if (!require('fs').existsSync(fixedFilePath)) {
                                if (debug) {
                                    console.log('File does not exist, checking directory contents...');
                                }
                                require('fs').readdir(path.dirname(fixedFilePath), (err, files) => {
                                    if (err) {
                                        if (debug) {
                                            console.error(`Error reading directory: ${err}`);
                                        }
                                    } else {
                                        if (debug) {
                                            console.log('Directory contents:', files);
                                        }
                                    }
                                });
                                msg.client(chatId, 'Dönüştürme tamamlanamadı.');
                            }
                            try {
                                const msgmedia = MessageMedia.fromFilePath(fixedFilePath);
                                msg.client.sendMessage(chatId, msgmedia, { caption: '*Madeby: WhatsAsena*' });
                                require('fs').unlinkSync(fixedFilePath); 
                                require('fs').unlinkSync(inputFilePath); 
                            }
                            catch {
                                msg.client.sendMessage(chatId, "Lütfen hareketli bir stickera yanıt verin")
                            }
                        });
                    }
                }
            }
        } else if (msg.body.trim() === `${prefix}imagesticker`) {
            if (worktype === 'public') {
                const chatId = msg.to;
                msg.client.sendMessage(chatId, "dönüştürme işlemi başladı...")
                if (debug) {
                    console.log("Chat ID: ", chatId);
                    console.log("Lütfen bekleyin");
                }
                const quotedMsg = await msg.getQuotedMessage();
                if (debug) {
                    console.log(quotedMsg);
                }
                if (quotedMsg.hasMedia) {
                    if (debug) {
                        console.log("Medya algılandı, işleniyor...");
                    }
                    const media = await quotedMsg.downloadMedia();
                    const fileName = 'sticker.webp';
                    const inputFilePath = path.join(__dirname, 'temp', fileName);
                    require('fs').writeFileSync(inputFilePath, media.data, 'base64');
                    const pythonScript = path.join(__dirname, '..', 'convert.py');
                    const command = `python "${pythonScript}" "${inputFilePath}"`;
                    exec(command, (error, stdout, stderr) => {
                        if (debug) {
                            console.log(`stdout: ${stdout}`);
                            console.error(`stderr: ${stderr}`);
                        }
                        if (error) {
                            if (debug) {
                                console.error(`Error: ${error}`);
                            }
                            return msg.reply('Dönüştürme sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
                        }
                        const fixedFilePath = path.join(__dirname, 'temp', 'convert.png');
                        if (debug) {
                            console.log(`Checking if file exists at: ${fixedFilePath}`);
                        }
                        if (!require('fs').existsSync(fixedFilePath)) {
                            if (debug) {
                                console.log('File does not exist, checking directory contents...');
                            }
                            require('fs').readdir(path.dirname(fixedFilePath), (err, files) => {
                                if (err) {
                                    if (debug) {
                                        console.error(`Error reading directory: ${err}`);
                                    }
                                } else {
                                    if (debug) {
                                        console.log('Directory contents:', files);
                                    }
                                }
                            });
                            msg.client(chatId, 'Dönüştürme tamamlanamadı.');
                        }
                        try {
                            const msgmedia = MessageMedia.fromFilePath(fixedFilePath);
                            msg.client.sendMessage(chatId, msgmedia, { caption: '*Madeby: WhatsAsena*' });
                            require('fs').unlinkSync(fixedFilePath);
                            require('fs').unlinkSync(inputFilePath);
                        }
                        catch {
                            msg.client.sendMessage(chatId, "Lütfen hareketli olmayan stickera yanıt verin.")
                        } 
                    });
                }
            } else if (worktype === 'private') {
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
                msg.client.sendMessage(chatId, "dönüştürme işlemi başladı...")
                if (onay) {
                    if (debug) {
                        console.log("Chat ID: ", chatId);
                        console.log("Lütfen bekleyin");
                    }
                    const quotedMsg = await msg.getQuotedMessage();
                    if (debug) {
                        console.log(quotedMsg);
                    }
                    if (quotedMsg.hasMedia) {
                        if (debug) {
                            console.log("Medya algılandı, işleniyor...");
                        }
                        const media = await quotedMsg.downloadMedia();
                        const fileName = 'sticker.webp';
                        const inputFilePath = path.join(__dirname, 'temp', fileName);
                        require('fs').writeFileSync(inputFilePath, media.data, 'base64');
                        const pythonScript = path.join(__dirname, '..', 'convert.py');
                        const command = `python "${pythonScript}" "${inputFilePath}"`;
                        exec(command, (error, stdout, stderr) => {
                            if (debug) {
                                console.log(`stdout: ${stdout}`);
                                console.error(`stderr: ${stderr}`);
                            }
                            if (error) {
                                if (debug) {
                                    console.error(`Error: ${error}`);
                                }
                                return msg.reply('Dönüştürme sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
                            }
                            const fixedFilePath = path.join(__dirname, 'temp', 'convert.png');
                            if (debug) {
                                console.log(`Checking if file exists at: ${fixedFilePath}`);
                            }
                            if (!require('fs').existsSync(fixedFilePath)) {
                                if (debug) {
                                    console.log('File does not exist, checking directory contents...');
                                }
                                require('fs').readdir(path.dirname(fixedFilePath), (err, files) => {
                                    if (err) {
                                        if (debug) {
                                            console.error(`Error reading directory: ${err}`);
                                        }
                                    } else {
                                        if (debug) {
                                            console.log('Directory contents:', files);
                                        }
                                    }
                                });
                                msg.client.sendMessage(chatId, 'Dönüştürme tamamlanamadı.');
                            }
                            try {
                                const msgmedia = MessageMedia.fromFilePath(fixedFilePath);
                                msg.client.sendMessage(chatId, msgmedia, { caption: '*Madeby: WhatsAsena*' });
                                require('fs').unlinkSync(fixedFilePath);
                                require('fs').unlinkSync(inputFilePath);
                            }
                            catch {
                                msg.client.sendMessage(chatId, "Lütfen hareketli olmayan stickera yanıt verin.")
                            } 
                        });
                    }
                }
            }
        }
    }
};
