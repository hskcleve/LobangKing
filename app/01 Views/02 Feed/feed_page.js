const FeedPageViewModel = require("~/02 View Models/02 Feed/feed_page_vm");
const frameModule = require("@nativescript/core/ui/frame");

var page;
var vm;

exports.onLoaded = function (args) {
  page = args.object;
  page.actionBarHidden = true;
};

exports.onNavigatedTo = function (args) {
  const nvc = page.navigationContext;
  vm = new FeedPageViewModel();
  vm.user = nvc.user;
  page.bindingContext = vm;
};

exports.logoutOnTap = function (args) {
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/01 Login/login_page",
    clearHistory: true,
  };
  frame.navigate(navigationEntry);
};
