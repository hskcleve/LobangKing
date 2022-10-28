const observableModule = require("@nativescript/core/data/observable");
const errorMsgs = require("~/00 Constants/error_messages.json");

var page;
var pageData;

exports.onShownModally = function (args) {
    page = args.object;
    page.actionBarHidden = true;
    pageData = observableModule.fromObject({
        temp_announcement: {
            description: undefined,
            picture: undefined,
        },
        create_callback: args.context.create_callback,
        // update_callback: args.context.update_callback,
        // delete_callback: args.context.delete_callback,
    });
};

exports.confirmCreateAnnouncementOnTap = function () {
    if ( !pageData.temp_announcement.description < 1) {
        alert("Write something...");
        return;
    }
    pageData.create_callback(pageData.temp_announcement);
    page.closeModal();
};

exports.closeCreateAnnouncementModalOnTap = function () {
    pageData.delete_callback();
    page.closeModal();
};
