/**
 * Created by daniel on 16/4/24.
 */
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    path = require('path');

var paths = {
    less: "source/less/*.less",
    css: 'public/css'
};

gulp.task("clean", function () {
    return gulp.src(paths.css).pipe(clean());
});

gulp.task("less", ["clean"], function () {
    return gulp.src(paths.less).pipe(less()).pipe(gulp.dest(paths.css));
});

gulp.task("build", ['less'], function () {
    console.log("Build Success!")
});

gulp.task("watch", function () {
    gulp.watch([paths.less], ["build"]);
});

gulp.task("default", ["build"]);


