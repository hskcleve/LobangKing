const AnnouncementsViewModel = require("~/01 Views/Announcements/announcements-vm");

var page;
var vm;

exports.onLoaded = function (args) {
  page = args.object;
  page.actionBarHidden = true;
};

exports.onNavigatedTo = function (args) {
  const nvc = page.navigationContext;
  vm = new AnnouncementsViewModel();
  page.bindingContext = vm;
  vm.set("user", nvc.user);
  vm.load();
};
