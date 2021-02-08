import DatePicker from './DatePicker';

export default class CalendarForm {
  constructor() {
    this.form = document.getElementsByClassName('calendar_form')[0];
    this.returnDateSwitch = document.getElementById('return-date-switch');
    this.oneWayDateContainer = document.getElementsByClassName('one-way-date_container')[0];
    this.destinationAndReturnDates = document.getElementsByClassName('destination-return_container')[0];

    this.oneWayDate = document.getElementById('one-way-date');
    this.destinationDate = document.getElementById('destination-date');
    this.returnDate = document.getElementById('return-date');

    this.createDatePickers();
    this.addEventListeners();
  }

  createDatePickers() {
    this.datePickers = new Map();
    for (const [elem, name] of new Map([
      [this.oneWayDate, 'oneway'],
      [this.destinationDate, 'destination'],
      [this.returnDate, 'return'],
    ])) {
      this.datePickers.set(name, new DatePicker(this, elem, name));
    }
  }

  changeMinMax(id, date) {
    switch (id) {
      case 'destination':
        const returnDatePicker = this.datePickers.get('return');
        returnDatePicker.setMin(date);
        returnDatePicker.updateTable();
        break;
      case 'return':
        const destinationDatePicker = this.datePickers.get('destination');
        destinationDatePicker.setMax(date);
        destinationDatePicker.updateTable();
    }
  }

  switchReturnDate() {
    if (this.returnDateSwitch.checked) {
      this.oneWayDateContainer.classList.add('hidden');
      this.destinationAndReturnDates.classList.remove('hidden');
      this.destinationDate.value = this.oneWayDate.value;
    } else {
      this.oneWayDateContainer.classList.remove('hidden');
      this.destinationAndReturnDates.classList.add('hidden');
      this.oneWayDate.value = this.destinationDate.value;
    }
  }

  addEventListeners() {
    this.returnDateSwitch.addEventListener('change', () => {
      this.switchReturnDate();
    });

    this.oneWayDate.addEventListener('change', () => {
      this.returnDate.value = '';
    });

    this.oneWayDate.addEventListener('click', (e) => {
      e.preventDefault();
      this.returnDate.value = '';
    });

    this.destinationDate.addEventListener('change', () => {

    });
  }
}
