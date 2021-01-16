import LocalData from '../LocalData';

export default class BuyListData {
  constructor(data) {
    this.data = data || [];
  }

  add(name, price) {
    const item = { name, price };
    item.id = this.generateId();
    this.data.push(item);

    LocalData.save('buylist', this.data);
  }

  get(id) {
    const item = this.data.find((elem) => elem.id === id);
    return item;
  }

  remove(id) {
    const index = this.data.findIndex((elem) => elem.id === id);
    if (index !== -1) this.data.splice(index, 1);

    LocalData.save('buylist', this.data);
  }

  edit(id, newData) {
    const item = this.data.find((elem) => elem.id === id);
    if (!item) throw new Error('Объект уже не существует');
    item.name = newData.name;
    item.price = newData.price;

    LocalData.save('buylist', this.data);
  }

  generateId() {
    const lastElem = this.data[this.data.length - 1];
    return lastElem ? (lastElem.id + 1) : 1;
  }
}
