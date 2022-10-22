const observableModule = require("@nativescript/core/data/observable");
const possible_search_types = require("~/00 Constants/search_type_constants").searchType;

var page;
var pageData;

exports.onShownModally = function (args) {
  page = args.object;
  page.actionBarHidden = true;
  pageData = observableModule.fromObject({
    searchTypes: possible_search_types,
    callback: args.context.callback,
  });
  page.bindingContext = pageData;
};

exports.confirmOnTap = function () {
  const listPicker = page.getViewById("listPicker");
  pageData.callback(listPicker.selectedValue);
  page.closeModal();
};
