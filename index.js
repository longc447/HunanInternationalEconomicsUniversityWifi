const phone = require('./lib/phone')
const log = require('./lib/log')
const net = require('./lib/net')

function listenNet() {
    try {
        log.set("正在监听网络连接。。。测试：http://www.baidu.com")
        setInterval(() => {
            net.hasNet().catch(res => {
                let p = phone.get()
                net.connectWifi(p)
                log.set(`断线重连，正在尝试账号：${p}`)
            })
        }, 2000);
    } catch (error) {
        var spawn = require('child_process').spawn;
        log.set('程序异常终止')
        free = spawn('clear');
        listenNet();
    }
}
listenNet();



