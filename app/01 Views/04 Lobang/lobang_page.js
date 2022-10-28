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

  vm.set("lobang", nvc.lobang);
  vm.set("temp_lobang", Object.assign({}, nvc.lobang));
  vm.set("user", nvc.user);
  vm.set("temp_user", Object.assign({}, nvc.user));
  vm.getLobangHost();
  vm.getAnnouncements();
  vm.getProducts();
  vm.getOrders();
  vm.getRatings();
  page.bindingContext = vm;
};

exports.goBack = function () {
  frameModule.Frame.topmost().goBack();
};

exports.toggleDetailsTab = function () {
  vm.set("tab", "lobangDetails");
};

exports.toggleAnnouncementsTab = function () {
  vm.set("tab", "lobangAnnouncements");
};

exports.toggleOrdersTab = function () {
  vm.set("tab", "lobangOrders");
};

exports.hostOnTap = function (args) {
  const userTapped = args.object.parent.bindingContext;
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/06 Profile/profile_page",
    context: {
      user: userTapped,
    },
  };
  frame.navigate(navigationEntry);
};

exports.submitOrderOnTap = function (args) {
  const dataform = page.getViewById("myInfoDataForm");
  vm.submitOrder(() => {
    page.bindingContext = null;
    page.bindingContext = vm;
  });
};

exports.createAnnouncementDialog = function (args) {
  const options = {
    context: {
      title: "Create Announcement",
      lobang: vm.temp_lobang,
      create_callback: (announcement) => {
        vm.set("temp_announcement", announcement);
        vm.doCreateAnnouncement();
        vm.announcements.push(announcement);
        page.bindingContext = undefined;
        page.bindingContext = vm;
      },
    },
  };
  page.showModal("~/01 Views/10 Modals/announcement_create_modal", options);
};

exports.updateOrderStatusDialog = function (args) {
  const order = args.object.bindingContext;
  const temp_index = vm.orders.indexOf(order);
  const actual_index = vm.temp_lobang.orders.indexOf(order);
  const option = {
    context: {
      order: order,
      update_callback: (order) => {
        vm.orders.splice(temp_index, 1, order);
        vm.temp_lobang.orders.splice(actual_index, 1, order);
        page.bindingContext = undefined;
        page.bindingContext = vm;
      },
    },
  };
  page.showModal("~/01 Views/10 Modals/order_status_update_modal", option); //order_status_update modal
};

exports.messageHostOnTap = function (args) {

}

exports.leaveRatingOnTap = function (args) {

}

exports.viewOrderOnTap = function (args) {

}

exports.viewOrderSummaryOnTap = function (args) {

}


