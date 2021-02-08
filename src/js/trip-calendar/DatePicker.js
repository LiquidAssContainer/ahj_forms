import {
  format, parseISO, startOfMonth, subMonths, addMonths, setDate,
} from 'date-fns';
import RenderDatePicker from './RenderDatePicker';
import fillTable from './fillTable';

export default class DatePicker {
  constructor(calendar, dateInput, id) {
    this.calendar = calendar;
    this.dateInput = dateInput;
    this.id = id;

    this.picker = RenderDatePicker.pickerElem();
    this.dateInputLabel = dateInput.parentElement;
    this.dateInputLabel.after(this.picker);
    this.table = this.picker.getElementsByClassName('date-picker_table')[0];
    this.openCalendar = this.dateInput.nextElementSibling;

    this.months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    this.selectedMonth = startOfMonth(new Date());
    this.today = new Date();

    this.setMin(new Date());
    this.setMax(addMonths(new Date(), 12));
    this.updateTable();
    this.addEventListeners();
  }

  open() {
    this.picker.classList.remove('hidden');
  }

  close() {
    this.picker.classList.add('hidden');
  }

  setMin(date) {
    this.min = date;
    this.dateInput.min = format(date, 'yyyy-MM-dd');
    if (this.chosenDay < date) {
      this.dateInput.value = this.dateInput.min;
    }
  }

  setMax(date) {
    this.max = date;
    this.dateInput.max = format(date, 'yyyy-MM-dd');
    if (this.chosenDay > date) {
      this.dateInput.value = this.dateInput.max;
    }
  }

  clearTable() {
    this.table.innerHTML = RenderDatePicker.tableInnerHTML();
  }

  updateTable() {
    this.clearTable();
    fillTable.call(this);
  }

  addEventListeners() {
    this.dateInput.addEventListener('click', (e) => {
      e.preventDefault();
    });

    this.dateInput.addEventListener('change', (e) => {
      if (e.target.value) {
        const parsedDate = parseISO(e.target.value);
        this.selectedMonth = startOfMonth(parsedDate);
        this.chosenDay = parsedDate;
        this.calendar.changeMinMax(this.id, parsedDate);

        this.updateTable();
      }
    });

    this.openCalendar.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.picker.classList.contains('hidden')) {
        this.open();
      } else {
        this.close();
      }
    });

    this.picker.addEventListener('click', (e) => {
      const { target } = e;

      const dayCell = target.closest('.date-picker_day__available');
      if (dayCell) {
        const day = Number(dayCell.textContent);
        this.chosenDay = setDate(this.selectedMonth, day);
        this.dateInput.value = format(this.chosenDay, 'yyyy-MM-dd');
        this.calendar.changeMinMax(this.id, this.chosenDay);
        this.updateTable();
      }

      if (target.classList.contains('date-picker_prev-month')) {
        this.selectedMonth = subMonths(this.selectedMonth, 1);
        this.updateTable();
      }

      if (target.classList.contains('date-picker_next-month')) {
        this.selectedMonth = addMonths(this.selectedMonth, 1);
        this.updateTable();
      }
    });
  }
}
