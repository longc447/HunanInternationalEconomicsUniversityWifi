const fs = require('fs')
const log =require("./log")

class phone {
    constructor() {
        this.phonelist = fs.readFileSync('./public/phone.txt').toString().split("\r\n")
        this.longPhoneList = JSON.parse(fs.readFileSync("longphone.json").toString());
    }
    /**
     * 
     * @method 获取一个手机号
     */
    get() {
        let randomnum = parseInt(Math.random() * 10);
        this.phonelist.splice(randomnum, 1)
        return this.phonelist[randomnum]
    }
    /**
     * @method 保存/更新长时可用的手机号列表
     * @param  object {"手机号":"本次使用时间"}
     */
    saveLongPhone(t) {
        const key = Object.keys(t)[0], value = t[Object.keys(t)[0]]

        let longPhoneList = this.readLongPhone();
        //取账号的使用时间历史值,判断是否上次有值，有则写入数组
        // console.log(longPhoneList[key])
        let timelist = typeof longPhoneList[key] == "object" ? longPhoneList[key] : [];
        if (timelist.length > 0) {
            //更新账号的本次连接时间
            timelist.push(value)
        }
        //有则保存原值
        if (typeof longPhoneList[key] == "string") {
            timelist.push(longPhoneList[key])
        }
        longPhoneList[key] = timelist;
        //判断秒掉次数是否超过10次，超过则从本地删除手机号
        let removeCount = 0;
        timelist.forEach(time => {
            if (time < 3000) removeCount++;
        });
        if (removeCount > 10) {
            //永久删除手机号
            delete longPhoneList[key]
            this.removePhone(key)
        } 
        //写入常用手机号
        fs.writeFileSync("longphone.json", JSON.stringify(longPhoneList))
    }
    /**
     * @method 读取长时间可用的手机号列表
     * */
    readLongPhone() {
        return JSON.parse(fs.readFileSync("longphone.json"))
    }
    /**
     * @method 随机读取一个常用手机号
     */
    getMaxTimePhone() {
        let longPhoneList = this.readLongPhone();
        let len = Object.keys(longPhoneList).length
        const keys = Object.keys(longPhoneList),
            index = parseInt(Math.random() * len)
        return keys[index]
    }
    /**
     * @method 从文档中删除手机号
     * @param {string} phone 
     */
    removePhone(phone) {    
        log.set(`删除手机号：${phone}`)
        let fileName = "'./public/phone.txt'"
        fs.writeFileSync(fileName, '')
        this.phonelist.forEach(element => {
            if (element != phone) {
                fs.appendFileSync(fileName, `${element}\r\n`)
            }
        });
    }
}

module.exports = new phone();