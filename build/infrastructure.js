var gulp = require("gulp");
var concat = require("gulp-concat");
var folders = require("gulp-folders");
var path = require('path');
var inject = require("gulp-inject");
var config = require("./gulpConfig");
var utils = require('./utils');

module.exports.createInfrastructureTasks = function () {
    gulp.task("copy-infrastructure", function () {
        utils.log("Coping infrastructure...")
        return gulp.src([config.getInfrastructurePath('/*.html'), config.getInfrastructurePath('/js/*.js')])
            .pipe(gulp.dest(config.path.dist));
    });

    gulp.task("copy-packages", function () {
        utils.log("Coping bower packages...")
        return gulp.src('packages/**/*')
            .pipe(gulp.dest(config.path.dist + "/packages"));
    });

    gulp.task('watch-packages', function () {
        return gulp.watch(config.path.packages, ["copy-packages"]);
    });

    gulp.task('watch-infrastructure', function () {
        return gulp.watch(config.getInfrastructurePath('/**/*'), ["copy-infrastructure"]);
    });
};
