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

function setUrl(url) {
	API_CONNECT.url = url;
}

let store;

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

export default function initialize({ store: storeInstance, url }) {
	setUrl(url);
	setStore(storeInstance);

	return requestApi;
}
