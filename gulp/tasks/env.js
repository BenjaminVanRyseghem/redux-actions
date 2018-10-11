/* eslint-disable no-process-env */
const gulp = require("gulp");
const setNodeEnv = (env) => {
	if (!env) {
		return;
	}
	process.stdout.write(`Setting NODE_ENV to '${env}'\n`);
	process.env.NODE_ENV = env;
	if (process.env.NODE_ENV !== env) {
		throw new Error(`Failed to set NODE_ENV to '${env}'!!!!`);
	}
	process.stdout.write(`Successfully set NODE_ENV to '${env}'\n`);
};
const setBabelEnv = (env) => {
	if (!env) {
		return;
	}
	process.stdout.write(`Setting BABEL_ENV to '${env}'\n`);
	process.env.BABEL_ENV = env;
	if (process.env.BABEL_ENV !== env) {
		throw new Error(`Failed to set BABEL_ENV to '${env}'!!!!`);
	}
	process.stdout.write(`Successfully set BABEL_ENV to '${env}'\n`);
};
const setEnv = ({ node = "production", babel = "production" } = {}) => {
	setNodeEnv(node);
	setBabelEnv(babel);
};
gulp.task("environment:prod", () => setEnv());
gulp.task("environment:test", () => setEnv({
	node: "test",
	babel: "test"
}));
