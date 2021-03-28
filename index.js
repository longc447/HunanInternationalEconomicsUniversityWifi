const phone = require('./lib/phone')
const log = require('./lib/log')
const net = require('./lib/net')

// let p = phone.get()
// log.set(p)
// net.connectWifi(p)
log.set("正在监听网络连接。。。测试：http://www.baidu.com")
setInterval(() => {
    net.hasNet()
        .then(res => {
        }).catch(err => {
            let p = phone.get()
            log.set(p)
            net.connectWifi(p)
        })
}, 2000);