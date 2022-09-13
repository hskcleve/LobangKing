const error_messages = require("~/00 Constants/error_messages.json");
const User = require("~/03 Models/User");

exports.doMockUserLogin = function (userId, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockLoginResponse = require("~/08 Mock Data/mock_login_response.json");
      if (userId.length == 0 || password.length == 0) {
        reject(error_messages.EMPTY_FIELD_ERROR);
      } else if (userId == "johndoe" && password == "password") {
        resolve(new User(mockLoginResponse));
      } else if (userId != "johndoe") {
        reject(error_messages.USER_DOES_NOT_EXIST_ERROR);
      } else {
        reject(error_messages.INVALID_CREDENTIALS_ERROR);
      }
    }, 0);
  });
};
