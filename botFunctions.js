const asciimath2latex = require('asciimath-to-latex')

function getFormulaUrl(text) {
    const latex = asciimath2latex(text)
    const uri = encodeURIComponent(latex)
    const url = `https://math.now.sh?inline=${uri}.png`
    logger.info(`Generated url: ${url}`)
    return url
}

module.exports = {
    getFormulaUrl: getFormulaUrl
}