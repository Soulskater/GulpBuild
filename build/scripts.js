var gulp = require("gulp");
var concat = require("gulp-concat");
var folders = require("gulp-folders");
var path = require('path');
var inject = require("gulp-inject");
var config = require("./gulpConfig");
var utils = require('./utils');

module.exports.createScriptTasks = function () {
    gulp.task("js-compile", folders(config.getSrcPath(config.path.components), function (folder) {
        utils.log("Compiling components js...")
        return gulp.src(config.getSrcPath(config.path.components, folder, '/js/*.js'))
            .pipe(concat(folder + '.js'))
            .pipe(gulp.dest(config.getDistPath(config.path.components, folder)));
    }));

    gulp.task('watch-js', function () {
        gulp.watch(config.getSrcPath(config.path.components, '/**/*.js'), ["js-compile"]);
    });
};