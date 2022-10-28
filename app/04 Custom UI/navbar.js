const observableModule = require("@nativescript/core/data/observable");
const frameModule = require("@nativescript/core/ui/frame");

var page;
var navbarVm;

exports.onLoaded = function (args) {
  page = args.object;
  page.bindingContext = navbarVm
    ? navbarVm
    : observableModule.fromObject({
      currentPage: "feed",
    });
};

exports.homeOnTap = function () {
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/02 Feed/feed_page",
    context: {
      user: frame.currentPage.bindingContext.user,
    },
  };
  frame.navigate(navigationEntry);
};

exports.groupsOnTap = function () {
  alert("Todo: wiring to group page (WG)");
};

exports.groupbuyOnTap = function () {
  const frame = frameModule.Frame.topmost();
  if (frame.currentPage.id == "host_lobang_page") {
    return;
  }
  const navigationEntry = {
    moduleName: "~/01 Views/07 Host Lobang/host_lobang_page",
    context: {
      user: frame.currentPage.bindingContext.user,
    },
  };
  frame.navigate(navigationEntry);
};

exports.exploreOnTap = function () {
  alert("Todo: wiring to explore page (HY)");
};

exports.profileOnTap = function () {
  const frame = frameModule.Frame.topmost();
  if (frame.currentPage.id == "profile_page") {
    return;
  }
  const navigationEntry = {
    moduleName: "~/01 Views/06 Profile/profile_page",
    context: {
      user: frame.currentPage.bindingContext.user,
    },
  };
  frame.navigate(navigationEntry);
};
