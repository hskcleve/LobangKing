const observableModule = require("@nativescript/core/data/observable");
const frameModule = require("@nativescript/core/ui/frame");
const User = require("~/03 Models/User");
const { doUserLogin, doUserRegister } = require("~/07 Services/auth_service");
const { doMockUserLogin } = require("~/07 Services/mock_service");
const possible_locations = require("~/00 Constants/towns_constants").town_names;
const errorMsgs = require("~/00 Constants/error_messages");

function LoginPageViewModel() {
  var loginPageViewModel = observableModule.fromObject({
    username_input: "lobang_king",
    password_input: "password",
    on_login_page: true,
    location_provider: possible_locations,
    temp_user: new User(),
  });

  loginPageViewModel.toggleRegister = function () {
    loginPageViewModel.on_login_page = !loginPageViewModel.on_login_page;
  };

  loginPageViewModel.navToFeed = function (user) {
    const frame = frameModule.Frame.topmost();
    const navigationEntry = {
      moduleName: "~/01 Views/02 Feed/feed_page",
      clearHistory: true,
      context: {
        user: user,
      },
    };
    frame.navigate(navigationEntry);
  };

  loginPageViewModel.doLogin = function () {
    if (process.env.USE_MOCK == "true") {
      doMockUserLogin(
        loginPageViewModel.username_input,
        loginPageViewModel.password_input
      )
        .then((user) => {
          loginPageViewModel.navToFeed(user);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      doUserLogin(
        loginPageViewModel.username_input,
        loginPageViewModel.password_input
      )
        .then((user) => {
          loginPageViewModel.navToFeed(user);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  loginPageViewModel.doRegister = function (_callback) {
    if (process.env.USE_MOCK == "true") {
      alert("Register fx not ready");
    } else {
      doUserRegister(loginPageViewModel.temp_user)
        .then(() => {
          _callback();
          alert("New account successfully registered.");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return loginPageViewModel;
}

module.exports = LoginPageViewModel;
