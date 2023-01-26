
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
    
    const data = User.current();  
    Account.list(data, (err, response) => { 
      if (!response) {
        return false;
      }
      if (response.success) {
        response.data.forEach(account => 
          modalAccountList.insertAdjacentHTML(
            'beforeend', 
            `<option value="${account.id}">${account.name}</option>`
          )
        );
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
      }
    })
  }
}
//  