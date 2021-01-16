import FormErrors from './FormErrors';
import renderTable from './renderTable';

export default class FormModal {
  constructor(buyList) {
    this.buyList = buyList;

    this.modal = document.getElementById('form-modal');
    this.form = document.getElementsByClassName('form-modal_content')[0];
    this.name = document.getElementById('name');
    this.price = document.getElementById('price');
    this.submit = document.getElementById('submit');
    this.close = document.getElementById('close');

    this.addEventListeners();
  }

  openModal() {
    this.modal.classList.remove('hidden');
  }

  closeModal() {
    this.form.reset();
    this.modal.classList.add('hidden');

    const inputs = document.getElementsByClassName('form-modal_input');
    inputs.forEach((input) => FormErrors.clearError(input));
  }

  openForAdd() {
    this.openModal();
    this.submit.dataset.type = 'add';
  }

  openForEdit(item) {
    const { name, price, id } = item;

    this.openModal();

    this.submit.dataset.type = 'edit';
    this.submit.dataset.id = id;

    this.name.value = name;
    this.price.value = price;
  }

  addEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSubmitHandler();
    });

    this.close.addEventListener('click', () => {
      this.closeModal();
    });

    for (const input of [this.name, this.price]) {
      input.addEventListener('input', (e) => {
        FormErrors.clearError(e.target);
      });
    }
  }

  onSubmitHandler() {
    const isValid = this.form.checkValidity();
    if (!isValid) {
      FormErrors.showErrors();
      return;
    }

    if (this.submit.dataset.type === 'add') {
      this.buyList.add(this.name.value, this.price.value);
    }

    if (this.submit.dataset.type === 'edit') {
      this.buyList.edit(+this.submit.dataset.id, { name: this.name.value, price: this.price.value });
      delete this.submit.dataset.id;
    }

    this.closeModal();
    renderTable(this.buyList.data);
  }
}
