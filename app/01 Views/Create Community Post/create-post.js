const CreatePostViewModel = require("~/01 Views/Create Community Post/create-post-vm");

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
};

exports.createPostOnTap = function (args) {
  vm.createPost(args);
};

