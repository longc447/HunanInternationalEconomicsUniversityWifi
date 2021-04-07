const fs = require('fs')

class phone {
    constructor() {
        this.phonelist = fs.readFileSync('./public/phone.txt').toString().split("\r\n")
    }
    /**
     * 
     * @method 获取一个手机号
     */
    get() {
        let randomnum=parseInt(Math.random() * 10);
        this.phonelist.splice(randomnum,1)
        return this.phonelist[randomnum]
    }
    /**
     * @method 保存/更新长时可用的手机号列表
     */
    saveLongPhone(t) {
        const key = Object.keys(t)[0], value = t[Object.keys(t)[0]]

        let longPhoneList = this.readLongPhone();
        //更新账号的最大连接时间
        longPhoneList[key] = value 
        
        fs.writeFileSync("longphone.json", JSON.stringify(longPhoneList))
    }
    /**
     * @method 读取长时间可用的手机号列表
     * */
    readLongPhone() {
        return JSON.parse(fs.readFileSync("longphone.json"))
    }
    /**
     * @method 读取最大时长手机号
     */
    getMaxTimePhone(){
        let longPhoneList = this.readLongPhone();
        //检查已有的号码修改最大连接时间
        const keys=Object.keys(longPhoneList),values=Object.values(longPhoneList),maxvalues=Object.values(longPhoneList).reverse();
        return keys[values.indexOf(maxvalues[0])]
    }
}

module.exports = new phone();