const CommunityPageViewModel = require("../../02 View Models/08 Community/community-page-vm");
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
  vm.set("image", nvc.community_image);
  console.log(nvc.community_image);
  vm.empty();
  vm.load(vm.communityName);
  console.log("At Community Page: " + vm.user.user_id);
};

exports.goBack = function () {
  frameModule.Frame.topmost().goBack();
};

exports.navToCreatePost = function (args) {
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/09 Create Community Post/create-post",
    context: {
      communityName: vm.communityName,
      user: vm.user,
      community_image: vm.image,
    },
  };
  frame.navigate(navigationEntry);
};

exports.joinCommunityOnTap = function (args) {
  vm.doJoinCommunity(() => {
    page.bindingContext = null;
    page.bindingContext = vm;
  });
};
