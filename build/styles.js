var gulp = require("gulp");
var concat = require("gulp-concat");
var folders = require("gulp-folders");
var path = require('path');
var less = require("gulp-less");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var inject = require("gulp-inject");
var config = require("./gulpConfig");
var utils = require('./utils');

module.exports.createStyleTasks = function () {
    gulp.task("less-compile", folders(config.getSrcPath(config.path.components), function (folder) {
        utils.log("Compiling components less to css...")
        return gulp.src(config.getSrcPath(config.path.components, folder, '/less/*.less'))
            .pipe(plumber())
            .pipe(less())
            .pipe(autoprefixer({browser: "last 2 version"}))
            .pipe(concat(folder + '.css'))
            .pipe(gulp.dest(config.getDistPath(config.path.components, folder)));
    }));

    gulp.task('watch-less', function () {
        gulp.watch(config.getSrcPath(config.path.components, '/**/*.less'), ["less-compile"]);
    });
};