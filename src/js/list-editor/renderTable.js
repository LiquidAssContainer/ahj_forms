export default function renderTable(data) {
  const tbody = document.getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';

  for (const item of data) {
    const { name, price, id } = item;
    const row = document.createElement('tr');
    row.dataset.id = id;

    row.innerHTML = `
      <td class="buy-list_cell">${name}</td>
      <td class="buy-list_cell">${price}</td>
      <td class="buy-list_cell">
        <button class="edit-button">
          Edit
        </button>
      </td>
      <td class="buy-list_cell">
        <button class="remove-button">
          Remove
        </button>
      </td>
    `;
    tbody.appendChild(row);
  }
}
