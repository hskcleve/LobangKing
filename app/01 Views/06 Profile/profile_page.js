const ProfilePageViewModel = require("~/02 View Models/06 Profile/profile_page_vm");
const frameModule = require("@nativescript/core/ui/frame");
const errorMsgs = require("~/00 Constants/error_messages");

var page;
var vm;

exports.onLoaded = function (args) {
  page = args.object;
  page.actionBarHidden = true;
  const nvc = page.navigationContext;
  vm = new ProfilePageViewModel();
  
  vm.set("user", nvc.user);
  vm.set("temp_user", Object.assign({}, nvc.user));
  vm.getHostedLobangs();
  vm.getJoinedLobangs();
  page.bindingContext = vm;
};

exports.onNavigatedTo = function (args) {
 
};

exports.goBack = function () {
  frameModule.Frame.topmost().goBack();
};

exports.toggleLobangsTab = function () {
  vm.set("tab", "lobangs");
};

exports.hostedLobangOnTap = function (args) {
  const lobangTapped = args.object.bindingContext;
  const user = vm.user;
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/04 Lobang/lobang_page",
    context: {
      user: user,
      lobang: lobangTapped,
    },
  };
  frame.navigate(navigationEntry);
};

exports.joinedLobangOnTap = function (args) {
  const lobangTapped = args.object.bindingContext;
  const user = vm.user;
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/04 Lobang/lobang_page",
    context: {
      user: user,
      lobang: lobangTapped,
    },
  };
  frame.navigate(navigationEntry);
};

exports.boostListingOnTap = function (args) {
  const lobangTapped = args.object.parent.bindingContext;
  vm.doBoostListing(lobangTapped, () => {
    page.bindingContext = null;
    page.bindingContext = vm;
  });
};

exports.toggleCoinsTab = function () {
  vm.set("tab", "coins");
};

exports.toggleEditTab = function () {
  vm.set("tab", "edit");
};

exports.toggleEditLobangTab = function () {
  vm.set("tab", "editLobang");
};

exports.updateBtnOnTap = function () {
  const dataform = page.getViewById("myInfoDataForm");
  if (dataform.hasValidationErrors()) {
    alert(errorMsgs.INVALID_FIELDS_ERROR);
    return;
  }
  vm.doUserInfoUpdate(() => {
    page.bindingContext = null;
    page.bindingContext = vm;
  });
};

exports.logoutOnTap = function (args) {
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/01 Login/login_page",
    clearHistory: true,
  };
  frame.navigate(navigationEntry);
};

