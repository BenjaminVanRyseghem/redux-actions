const gulp = require("gulp");

gulp.task("build", ["browserify:regular"], () => {});

gulp.task("build:prod", ["browserify:min"], () => {});
