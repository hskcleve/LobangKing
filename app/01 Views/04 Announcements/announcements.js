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

exports.lobangOnTap = async function (args) {
  const ctx = args.object.bindingContext;
  const lobangToPass = await vm.getLobangToPass(ctx.lobang_name);
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/04 Lobang/lobang_page",
    context: {
      lobang: lobangToPass[0],
      user: vm.user,
    },
  };
  frame.navigate(navigationEntry);
};
