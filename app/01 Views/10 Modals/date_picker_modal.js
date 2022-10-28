const observableModule = require("@nativescript/core/data/observable");

var page;
var pageData;

exports.onShownModally = function (args) {
    page = args.object;
    page.actionBarHidden = true;
    pageData = observableModule.fromObject({
        headerText: args.context.title,
        temp_lobang: args.context.lobang,
        callback: args.context.callback,
    });
    page.bindingContext = pageData;
    const datePicker = page.getViewById("datePicker");
    datePicker.minDate = new Date();
    datePicker.maxDate = new Date().setMonth(datePicker.minDate.getMonth() + 12);
};

exports.confirmOnTap = function () {
    const datePicker = page.getViewById("datePicker");
    const formattedDate = `${datePicker.date.getFullYear()}-${String(
        datePicker.date.getMonth() + 1
    ).padStart(2, "0")}-${String(datePicker.date.getDate()).padStart(
        2,
        "0"
    )}T00:00:00`;
    pageData.callback(formattedDate);
    page.closeModal();
};