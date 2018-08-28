/**
 * Flatten the prototype chain in order to please Redux that only allows
 * "plain objects".
 * @param {Action} action - Action to flatten
 * @return {Object} Plain object action
 */
export default function flattenPrototype(action) {
	let result = Object.assign({}, action);
	let current = Object.getPrototypeOf(action);

	while (current) {
		Object.getOwnPropertyNames(current).forEach((key) => { // eslint-disable-line no-loop-func
			if (result[key] === undefined) {
				result[key] = current[key];
			}
		});
		current = Object.getPrototypeOf(current);
	}

	return result;
}
