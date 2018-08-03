const gulp = require("gulp");
const config = require("../config").watch;

gulp.task("build", ["browserify:regular"], () => {});

gulp.task("build:prod", ["browserify:min"], () => {});
