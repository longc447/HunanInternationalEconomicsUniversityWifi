const fs = require('fs')

class phone {
    constructor() {
        this.phonelist = fs.readFileSync('./public/phone.txt').toString().split("\r\n")
    }
    get() {
        let randomnum=parseInt(Math.random() * 10);
        this.phonelist.splice(randomnum,1)
        return this.phonelist[randomnum]
    }
}

module.exports = new phone();