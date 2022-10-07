const LoginPageViewModel = require("~/02 View Models/01 Login/login_page_vm");
const { Enums } = require("@nativescript/core");
const errorMsgs = require("~/00 Constants/error_messages");

var page;
var vm;

exports.onLoaded = function (args) {
  page = args.object;
  page.actionBarHidden = true;
};

exports.onNavigatedTo = function (args) {
  vm = new LoginPageViewModel();
  page.bindingContext = vm;
};

toggleRegister = function () {
  vm.toggleRegister();
  const formContainer = page.getViewById("formContainer");
  if (!vm.on_login_page) {
    formContainer.animate({
      height: "89%",
      duration: 500,
      curve: Enums.AnimationCurve.linear,
    });
  } else {
    formContainer.animate({
      height: "55%",
      duration: 500,
      curve: Enums.AnimationCurve.linear,
    });
  }
};

exports.toggleRegister = toggleRegister;

exports.registerOnTap = function () {
  const dataform = page.getViewById("myInfoDataForm");
  if (dataform.hasValidationErrors()) {
    alert(errorMsgs.INVALID_FIELDS_ERROR);
    return;
  }
  vm.doRegister(toggleRegister);
};

exports.loginOnTap = function () {
  vm.doLogin();
};
