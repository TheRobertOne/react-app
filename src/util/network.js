
const netWork = {
    get: (url, reqData, successCallback, failCallback) => {
        if (typeof reqData !== 'function') {
            if (reqData) {
                url = url + '?param=' + encodeURIComponent(JSON.stringify(reqData))
            }
        } else {
            failCallback = successCallback;
            successCallback = reqData;
        }
        return fetch(url, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Accept': 'text/html, application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    if (successCallback) {
                        successCallback(json);
                    }
                });
            } else {
                return response.json().then(json => {
                    if (failCallback) {
                        failCallback(getError(json));
                    }
                });
            }
        })
    },
    post: (url, body, successCallback, failCallback) => {

        const jsonText = JSON.stringify(body);

        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: jsonText,
            headers: {
                'Accept': 'text/html, application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    if (successCallback) {
                        successCallback(json);
                    }
                });
            } else {
                return response.json().then(json => {
                    if (failCallback) {
                        failCallback(getError(json));
                    }
                });
            }
        })
    },
    corsPost: (url, body, successCallback, failCallback) => {
        const jsonText = JSON.stringify(body);
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            mode: "cors",
            body: jsonText,
            headers: {
                'Accept': 'text/html, application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    if (successCallback)
                        successCallback(json);
                });
            } else {
                return response.json().then(json => {
                    if (failCallback) {
                        failCallback(getError(json));
                    }
                });
            }
        })
    }
};


export default netWork;

