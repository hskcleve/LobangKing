const ProfilePageViewModel = require("~/02 View Models/06 Profile/profile_page_vm");
const frameModule = require("@nativescript/core/ui/frame");

var page;
var vm;

exports.onLoaded = function (args) {
  page = args.object;
  page.actionBarHidden = true;
};

exports.onNavigatedTo = function (args) {
  const nvc = page.navigationContext;
  vm = vm ? vm : new ProfilePageViewModel();
  page.bindingContext = vm;
  vm.set("user", nvc.user);
  vm.getHostedLobangs();
  vm.getJoinedLobangs();
};

exports.goBack = function () {
  frameModule.Frame.topmost().goBack();
};

exports.toggleLobangsTab = function () {
  vm.set("tab", "lobangs");
};

exports.toggleCoinsTab = function () {
  vm.set("tab", "coins");
};

exports.toggleEditTab = function () {
  vm.set("tab", "edit");
};
