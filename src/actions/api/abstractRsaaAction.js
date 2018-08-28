import AbstractAction from "../abstractAction";

/**
 * @constructor AbstractRSAAAction
 *
 * @abstract
 *
 * @extends AbstractAction
 * @param {Object} params - Params object
 * @param {*} params.payload - Action payload
 * @param {*} params.meta - Action payload
 * @param {Object} [my] - Protected properties holder
 */
export default class AbstractRsaaAction extends AbstractAction {
	constructor({ payload, meta }) {
		super(...arguments); // eslint-disable-line prefer-rest-params

		this.type = "AbstractRsaaAction";
		this._payload = payload;
		this._meta = meta;
	}

	payload(...args) { return this._payload(...args); }

	meta() { return this._meta; }
}
