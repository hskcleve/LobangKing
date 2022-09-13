const observableModule = require("@nativescript/core/data/observable");
const frameModule = require("@nativescript/core/ui/frame");
const { doMockUserLogin } = require("~/07 Services/mock_service");

function LoginPageViewModel() {
  var loginPageViewModel = observableModule.fromObject({
    username_input: "",
    password_input: "",
    on_login_page: true,
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
      alert("API not ready");
    }
  };

  loginPageViewModel.doRegister = function () {
    if (process.env.USE_MOCK == "true") {
      alert("Register fx not ready");
    } else {
      alert("API not ready");
    }
  };

  return loginPageViewModel;
}

module.exports = LoginPageViewModel;
