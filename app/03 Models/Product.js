const observableModule = require("@nativescript/core/data/observable");

function Product(info) {
  info = info || {
    product_name: undefined,
    price: undefined,
    qty_ordered: undefined,
  };

  var ProductModel = observableModule.fromObject({
    product_name: info.product_name,
    price: info.price,
    qty_ordered: info.qty_ordered,
  });

  return ProductModel;
}

module.exports = Product;