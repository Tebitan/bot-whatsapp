const { createBot, createProvider, createFlow, addKeyword,EVENTS } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')



const flowPortafolio = addKeyword('1').addAnswer('📄 Nuestro portafolio', {
    media: "https://fedepesca.org/wp-content/uploads/2014/12/GUIA-ARTES-DE-PESCA.pdf"
})

const flowWelcome = addKeyword(EVENTS.WELCOME)
.addAnswer('🙌 Hola bienvenido a Olímpico Fishing Store Colombia 🎣', {
    delay: 100,
})
    .addAnswer([
            'te comparto nuestro Menu de Opciones',
            '👉 1️⃣ para ver portafolio',
            '👉 2️⃣ para realizar una compra',
            '👉 3️⃣ Para realizar una consulta',
            '👉 4️⃣ Para participar en el sorteo',
        ],
        null,
        null,
        [flowPortafolio])


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowWelcome])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
