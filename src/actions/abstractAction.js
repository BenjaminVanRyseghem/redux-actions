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
 * @abstract
 */
export default class AbstractAction {
	constructor() {
		this.isAction = true;
		this.type = "AbstractAction";

		reducers.forEach((name) => {
			if (!this[`perform${name}`]) {
				this[`perform${name}`] = (state) => state;
			}
		});
	}
}
