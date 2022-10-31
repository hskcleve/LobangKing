const observableModule = require("@nativescript/core/data/observable");

function Order(info) {
  info = info || {
    order_id: undefined,
    lobang_name: undefined,
    user_id: undefined,
    line_items: [],
    status: undefined,
  };

  var orderModel = observableModule.fromObject({
    order_id: info.order_id,
    lobang_name: info.lobang_name,
    user_id: info.user_id,
    line_items: info.line_items,
    status: info.status,
  });

  return orderModel;
}

module.exports = Order;