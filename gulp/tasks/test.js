const gulp = require("gulp");

gulp.task("test", () => {
	process.env.NODE_ENV = "test"; // eslint-disable-line no-process-env

	return gulp.src("./");
});
