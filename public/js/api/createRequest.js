/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let formData = new FormData();
    let sendURL = options.url;
    xhr.responseType = 'json';
    if (options.method !== 'GET') {
        if (!options.data) {
            Object.entries(options).forEach(([key, value]) => formData.append(key, value));
        } else {
            Object.entries(options.data).forEach(([key, value]) => formData.append(key, value));
        }
    }
    else if (options.method === 'GET') {
        formData = null;
        if (options.data) {
            sendURL += '?';
            Object.entries(options.data).forEach(([key, value]) => sendURL += `${key}=${value}&`);
            sendURL = sendURL.slice(0, -1);
        }
    }
    try {
        xhr.open(options.method, sendURL);
        xhr.send(formData);       
    }
    catch (err) {
        options.callback(err, null);
    }
    xhr.addEventListener('load', function() {
        if (xhr.status === 200 && xhr.readyState === xhr.DONE) {           
            options.callback(null, xhr.response);       
        }
    });
};

