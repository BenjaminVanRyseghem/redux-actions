let gulp = require("gulp");
let del = require("del");
let config = require("../config").clean;

gulp.task("clean", () => del(config.dest));
