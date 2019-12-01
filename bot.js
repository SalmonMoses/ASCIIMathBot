const { Composer } = require('micro-bot')
const asciimath2latex = require('asciimath-to-latex')
const logger = require('pino')({
    prettyPrint: true
})

const bot = new Composer()

function getFormulaUrl(text) {
    const latex = asciimath2latex(text)
    const uri = encodeURIComponent(latex)
    const url = `https://math.now.sh?inline=${uri}.png`
    return url
}

bot.start(ctx => {
    logger.info(`${ctx.from.username} started using the bot!`)
    ctx.replyWithMarkdown('Welcome to LaTeX bot by [@SalmonMoses](tg://user?id=149477622)! You can check LaTeX documentation [here](https://www.latex-project.org/help/documentation/) and ASCIIMath [here](http://asciimath.org/)')
})

bot.command('math', ctx => {
    logger.info(`${ctx.from.username} => ${ctx.message.text}`)
    let formula = ctx.message.text.split(' ')
    formula.shift()
    formula = formula.join('')
    const url = getFormulaUrl(formula)
    ctx.replyWithPhoto(url)
})

bot.on('text', ctx => {
    logger.info(`${ctx.from.username} => ${ctx.message.text}`)
    if (ctx.message.chat.type !== 'private') return
    const url = getFormulaUrl(ctx.message.text)
    ctx.replyWithPhoto(url)
})

bot.on('inline_query', ctx => {
    const url = getFormulaUrl(ctx.message.text)
    ctx.answerInlineQuery([{
        type: 'photo',
        id: 1,
        photo_url: url
    }])
})

console.log("Started!")

module.exports = bot