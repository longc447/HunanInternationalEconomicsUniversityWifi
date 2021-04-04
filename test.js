const log = require('./lib/log')
const tool = require('./lib/tool')




var spawn = require('child_process').spawn;



try {
    tool.dateFormat()
    log.set('logtext')
} catch {

    free = spawn('clear');
}
