import renderTable from './renderTable';

export default class ConfirmModal {
  constructor(buyList) {
    this.buyList = buyList;
    this.modal = document.getElementById('confirm-modal');
    this.idToRemove = null;
    this.addEventListeners();
  }

  open() {
    this.modal.classList.remove('hidden');
    // document.body.classList.add('frozen');
  }

  close() {
    this.modal.classList.add('hidden');
    // document.body.classList.remove('frozen');
  }

  addEventListeners() {
    const confirmBtn = this.modal.getElementsByClassName('confirm_btn')[0];
    confirmBtn.addEventListener('click', () => {
      this.buyList.remove(this.idToRemove);
      this.close();
      renderTable(this.buyList.data);
    });

    const cancelBtn = this.modal.getElementsByClassName('cancel_btn')[0];
    cancelBtn.addEventListener('click', () => {
      this.close();
    });
  }
}
