const debug = config.debug;
module.exports = {
    name: 'admin',
    async onMessage(msg) {
        const msj = msg.body.trim();
        if (msg.body.trim().startsWith(`${prefix}admin`) || msg.body.trim().startsWith(`${prefix}add`) || msg.body.trim().startsWith(`${prefix}ban`) || msg.body.trim().startsWith(`${prefix}promote`) || msg.body.trim().startsWith(`${prefix}demote`) || msg.body.trim().startsWith(`${prefix}tagall` || msg.body.trim().startsWith(`${prefix}pp`)) || msg.body.trim().startsWith(`${prefix}gruplink`)) {
            if (debug) {
                console.log('admin.js : komut algılandı')
            }
            var chat = await msg.getChat();
            let soliedBotId = msg.client.info.wid._serialized;
            let botId = soliedBotId.replace("@c.us", "");
            var BotId = msg.client.info.wid._serialized;
            var msgId = undefined;
            var chat = await msg.getChat();
            var chatId = chat.id._serialized;
            var aliveMessage = config.aliveMessage || 'Bot is alive!';
            if (chat.isGroup) {
                var msgId = msg.id.participant;
            }
            else {
                var msgId = msg.from;
            }
            if (debug) {
                console.log(msgId);
            }
            if (debug) {
                console.log(msgId);
            }

            let sudo = false;
            let onay = false;

            for (const i of sudoUsers) {
                if (i === msgId) {
                    sudo = true;
                    onay = true;
                    break;
                }
            }

            if (!onay && msgId === BotId) {
                onay = true;
            }

            if (debug) {
                console.log(onay);
            }
            if (msg.body.trim().toLowerCase() === `${prefix}admin`) {
                if (worktype === 'public') {
                    if (onay) {
                        const chat = await msg.getChat();
                        if (chat.isGroup) {
                            const chat = await msg.getChat();
                            const chatId = chat.id._serialized;
                            const participants = chat.participants;
                            const isBotAdmin = participants.some(participant => participant.id._serialized === soliedBotId && participant.isAdmin);
                            const isAuthorAdmin = participants.some(participant => participant.id._serialized === authorId && participant.isAdmin);
                            if (debug) {
                                console.log(`Chat ID: ${chatId}`);
                                console.log(`Katılımcılar: ${JSON.stringify(participants)}`);
                                console.log(`Bot Admin mi: ${isBotAdmin}`);
                                console.log(`Admin mi: ${isAuthorAdmin}`);
                            }
                            if (chat.isGroup) {
                                if (isBotAdmin) {
                                    await msg.client.sendMessage(chatId, 'Adminsiniz.');
                                } else {
                                    await msg.client.sendMessage(chatId, 'Bu komut sadece grup adminleri tarafından kullanılabilir.');
                                }
                            } else {
                                await msg.client.sendMessage(chatId, 'Bu komut sadece grup sohbetlerinde kullanılabilir.');
                            }
                        }
                    }
                } else if (worktype === 'private') {
                    if (onay) {
                        const chat = await msg.getChat();
                        const chatId = chat.id._serialized;
                        if (chat.isGroup) {
                            const participants = chat.participants;
                            const isBotAdmin = participants.some(participant => participant.id._serialized === soliedBotId && participant.isAdmin);
                            const isAuthorAdmin = participants.some(participant => participant.id._serialized === authorId && participant.isAdmin);
                            // if (debug) {
                            //     console.log(`Chat ID: ${chatId}`);
                            //     console.log(`Katılımcılar: ${JSON.stringify(participants)}`);
                            //     console.log(`Bot Admin mi: ${isBotAdmin}`);
                            //     console.log(`Admin mi: ${isAuthorAdmin}`);
                            // }
                            if (chat.isGroup) {
                                if (isBotAdmin) {
                                    await msg.client.sendMessage(chatId, 'Adminsiniz.');
                                } else {
                                    await msg.client.sendMessage(chatId, 'Bu komut sadece grup adminleri tarafından kullanılabilir.');
                                }
                            } else {
                                await msg.client.sendMessage(chatId, 'Bu komut sadece grup sohbetlerinde kullanılabilir.');
                            }
                        }
                    }
                }
            } else if (msg.body.trim().toLowerCase().startsWith(`${prefix}ban`)) {
                if (worktype === 'public') {
                    if (onay) {
                        const chat = await msg.getChat();
                        const chatId = chat.id._serialized;
                        if (chat.isGroup) {
                            const participants = chat.participants;
                            const isBotAdmin = participants.some(participant => participant.id._serialized === soliedBotId && participant.isAdmin);
                            if (isBotAdmin) {
                                if (chatId.endsWith('@g.us')) {
                                    if (msg.hasQuotedMsg) {
                                        const quotedMsg = await msg.getQuotedMessage();
                                        const quotedUserId = quotedMsg.author || quotedMsg.from;
                                        if (debug) {
                                            console.log(`Yanıtlanan kullanıcı ID: ${quotedUserId}`);
                                        }
                                        if (quotedUserId) {
                                            try {
                                                const result = await removeUser(chat, quotedUserId);
                                                await msg.client.sendMessage(chatId, result ? 'Kullanıcı yasaklandı!' : 'Kullanıcıyı yasaklama başarısız oldu.');
                                            } catch (error) {
                                                msg.client.sendMessage(chatId, 'Banlama sırasında bir hata oluştu hata:', error);
                                            }
                                            
                                        } else {
                                            await msg.client.sendMessage(chatId, 'Yanıtlanan mesajdaki kullanıcı ID\'si bulunamadı.');
                                        }
                                    } else {
                                        const args = msg.body.trim().split(' ');
                                        if (args[1]) {
                                            let userId = args[1];
                                            if (userId.startsWith('@')) {
                                                userId = userId.substring(1);
                                            }
                                            const formattedUserId = `${userId}@c.us`;
                                            if (debug) {
                                                console.log(`Yasaklanacak kullanıcı ID: ${formattedUserId}`);
                                            }
                                            if (formattedUserId) {
                                                try {
                                                    const result = await removeUser(chat, formattedUserId);
                                                    await msg.client.sendMessage(chatId, result ? 'Kullanıcı yasaklandı!' : 'Kullanıcıyı yasaklama başarısız oldu.');
                                                } catch (error) {
                                                    msg.client.sendMessagr(chatId, 'Banlama sırasında bir hata oluştu hata:', error);
                                                }
                                            } else {
                                                await msg.client.sendMessage(chatId, 'Kullanıcı ID\'si sağlanamadı.');
                                            }
                                        } else {
                                            await msg.client.sendMessage(chatId, 'Bir mesaja yanıt verin veya bir kullanıcıyı etiketleyin.');
                                        }
                                    }
                                } else {
                                    await msg.client.sendMessage(chatId, 'Bu komut sadece gruplarda kullanılabilir.');
                                }
                            } else {
                                await msg.client.sendMessage(chatId, 'Bu komutu yerine getirebilmem için admin olmam gerek.');
                            }
                        }
                    }
                } else if (worktype === 'private') {
                    if (onay) {
                        const chat = await msg.getChat();
                        const chatId = chat.id._serialized;
                        if (chat.isGroup) {
                            const participants = chat.participants;
                            const isBotAdmin = participants.some(participant => participant.id._serialized === soliedBotId && participant.isAdmin);    
                            if (isBotAdmin) {
                                if (chatId.endsWith('@g.us')) {
                                    if (msg.hasQuotedMsg) {
                                        const quotedMsg = await msg.getQuotedMessage();
                                        const quotedUserId = quotedMsg.author || quotedMsg.from;
                                        if (debug) {
                                            console.log(`Yanıtlanan kullanıcı ID: ${quotedUserId}`);
                                        }
                                        if (quotedUserId) {
                                            const result = await removeUser(chat, quotedUserId);
                                            await msg.client.sendMessage(chatId, result ? 'Kullanıcı yasaklandı!' : 'Kullanıcıyı yasaklama başarısız oldu.');
                                        } else {
                                            await msg.client.sendMessage(chatId, 'Yanıtlanan mesajdaki kullanıcı ID\'si bulunamadı.');
                                        }
                                    } else {
                                        const args = msg.body.trim().split(' ');
                                        if (args[1]) {
                                            let userId = args[1];
                                            if (userId.startsWith('@')) {
                                                userId = userId.substring(1);
                                            }
                                            const formattedUserId = `${userId}@c.us`;
                                            if (debug) {
                                                console.log(`Yasaklanacak kullanıcı ID: ${formattedUserId}`);
                                            }
                                            if (formattedUserId) {
                                                const result = await removeUser(chat, formattedUserId);
                                                await msg.client.sendMessage(chatId, result ? 'Kullanıcı yasaklandı!' : 'Kullanıcıyı yasaklama başarısız oldu.');
                                            } else {
                                                await msg.client.sendMessage(chatId, 'Kullanıcı ID\'si sağlanamadı.');
                                            }
                                        } else {
                                            await msg.client.sendMessage(chatId, 'Bir mesaja yanıt verin veya bir kullanıcıyı etiketleyin.');
                                        }
                                    }
                                } else {
                                    await msg.client.sendMessage(chatId, 'Bu komut sadece gruplarda kullanılabilir.');
                                }
                            } else {
                                await msg.client.sendMessage(chatId, 'Bu komutu yerine getirebilmem için admin olmam gerek.');
                            }
                        }
                    }
                }
            } else if (msg.body.trim().toLowerCase().startsWith(`${prefix}add`)) {
                if (worktype === 'public') {
                    if (onay) {
                        const chat = await msg.getChat();
                        const chatId = chat.id._serialized;
                        if (chat.isGroup) {
                            const participants = chat.participants;
                            const isBotAdmin = participants.some(participant => participant.id._serialized === soliedBotId && participant.isAdmin);
 
                            if (isBotAdmin) {
                                if (chatId.endsWith('@g.us')) {
                                    const args = msg.body.trim().split(' ');
                                    if (args[1]) {
                                        let userId = args[1];
                                        if (userId.startsWith('@')) {
                                            userId = userId.substring(1);
                                        }
                                        const formattedUserId = `${userId}@c.us`;
                                        if (debug) {
                                            console.log(`Eklenecek kullanıcı ID: ${formattedUserId}`);
                                        }
                                        if (formattedUserId) {
                                            try {
                                                await chat.addParticipants([formattedUserId]);
                                                await msg.client.sendMessage(chatId, 'Kullanıcı gruba eklendi!');
                                            } catch (error) {
                                                await msg.client.sendMessage(chatId, 'Kullanıcıyı gruba ekleme başarısız oldu.');
                                            }
                                        } else {
                                            await msg.client.sendMessage(chatId, 'Kullanıcı ID\'si sağlanamadı.');
                                        }
                                    } else {
                                        await msg.client.sendMessage(chatId, 'Bir kullanıcı ID\'si sağlayın.');
                                    }
                                } else {
                                    await msg.client.sendMessage(chatId, 'Bu komut sadece gruplarda kullanılabilir.');
                                }
                            } else {
                                await msg.client.sendMessage(chatId, 'Bu komutu yerine getirebilmem için admin olmam gerek.');
                            }
                        }
                    }
                } else if (worktype === 'private') {
                    if (onay) {
                        const chat = await msg.getChat();
                        const chatId = chat.id._serialized;
                        if (chat.isGroup) {
                            const participants = chat.participants;
                            const isBotAdmin = participants.some(participant => participant.id._serialized === soliedBotId && participant.isAdmin);
                            if (isBotAdmin) {
                                if (chatId.endsWith('@g.us')) {
                                    const args = msg.body.trim().split(' ');
                                    if (args[1]) {
                                        let userId = args[1];
                                        if (userId.startsWith('@')) {
                                            userId = userId.substring(1);
                                        }
                                        const formattedUserId = `${userId}@c.us`;
                                        if (debug) {
                                            console.log(`Eklenecek kullanıcı ID: ${formattedUserId}`);
                                        }
                                        if (formattedUserId) {
                                            try {
                                                await chat.addParticipants([formattedUserId]);
                                                await msg.client.sendMessage(chatId, 'Kullanıcı gruba eklendi!');
                                            } catch (error) {
                                                await msg.client.sendMessage(chatId, 'Kullanıcıyı gruba ekleme başarısız oldu.');
                                            }
                                        } else {
                                            await msg.client.sendMessage(chatId, 'Kullanıcı ID\'si sağlanamadı.');
                                        }
                                    } else {
                                        await msg.client.sendMessage(chatId, 'Bir kullanıcı ID\'si sağlayın.');
                                    }
                                } else {
                                    await msg.client.sendMessage(chatId, 'Bu komut sadece gruplarda kullanılabilir.');
                                }
                            } else {
                                await msg.client.sendMessage(chatId, 'Bu komutu yerine getirebilmem için admin olmam gerek.');
                            }
                        }
                    }
                }
            } else if (msg.body.trim().toLowerCase().startsWith(`${prefix}promote`)) {
                if (worktype === 'public') {
                    if (onay) {
                        const chat = await msg.getChat();
                        const chatId = chat.id._serialized;
                        if (chat.isGroup) {
                            const participants = chat.participants;
                            const isBotAdmin = participants.some(participant => participant.id._serialized === soliedBotId && participant.isAdmin);    
                            if (isBotAdmin) {
                                if (chatId.endsWith('@g.us')) {
                                    const args = msg.body.trim().split(' ');
                                    if (args[1]) {
                                        let userId = args[1];
                                        if (userId.startsWith('@')) {
                                            userId = userId.substring(1);
                                        }
                                        const formattedUserId = `${userId}@c.us`;
                                        if (debug) {
                                            console.log(`Yönetici yapılacak kullanıcı ID: ${formattedUserId}`);
                                        }
                                        if (formattedUserId) {
                                            try {
                                                await chat.promoteParticipants([formattedUserId]);
                                                await msg.client.sendMessage(chatId, 'Kullanıcı yönetici yapıldı!');
                                            } catch (error) {
                                                await msg.client.sendMessage(chatId, 'Kullanıcıyı yönetici yapma başarısız oldu.');
                                            }
                                        } else {
                                            await msg.client.sendMessage(chatId, 'Kullanıcı ID\'si sağlanamadı.');
                                        }
                                    } else if (msg.hasQuotedMsg){
                                        const quotedMsg = await msg.getQuotedMessage();
                                        const quotedUserId = quotedMsg.author || quotedMsg.from;
                                        try {
                                            await chat.promoteParticipants([quotedUserId]);
                                            await msg.client.sendMessage(chatId, 'Kişi yönetici yapıldı.');
                                        } catch (error) {
                                            await msg.client.sendMessage(chatId, 'Kişi zaten yönetici.');
                                        }
                                    }
                                } else {
                                    await msg.client.sendMessage(chatId, 'Bu komut sadece gruplarda kullanılabilir.');
                                }
                            } else {
                                await msg.client.sendMessage(chatId, 'Bu komutu yerine getirebilmem için admin olmam gerek.');
                            }
                        }
                    }
                } else if (worktype === 'private') {
                    if (onay) {
                        const chat = await msg.getChat();
                        const chatId = chat.id._serialized;
                        if (chat.isGroup) {
                            const participants = chat.participants;
                            const isBotAdmin = participants.some(participant => participant.id._serialized === soliedBotId && participant.isAdmin);    
                            if (isBotAdmin) {
                                if (chatId.endsWith('@g.us')) {
                                    const args = msg.body.trim().split(' ');
                                    if (args[1]) {
                                        let userId = args[1];
                                        if (userId.startsWith('@')) {
                                            userId = userId.substring(1);
                                        }
                                        const formattedUserId = `${userId}@c.us`;
                                        if (debug) {
                                            console.log(`Yönetici yapılacak kullanıcı ID: ${formattedUserId}`);
                                        }
                                        if (formattedUserId) {
                                            try {
                                                await chat.promoteParticipants([formattedUserId]);
                                                await msg.client.sendMessage(chatId, 'Kullanıcı yönetici yapıldı!');
                                            } catch (error) {
                                                await msg.client.sendMessage(chatId, 'Kullanıcıyı yönetici yapma başarısız oldu.');
                                            }
                                        } else {
                                            await msg.client.sendMessage(chatId, 'Kullanıcı ID\'si sağlanamadı.');
                                        }
                                    } else if (msg.hasQuotedMsg){
                                        const quotedMsg = await msg.getQuotedMessage();
                                        const quotedUserId = quotedMsg.author || quotedMsg.from;
                                        try {
                                            await chat.promoteParticipants([quotedUserId]);
                                            await msg.client.sendMessage(chatId, 'Kişi yönetici yapıldı.');
                                        } catch (error) {
                                            await msg.client.sendMessage(chatId, 'Kişi zaten yönetici.');
                                        }
                                    }
                                } else {
                                    await msg.client.sendMessage(chatId, 'Bu komut sadece gruplarda kullanılabilir.');
                                }
                            } else {
                                await msg.client.sendMessage(chatId, 'Bu komutu yerine getirebilmem için admin olmam gerek.');
                            }
                        }
                    }
                }
            } else if (msg.body.trim().toLowerCase().startsWith(`${prefix}demote`)) {
                if (worktype === 'public') {
                    if (onay) {
                        const chat = await msg.getChat();
                        const chatId = chat.id._serialized;
                        if (chat.isGroup) {
                            const participants = chat.participants;
                            const isBotAdmin = participants.some(participant => participant.id._serialized === soliedBotId && participant.isAdmin);
                            if (isBotAdmin) {
                                if (chatId.endsWith('@g.us')) {
                                    const args = msg.body.trim().split(' ');
                                    if (args[1]) {
                                        let userId = args[1];
                                        if (userId.startsWith('@')) {
                                            userId = userId.substring(1);
                                        }
                                        const formattedUserId = `${userId}@c.us`;
                                        if (debug) {
                                            console.log(`Yönetici pozisyonundan alınacak kullanıcı ID: ${formattedUserId}`);
                                        }
                                        if (formattedUserId) {
                                            try {
                                                await chat.demoteParticipants([formattedUserId]);
                                                await msg.client.sendMessage(chatId, 'Kullanıcının yönetici pozisyonu alındı!');
                                            } catch (error) {
                                                await msg.client.sendMessage(chatId, 'Kullanıcının yönetici pozisyonunu alma başarısız oldu.');
                                            }
                                        } else {
                                            await msg.client.sendMessage(chatId, 'Id alınamadı lütfen tekrar deneyin')
                                        }
                                    } else if (msg.hasQuotedMsg){
                                        const quotedMsg = await msg.getQuotedMessage();
                                        const quotedUserId = quotedMsg.author || quotedMsg.from
                                        if (debug) {
                                            console.log("is: ", quotedUserId);
                                        }
                                        try {
                                            await chat.demoteParticipants([quotedUserId])
                                            await msg.client.sendMessage(chatId, 'Kişinin yöneticiliği alındı.')
                                        } catch (error) {
                                            await msg.client.sendMessage(chatId, 'kişi zaten yönetici değil')
                                        }
                                    }
                                } else {
                                    await msg.client.sendMessage(chatId, 'Bu komut sadece gruplarda kullanılabilir.');
                                }
                            } else {
                                await msg.client.sendMessage(chatId, 'Bu komutu yerine getirebilmem için admin olmam gerek.');
                            }
                        }
                    }
                } else if (worktype === 'private') {
                    if (onay) {
                        const chat = await msg.getChat();
                        const chatId = chat.id._serialized;
                        if (chat.isGroup) {
                            const participants = chat.participants;
                            const isBotAdmin = participants.some(participant => participant.id._serialized === soliedBotId && participant.isAdmin);
                            if (isBotAdmin) {
                                if (chatId.endsWith('@g.us')) {
                                    const args = msg.body.trim().split(' ');
                                    if (args[1]) {
                                        let userId = args[1];
                                        if (userId.startsWith('@')) {
                                            userId = userId.substring(1);
                                        }
                                        const formattedUserId = `${userId}@c.us`;
                                        if (debug) {
                                            console.log(`Yönetici pozisyonundan alınacak kullanıcı ID: ${formattedUserId}`);
                                        }
                                        if (formattedUserId) {
                                            try {
                                                await chat.demoteParticipants([formattedUserId]);
                                                await msg.client.sendMessage(chatId, 'Kullanıcının yönetici pozisyonu alındı!');
                                            } catch (error) {
                                                await msg.client.sendMessage(chatId, 'Kullanıcının yönetici pozisyonunu alma başarısız oldu.');
                                            }
                                        } else {
                                            await msg.client.sendMessage(chatId, 'Id alınamadı lütfen tekrar deneyin')
                                        }
                                    } else if (msg.hasQuotedMsg){
                                        const quotedMsg = await msg.getQuotedMessage();
                                        const quotedUserId = quotedMsg.author || quotedMsg.from
                                        if (debug) {
                                            console.log("is: ", quotedUserId);
                                        }
                                        try {
                                            await chat.demoteParticipants([quotedUserId])
                                            await msg.client.sendMessage(chatId, 'Kişinin yöneticiliği alındı.')
                                        } catch (error) {
                                            await msg.client.sendMessage(chatId, 'kişi zaten yönetici değil')
                                        }
                                    }
                                } else {
                                    await msg.client.sendMessage(chatId, 'Bu komut sadece gruplarda kullanılabilir.');
                                }
                            } else {
                                await msg.client.sendMessage(chatId, 'Bu komutu yerine getirebilmem için admin olmam gerek.');
                            } 
                        }
                    }
                }
            } else if (msg.body.trim().startsWith(prefix + 'tagall')) {
                if (worktype='public') {
                    const command = `${prefix}tagall`;
                    const chat = await msg.getChat();
                    const chatId = chat.id._serialized;
                    if (chat.isGroup) {
                        const participants = chat.participants;
                        const messageContent = msg.body.replace(command, '').trim(); 
                        let message = '';
                        let mentions = [];
                        if (messageContent) {
                            for (let i = 0; i < participants.length; i++) {
                                const participant = participants[i];
                                const contactId = participant.id._serialized;
        
                                message += `@${participant.id.user}\n`;
                                mentions.push(await msg.client.getContactById(contactId));
                            }
                            await msg.client.sendMessage(chatId, messageContent, {
                                mentions: mentions
                            });
                        } else {
                            for (let i = 0; i < participants.length; i++) {
                                const participant = participants[i];
                                const contactId = participant.id._serialized;
        
                                message += `@${participant.id.user}\n`;
                                mentions.push(await msg.client.getContactById(contactId));
                            }
                            await msg.client.sendMessage(chatId, message, {
                                mentions: mentions
                            });
                        }
                    }
                } else if (worktype === 'private'){
                    if (onay) {
                        const command = `${prefix}tagall`;
                        const chat = await msg.getChat();
                        const chatId = chat.id._serialized;
                        if (chat.isGroup) {
                            const participants = chat.participants;
                            const messageContent = msg.body.replace(command, '').trim(); 
                            let message = '';
                            let mentions = [];
                            if (messageContent) {
                                for (let i = 0; i < participants.length; i++) {
                                    const participant = participants[i];
                                    const contactId = participant.id._serialized;
            
                                    message += `@${participant.id.user}\n`;
                                    mentions.push(await msg.client.getContactById(contactId));
                                }
                                await msg.client.sendMessage(chatId, messageContent, {
                                    mentions: mentions
                                });
                            } else {
                                for (let i = 0; i < participants.length; i++) {
                                    const participant = participants[i];
                                    const contactId = participant.id._serialized;
            
                                    message += `@${participant.id.user}\n`;
                                    mentions.push(await msg.client.getContactById(contactId));
                                }
                                await msg.client.sendMessage(chatId, message, {
                                    mentions: mentions
                                });
                            }
                        }
                    }
                }
            } else if (msg.body.trim().toLowerCase() === `${prefix}gruplink`) {
                if (worktype === 'public') {
                    const chat = await msg.getChat();
                    const chatId = chat.id._serialized;
                    if (chat.isGroup) {
                        try {
                            const participants = chat.participants;
                            const botId = msg.client.info.wid._serialized;
                            const isBotAdmin = participants.some(participant => participant.id._serialized === botId && participant.isAdmin);
                            if (isBotAdmin) {
                                const inviteCode = await chat.getInviteCode();
                                const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;
                                await msg.client.sendMessage(chatId, `Grup Davet Bağlantısı: ${inviteLink}`);
                            } else {
                                await msg.client.sendMessage(chatId, 'Bu komutu kullanabilmem için yönetici olmam gerekiyor.');
                            }
                        } catch (error) {
                            console.error('Grup davet bağlantısı alınırken hata oluştu:', error);
                            await msg.client.sendMessage(chatId, 'Grup davet bağlantısını alırken bir hata oluştu.');
                        }
                    } else {
                        await msg.client.sendMessage(chatId, 'Bu komut sadece grup sohbetlerinde kullanılabilir.');
                    }
                } else if (worktype === 'private') {
                        if (onay) {
                        const chat = await msg.getChat();
                        const chatId = chat.id._serialized;
                        if (chat.isGroup) {
                            try {
                                const participants = chat.participants;
                                const botId = msg.client.info.wid._serialized;
                                const isBotAdmin = participants.some(participant => participant.id._serialized === botId && participant.isAdmin);
                                if (isBotAdmin) {
                                    const inviteCode = await chat.getInviteCode();
                                    const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;
                                    await msg.client.sendMessage(chatId, `Grup Davet Bağlantısı: ${inviteLink}`);
                                } else {
                                    await msg.client.sendMessage(chatId, 'Bu komutu kullanabilmem için yönetici olmam gerekiyor.');
                                }
                            } catch (error) {
                                console.error('Grup davet bağlantısı alınırken hata oluştu:', error);
                                await msg.client.sendMessage(chatId, 'Grup davet bağlantısını alırken bir hata oluştu.');
                            }
                        } else {
                            await msg.client.sendMessage(chatId, 'Bu komut sadece grup sohbetlerinde kullanılabilir.');
                        }
                    }
                }
            }
        }
    }
};
async function removeUser(chat, userId) {
    try {
        if (!userId || typeof userId !== 'string') {
            throw new Error('Geçersiz kullanıcı ID\'si');
        }
        const participants = chat.participants.map(participant => participant.id._serialized);
        if (!participants.includes(userId)) {
            throw new Error('Kullanıcı grupta bulunmuyor');
        }
        await chat.removeParticipants([userId]);
        return true;
    } catch (error) {
        if (debug) {
            console.error('Kullanıcıyı yasaklama başarısız oldu:', error);
        }
        return false;
    }
}
