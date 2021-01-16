import BuyListData from './BuyListData';
import FormModal from './FormModal';
import ConfirmModal from './ConfirmModal';
import renderTable from './renderTable';

export default class BuyListTable {
  constructor(data) {
    this.buyList = new BuyListData(data);
    this.formModal = new FormModal(this.buyList);
    this.confirmModal = new ConfirmModal(this.buyList);

    this.addEventListeners();
    renderTable(data);
  }

  addEventListeners() {
    const table = document.querySelector('.list-editor-section table');
    table.addEventListener('click', (e) => {
      const { target } = e;

      if (target.classList.contains('remove-button')) {
        const { id } = target.closest('tr').dataset;
        this.confirmModal.idToRemove = Number(id);
        this.confirmModal.open();
      }

      if (target.classList.contains('edit-button')) {
        const { id } = target.closest('tr').dataset;
        const item = this.buyList.get(+id);
        this.formModal.openForEdit(item);
      }
    });

    const add = document.getElementById('add');
    add.addEventListener('click', () => {
      this.formModal.openForAdd();
    });
  }
}
