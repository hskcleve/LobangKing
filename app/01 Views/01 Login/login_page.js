const LoginPageViewModel = require("~/02 View Models/01 Login/login_page_vm");

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

exports.toggleRegister = function () {
  vm.toggleRegister();
};

exports.registerOnTap = function () {
  vm.doRegister();
};

exports.loginOnTap = function () {
  vm.doLogin();
};
