const fs=require('fs')
// const tool=require('./lib/tool')
class log {
    constructor() {

    }
    set(logtext) {
        console.log(logtext)
        // console.log(tool.dateFormat("YYYY-mm-dd HH:MM", new Date()))
        fs.appendFileSync('log.log',`${new Date()} ${logtext}\n`)
    }
}
module.exports = new log();