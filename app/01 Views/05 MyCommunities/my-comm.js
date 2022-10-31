var MyCommsViewModel = require("~/02 View Models/05 MyCommunities/my-comm-vm");
const frameModule = require("@nativescript/core/ui/frame");
const { getCommunitiesByUserId } = require("~/07 Services/communities-service");

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
  vm = new MyCommsViewModel();
  const nvc = page.navigationContext;
  page.bindingContext = vm;
  vm.set("user", nvc.user);
  vm.empty();
  vm.load();
};

exports.onTextChange = function (args) {
  vm.doSearch(() => {
    page.bindingContext = null;
    page.bindingContext = vm;
  });
};

exports.selectCommunityOnTap = function (args) {
  const ctx = args.object.bindingContext;
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/08 Community/community-page",
    context: {
      commName: ctx.community_id,
      user: vm.user,
      community_image: ctx.image,
    },
  };
  frame.navigate(navigationEntry);
};
