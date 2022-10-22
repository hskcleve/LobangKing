const observableModule = require("@nativescript/core/data/observable");

var page;
var pageData;

exports.onShownModally = function (args) {
  page = args.object;
  page.actionBarHidden = true;
  pageData = observableModule.fromObject({
    categories: require("~/00 Constants/categories_constants").category_names,
    callback: args.context.callback,
  });
  page.bindingContext = pageData;
};

exports.confirmOnTap = function () {
  const listPicker = page.getViewById("listPicker");
  pageData.callback(listPicker.selectedValue);
  page.closeModal();
};
