import {
  getMonth, getYear, getDate, startOfMonth, getDay, getDaysInMonth, isSameMonth, endOfMonth,
} from 'date-fns';

export default function fillTable() {
  const date = this.selectedMonth;

  const days = this.picker.getElementsByClassName('date-picker_day');
  const firstDay = startOfMonth(date);
  const dayOfWeek = getDay(firstDay) || 7; // 0 — воскресенье, меняем на 7 с учётом нашего начала недели
  const daysInMonth = getDaysInMonth(date);

  const monthAndYear = this.picker.getElementsByClassName('date-picker_month-year')[0];
  const monthIndex = getMonth(date);
  const year = getYear(date);
  monthAndYear.textContent = `${this.months[monthIndex]} ${year}`;

  const monthIsInRange = endOfMonth(this.selectedMonth) >= this.min && startOfMonth(this.selectedMonth) <= this.max;
  const min = isSameMonth(this.selectedMonth, this.min) ? getDate(this.min) : 1;
  const max = isSameMonth(this.selectedMonth, this.max) ? getDate(this.max) : getDaysInMonth(this.selectedMonth);

  let j = 0;
  for (let i = 0; i < daysInMonth; i += 1) {
    j += 1;
    const day = days[i + dayOfWeek - 1];
    day.textContent = j;

    if (monthIsInRange && j >= min && j <= max) {
      day.classList.add('date-picker_day__available');
    } else {
      day.classList.add('date-picker_day__unavailable');
    }
  }

  for (const [date, className] of new Map([
    [this.today, 'today'],
    [this.chosenDay, 'chosen-day'],
  ])) {
    if (isSameMonth(this.selectedMonth, date)) {
      const day = days[getDate(date) + dayOfWeek - 2];
      day.closest('.date-picker_day').classList.add(className);
    }
  }
}
