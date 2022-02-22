
//Simple base Kaori-Bot_MD "TEST" uwu 

const {
	default: makeWASocket,
	generateWAMessageFromContent,
	downloadContentFromMessage, 
	generateWAMessageContent, 
	WA_DEFAULT_EPHEMERAL,
	prepareWAMessageMedia,
	useSingleFileAuthState,
	generateWAMessage,
	DisconnectReason,
	downloadHistory,
	getMessage, 
	BufferJSON, 
	proto
} = require('@danielteodoro/baileys-md')
const { state, saveState } = useSingleFileAuthState('./isa.json')
//
const fs = require('fs')
const pino = require('pino')
const chalk = require('chalk')
const axios = require("axios")
const ffmpeg = require('fluent-ffmpeg')
const moment = require("moment-timezone")
const { exec, spawn, execSync } = require("child_process")
//
const { color, mylogs } = require('./db/color')
const { fetchJson, getBase64, kyun, createExif } = require('./db/fetcher')
const { sleep, uploadImages, getBuffer, getGroupAdmins, getRandom } = require('./db/functions')
//
Publi_Priv = true
prefix = "/"

//Configuração das consultas

let siteporta = `3333`
let sitebuscas = `http://44.201.142.242:3333`

//



async function start() {
	const client = makeWASocket({
		printQRInTerminal: true,
		logger: pino({ level: 'silent' }),
		browser: ['Kaori-MD', 'Chrome', '3.0'],
		auth: state
	})
    console.log(color('Conectado :3'))
//========================UwU========================//    
    client.ev.on('group-participants.update', async (anu) => {
        console.log(anu)
        try {
            let metadata = await client.groupMetadata(anu.id)
            let participants = anu.participants
            for (let num of participants) {
                try {
                    ppuser = await client.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://i.ibb.co/q70WmhZ/Sin-Perfil-F.jpg'
                }

                if (anu.action == 'add') {
                    client.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: `⚡ *Bem vindo @${num.split("@")[0]} ao grupo:*\n${metadata.subject}\n⚡ _Espero que goste do grupo_` })
                    
                } else if (anu.action == 'remove') {
                    client.sendMessage(anu.id, { image: { url: ppuser }, contextInfo: { mentionedJid: [num] }, caption: `*Ate logo: @${num.split("@")[0]}*` })
                }
            }
        } catch (err) {
            console.log(err)
        }
    })
//========================UwU========================//
	client.ev.on('messages.upsert', async (up) => {
		try {
			if (!up.messages) return
        const mek = up.messages[0]
        const fromMe = mek.key.fromMe
        const content = JSON.stringify(mek.message)
        const from = mek.key.remoteJid
        const type = Object.keys(mek.message)[0]
        const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'documentMessage') && mek.message.documentMessage.caption ? mek.message.documentMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && mek.message.buttonsResponseMessage.selectedButtonId) ? mek.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && mek.message.templateButtonReplyMessage.selectedId ? mek.message.templateButtonReplyMessage.selectedId : (type === 'listResponseMessage' && mek.message.listResponseMessage.title) ? mek.message.listResponseMessage.title : ""
        const body = (type === 'conversation') ? mek.message.conversation : (type == 'imageMessage') ? mek.message.imageMessage.caption : (type == 'videoMessage') ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? mek.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (mek.message.buttonsResponseMessage?.selectedButtonId || mek.message.listResponseMessage?.singleSelectReply.selectedRowId || (type == 'listResponseMessage' ? mek.msg.singleSelectReply.selectedRowId : '') || mek.msg.text || mek.msg.caption || mek.msg || '') : ''
		const budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		//
		const time = moment(Date.now()).tz('America/Lima').locale('pe').format('DD/MM/YY HH:mm:ss z')
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const isCmd = body.startsWith(prefix)
        const args = body.trim().split(/ +/).slice(1)
        const ar = args.map((v) => v.toLowerCase())
        
		const UwU = args.join(' ')

        const botNumber = client.user.id.split(':')[0] + '@s.whatsapp.net'
        const ownerNumber = ["5517991134416@s.whatsapp.net"]
        const isGroup = from.endsWith('@g.us')
        const sender = isGroup ? (mek.key.participant ? mek.key.participant : mek.participant) : mek.key.remoteJid
        const q = args.join(" ")
        const text = args.join(" ")
        
        const pushname =  mek.pushName || "Usuario"
        //const pushname2 = pushname.replace(/ .*/,'');

        const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
        const groupId = isGroup ? groupMetadata.id : ''
        const groupOwner = isGroup ? groupMetadata.owner : ''
        const groupDesc = isGroup ? groupMetadata.desc : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        const groupOwner = isGroup ? groupMetadata.owner : ''
    	const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
    	const isAdmins = isGroup ? groupAdmins.includes(sender) : false
        //
        const isOwner = ownerNumber.includes(sender)
        const isGroupAdmins = groupAdmins.includes(sender) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        //
        const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'stickerMessage')
        const isQuotedMsg = (type == 'extendedTextMessage')
        const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
        const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
        const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false
        const quoted = mek.quoted ? mek.quoted : mek
        const mime = (quoted.msg || quoted).mimetype || ''

        //Sistema de Premium

        let prem2 = await axios.get(`https://paineltokens.herokuapp.com/prem.json`)
const isPremium2 = prem2.data.includes(sender)
const premm2 = isPremium2 ? 's' : 'n' 

//Modo publico & privado :v
        if (!Publi_Priv) {
			if (!isOwner && key.fromMe) return
		}
//Funciones ✓
        const reply = (texto) => {
            client.sendMessage(from, { text: texto }, {sendEphemeral: true, quoted: mek })
        }
        const isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
//AutoRPT
if (budy.includes("hola mundo")){
			reply(`*🌎 => 🌐 => [✓]*`)
	}



        switch (command) {
        	case 'kick': {
                if (isGroup) return reply (`so em gp`)
                        if (!isBotAdmins) return reply  (`eu preciso ter adm né`)
                        if (!isAdmins) return reply (`vc precisa ser adm né`) 
                let users = mek.mentionedJid[0] ? mek.mentionedJid[0] : mek.quoted ? mek.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await client.groupParticipantsUpdate(mek.chat, [users], 'remove').then((res) => mek.reply(jsonformat(res))).catch((err) => mek.reply(jsonformat(err)))
            }
            break
            case 'reviver': {
                if (isGroup) return reply (`so em gp`)
                        if (!isBotAdmins) return reply  (`eu preciso ter adm né`)
                        if (!isAdmins) return reply (`vc precisa ser adm né`) 
                let users = mek.mentionedJid[0] ? mek.mentionedJid[0] : mek.quoted ? mek.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await client.groupParticipantsUpdate(mek.chat, [users], 'add').then((res) => mek.reply(jsonformat(res))).catch((err) => mek.reply(jsonformat(err)))
            }
            break
            case 'add': {
                if (isGroup) return reply (`so em gp`)
                        if (!isBotAdmins) return reply  (`eu preciso ter adm né`)
                        if (!isAdmins) return reply (`vc precisa ser adm né`) 
                let users = mek.quoted ? mek.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await client.groupParticipantsUpdate(mek.chat, [users], 'add').then((res) => mek.reply(jsonformat(res))).catch((err) => mek.reply(jsonformat(err)))
            }
            break
            case 'promote': {
                if (isGroup) return reply (`so em gp`)
                        if (!isBotAdmins) return reply  (`eu preciso ter adm né`)
                        if (!isAdmins) return reply (`vc precisa ser adm né`) 
                let users = mek.mentionedJid[0] ? mek.mentionedJid[0] : mek.quoted ? mek.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await client.groupParticipantsUpdate(mek.chat, [users], 'promote').then((res) => mek.reply(jsonformat(res))).catch((err) => mek.reply(jsonformat(err)))
            }
            break
            case 'demote': {
                if (isGroup) return reply (`so em gp`)
                        if (!isBotAdmins) return reply  (`eu preciso ter adm né`)
                        if (!isAdmins) return reply (`vc precisa ser adm né`) 
                let users = mek.mentionedJid[0] ? mek.mentionedJid[0] : mek.quoted ? mek.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await client.groupParticipantsUpdate(mek.chat, [users], 'demote').then((res) => mek.reply(jsonformat(res))).catch((err) => mek.reply(jsonformat(err)))
            }
            break
                case 'block': {
                if (!isCreator) return reply (`Só meu dono`)
                let users = mek.mentionedJid[0] ? mek.mentionedJid[0] : mek.quoted ? mek.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await client.updateBlockStatus(users, 'block').then((res) => mek.reply(jsonformat(res))).catch((err) => mek.reply(jsonformat(err)))
            }
            break
                case 'desbloquear': {
                if (!isCreator) return reply (`Só meu dono`)
                let users = mek.mentionedJid[0] ? mek.mentionedJid[0] : mek.quoted ? mek.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await client.updateBlockStatus(users, 'unblock').then((res) => mek.reply(jsonformat(res))).catch((err) => mek.reply(jsonformat(err)))
            }
            break
        case 'test':
        reply(`*Opa ${pushname}!*`)
        break
        case 'consul':
            case 'consultas':
         const sections = [
             {
             title: "Consultar Telefone:",
             rows: [
                 {title: "Tel", rowId: "/tel", description: "Consulta Simples"},
                 {title: "Tel2", rowId: "/tel2", description: "Puxada Completa."},
                 {title: "Tel3", rowId: "/tel3", description: "Digite /tel3 e marque uma pessoa."}
             ]
             },
            {
             title: "Consultar CPF:",
             rows: [
                 {title: "Cpf", rowId: "/cpf", description: "Puxada Completa."},
                 {title: "Cpf2", rowId: "/cpf2", description: "Puxada Completa."},
                 {title: "Cpf3", rowId: "/cpf3", description: "Puxada Completa."}
             ]
             },
             {
                 title: "Consultar Nome:",
                 rows: [
                     {title: "Nome", rowId: "/nome", description: "Puxada Simples."},
                     
                 ]
                 
                 },
                 {
                     title: "Consultar Placa:",
                     rows: [
                         {title: "Placa", rowId: "/placa", description: "Puxada Completa."},
                         
                     ]
                     
                     }
         ]
         
          txtf = `━━━━━━━━━━━━━━━━━━
🔘 Contrate agora o mais completo bot de consultas;

🔘 Consultas online 24h por dia, pague através do Mercado Pago, boleto ou Pix.

━━━━━━━━━━━━━━━━━━`
         const listMessage = {
            
           text: txtf,
           footer: "Clique em Consultas abaixo para ver as consultas disponíveis",
           title: "*☑️ 𝗠𝗘𝗡𝗨 𝗗𝗘 𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔𝗦*",
           buttonText: "Consultas",
           sections
         }
         
         client.sendMessage(from, listMessage)
           
break  
case 'getid':
    let usersv2 = mek.mentionedJid ? mek.mentionedJid : mek.quoted ? mek.quoted.sender : q.replace(/[^0-9]/g, '')+''
            reply(usersv2)   
            break
            case 'cpf2':
                if(!isPremium2) return reply (`Para você poder usar as consultas, vc tem que ter o vip\n\nPara ver os planos digite */preços* `)
                if(!text) return reply (`Digite um cpf. | Exemplo: /cpf2 00000000868`)
				var query = text
				.split('.').join('')
				.split('-').join('');
				if(query.length < 11 || query.length > 11) return reply('*ERRO*\nUse assim: /cpf2 00000000868');
				if(isNaN(query)) return reply('*ERRO*\nUse assim: /cpf2 00000000868');
                reply(`Aguarde ${pushname}, estou consultando os dados...`)
                apii = await fetchJson(`${sitebuscas}/cpf2/${text}`)
               //
                if (apii.Cpf != undefined) {
                 consulta = `═════════════════════
🕵️  *CONSULTA REALIZADA*  🕵️
═════════════════════

INFORMAÇÕES DO CPF:

• *CPF:* ${apii.Cpf}
• *CNS:* ${apii.Cns}
• *RG:* ${apii.Rg}
• *CNS:* ${apii.Cns}
• *EXPEDIÇÃO:* ${apii.DataDeExpedição}
• *ORGÃO EXPEDIDOR:* ${apii.OrgãoExpedidor}
• *RG UF:* ${apii.UfRg}

INFORMAÇÕES DA PESSOA:

• *NOME:* ${apii.Nome}
• *SEXO:* ${apii.Sexo}
• *NASCIMENTO:* ${apii.Nascimento}
• *IDADE:* ${apii.Idade}
• *COR:* ${apii.Cor}
• *SIGNO:* ${apii.Signo}
• *TIPO SANGUÍNEO:* ${apii.TipoSanguíneo}
• *NACIONALIDADE:* ${apii.Nacionalidade}
• *ESTADO NATAL:* ${apii.EstadoDeNascimento}
• *CIDADE NATAL:* ${apii.CidadeDeNascimento}
• *EMAIL:* ${apii.Email}
• *TELEFONE:* ${apii.Telefone}
• *TIPO:* ${apii.Tipo}

PARENTES:

• *MÃE:* ${apii.Mãe}
• *PAI:* ${apii.Pai}

ENDEREÇO:

• *ESTADO:* ${apii.Estado}
• *CIDADE:* ${apii.Cidade}
• *BAIRRO:* ${apii.Bairro}
• *CEP:* ${apii.Cep}
• *RUA:* ${apii.Logradouro}
• *NUMERO:* ${apii.Número}

━━━━━━━━━━━━━━━━━━`
reply(consulta)
} else {
    reply(`⚠️ CPF NÃO ENCONTRADO!`)
}
if (apii === apii.error) return reply (`Cpf invalido ou não encontrado.`)
                break
                    case 'placa':
                case 'plac':
                if(!isPremium2) return reply (`Para você poder usar as consultas, vc tem que ter o vip\n\nPara ver os planos digite */preços* `)
                if(!text) return reply (`Digite uma placa. | Exemplo: /placa JYE9708`)
                var query = text
				if(query.length < 7 || query.length > 11) return reply('*ERRO*\nA placa deve conter 7 dígitos!\nUso: /placa JYE9708');
                reply(`Aguarde ${pushname}, estou consultando os dados...`)
                xx = await fetchJson(`${sitebuscas}/placa/${text}`)

                api = await axios.get(`${sitebuscas}/placa/${text}`)
if (xx.Nome != undefined) {



  retorno = `═════════════════════
🕵️  *CONSULTA REALIZADA*  🕵️
═════════════════════

• *PLACA:* ${xx.Placa}
• *SITUAÇÃO:* ${xx.Situação}
  
• *MARCA:* ${xx.MarcaModelo}
• *COR:* ${xx.Cor}
• *DATA DE FABRICAÇÃO:* ${xx.AnoFabricação}
  
• *MUNICIPIO:* ${xx.Cor}
• *ESTADO:* ${xx.Cor}
• *CHASSI:* ${xx.Chassi}

• *RENAVAM:* ${xx.Renavam}
• *UF FATURADO:* ${xx.UfFaturado}

• *TIPO VEICULO:* ${xx.TipoVeiculo}
• *ESPECIE:* ${xx.Especie}
• *CATEGORIA:* ${xx.Categoria}
• *COMBUSTIVEL:* ${xx.Combustivel}

• *POTENCIA:* ${xx.Potencia}
• *CILINDRADAS:* ${xx.Cilindradas}
• *NACIONALIDADE:* ${xx.Nacionalidade}
• *CAPACIDADE MAXIMA:* ${xx.QuantidadeDePassageiros}
• *QUANTIDADE EIXOS:* ${xx.QuantidadeEixos}

• *ATUALIZAÇÃO:* ${xx.AtualizaçãoVeiculo}
• *ROUBO/FURTO:* ${xx.RouboFurto}
• *REMARCAÇÃO CHASSI:* ${xx.RemarcaçãoChassi}

• *LICENCIAMENTO:* ${xx.Licenciamento}
• *EMISSÃO CRV:* ${xx.EmissãoUltimoCrv}

• *NOME:* ${xx.Nome}
• *CPF/CNPJ:* ${xx.CpfCnpj}

━━━━━━━━━━━━━━━━━━`

reply(retorno)
  
} else {
    
    reply(`⚠️ PLACA NÃO ENCONTRADA!`)
}

                break

                 case 'cpf3':
                if(!isPremium2) return reply (`Para você poder usar as consultas, vc tem que ter o vip\n\nPara ver os planos digite */preços* `)
                if(!text) return reply (`Digite um cpf. | Exemplo: /cpf3 00000000868`)
				var query = text
				.split('.').join('')
				.split('-').join('');
				if(query.length < 11 || query.length > 11) return reply('*ERRO*\nUse assim: /cpf3 00000000868');
				if(isNaN(query)) return reply('*ERRO*\nUse assim: /cpf3 00000000868');
                reply(`Aguarde ${pushname}, estou consultando os dados...`)
                apii = await fetchJson(`${sitebuscas}/cpf3/${text}`)
               // api.data = apii
                if (apii.Cpf != undefined) {
                 consulta = `═════════════════════
🕵️  *CONSULTA REALIZADA*  🕵️
═════════════════════

INFORMAÇÕES DO CPF:

• *CPF:* ${apii.Cpf}
• *CNS:* ${apii.Cns}
• *RG:* ${apii.Rg}
• *CNS:* ${apii.Cns}
• *EXPEDIÇÃO:* ${apii.DataDeExpedição}
• *ORGÃO EXPEDIDOR:* ${apii.OrgãoExpedidor}
• *RG UF:* ${apii.UfRg}

INFORMAÇÕES DA PESSOA:

• *NOME:* ${apii.Nome}
• *SEXO:* ${apii.Sexo}
• *NASCIMENTO:* ${apii.Nascimento}
• *IDADE:* ${apii.Idade}
• *COR:* ${apii.Cor}
• *SIGNO:* ${apii.Signo}
• *TIPO SANGUÍNEO:* ${apii.TipoSanguíneo}
• *NACIONALIDADE:* ${apii.Nacionalidade}
• *ESTADO NATAL:* ${apii.EstadoDeNascimento}
• *CIDADE NATAL:* ${apii.CidadeDeNascimento}
• *EMAIL:* ${apii.Email}
• *TELEFONE:* ${apii.Telefone}
• *TIPO:* ${apii.Tipo}

PARENTES:

• *MÃE:* ${apii.Mãe}
• *PAI:* ${apii.Pai}

ENDEREÇO:

• *ESTADO:* ${apii.Estado}
• *CIDADE:* ${apii.Cidade}
• *BAIRRO:* ${apii.Bairro}
• *CEP:* ${apii.Cep}
• *RUA:* ${apii.Logradouro}
• *NUMERO:* ${apii.Número}

━━━━━━━━━━━━━━━━━━`
reply(consulta)
} else {
    reply(`⚠️ CPF NÃO ENCONTRADO!`)
}

if (apii === apii.error) return reply (`Cpf invalido ou não encontrado.`)
                break
                 case 'nome':
                if(!isPremium2) return reply (`Para você poder usar as consultas, vc tem que ter o vip\n\nPara ver os planos digite */preços* `)
                if(!text) return reply (`Digite um cpf. | Exemplo: /nome Jair Messias Bolsonaro`)
                



                reply(`Aguarde ${pushname}, estou consultando os dados...`)
                try {
                api = await axios.get(`${sitebuscas}/nome/${q}`)

                if (api.data.Nome != undefined) {
retorno = `═════════════════════
🕵️  *CONSULTA REALIZADA*  🕵️
═════════════════════

*NOME*: ${api.data.Nome}
*CPF*: ${api.data.Cpf}
*SEXO*: ${api.data.Sexo}
*DATA DE NASCIMENTO*: ${api.data.Nascimento}

━━━━━━━━━━━━━━━━━━`
                
reply(retorno)
} else {
    reply(`⚠️ NOME NÃO ENCONTRADO!`)
}
                
if (api.image === 'false') return reply (`Encontrei mais de uma pessoa com esse nome, porem não sou capaz de enviar, te digitar o nome completo da pessoa.`)
} catch (err) {

    reply('Encontrei mais de uma pessoa com esse nome, porem não sou capaz de enviar, tente digitar o nome completo da pessoa.')
}           
break
            case 'cpf':
                if(!isPremium2) return reply (`Para você poder usar as consultas, vc tem que ter o vip\n\nPara ver os planos digite */preços* `)
                if(!text) return reply (`Digite um cpf. | Exemplo: /cpf 00000000868`)
				var query = text
				.split('.').join('')
				.split('-').join('');
				if(query.length < 11 || query.length > 11) return reply('*ERRO*\nUse assim: /cpf 00000000868');
				if(isNaN(query)) return reply('*ERRO*\nUse assim: /cpf 00000000868');
                reply(`Aguarde ${pushname}, estou consultando os dados...`)
                apii = await fetchJson(`${sitebuscas}/cpf/${text}`)
                if (apii.Cpf != undefined) {
                 consulta = `═════════════════════
🕵️  *CONSULTA REALIZADA*  🕵️
═════════════════════

 INFORMAÇÕES DO CPF:

• *CPF:* ${apii.Cpf}
• *CNS:* ${apii.Cns}
• *RG:* ${apii.Rg}
• *CNS:* ${apii.Cns}
• *EXPEDIÇÃO:* ${apii.DataDeExpedição}
• *ORGÃO EXPEDIDOR:* ${apii.OrgãoExpedidor}
• *RG UF:* ${apii.UfRg}

 INFORMAÇÕES DA PESSOA:

• *NOME:* ${apii.Nome}
• *SEXO:* ${apii.Sexo}
• *NASCIMENTO:* ${apii.Nascimento}
• *IDADE:* ${apii.Idade}
• *COR:* ${apii.Cor}
• *SIGNO:* ${apii.Signo}
• *TIPO SANGUÍNEO:* ${apii.TipoSanguíneo}
• *EMAIL:* ${apii.Email}
• *TELEFONE:* ${apii.Telefone}

 PARENTES:

 • *MÃE:* ${apii.Mãe}
 • *PAI:* ${apii.Pai}

 ENDEREÇO:

 • *ESTADO:* ${apii.Estado}
 • *CIDADE:* ${apii.Cidade}
 • *BAIRRO:* ${apii.Bairro}
 • *CEP:* ${apii.Cep}
 • *RUA:* ${apii.Logradouro}
 • *NUMERO:* ${apii.Número}

 ━━━━━━━━━━━━━━━━━━`

reply(consulta)
} else {
    reply(`⚠️ CPF NÃO ENCONTRADO!`)
}
if (apii === apii.error) return reply (`Cpf invalido ou não encontrado.`)
                break
case 'tel3':
                    case 'telefone3':
                      
                    if(!isPremium2) return reply (`Para você poder usar as consultas, vc tem que ter o vip\n\nPara ver os planos digite */preços* `)
                    if(!isGroup) return reply (`Esse comando so funciona em grupo, pois vc precisa marcar alguem.`)
                    if(!q) return reply (`Marque uma pessoa do grupo | Exemplo /tel3 @55..`)
                    let users = mek.mentionedJid ? mek.mentionedJid : mek.quoted ? mek.quoted.sender : q.replace(/[^0-9]/g, '')+''
                 //   var exemplo = "Aprendendo JavaScript na DevMedia!";
    var resultado = users.replace("@s.whatsapp.net", "");
    var resultado2 = resultado.replace("55", "");
    if(resultado2.length < 11 || resultado2.length > 11) return reply('*ERRO:*\nO número da pessoa marcada deve conter 11 dígitos!\n\nTente digitar /tel e o numero dessa pessoa com um 9 a mais');
    reply(`Aguarde ${pushname}, estou consultando os dados dessa pessoa...`)
    xx = await fetchJson(`${sitebuscas}/telefone/${resultado2}`)
   if (xx.Nome != undefined) {
    consulta = `═════════════════════
🕵️  *CONSULTA REALIZADA*  🕵️
═════════════════════
            
 INFORMAÇÕES:

• *NOME:* ${xx.Nome}
• *CPF:* ${xx.CpfCnpj} 

 ENDEREÇO:

 • *ESTADO:* ${xx.Estado}
 • *CIDADE:* ${xx.Cidade}
 • *BAIRRO:* ${xx.Bairro}
 • *COMPLEMENTO:* ${xx.Complemento}
 • *RUA:* ${xx.Logradouro}
 • *NUMERO:* ${xx.Número}

━━━━━━━━━━━━━━━━━━`
reply(consulta)
  
} else {
    
    reply(`⚠️ TELEFONE NÃO ENCONTRADO!`)
}
                    break
case 'tel2':
    case 'telefone2':
    if(!isPremium2) return reply (`Para você poder usar as consultas, vc tem que ter o vip\n\nPara ver os planos digite */preços* `)
    if(!q) return reply (`Digite um telefone. | Exemplo: /telefone2 16996273400`)
    var query = q
    .split('+').join('')
    .split('-').join('')
    .split(' ').join('')
    .split('(').join('')
    .split(')').join('');
    if(query.length < 11 || query.length > 11) return reply('*ERRO*\nO número deve conter 11 dígitos!\nUso: /telefone 16996273400');
    if(isNaN(query)) return reply('*ERRO*\nUse assim: /telefone 16996273400');
    reply(`Aguarde ${pushname}, estou consultando os dados...`)
   
  apitel = await fetchJson(`${sitebuscas}/telefone/${q}`)

  cpfdotel = `${apitel.CpfCnpj}`
    apii = await fetchJson(`${sitebuscas}/cpf/${apitel.CpfCnpj}`)
    if (apitel.CpfCnpj != undefined) {
      consulta = `═════════════════════
🕵️  *CONSULTA REALIZADA*  🕵️
═════════════════════

INFORMAÇÕES DO CPF:

• *CPF:* ${apii.Cpf}
• *CNS:* ${apii.Cns}
• *RG:* ${apii.Rg}
• *CNS:* ${apii.Cns}
• *EXPEDIÇÃO:* ${apii.DataDeExpedição}
• *ORGÃO EXPEDIDOR:* ${apii.OrgãoExpedidor}
• *RG UF:* ${apii.UfRg}

INFORMAÇÕES DA PESSOA:

• *NOME:* ${apii.Nome}
• *SEXO:* ${apii.Sexo}
• *NASCIMENTO:* ${apii.Nascimento}
• *IDADE:* ${apii.Idade}
• *COR:* ${apii.Cor}
• *SIGNO:* ${apii.Signo}
• *TIPO SANGUÍNEO:* ${apii.TipoSanguíneo}
• *EMAIL:* ${apii.Email}
• *TELEFONE:* ${apii.Telefone}

PARENTES:

• *MÃE:* ${apii.Mãe}
• *PAI:* ${apii.Pai}

ENDEREÇO:

• *ESTADO:* ${apii.Estado}
• *CIDADE:* ${apii.Cidade}
• *BAIRRO:* ${apii.Bairro}
• *CEP:* ${apii.Cep}
• *RUA:* ${apii.Logradouro}
• *NUMERO:* ${apii.Número}

━━━━━━━━━━━━━━━━━━`
reply(consulta)
} else {
    reply(`⚠️ TELEFONE (2) NÃO ENCONTRADO!`)
    }
    break

case 'tel':
    case 'telefone':
   if(!isPremium2) return reply (`Para você poder usar as consultas, vc tem que ter o vip\n\nPara ver os planos digite */preços* `)
    if(!q) return reply (`Digite um telefone. | Exemplo: /telefone 16996273400`)
    var query = q
    .split('+').join('')
    .split('-').join('')
    .split(' ').join('')
    .split('(').join('')
    .split(')').join('');
    if(query.length < 11 || query.length > 11) return reply('*ERRO*\nO número deve conter 11 dígitos!\nUso: /telefone 16996273400');
    if(isNaN(query)) return reply('*ERRO*\nUse assim: /telefone 16996273400');
    reply(`Aguarde ${pushname}, estou consultando os dados...`)
    xx = await fetchJson(`${sitebuscas}/telefone/${q}`)

if (xx.Nome != undefined) {
consulta = `═════════════════════
🕵️  *CONSULTA REALIZADA*  🕵️
═════════════════════

INFORMAÇÕES:

• *NOME:* ${xx.Nome}
• *CPF:* ${xx.CpfCnpj} 

ENDEREÇO:

• *ESTADO:* ${xx.Estado}
• *CIDADE:* ${xx.Cidade}
• *BAIRRO:* ${xx.Bairro}
• *COMPLEMENTO:* ${xx.Complemento}
• *RUA:* ${xx.Logradouro}
• *NUMERO:* ${xx.Número}

━━━━━━━━━━━━━━━━━━`
reply(consulta)

} else {

reply(`⚠️ TELEFONE NÃO ENCONTRADO!`)
}

    break
        case 'list': case 'menu': case 'help': case '?': {
            anu = `Olá, ${pushname} 👋 
            
Muito Prazer! Eu sou a isa, um bot de consultas para WhatsApp, ativo 24h por dia ☺️

🔘 Para ver o menu de consultas digite */consul*

🔘 Para ver o menu completo digite */menu2*

🔘 *Ou selecione a opção abaixo*`
m = mek
            let message = await prepareWAMessageMedia({ image: fs.readFileSync('./db/media/logos/logo3.jpg') }, { upload: client.waUploadToServer })
            const template = generateWAMessageFromContent(from, proto.Message.fromObject({
                templateMessage: {
                    hydratedTemplate: {
                        imageMessage: message.imageMessage,
                        hydratedContentText: anu,
                        hydratedButtons: [{
                            urlButton: {
                                displayText: '💻 Canal do Meu Dono',
                                url: 'https://www.youtube.com/channel/UCcNXUT8f4grmNxQCxiZX95Q'
                            }
                        }, {
                            callButton: {
                                displayText: 'Numero do Meu Dono',
                                phoneNumber: '+55 17 99113-4416'
                            }
                        }, {
                            quickReplyButton: {
                                displayText: '🔍 Consultas',
                                id: 'consul'
                            }
                        }, {
                            quickReplyButton: {
                                displayText: '💸 Planos',
                                id: 'preços'
                            }
                        }]
                    }
                }
            }), { userJid: from, quoted: mek })
            client.relayMessage(from, template.message, { messageId: template.key.id })
        }
        break

        case 'preços':
            txt = `☑️ 𝗣𝗟𝗔𝗡𝗢𝗦 𝗘 𝗩𝗔𝗟𝗢𝗥𝗘𝗦

━━━━━━━━━━━━━━━━━━
⚜ CONSULTAS DISPONÍVEIS

🔘 CPF
🔘 CNS
🔘 CNPJ
🔘 NOME
🔘 PLACA 
🔘 TELEFONE

━━━━━━━━━━━━━━━━━━
⚜ CONSULTAS ILIMITADA  

🔘 FAÇA CONSULTAS SEM LIMITE

━━━━━━━━━━━━━━━━━━
⚜ PLANOS  INDIVIDUAIS

🔘 07 DIAS = R$ 20,00
🔘 15 DIAS = R$ 30,00
🔘 30 DIAS = R$ 50,00

━━━━━━━━━━━━━━━━━━
⚜ PLANOS PARA GRUPOS

🔘 07 DIAS = R$ 30,00
🔘 15 DIAS = R$ 50,00
🔘 30 DIAS = R$ 80,00

━━━━━━━━━━━━━━━━━━
⚜ FORMAS DE PAGAMENTO

🔘 BOLETO
🔘 TRANSFERÊNCIA PIX

wa.me/+5517991134416
━━━━━━━━━━━━━━━━━━`
reply(txt)
            break
}
    } catch (e) {
		e = String(e)
        console.log(color('[ERROR]', 'red'), color(e, 'cyan'))
}
})
}
start()

//Auto Actualización :v
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.white(`\n${__filename} :\nAtualizado com sucesso, e ja salvo ✓\n`))
	delete require.cache[file]
	require(file)
})
