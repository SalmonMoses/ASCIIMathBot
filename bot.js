const { Composer } = require('micro-bot')
const { getFormulaUrl } = require('./botFunctions')
const logger = require('./logger')

const bot = new Composer()

bot.use(async (ctx, next) => {
    logger.info(`Received ${ctx.message.text}`)
    await next()
})

bot.start(ctx => {
    ctx.replyWithMarkdown('Welcome to LaTeX bot by [@SalmonMoses](tg://user?id=149477622)! You can check LaTeX documentation [here](https://www.latex-project.org/help/documentation/) and ASCIIMath [here](http://asciimath.org/)')
})

bot.command('math', ctx => {
    let formula = ctx.message.text.split(' ')
    formula.shift()
    formula = formula.join('')
    const url = getFormulaUrl(formula)
    ctx.replyWithPhoto(url)
})

bot.on('text', ctx => {
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