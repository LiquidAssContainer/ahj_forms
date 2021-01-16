import BuyListData from '../BuyListData';

describe('Test BuyListData.js', () => {
  const data = [
    {
      name: 'Sans-ung',
      price: 30000,
      id: 1,
    },
    {
      name: 'Whoawei',
      price: 32000,
      id: 2,
    },
  ];

  const buyList = new BuyListData(data);

  test('Test get(id)', () => {
    const item = {
      name: 'Whoawei',
      price: 32000,
      id: 2,
    };
    const itemById = buyList.get(2);
    expect(itemById).toEqual(item);
  });

  test('Test adding', () => {
    const expectedData = [
      {
        name: 'Sans-ung',
        price: 30000,
        id: 1,
      },
      {
        name: 'Whoawei',
        price: 32000,
        id: 2,
      },
      {
        name: 'iPhone',
        price: 99999,
        id: 3,
      },
    ];

    buyList.add('iPhone', 99999);
    expect(buyList.data).toEqual(expectedData);
  });

  test('Test removing', () => {
    const expectedData = [
      {
        name: 'Sans-ung',
        price: 30000,
        id: 1,
      },
      {
        name: 'iPhone',
        price: 99999,
        id: 3,
      },
    ];

    buyList.remove(2);
    expect(buyList.data).toEqual(expectedData);
  });

  test('Test editing', () => {
    const expectedItem = {
      name: 'iPhone Super',
      price: 200000,
      id: 3,
    };

    buyList.edit(3, { name: 'iPhone Super', price: 200000 });
    expect(buyList.get(3)).toEqual(expectedItem);
  });

  test('Test generateId()', () => {
    const result = buyList.generateId();
    expect(result).toBe(4);
  });
});
