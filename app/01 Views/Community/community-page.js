const CommunityPageViewModel = require("./community-page-vm");
const frameModule = require("@nativescript/core/ui/frame");

var page;
var vm;

exports.onLoaded = function (args) {
  page = args.object;
  page.actionBarHidden = true;
};

exports.onNavigatedTo = function (args) {
  vm = new CommunityPageViewModel([]);
  const nvc = page.navigationContext;
  page.bindingContext = vm;
  vm.set("user", nvc.user);
  vm.set("communityName", nvc.commName);
  vm.empty();
  vm.load(vm.communityName);
  console.log("At Community Page: " + vm.user.user_id);
};

exports.navToCreatePost = function (args) {
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/Create Community Post/create-post",
    context: {
      communityName: vm.communityName,
      user: vm.user,
    },
  };
  frame.navigate(navigationEntry);
};

exports.joinCommunityOnTap = function (args) {
  vm.doJoinCommunity( () => {
    page.bindingContext = null;
    page.bindingContext = vm;
  });

};
