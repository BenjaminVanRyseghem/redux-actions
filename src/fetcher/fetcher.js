import { CALL_API, RSAA } from "redux-api-middleware-plain-object";

/*
 * Todo: Extract
 */
const API_CONNECT = {
	url: "",
	contentType: "application/json"
};

let formatReceivedData = (data) => data;
let formatReceivedHeaders = (data) => data;

/**
 * Set base url to use
 * @param {string} url - URL to use
 */
function setUrl(url) {
	API_CONNECT.url = url;
}

let store = null;

/**
 * Set store to use
 * @param {Object} newStore - Store to use
 */
function setStore(newStore) {
	store = newStore;
}

const sendRequest = ({ action, headers }) => {
	const params = {};

	params.method = action.method();
	params.endpoint = API_CONNECT.url + action.endpoint();
	params.headers = Object.assign(
		{},
		headers,
		{
			"Content-Type": API_CONNECT.contentType
		}
	);

	let RequestAction = action.actions().request;
	let SuccessAction = action.actions().success;
	let FailureAction = action.actions().failure;

	params.types = [
		action.instanciateAction(RequestAction, { payload: ({ [RSAA]: { endpoint } }) => ({ endpoint }) }),
		action.instanciateAction(SuccessAction, {
			payload: (__, state, res) => res.json().then((data) => ({
				data: formatReceivedData(data),
				headers: formatReceivedHeaders(res.headers)
			}))
		}),
		action.instanciateAction(FailureAction, {
			meta: (__, state, res) => (res
				? {
					status: res.status,
					statusText: res.statusText
				}
				: {
					status: "Network request failed"
				})
		})
	];

	if (action.body()) {
		params.body = JSON.stringify(action.body());
	}

	return { [CALL_API]: params };
};

const requestApi = (action, headers = action.headers()) => {
	let options = {
		action,
		headers
	};
	let requestAction = sendRequest(options);
	store.dispatch(requestAction);
};

/**
 * Initialize the fetcher and returns the fetching function.
 *
 * @param {Object} params - Parameters object
 * @param {store} params.store - Store to use
 * @param {string} params.url - Base url for requests
 * @return {requestApi} - Fetching function
 */
export default function initialize({ store: storeInstance, url }) {
	setUrl(url);
	setStore(storeInstance);

	return requestApi;
}
