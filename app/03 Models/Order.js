const observableModule = require("@nativescript/core/data/observable");

function Order(info) {
  info = info || {
    order_id: undefined,
    user_id: undefined,
    line_item: undefined,
    order_status: undefined,
  };

  var orderModel = observableModule.fromObject({
    order_id: info.order_id,
    user: info.user,
    line_item: info.line_item,
    status: info.status,
  });

  return orderModel;
}

module.exports = Order;