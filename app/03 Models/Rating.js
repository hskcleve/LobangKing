const observableModule = require("@nativescript/core/data/observable");

function Rating(info) {
  info = info || {
    rating_id: undefined,
    user_id: undefined,
    rate: undefined,
  };

  var ratingModel = observableModule.fromObject({
    rating_id: info.rating_id,
    user_id: info.user_id,
    rate: info.rate,
  });

  return ratingModel;
}

module.exports = Rating;