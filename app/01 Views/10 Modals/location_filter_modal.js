const observableModule = require("@nativescript/core/data/observable");
const possible_locations = require("~/00 Constants/towns_constants").town_names;

var page;
var pageData;

exports.onShownModally = function (args) {
  page = args.object;
  page.actionBarHidden = true;
  pageData = observableModule.fromObject({
    filterLocations: Object.assign([],possible_locations.unshift("None")),
    callback: args.context.callback,
  });
  page.bindingContext = pageData;
};

exports.confirmOnTap = function () {
  const listPicker = page.getViewById("listPicker");
  pageData.callback(listPicker.selectedValue);
  page.closeModal();
};
