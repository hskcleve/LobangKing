const observableModule = require("@nativescript/core/data/observable");
const errorMsgs = require("~/00 Constants/error_messages.json");

var page;
var pageData;

exports.onShownModally = function (args) {
    page = args.object;
    page.actionBarHidden = true;
    pageData = observableModule.fromObject({
        temp_announcement: args.context.announcement || {
            description: undefined,
            picture: undefined,
        },
        update_callback: args.context.update_callback,
        delete_callback: args.context.delete_callback,
    });
    page.bindingContext = pageData;
};

exports.confirmEditAnnouncementOnTap = function () {
    if ( !pageData.temp_announcement.description ) {
        alert("Write something...");
        return;
    }
    pageData.update_callback(pageData.temp_announcement);
    page.closeModal();
};

exports.confirmDeleteAnnouncementOnTap = function () {
    pageData.delete_callback(pageData.temp_announcement);
    page.closeModal();
};

exports.closeUpdateAnnouncementModalOnTap = function () {
    page.closeModal();
};
