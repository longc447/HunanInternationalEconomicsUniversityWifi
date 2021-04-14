const phone = require('./lib/phone')
const log = require('./lib/log')
const net = require('./lib/net')
let start = null, end = null, nowphone = null,usetime=null;
let useLongtimePhone =false;//默认不使用长时连接账号，因为首次使用没有长时间连接账号
function listenNet() {
    try {
        log.set("正在监听网络连接。。。测试：http://www.baidu.com")
        setInterval(() => {
            net.hasNet()
                .then(res => {
                    if (!start) {
                        start = Date.parse(new Date()) 
                    }
                })
                .catch(res => {
                    //结算时间
                    if(start){
                        end = Date.parse(new Date()) 
                        usetime=end-start
                        start=null
                        end=null
                        //写入计时账号/如果是上次的则不写入
                        if(nowphone)phone.saveLongPhone(JSON.parse(`{"${nowphone}":"${usetime}"}`))
                    }
                    //重连
                    useLongtimePhone=!useLongtimePhone;//间隔一个手机号使用长连接
                    nowphone = useLongtimePhone?phone.get():phone.getMaxTimePhone();
                    net.connectWifi(nowphone)
                    start = Date.parse(new Date()) 
                    log.set(`断线重连，正在尝试账号：${nowphone},重新计时`)
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



