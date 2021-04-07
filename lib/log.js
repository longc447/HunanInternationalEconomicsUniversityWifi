const fs = require('fs')
// const tool=require('./lib/tool')
class log {
    constructor() {

    }
    /**
     * 
     * @param {string} logtext 
     */
    set(logtext) {
        console.log(logtext)
        // console.log(tool.dateFormat("YYYY-mm-dd HH:MM", new Date()))
        fs.appendFileSync('log.log', `${new Date()} ${logtext}\n`)
    }
    /**
     * 
     * @param {Object} txt 
     * @param {Array} txt
     */
    json(txt) {
        fs.appendFileSync('b.json', JSON.stringify(txt))
    }
}
module.exports = new log();