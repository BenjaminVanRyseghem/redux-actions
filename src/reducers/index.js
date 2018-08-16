import { registerReducer } from "../actions/abstractAction";

/**
 * Wrap reducer to merge returned state with previous state.
 * This allow actions to only return partial updates.
 *
 * @param {function} reducer - Reducer to wrap
 * @param {string} name - The name of the reducer
 * @return {function} Wrapped reducer
 */
export function wrapper(reducer, name) {
	if (!reducer) {
		throw new Error("A reducer is required");
	}

	if (!name) {
		throw new Error("A name is required");
	}

	registerReducer(name);

	return (state, action) => Object.assign({}, state, reducer(state, action) || {});
}
