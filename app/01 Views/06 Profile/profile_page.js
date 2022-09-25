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
  vm.set("temp_user", Object.assign({}, nvc.user));
  vm.getHostedLobangs();
  vm.getJoinedLobangs();
};

exports.goBack = function () {
  frameModule.Frame.topmost().goBack();
};

exports.toggleLobangsTab = function () {
  vm.set("tab", "lobangs");
};

exports.hostedLobangOnTap = function (args) {
  console.log(args.object.bindingContext);
  alert("Will route to manage hosted lobang page");
};

exports.joinedLobangOnTap = function (args) {
  console.log(args.object.bindingContext);
  alert("Will route to joined lobang page");
};

exports.boostListingOnTap = function (args) {
  const listingTapped = args.object.parent.bindingContext;
  console.log(args.object.parent.bindingContext);
  alert("Unimplemented: Will boost for " + listingTapped.lobang_name);
};

exports.toggleCoinsTab = function () {
  vm.set("tab", "coins");
};

exports.toggleEditTab = function () {
  vm.set("tab", "edit");
};

exports.updateBtnOnTap = function () {
  vm.doUserInfoUpdate();
};
