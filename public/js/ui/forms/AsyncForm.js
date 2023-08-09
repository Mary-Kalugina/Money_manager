/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (element === undefined) {
      throw new Error("Ошибка! Элемент не существует.");
    }
    this.element = element;
    this.registerEvents()
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submit();
    });
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    let formData = new FormData( this.element );
    return Object.fromEntries(formData.entries());
  }

  onSubmit(options){
  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.onSubmit(this.getData())
  }

  showError(text, modal) {
    let error = document.createElement('div');
    error.classList.add("error");
    if (modal === "login") {
      document.getElementById("login-form").insertAdjacentElement("beforeend", error)
    } else if (modal === "register")  {
      document.getElementById("register-form").insertAdjacentElement("beforeend", error); 
    } else if (modal === "new-account")  {
      document.getElementById("new-account-form").insertAdjacentElement("beforeend", error); 
    } else  {
      document.getElementById("register-form").insertAdjacentElement("beforeend", error); 
    }


    error.innerText = text;
  }

  removeError() {
    if (document.querySelector(".error")) document.querySelector(".error").remove();
  }
}