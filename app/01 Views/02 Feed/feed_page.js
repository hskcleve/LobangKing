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
  vm.empty();
  vm.load();
};

exports.logoutOnTap = function (args) {
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/01 Login/login_page",
    clearHistory: true,
  };
  frame.navigate(navigationEntry);
};

exports.announcementsOnTap = function (args) {
  // navigate to view announcements page
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/04 Announcements/announcements",
    context: {
      user: vm.user,
    },
  };
  frame.navigate(navigationEntry);
};

exports.postCommunityOnTap = function (args) {
  // navigate to community page that the post belongs to
  const ctx = args.object.bindingContext;
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/08 Community/community-page",
    context: {
      user: vm.user,
      commName: ctx.community_id,
    },
  };
  frame.navigate(navigationEntry);
};
