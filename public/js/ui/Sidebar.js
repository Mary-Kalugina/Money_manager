/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const body = document.querySelector(".sidebar-mini");
    let i = 0;
    sidebarToggle.addEventListener("click", () => { 
      if (i == 0){
        body.classList.add("sidebar-open", "sidebar-collapse");
        i = 1;
      } else if (i == 1) {
        body.classList.remove("sidebar-open", "sidebar-collapse");
        i = 0;
        }
    });

  }
  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    document.querySelector(".menu-item_login").addEventListener("click", (e) => {
      e.preventDefault();
      App.getModal('login').Modal.open();
    });
    document.querySelector(".menu-item_login").addEventListener("click", (e) => {
      e.preventDefault();
      App.getModal('register').Modal.open();
    });
    document.querySelector(".menu-item_logout").addEventListener("click", (e) => {
      e.preventDefault();
      User.logout((err, response) => {
      if (response.success) {
        App.setState( 'init' );
      }
      })
    })
    
  }
}