let expect = require('chai').expect
let { getFormulaUrl } = require('../botFunctions')

describe('getFormulaUrl', () => {
    it('should return url with latex', () => {
        expect(getFormulaUrl('intxdx')).to.equal(`https://math.now.sh?inline=%5Cint%7Bx%7D%7B%5Cleft.%7Bd%7D%7Bx%7D%5Cright.%7D.png`)
    })
})