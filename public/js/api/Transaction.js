/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
    static list(data, callback){
        createRequest({
          url: this.URL,
          data, 
          method: "GET", 
          callback: (err, response) => {
          if (response && response.user){
            callback(err, response);
          }
      }})
      }
      static create(data, callback) {
        createRequest({
          url: this.URL, 
          data, method: "PUT", 
          callback: (err, response) => {
          if (response && response.user){
            callback(err, response);
          }
      }})
      }
      static remove(data, callback ) {
        createRequest({
          url: this.URL, 
          data, 
          method: "DELETE", 
          callback: (err, response) => {
          if (response && response.user){
            callback(err, response);
          }
      }})
      }
}

