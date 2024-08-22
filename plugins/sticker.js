const { Client, MessageMedia } = require('whatsapp-web.js');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const debug = config.debug
const TEMP_DIR = path.join(__dirname, 'temp');
const MP4_FILE_PATH = path.join(TEMP_DIR, 'video.mp4');
const WEBP_FILE_PATH = path.join(TEMP_DIR, 'sticker.webp');
const JPEG_FILE_PATH = path.join(TEMP_DIR, 'image.jpeg');

const convertMp4ToWebp = (inputFilePath, outputFilePath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputFilePath)
            .output(outputFilePath)
            .outputOptions('-vf', 'fps=10,scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=black@0,format=rgba')
            .outputOptions('-loop', '0') 
            .outputOptions('-vcodec', 'libwebp')
            .outputOptions('-preset', 'picture')
            .outputOptions('-an')
            .outputOptions('-vsync', '0')
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .run();
    });
};

const convertWebpToMp4 = (inputFilePath, outputFilePath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputFilePath)
            .output(outputFilePath)
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .run();
    });
};

const convertWebpToJpeg = (inputFilePath, outputFilePath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputFilePath)
            .output(outputFilePath)
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .run();
    });
};

const isAnimatedWebp = (filePath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(filePath)
            .ffprobe((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const hasMultipleFrames = data.streams.some(stream => stream.codec_type === 'video' && stream.nb_frames > 1);
                    resolve(hasMultipleFrames);
                }
            });
    });
};

const handleFileDeletion = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Successfully deleted: ${filePath}`);
        } else {
            console.log(`File does not exist: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error deleting file: ${filePath}`, err);
    }
};

module.exports = {
    name: 'mediaToStickerPlugin',
    description: 'Medya dosyasını sticker olarak gönderir.',
    async onMessage(msg) {
        const chat = await msg.getChat();
        const quotedMsg = await msg.getQuotedMessage();
        if (msg.body.trim() === `${config.prefix}sticker` && msg.hasQuotedMsg) {
            if (worktype === 'public') {
                const chatId = chat.id._serialized;
                msg.client.sendMessage(chatId, "dönüştürme işlemi başladı...");
                try {
                    const quotedMsg = await msg.getQuotedMessage();
                    if (quotedMsg.hasMedia) {
                        const media = await quotedMsg.downloadMedia();
                        if (debug) {
                            console.log('MIME Type:', media.mimetype);
                        }
                        const mimeType = media.mimetype;
                        let fileType;
                        if (mimeType === 'video/mp4') {
                            fileType = 'mp4';
                        } else if (mimeType === 'image/jpeg') {
                            fileType = 'jpeg';
                        } else if (mimeType === 'image/png') {
                            fileType = 'png';
                        } else {
                            throw new Error('Unsupported media type');
                        }
                        const fileName = `media_${Date.now()}.${fileType}`;
                        const filePath = path.join(TEMP_DIR, fileName);
                        fs.writeFileSync(filePath, media.data, 'base64');
                        if (fileType === 'mp4') {
                            await convertMp4ToWebp(filePath, WEBP_FILE_PATH);
                            const stickerMedia = MessageMedia.fromFilePath(WEBP_FILE_PATH);
                            await msg.client.sendMessage(chatId, stickerMedia, { 
                                sendMediaAsSticker: true,
                                stickerAuthor: 'Made by: WhatsAsena\nCoded by: Ic3zy',
                                stickerName: 'ASENA'
                            });
                            handleFileDeletion(WEBP_FILE_PATH);
                        } else if (fileType === 'png' || fileType === 'jpeg') {
                            const stickerMedia = MessageMedia.fromFilePath(filePath);
                            await msg.client.sendMessage(chatId, stickerMedia, { 
                                sendMediaAsSticker: true,
                                stickerAuthor: 'Made by: WhatsIc3zy\nCoded by: Ic3zy',
                                stickerName: 'IC3ZY ARCHİVES'
                            });
                            handleFileDeletion(filePath);
                        }
                    }
                } catch (error) {
                    console.error('Error handling media:', error);
                }
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
                const chatId = chat.id._serialized;
                if (onay) {
                    msg.client.sendMessage(chatId, "dönüştürme işlemi başladı...");
                    try {
                        const quotedMsg = await msg.getQuotedMessage();
                        if (quotedMsg.hasMedia) {
                            const media = await quotedMsg.downloadMedia();
                            if (debug) {
                                console.log('MIME Type:', media.mimetype);
                            }
                            const mimeType = media.mimetype;
                            let fileType;
                            if (mimeType === 'video/mp4') {
                                fileType = 'mp4';
                            } else if (mimeType === 'image/jpeg') {
                                fileType = 'jpeg';
                            } else if (mimeType === 'image/png') {
                                fileType = 'png';
                            } else {
                                throw new Error('Unsupported media type');
                            }
                            const fileName = `media_${Date.now()}.${fileType}`;
                            const filePath = path.join(TEMP_DIR, fileName);
                            fs.writeFileSync(filePath, media.data, 'base64');
                            if (fileType === 'mp4') {
                                await convertMp4ToWebp(filePath, WEBP_FILE_PATH);
                                const stickerMedia = MessageMedia.fromFilePath(WEBP_FILE_PATH);
                                await msg.client.sendMessage(chatId, stickerMedia, { 
                                    sendMediaAsSticker: true,
                                    stickerAuthor: 'Made by: WhatsAsena\nCoded by: Ic3zy',
                                    stickerName: 'ASENA'
                                });
                                handleFileDeletion(WEBP_FILE_PATH);
                            } else if (fileType === 'png' || fileType === 'jpeg') {
                                const stickerMedia = MessageMedia.fromFilePath(filePath);
                                await msg.client.sendMessage(chatId, stickerMedia, { 
                                    sendMediaAsSticker: true,
                                    stickerAuthor: 'Made by: WhatsIc3zy\nCoded by: Ic3zy',
                                    stickerName: 'IC3ZY ARCHİVES'
                                });
                                handleFileDeletion(filePath);
                            }
                        }
                    } catch (error) {
                        console.error('Error handling media:', error);
                    }
                }
            }
        }
    }
};

async function handleStickerToImageCommand(quotedMsg, chat) {
    try {
        if (quotedMsg.hasMedia) {
            const media = await quotedMsg.downloadMedia();
            const filePath = saveMediaFile(media);
            await convertWebpToJpeg(filePath, JPEG_FILE_PATH);
            const imageMedia = MessageMedia.fromFilePath(JPEG_FILE_PATH);
            await chat.sendMessage(imageMedia, { caption: 'Sticker to Image' });
            handleFileDeletion(JPEG_FILE_PATH);
            handleFileDeletion(filePath);
        }
    } catch (error) {
        console.error('Error handling sticker to image:', error);
    }
}

async function handleStickerToVideoCommand(quotedMsg, chat) {
    try {
        if (quotedMsg.hasMedia) {
            const media = await quotedMsg.downloadMedia();
            const filePath = saveMediaFile(media);

            const isAnimated = await isAnimatedWebp(filePath);
            if (!isAnimated) {
                await chat.sendMessage('Bu sticker hareketsiz, videoya dönüştürülemez.');
                handleFileDeletion(filePath);
                return;
            }
            await convertWebpToMp4(filePath, MP4_FILE_PATH);
            const videoMedia = MessageMedia.fromFilePath(MP4_FILE_PATH);
            await chat.sendMessage(videoMedia, { caption: 'Sticker to Video' });
            handleFileDeletion(MP4_FILE_PATH);
            handleFileDeletion(filePath);
        }
    } catch (error) {
        console.error('Error handling sticker to video:', error);
    }
}

function saveMediaFile(media) {
    const fileType = media.mimetype.split('/')[1];
    const fileName = `media_${Date.now()}.${fileType}`;
    const filePath = path.join(TEMP_DIR, fileName);
    fs.writeFileSync(filePath, media.data, 'base64');
    return filePath;
}
