import AbstractAction from "../abstractAction";
import AbstractRsaaAction from "./abstractRsaaAction";

/**
 * AbstractRequestAction is the abstraction of a redux-api action.
 *
 * @abstract
 * @extends AbstractAction
 *
 * @param {*} spec - Unused parameter
 * @param {Object} [my] - Protected properties holder
 * @constructor AbstractRequestAction
 */
export default class AbstractRequestAction extends AbstractAction {
	constructor(spec) {
		super(...arguments); // eslint-disable-line prefer-rest-params

		this.isRequestAction = true;
		this.type = "AbstractRequestAction";

		this._endpoint = "you should override AbstractRequestAction/this._endpoint";
		this._schema = {};
		this._body = null;

		this._actions = {
			success: AbstractRsaaAction,
			failure: AbstractRsaaAction,
			request: AbstractRsaaAction
		};

		this.instanciateAction = (Action, data) => new Action(Object.assign({}, { originalAction: this }, spec, data));
	}

	method() { return "GET"; }

	headers() { return {}; }

	endpoint() { return this._endpoint; }

	schema() { return this._schema; }

	body() { return this._body; }

	actions() { return this._actions; }
}
