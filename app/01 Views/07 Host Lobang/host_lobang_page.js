const HostLobangPageViewModel = require("~/02 View Models/07 Host Lobang/host_lobang_page_vm");
const frameModule = require("@nativescript/core/ui/frame");
const errorMsg = require("~/00 Constants/error_messages");
const { homeOnTap } = require("~/04 Custom UI/navbar");

var page;
var vm;

exports.onLoaded = function (args) {
  page = args.object;
  page.actionBarHidden = true;
};

exports.onNavigatedTo = function () {
  const nvc = page.navigationContext;
  vm = new HostLobangPageViewModel();
  page.bindingContext = vm;
  vm.set("user", nvc.user);
};

exports.goBack = function () {
  frameModule.Frame.topmost().goBack();
};

exports.addCategoryOnTap = function (args) {
  const categoryPicked = args.object.bindingContext;
  vm.addOrRemoveCategory(categoryPicked);
  page.bindingContext = undefined;
  page.bindingContext = vm;
};

exports.determineIfSelected = function (item) {
  if (vm.containsCurrentCategory(item)) {
    return "selected";
  }
  return "unselected";
};

exports.nextOnTap = function () {
  if (vm.temp_lobang.categories.length < 1) {
    alert(errorMsg.NO_CATEGORY_SELECTED_ERROR);
    return;
  }
  if (vm.status == "detailsInput") {
    vm.validateLobang()
      .then(() =>
        vm
          .doCreateLobang()
          .then(() => {
            alert("Created Lobang Successfully!");
            homeOnTap();
          })
          .catch((firebaseError) => alert(firebaseError))
      )
      .catch((validationError) => alert(validationError));
  } else vm.forwardStatus();
};

exports.backOnTap = function () {
  vm.reverseStatus();
};

exports.chooseLocation = function () {
  const option = {
    context: {
      lobang: vm.temp_lobang,
      callback: (locationPicked) => {
        vm.temp_lobang.location = locationPicked;
        page.bindingContext = undefined;
        page.bindingContext = vm;
      },
    },
  };
  page.showModal("~/01 Views/10 Modals/location_modal", option);
};

exports.chooseCollectionDate = function () {
  const option = {
    context: {
      title: "Select Collection Date",
      lobang: vm.temp_lobang,
      callback: (collectionDatePicked) => {
        vm.temp_lobang.collection_date = collectionDatePicked;
        page.bindingContext = undefined;
        page.bindingContext = vm;
      },
    },
  };
  page.showModal("~/01 Views/10 Modals/date_picker_modal", option);
};

exports.chooseDeadlineDate = function () {
  const option = {
    context: {
      title: "Select Deadline Date",
      lobang: vm.temp_lobang,
      callback: (deadlineDatePicked) => {
        vm.temp_lobang.last_order_date = deadlineDatePicked;
        page.bindingContext = undefined;
        page.bindingContext = vm;
      },
    },
  };
  page.showModal("~/01 Views/10 Modals/date_picker_modal", option);
};

exports.addTagOnTap = function () {
  if (vm.temp_lobang.tags.length > 2) {
    alert(errorMsg.MAX_TAGS_REACHED_ERROR);
    return;
  }
  const tagBox = page.getViewById("addTagBox");
  if (tagBox.text.length == 0) {
    return;
  }
  vm.temp_lobang.tags.push(tagBox.text);
  page.bindingContext = undefined;
  page.bindingContext = vm;
  tagBox.text = "";
};

exports.removeTagOnTap = function (args) {
  const tagToRemove = args.object.parent.bindingContext;
  vm.temp_lobang.tags.splice(vm.temp_lobang.tags.indexOf(tagToRemove), 1);
  page.bindingContext = undefined;
  page.bindingContext = vm;
};

exports.addProductOnTap = function () {
  const option = {
    context: {
      create_callback: (product) => {
        console.log("back from create modal");
        console.log(product);
        vm.mockProducts.push(product);
        vm.temp_lobang.products.push(product);
        page.bindingContext = undefined;
        page.bindingContext = vm;
      },
    },
  };
  page.showModal("~/01 Views/10 Modals/product_create_modal", option);
};

exports.productEditOnTap = function (args) {
  const product = args.object.bindingContext;
  const temp_index = vm.mockProducts.indexOf(product);
  const actual_index = vm.temp_lobang.products.indexOf(product);
  const option = {
    context: {
      product: product,
      create_callback: (product) => {
        console.log("back from create modal");
        console.log(product);
        vm.mockProducts.push(product);
        vm.temp_lobang.products.push(product);
        page.bindingContext = undefined;
        page.bindingContext = vm;
      },
      update_callback: (product) => {
        vm.mockProducts.splice(temp_index, 1, product);
        vm.temp_lobang.products.splice(actual_index, 1, product);
        page.bindingContext = undefined;
        page.bindingContext = vm;
      },
      delete_callback: () => {
        vm.mockProducts.splice(temp_index, 1);
        vm.temp_lobang.products.splice(actual_index, 1);
        page.bindingContext = undefined;
        page.bindingContext = vm;
      },
    },
  };
  page.showModal("~/01 Views/10 Modals/product_create_modal", option);
};
