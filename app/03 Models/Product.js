const observableModule = require("@nativescript/core/data/observable");

function Product(info) {
  info = info || {
    product_id: undefined,
    picture: undefined,
    name: undefined,
    price: undefined,
    max_quantity: undefined,
    description: undefined,
    unit_qty: undefined,
  };

  var ProductModel = observableModule.fromObject({
    product_id: info.product_id,
    picture: info.picture,
    name: info.name,
    price: info.price,
    max_quantity: info.max_quantity,
    description: info.description,
    unit_qty: info.unit_qty,
  });

  return ProductModel;
}

module.exports = Product;