require('./config')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const path = require('path')
const moment = require('moment-timezone')
const { sleep, getGroupAdmins, smsg } = require('./lib/myfunc')
const fetch = require('node-fetch')

const createReadFileSync = (path) => {
    if (fs.existsSync(path)) {
        return fs.readFileSync(path)
    }
    else {
        fs.writeFileSync(path, '[]')
        return fs.readFileSync(path)
    }
}

function getRandomText(id) {
    var raNdText = id[Math.floor(Math.random() * id.length)];
    return raNdText;
}

module.exports = sansekai = async (client, m, chatUpdate, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
        var prefix2 = prefa ? /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi)[0] : "" : prefa ?? global.prefix
        var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
        const isCmd = body.startsWith(prefix2)
        const isCmd2 = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await client.decodeJid(client.user.id)
        const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == botNumber ? true : false
        let text = q = args.join(" ")
        const arg = budy.trim().substring(budy.indexOf(' ') + 1 )
        const arg1 = arg.trim().substring(arg.indexOf(' ') + 1 )
        const fatkuns = (m.quoted || m)
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const isMedia = /image|video|sticker|audio/.test(mime)

        const from = m.chat
        const reply = m.reply
        const sender = m.sender
        const mek = chatUpdate.messages[0]
	
        // Group
        const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    	// const isPremium = isCreator || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false

        // Push Message To Console
        let argsLog = (budy.length > 30) ? `${q.substring(0, 30)}...` : budy

        // Push Message To Console && Auto Read
        if (isCmd && isCmd2 && !m.isGroup) {
            // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
            console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`))
        } else if (isCmd && isCmd2 && m.isGroup) {
            // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
            console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`), chalk.blueBright('IN'), chalk.green(groupName))
        }
        

	    if (isCmd2) {

            switch(command) { 
                case 'bcgc': case 'bcgrup': {
                    if (!isCreator) throw mess.owner
                    if (!text) throw `Menu ini hanya akan mengirim broadcast ke grup.\n\nContoh: ${prefix + command} pengumuman besok libur`
                    let getGroups = await client.groupFetchAllParticipating()
                    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                    let anu = groups.map(v => v.id)
                    m.reply(`Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${anu.length * 1.5} detik`)
                    for (let i of anu) {
                        await sleep(delayy)
                        let txt = `「 Broadcast 」\n\n${text}`
                        client.sendText(i, txt)
                        }
                    m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
                }
                break
                case 'bc': case 'broadcast': case 'bcall': {
                    if (!isCreator) throw mess.owner
                    if (!text) throw `Menu ini akan mengirim broadcast ke semua chat kamu termasuk ke grup juga.\n\nContoh: ${prefix + command} pengumuman besok libur`
                    let anu = await store.chats.all().map(v => v.id)
                    m.reply(`Mengirim Broadcast Ke ${anu.length} Chat\nWaktu Selesai ${anu.length * 1.5} detik`)
                    for (let yoi of anu) {
                        await sleep(delayy)
                        let txt = `「 Broadcast 」\n\n${text}`
                        client.sendText(yoi, txt)
                    }
                m.reply('Sukses Broadcast')
                }
                break
                case 'bclist': {
                    const list = JSON.parse(fs.readFileSync('./list.json'))
                    if (!isCreator) throw mess.owner
                    if (list.length === 0) throw `List nomor belum diisi\n\nSilahkan isi list nomor terlrbih dahulu di file list.json`
                    if (!text) throw `Menu ini akan mengirim broadcast ke nomor yang sudah kamu list di file list.json.\n\nExample : ${prefix + command} pengumuman besok libur`
                    m.reply(`Mengirim Broadcast Ke ${list.length} Chat\nWaktu Selesai ${list.length * 1.5} detik`)
                    for (let lchat of list) {
                        await sleep(delayy)
                        let txt = `「 Broadcast 」\n\n${text}`
                        let tambahs = lchat+'@s.whatsapp.net'
                        let rplc = tambahs.replace('+', '').replace('+', '').replace('-', '').replace('-', '').replace('-', '').replace('-', '').replace('+', '').replace(' ', '').replace(' ', '')
                        client.sendText(rplc, txt) 
                    }
                m.reply('Sukses Broadcast')
                }
                break
                case 'donasi':
                    m.reply('Kamu bisa support creator dengan berdonasi https://saweria.co/sansekai')
                break
                case 'menu':
                    m.reply(`*Whatsapp Bot Broadcast*
                    
*1. Broadcast Group Only.*
Cmd: ${prefix}bcgrup <text>
Menu ini hanya akan mengirim broadcast ke grup.

*2. Broadcast All Chat.*
Cmd: ${prefix}bcall <text>
Menu ini akan mengirim broadcast ke semua chat kamu termasuk ke grup juga.

*3. Broadcast From List.*
Cmd: ${prefix}bclist <text>
Menu ini akan mengirim broadcast ke nomor yang sudah kamu list di file list.json.

<text> bisa kamu ganti pakai kata-kata kalian.

NOTE: JANGAN TERLALU BANYAK MENGIRIM BROADCAST KARENA AKAN MENGAKIBATKAN AKUN WHATSAPP KAMU TERBANNED.`)
                break
                default:{
                
                    if (isCmd && budy.toLowerCase() != undefined) {
                        if (m.chat.endsWith('broadcast')) return
                        if (m.isBaileys) return
                        let msgs = global.db.data.database
                        if (!(budy.toLowerCase() in msgs)) return
                        client.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
                    }
                }
            }
        }
        
    } catch (err) {
        m.reply(util.format(err))
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
