export default class FormErrors {
  static showErrors() {
    const name = document.getElementById('name');
    const price = document.getElementById('price');

    if (!name.value) {
      this.showErrorMessage(name, 'Введите название!');
    }

    if (!price.value) {
      this.showErrorMessage(price, 'Введите стоимость!');
    } else if (price.value < 1) {
      this.showErrorMessage(price, 'Стоимость не может быть отрицательной, ну вы чего');
    }
  }

  static showErrorMessage(input, message) {
    const errorMessage = input.nextElementSibling;
    errorMessage.classList.remove('hidden');
    errorMessage.textContent = message;

    input.classList.add('invalid');
  }

  static clearError(input) {
    const errorMessage = input.nextElementSibling;
    errorMessage.classList.add('hidden');

    input.classList.remove('invalid');
  }
}
