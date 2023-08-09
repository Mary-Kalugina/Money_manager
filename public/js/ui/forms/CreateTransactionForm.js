
/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const modalAccountList = this.element.querySelector('select.accounts-select');
    this.element.querySelector(".error").innerHTML = "";
    const data = User.current();  
    Account.list(data, (err, response) => { 
      if (!response) {
        return false;
      }
      if (response.success) {
        modalAccountList.innerHTML = '';
        if (response.data.length === 0) {
          console.log(this.element)
          this.element.querySelector(".error").innerHTML = "Create account first."
          return false;
        }
        let html = '';
        response.data.forEach(account => 
          html += `<option value="${account.id}">${account.name}</option>`
        );
        modalAccountList.insertAdjacentHTML('beforeend', html)
      }
    });
  }
  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.update();
        const type = data.type;
        const modalName = "new" + type[0].toUpperCase() + type.substr(1);
        this.element.reset(); 
        App.getModal(modalName).close();
      }  else {
        this.removeError();
        this.showError(response.error, "new-account")
      }
    })
  }
}
//  