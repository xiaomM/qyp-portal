/**
 * Created by daniel on 16/5/14.
 */

/**
 * xtpl adapter for koa
 * @author yiminghe@gmail.com
 */
var xtpl = require('xtpl/lib/xtpl');
var Path = require('path');
var _ = require('lodash');

function xtplRender(path, data, option) {
    return function (done) {
        xtpl.render(path, data, option, done);
    };
}

// option.views
// option.extname
// option.
module.exports = function (app, option) {
    var views = option.views;
    var extname = option.extname || 'xtpl';

    function *render(path, data, opt) {
        data = _.extend(this.locals, data);
        var html = yield xtplRender(Path.resolve(views, path + '.' + extname), data, option);
        if (!opt || opt.write !== false) {
            this.type = 'html';
            this.body = html;
        }
        return html;
    }

    app.context.render = render;
    return app;
};