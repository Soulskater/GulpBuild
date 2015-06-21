var gulp = require("gulp");
var wiredep = require("wiredep");
var folders = require("gulp-folders");
var inject = require("gulp-inject");
var runSequence = require('run-sequence');
var utils = require("./build/utils");
var config = require('./build/gulpConfig');
var scriptTasks = require("./build/scripts");
var styleTasks = require("./build/styles");
var resourceTasks = require("./build/templates-content");
var infrastructureTasks = require("./build/infrastructure");


scriptTasks.createScriptTasks();
styleTasks.createStyleTasks();
resourceTasks.createResourceTasks();
infrastructureTasks.createInfrastructureTasks();

gulp.task("html-inject", ["js-compile", "less-compile"], folders(config.getSrcPath(config.path.components), function (folder) {
    utils.log("Injecting components...")
    return gulp.src(config.getSrcPath(config.path.components, folder, '/views/', folder + '.html'))
        .pipe(inject(gulp.src(config.getDistPath(config.path.components, folder, "*.js"), {read: false})))
        .pipe(inject(gulp.src(config.getDistPath(config.path.components, folder, "*.css"), {read: false})))
        .pipe(gulp.dest(config.getDistPath(config.path.components, folder)));
}));

gulp.task('watch-views', function () {
    gulp.watch(config.getSrcPath(config.path.components, '/**/views/*.html'), ["html-inject"]);
});

//region Wire dependencies

gulp.task("wiredep", function () {
    var options = {};
    return gulp.src("./index.html")
        .pipe(wiredep.stream(options))
        .pipe(gulp.dest("./"));
});

//endregion Wire dependencies

gulp.task('clean-all', function () {
    return utils.clean(config.path.dist);
});

gulp.task("build", ["copy-infrastructure", "copy-packages", "html-inject", "copy-templates", "copy-templates", "wiredep", "watch-js", "watch-less", "watch-templates", "watch-content", "watch-infrastructure", "watch-packages", "watch-views"]);

gulp.task("rebuild", function (cb) {
    runSequence('clean-all', "build", cb);
});