export const APP_KEY = '8fab8af74de5a18abcdf810ee58ac4e8';

export const buildUrlParams = (url, params) => {
    if (Object.keys(params).length === 0) return url;
    return url + Object.keys(params).reduce((prev, curr) => {
        return `${prev}&${curr}=${params[curr]}`;
    }, '?');
}

export const Request = async (apiObj) => {
    try {
        const { type, path, url, domain, data, params, filter } = apiObj;
        const options = type === 'POST' ? {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : "{}"
        } : undefined;

        const finalUrl = buildUrlParams(url ? url : domain + path, {
                ...(params || '')
            });

        const response = await fetch(finalUrl, options);
        return await response.json().then(filter ? filter : obj => obj);
    } catch(e) {
        console.error(e);
    }
}
