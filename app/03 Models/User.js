const observableModule = require("@nativescript/core/data/observable");

function User(info) {
  info = info || {
    user_id: "",
    password: "",
    first_name: "",
    last_name: "",
    location: "",
    profile_pic_uri: "",
    email: "",
    mobile: "",
    verified: "",
    coins: "",
    rating: "",
    disabled: "",
    communities_joined: "",
    lobangs_joined: "",
    reviews: "",
    date_joined: "",
  };

  var userModel = observableModule.fromObject({
    user_id: info.user_id,
    password: info.password,
    first_name: info.first_name,
    last_name: info.last_name,
    location: info.location,
    profile_pic_uri: info.profile_pic_uri,
    email: info.email,
    mobile: info.mobile,
    verified: info.verified,
    coins: info.coins,
    rating: info.rating,
    disabled: info.disabled,
    communities_joined: info.communities_joined,
    lobangs_joined: info.lobangs_joined,
    reviews: info.reviews,
    date_joined: info.date_joined,
  });

  userModel.getVerifiedStatusString = function () {
    if (userModel.verified) {
      return "Verified Account";
    } else return "Unverified";
  };

  userModel.getRating = function () {
    console.log("wassup");
    return String(userModel.rating).substring(0, 3);
  };

  

  return userModel;
}

module.exports = User;
