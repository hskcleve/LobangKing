const LobangPageViewModel = require("~/02 View Models/04 Lobang/lobang_page_vm");
const frameModule = require("@nativescript/core/ui/frame");
const Announcement = require("~/03 Models/Announcement");
const Lobang = require("~/03 Models/Lobang");

var page;
var vm;

exports.onLoaded = function (args) {
  page = args.object;
  page.actionBarHidden = true;
};

exports.onNavigatedTo = function (args) {
  const nvc = page.navigationContext;
  vm = new LobangPageViewModel();

  vm.set("lobang", new Lobang(nvc.lobang));
  vm.set("temp_lobang", new Lobang(Object.assign({}, nvc.lobang)));
  vm.set("user", nvc.user);
  vm.set("temp_user", Object.assign({}, nvc.user));
  vm.getLobangHost();
  vm.getAnnouncements();
  vm.getProducts();
  vm.getOrders();
  vm.getRatings();
  vm.userHasOrderInLobang();
  vm.hasJoinedLobang();
  page.bindingContext = vm;
  console.log(vm.lobang instanceof Lobang);
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

exports.joinLobangOnTap = function (args) {
  vm.doJoinLobang(() => {
    page.bindingContext = null;
    page.bindingContext = vm;
  });
};

exports.unjoinLobangOnTap = function (args) {
  vm.doUnjoinLobang(() => {
    page.bindingContext = null;
    page.bindingContext = vm;
  });
};

exports.submitOrderOnTap = function (args) {
  vm.submitOrder(() => {
    page.bindingContext = null;
    page.bindingContext = vm;
  });
};

exports.createAnnouncementDialog = function (args) {
  const options = {
    context: {
      title: "Create Announcement",
      create_callback: (announcement) => {
        vm.set("temp_announcement", announcement);
        vm.doCreateAnnouncement().then((result) => {
          vm.announcements.push(result);
          console.log(result);
          vm.announcements.sort(
            (x, y) =>
              new Date(y.datetime).getTime() - new Date(x.datetime).getTime()
          );
          page.bindingContext = undefined;
          page.bindingContext = vm;
        });
      },
    },
  };
  page.showModal("~/01 Views/10 Modals/announcement_create_modal", options);
};

exports.editAnnouncementDialog = function (args) {
  const announcement = args.object.bindingContext;
  const temp_index = vm.announcements.indexOf(announcement);
  const actual_index = vm.temp_lobang.announcements.indexOf(announcement);
  const option = {
    context: {
      announcement: announcement,
      update_callback: (announcement) => {
        vm.set("temp_announcement", announcement);
        vm.doUpdateAnnouncement();
        vm.announcements.splice(temp_index, 1, announcement);
        vm.temp_lobang.announcements.splice(actual_index, 1, announcement);
        page.bindingContext = undefined;
        page.bindingContext = vm;
      },
      delete_callback: () => {
        vm.set("temp_announcement", announcement);
        vm.doDeleteAnnouncement();
        vm.announcements.splice(temp_index, 1);
        vm.temp_lobang.announcements.splice(actual_index, 1);
        page.bindingContext = undefined;
        page.bindingContext = vm;
      },
    },
  };
  page.showModal(
    "~/01 Views/10 Modals/announcement_update_delete_modal",
    option
  );
};

exports.updateOrderStatusDialog = function (args) {
  const order = args.object.bindingContext;
  const temp_index = vm.orders.indexOf(order);
  // const actual_index = vm.temp_lobang.orders.indexOf(order);
  const option = {
    context: {
      order: order,
      callback: (updatedOrderStatus) => {
        order.status = updatedOrderStatus;
        vm.doUpdateOrderStatus(order);
        vm.orders.splice(temp_index, 1, order);
        // vm.temp_lobang.orders.splice(actual_index, 1, order);
        page.bindingContext = undefined;
        page.bindingContext = vm;
      },
    },
  };
  page.showModal("~/01 Views/10 Modals/order_status_update_modal", option); //order_status_update modal
};

exports.hasOrder = function (args) {
  vm.userHasOrderInLobang().then((result) => {
    return result;
  });
  console.log(result);
  return result;
};

exports.editLobangOnTap = function (args) {
  const lobang = vm.get("lobang");
  var temp = JSON.stringify(lobang);
  vm.temp_lobang = JSON.parse(temp);
  console.log(vm.temp_lobang);
  vm.set("tab", "editLobang");
};

exports.updateLobangOnTap = function () {
  const dataform = page.getViewById("tempLobangDataForm");
  if (dataform.hasValidationErrors()) {
    alert(errorMsgs.INVALID_FIELDS_ERROR);
    return;
  }
  vm.doLobangUpdate(() => {
    page.bindingContext = null;
    page.bindingContext = vm;
  });
  alert("Update successful");
  vm.set("tab", "lobangDetails");
};

exports.messageHostOnTap = function (args) {};

exports.leaveRatingOnTap = function (args) {};

exports.viewOrderOnTap = function (args) {};
