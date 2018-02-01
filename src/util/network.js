/**
 * 
 * @param {*optional 受保护请求需提供token} token 
 */
function author(token) {
    return {
        /**
         * 
         * @param {*required } url 
         * @param {*optional 如果为对象则解析为url的查询字符串，如果为函数则作为请求成功的回调函数} reqData 
         * @param {*optional 请求成功的回调函数} successCallback 
         * @param {*optional 请求失败的回调函数} failCallback 
         */
        async get(url, reqData, successCallback, failCallback) {
            url = getUrl(url);
            if (typeof reqData === 'function') {
                failCallback = successCallback;
                successCallback = reqData;
            } else {
                if (reqData) {
                    url = url + '?param=' + encodeURIComponent(JSON.stringify(reqData));
                }
            }

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
        /**
         * 
         * @param {*required} url 
         * @param {*required } body 
         * @param {*} successCallback 
         * @param {*} failCallback 
         */
        async post(url, body = {}, successCallback, failCallback) {
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

