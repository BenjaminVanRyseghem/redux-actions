import pascalCase from "pascal-case";

const reducers = [];

/**
 * Register a reducer, allowing to generate a matching `perform` method.
 * @param {string} name - Name of the reducer to register
 */
export function registerReducer(name) {
	reducers.push(pascalCase(name));
}

/**
 * AbstractAction is the abstraction of a reducer action.
 *
 * We use the Crockford style here for 2 things:
 * - dodge redux plain object check
 * - avoid exposing `payload` to avoid mutations
 *
 * @alias AbstractAction
 * @abstract
 *
 * @param {*} payload - Action payload
 * @param {Object} [my] - Protected properties holder
 * @constructor AbstractAction
 */
export default function AbstractAction(payload, my = {}) {
	/**
	 * @lends AbstractAction.prototype
	 */
	let that = {};

	my.payload = payload;

	that.isAction = true;
	that.type = "AbstractAction";

	reducers.forEach((name) => {
		that[`perform${name}`] = (state) => state;
	});

	return that;
}
