/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (options.method !== "GET") {
       let formData = new FormData;
        formData.append( 'mail', options.data.mail);
        formData.append( 'password', options.data.password );
        try {
            xhr.open(options.method, options.url)
            xhr.send(formData);
        } catch(e) {
            callback( e );
        } 
    } else {
        try {
            xhr.open(options.method, `${options.url}?mail=${options.mail}&password=${options.password}`)
            xhr.send();
        } catch(e){
            callback( e );
        }
    }
    xhr.addEventListener("loadend", function(error) {
        if (error !== null) {
            options.callback(error, xhr.response);
        }
        options.callback(null, xhr.response);
    })
    
};
