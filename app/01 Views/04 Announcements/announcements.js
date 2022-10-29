const AnnouncementsViewModel = require("~/02 View Models/04 Announcements/announcements-vm");
const frameModule = require("@nativescript/core/ui/frame");

var page;
var vm;

exports.onLoaded = function (args) {
  page = args.object;
  page.actionBarHidden = true;
};

exports.goBack = function () {
  frameModule.Frame.topmost().goBack();
};

exports.onNavigatedTo = function (args) {
  const nvc = page.navigationContext;
  vm = new AnnouncementsViewModel();
  page.bindingContext = vm;
  vm.set("user", nvc.user);
  vm.load();
};
