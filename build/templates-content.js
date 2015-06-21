var gulp = require("gulp");
var folders = require("gulp-folders");
var path = require('path');
var inject = require("gulp-inject");
var config = require("./gulpConfig");
var utils = require('./utils');


module.exports.createResourceTasks = function () {
    gulp.task("copy-templates", folders(path.join(config.path.src, config.path.components), function (folder) {
        utils.log("Coping components templates...")
        return gulp.src(config.getSrcPath(config.path.components, folder, '/templates/*.html'))
            .pipe(gulp.dest(path.join(config.path.dist, config.path.components, folder)));
    }));

    gulp.task('clean-templates', function (done) {
        utils.clean(config.getDistPath(config.path.components, '/**/templates/*.html'), done);
    });

    gulp.task('watch-templates', function () {
        gulp.watch(config.getSrcPath(config.path.components, '/**/templates/*.html'), ["copy-templates"]);
    });

    gulp.task("copy-content", folders(config.getSrcPath(config.path.components), function (folder) {
        utils.log("Coping components contents...")
        return gulp.src(config.getSrcPath(config.path.components, folder, '/content/*.*'))
            .pipe(gulp.dest(config.getDistPath(config.path.components, folder)));
    }));

    gulp.task('clean-content', function (done) {
        utils.clean(config.getDistPath(config.path.components, '**/content/*.*'), done);
    });

    gulp.task('watch-content', function () {
        gulp.watch(config.getSrcPath(config.path.components, '/**/content/*.*'), ["copy-content"]);
    });
};