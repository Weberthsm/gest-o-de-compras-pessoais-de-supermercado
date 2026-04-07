module.exports = {
  validProduct: {
    name: 'Arroz',
    quantity: 10,
    minQuantity: 2
  },
  validProductWithoutMin: {
    name: 'Feijão',
    quantity: 5
  },
  duplicateNameProduct: {
    name: 'Arroz',
    quantity: 15,
    minQuantity: 3
  },
  negativeQuantityProduct: {
    name: 'Macarrão',
    quantity: -1,
    minQuantity: 1
  },
  negativeMinQuantityProduct: {
    name: 'Óleo',
    quantity: 2,
    minQuantity: -1
  }
};