const dest = "./dist";
const src = "./src";
const babelify = require("babelify");

module.exports = {
	linting: {
		source: ["src/**/*.js", "gulp/tasks/**/*.js", "example/**/*.js", "tests/**/*.js"]
	},
	clean: {
		dest
	},
	browserify: {
		settings: {
			transform: [babelify],
			standalone: "SwitchlessReduxActions",
			entries: `${src}/index.js`,
			debug: true
		},
		dest,
		outputName: "switchless-redux-actions.js",
		outputMinName: "switchless-redux-actions.min.js"
	}
};
