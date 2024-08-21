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
                        const fixedFilePath = 'C:\\Users\\abdullah\\Desktop\\topmasaustu\\Yeni klasör (3)\\plugins\\temp\\converted.mp4';
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
                const msgId = msg.from;
                let BotId = msg.client.info.wid._serialized;
                var sudo = false;
                var onay = false;
                const chat = await msg.getChat();
                const chatId = chat.id._serialized;
                for (const i of sudoUsers) {
                    if (i === msgId) {
                        var sudo = true;
                        var onay = true;
                    }
                }
                if (!onay) {
                    if (msgId === BotId) {
                        var onay = true;
                    }
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
                            const fixedFilePath = 'C:\\Users\\abdullah\\Desktop\\topmasaustu\\Yeni klasör (3)\\plugins\\temp\\converted.mp4';
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
        } else if (msg.body.trim() === `${config.prefix}imagesticker`) {
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
                        const fixedFilePath = 'C:\\Users\\abdullah\\Desktop\\topmasaustu\\Yeni klasör (3)\\plugins\\temp\\convert.png';
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
                const author = msg.from;
                const chatId = msg.to;
                var onay = false;
                var sudo = false;
                for (const i of config.sudoUsers){
                    if (i === author) {
                        var onay = true;
                        var sudo = true;
                    }
                }
                if (!sudo) {
                    if (debug) {
                        console.log('Gelen mesaj sudolara dahil değil.')
                    }
                    if (author === BotId) {
                        var onay = true;
                    }
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
                            const fixedFilePath = 'C:\\Users\\abdullah\\Desktop\\topmasaustu\\Yeni klasör (3)\\plugins\\temp\\convert.png';
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
                }
            }
        }
    }
};
