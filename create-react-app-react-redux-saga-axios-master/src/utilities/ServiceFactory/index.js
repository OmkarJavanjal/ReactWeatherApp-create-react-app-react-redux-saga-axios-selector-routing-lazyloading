
import axios from 'axios';
import transformUrl from 'transform-url';


const defaults = {
    cancellable: false,
    actions: {
        get: {
            method: 'GET',
        },
        create: {
            method: 'POST',
        },
        update: {
            method: 'PUT',
        },
        query: {
            method: 'GET',
        },
        remove: {
            method: 'DELETE',
        },
        delete: {
            method: 'DELETE',
        },
    },
};

export function createService(url, customActions) {
    const actions = { ...defaults.actions, ...customActions };

    function Resource() {}

    for (const key of Object.keys(actions)) {
        const action = actions[key];
        Resource[key] = (params, data, configs) => {
            const urlWithParams = transformUrl(action.url || url, params).replace(':/', '://');
            const allConfigs = { ...action.config, ...configs };
            // const hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);
            const promise = axios({
                url: urlWithParams,
                method: action.method,
                data,
                ...allConfigs,
            }).catch((response) => ({ error: response.data }));

            return promise;
        };
    }

    return Resource;
}

export function createURLSearchParams(data) {
    const params = new URLSearchParams();
    Object.keys(data).forEach((key) => {
        params.append(key, data[key]);
    });
    return params;
}
