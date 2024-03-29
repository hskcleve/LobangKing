const CommunityPageViewModel = require("../../02 View Models/08 Community/community-page-vm");
const frameModule = require("@nativescript/core/ui/frame");
// const { getCommunitiesByUserId } = require("~/07 Services/communities-service");

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
  if (!nvc.community_image) {
    vm.setImageFromPost();
  } else {
    vm.set("image", nvc.community_image);
  }
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

exports.leaveCommunityOnTap = function (args) {
  vm.doLeaveCommunity(() => {
    page.bindingContext = null;
    page.bindingContext = vm;
  });
};
