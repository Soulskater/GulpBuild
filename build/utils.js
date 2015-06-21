var util = require('gulp-util');
var del = require('del');

module.exports = {
    clean: function (path, done) {
        _log('Cleaning: ' + util.colors.blue(path));
        del(path, done);
    },
    log: _log
};

function _log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                util.log(util.colors.blue(msg[item]));
            }
        }
    } else {
        util.log(util.colors.blue(msg));
    }
}