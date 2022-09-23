const error_messages = require("~/00 Constants/error_messages.json");
const Lobang = require("~/03 Models/Lobang");
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

exports.getHostedGroupBuysByUserId = function (userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let mockGetHostedGroupBuyResponse = require("~/08 Mock Data/mock_get_own_hosted_lobangs.json");
      let lobangs = [];
      mockGetHostedGroupBuyResponse.lobangs.forEach((lobang) => {
        lobangs.push(new Lobang(lobang));
      });
      resolve(lobangs);
    }, 0);
    // no reject for this fx in mock
  });
};

exports.getJoinedGroupBuysByUserId = function (userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let mockGetJoinedGroupBuyResponse = require("~/08 Mock Data/mock_get_joined_lobangs.json");
      let lobangs = [];
      mockGetJoinedGroupBuyResponse.lobangs.forEach((lobang) => {
        lobangs.push(new Lobang(lobang));
      });
      resolve(lobangs);
    }, 0);
    // no reject for this fx in mock
  });
};
