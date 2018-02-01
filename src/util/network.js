function author(token) {
    return {
        async get(url, reqData, successCallback, failCallback) {
            url = getUrl(url);
            let headers = {
                'Accept': 'text/html, application/json',
            };
            if (token) {
                headers['Authorization'] = token;
            }
            let response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers
            });

            let text = await response.text();
            if (response.ok) {
                if (successCallback) {
                    let result = null;
                    try {
                        result = JSON.parse(text);
                        successCallback(result);
                    } catch (e) {
                        successCallback(text);
                    }

                }
            } else {
                if (failCallback) {
                    let result = null;
                    try {
                        result = JSON.parse(text);
                        failCallback(result);
                    } catch (e) {
                        failCallback({
                            code: 404,
                            msg: text
                        });
                    }
                }
            }

        },
        async post(url, body, successCallback, failCallback) {
            url = getUrl(url);
            const jsonText = JSON.stringify(body);
            try {
                let headers = {
                    'Accept': 'text/html, application/json',
                    'Content-Type': 'application/json',
                };
                if (token) {
                    headers['Authorization'] = token;
                }

                let response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    body: jsonText,
                    headers
                });

                let text = await response.text();
                if (response.ok) {
                    if (successCallback) {
                        let result = null;
                        try {
                            result = JSON.parse(text);
                            successCallback(result);
                        } catch (e) {
                            successCallback(text);
                        }

                    }
                } else {
                    if (failCallback) {
                        let result = null;
                        try {
                            result = JSON.parse(text);
                            failCallback(result);
                        } catch (e) {
                            failCallback({
                                code: 404,
                                msg: text
                            });
                        }
                    }
                }

            } catch (error) {
                if (failCallback) {
                    failCallback(error);
                }
            }

        }
    };
}


export default author;

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

