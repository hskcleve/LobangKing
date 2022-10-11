const LobangPageViewModel = require("~/02 View Models/04 Lobang/lobang_page_vm");
const frameModule = require("@nativescript/core/ui/frame");

var page;
var vm;

exports.onLoaded = function (args) {
    page = args.object;
    page.actionBarHidden = true;
};

exports.onNavigatedTo = function (args) {
    const nvc = page.navigationContext;
    vm = new LobangPageViewModel();
    page.bindingContext = vm;
    vm.set("lobang", nvc.lobang);
    vm.set("temp_lobang", Object.assign({}, nvc.lobang));
    vm.getLobangHost();
    vm.getCollectionLocation();
    vm.getCollectionDatetime();
};

exports.goBack = function () {
  frameModule.Frame.topmost().goBack();
};

exports.toggleDetailsTab = function() {
  vm.set("tab", "lobangDetails");
};

exports.toggleAnnouncementsTab = function() {
  vm.set("tab", "lobangAnnouncements");
};

exports.toggleOrdersTab = function() {
  vm.set("tab", "lobangOrders");
};

exports.hostOnTap = function(args) {
  const userTapped = args.object.parent.bindingContext;
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/06 Profile/profile_page",
    context: {
      user: userTapped,},
  };
  frame.navigate(navigationEntry);
}

exports.submitOrderOnTap = function(args) {
  const dataform = page

}

exports.messageHost = function(args) {

}

exports.leaveRating = function(args) {

}


