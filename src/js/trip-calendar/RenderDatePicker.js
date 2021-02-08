export default class RenderDatePicker {
  static pickerElem() {
    const picker = document.createElement('div');
    picker.className = 'date-picker_container hidden';
    picker.innerHTML = `
      <div class="date-picker_month-switch">
        <a class="date-picker_btn date-picker_prev-month">←</a>
        <span class="date-picker_month-year"></span>
        <a class="date-picker_btn date-picker_next-month">→</a>
      </div>
    `;

    const table = document.createElement('table');
    table.className = 'date-picker_table';
    table.innerHTML = this.tableInnerHTML();

    picker.appendChild(table);
    return picker;
  }

  static tableInnerHTML() {
    return this.tableHeadHTML() + this.tableBodyHTML();
  }

  static tableHeadHTML() {
    return `
    <thead class="date-picker_head">
      <tr class="date-picker_head_row">
        <th class="date-picker_day-of-week">Пн</th>
        <th class="date-picker_day-of-week">Вт</th>
        <th class="date-picker_day-of-week">Ср</th>
        <th class="date-picker_day-of-week">Чт</th>
        <th class="date-picker_day-of-week">Пт</th>
        <th class="date-picker_day-of-week">Сб</th>
        <th class="date-picker_day-of-week">Вс</th>
      </tr>
    </thead>
    `;
  }

  static tableBodyHTML() {
    let tableBody = '<tbody>';

    for (let i = 0; i < 6; i += 1) {
      let row = '<tr class="date-picker_week">';

      for (let j = 0; j < 7; j += 1) {
        row += '<td class="date-picker_day"></td>';
      }
      row += '</tr>';
      tableBody += row;
    }

    tableBody += '</tbody>';
    return tableBody;
  }
}
