const observableModule = require("@nativescript/core/data/observable");

function User(info) {
  info = info || {
    user_id: undefined,
    first_name: undefined,
    last_name: undefined,
    location: undefined,
    profile_pic_uri: undefined,
    email: undefined,
    mobile: undefined,
    verified: undefined,
    coins: undefined,
    rating: undefined,
    disabled: undefined,
    communities_joined: undefined,
    lobangs_joined: undefined,
    reviews: undefined,
  };

  var userModel = observableModule.fromObject({
    user_id: info.user_id,
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
  });

  return userModel;
}

module.exports = User;
