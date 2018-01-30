
const netWork = {
    get: (url, reqData, successCallback, failCallback) => {
        url = getUrl(url);
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
                        failCallback(json);
                    }
                });

            }
        })
    },
    post: (url, body, successCallback, failCallback) => {
        url = getUrl(url);
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
                        failCallback(json);
                    }
                });
            }
        })
    },
    corsPost: (url, body, successCallback, failCallback) => {
        url = getUrl(url);
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
                        failCallback(json);
                    }
                });
            }
        })
    }
};


export default netWork;

let ENV = process.env.NODE_ENV;

function getUrl(url) {
    if (ENV === 'development') {
        if (url.indexOf('/') === 0) {
            return url = '/api' + url;
        } else {
            return url = '/api/' + url;
        }
    } else {
        return url;
    }
}

