import abstractAction from "../abstractAction";
import abstractRsaaAction from "./abstractRsaaAction";

/**
 * AbstractRequestAction is the abstraction of a redux-api action.
 *
 * We use the Crockford style here for 2 things:
 * - dodge redux plain object check
 * - avoid exposing `payload` to avoid mutations
 *
 * @abstract
 * @extends AbstractAction
 *
 * @param {*} spec - Unused parameter
 * @param {Object} [my] - Protected properties holder
 * @constructor AbstractRequestAction
 */
export default function AbstractRequestAction(spec, my = {}) {
	/** @lends AbstractRequestAction.prototype */
	let that = abstractAction(spec, my);

	that.isRequestAction = true;
	that.isAction = true;
	that.type = "AbstractRequestAction";

	my.endpoint = "you should override AbstractRequestAction/my.endpoint";
	my.schema = {};
	my.body = null;

	my.actions = {
		success: abstractRsaaAction,
		failure: abstractRsaaAction,
		request: abstractRsaaAction
	};

	that.method = () => "GET";
	that.headers = () => ({});

	that.endpoint = () => my.endpoint;
	that.schema = () => my.schema;
	that.body = () => my.body;
	that.actions = () => my.actions;

	that.instanciateAction = (Action, data) => new Action(Object.assign({}, { originalAction: that }, spec, data));

	return that;
}
