const error_messages = require("~/00 Constants/error_messages.json");
const Lobang = require("~/03 Models/Lobang");
const User = require("~/03 Models/User");
const Announcement = require("~/03 Models/Announcement");
const Product = require("~/03 Models/Product");

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

exports.getMockHostedGroupBuysByUserId = function (userId) {
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

exports.getMockJoinedGroupBuysByUserId = function (userId) {
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

exports.getMockLobangDetailsByLobangId = function (lobangId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let mockGetLobangDetailsResponse = require("~/08 Mock Data/mock_lobangs.json");
      let lobang = mockGetLobangDetailsResponse.lobangs.find((lobang) => lobang.lobang_id === lobangId);
      resolve(lobang);
    }, 0);
    // no reject for this fx in mock
  });
}

exports.getMockLobangAnnouncementsByLobangId = function (lobangId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let mockGetLobangAnnouncementsResponse = require("~/08 Mock Data/mock_get_joined_lobangs.json");
      let lobang = mockGetLobangAnnouncementsResponse.lobangs.find((lobang) => lobang.lobang_id == lobangId);
      let announcements = [];
      lobang.announcements.forEach((announcement) => {
        announcements.push(new Announcement(announcement));
      });
      resolve(announcements);
    }, 0);
    // no reject for this fx in mock
  });
}

exports.getMockLobangProductsByLobangId = function (lobangId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let mockGetLobangProductsResponse = require("~/08 Mock Data/mock_get_joined_lobangs.json");
      let lobang = mockGetLobangProductsResponse.lobangs.find((lobang) => lobang.lobang_id == lobangId);
      let products = [];
      lobang.products.forEach((product) => {
        products.push(new Product(product));
      });
      resolve(products);
    }, 0);
    // no reject for this fx in mock
  });
}