const observableModule = require("@nativescript/core/data/observable");

var page;
var pageData;

exports.onShownModally = function (args) {
    page = args.object;
    page.actionBarHidden = true;
    pageData = observableModule.fromObject({
        status: ["Ordered", "Paid", "Completed", "Cancelled"],
        temp_order: args.context.order,
        callback: args.context.callback,
    });
    pageData.status = pageData.status.filter((item) => item !== pageData.temp_order.status);
    page.bindingContext = pageData;
};

exports.confirmOnTap = function () {
    const statusPicker = page.getViewById("statusPicker");
    pageData.callback(statusPicker.selectedValue);
    page.closeModal();
};