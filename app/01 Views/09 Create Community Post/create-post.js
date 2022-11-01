const CreatePostViewModel = require("~/02 View Models/09 Create Community Post/create-post-vm");
const frameModule = require("@nativescript/core/ui/frame");

var page;
var vm;

exports.onLoaded = function (args) {
  page = args.object;
  page.actionBarHidden = true;
};

exports.onNavigatedTo = function (args) {
  const nvc = page.navigationContext;
  vm = new CreatePostViewModel();
  page.bindingContext = vm;
  vm.set("user", nvc.user);
  vm.set("communityName", nvc.communityName);
  vm.set("community_image", nvc.community_image);
};

exports.goBack = function () {
  frameModule.Frame.topmost().goBack();
};

exports.createPostOnTap = function (args) {
  vm.createPost(args);
};
