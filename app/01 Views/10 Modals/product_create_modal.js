const observableModule = require("@nativescript/core/data/observable");
const errorMsgs = require("~/00 Constants/error_messages.json");

var page;
var pageData;

exports.onShownModally = function (args) {
  page = args.object;
  page.actionBarHidden = true;
  pageData = observableModule.fromObject({
    isEdit: false,
    temp_product: args.context.product || {
      picture: undefined,
      name: undefined,
      price: undefined,
      max_quantity: undefined,
      description: undefined,
    },
    create_callback: args.context.create_callback,
    update_callback: args.context.update_callback,
    delete_callback: args.context.delete_callback,
  });
  if (pageData.temp_product.name) pageData.isEdit = true;
  page.bindingContext = pageData;
};

exports.confirmOnTap = function () {
  if (
    !pageData.temp_product.name ||
    pageData.temp_product.name.trim().length < 5
  ) {
    alert(errorMsgs.PRODUCT_NAME_MIN_LENGTH_ERROR);
    return;
  } else if (!pageData.temp_product.price || pageData.temp_product.price == 0) {
    alert(errorMsgs.PRODUCT_NO_PRICE_ERROR);
    return;
  } else if (!pageData.temp_product.max_quantity) {
    alert(errorMsgs.PRODUCT_MAX_QTY_NOT_SET_ERROR);
    return;
  } else if (
    !pageData.temp_product.description ||
    pageData.temp_product.description.trim().length < 10
  ) {
    alert(errorMsgs.PRODUCT_DESCRIPTION_MIN_LENGTH_ERROR);
    return;
  }
  pageData.create_callback(pageData.temp_product);
  page.closeModal();
};

exports.updateOnTap = function () {
  if (
    !pageData.temp_product.name ||
    pageData.temp_product.name.trim().length < 5
  ) {
    alert(errorMsgs.PRODUCT_NAME_MIN_LENGTH_ERROR);
    return;
  } else if (!pageData.temp_product.price || pageData.temp_product.price == 0) {
    alert(errorMsgs.PRODUCT_NO_PRICE_ERROR);
    return;
  } else if (!pageData.temp_product.max_quantity) {
    alert(errorMsgs.PRODUCT_MAX_QTY_NOT_SET_ERROR);
    return;
  } else if (
    !pageData.temp_product.description ||
    pageData.temp_product.description.trim().length < 10
  ) {
    alert(errorMsgs.PRODUCT_DESCRIPTION_MIN_LENGTH_ERROR);
    return;
  }
  pageData.update_callback(pageData.temp_product);
  page.closeModal();
};

exports.deleteOnTap = function () {
  pageData.delete_callback();
  page.closeModal();
};
