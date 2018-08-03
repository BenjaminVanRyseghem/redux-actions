const gulp = require("gulp");

gulp.task("start", ["build"]);

gulp.task("default", ["clean"], () => {
	gulp.start("start");
});

