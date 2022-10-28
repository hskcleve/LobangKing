const observableModule = require("@nativescript/core/data/observable");

function Lobang(info) {
  info = info || {
    lobang_id: undefined,
    lobang_name: undefined,
    createdBy: undefined,
    categories: [],
    description: undefined,
    min_order: undefined,
    location: undefined,
    collection_date: undefined,
    last_order_date: undefined,
    tags: [],
    products: [],
    announcements: [],
    orders: [],
    ratings: [],
    coverPicture: undefined,
    coins: undefined,
    joined: [],
    lobang_status: undefined,
  };

  var lobangModel = observableModule.fromObject({
    lobang_id: info.lobang_id,
    lobang_name: info.lobang_name,
    createdBy: info.createdBy,
    categories: info.categories,
    description: info.description,
    min_order: info.min_order,
    location: info.location,
    collection_date: info.collection_date,
    last_order_date: info.last_order_date,
    tags: info.tags,
    products: info.products,
    announcements: info.announcements,
    orders: info.orders,
    ratings: info.ratings,
    coverPicture: info.coverPicture,
    coins: info.coins,
    joined: info.joined,
    lobang_status: info.lobang_status,
  });

  lobangModel.getBackgroundImageCss = function () {
    return (
      "background-image: " +
      lobangModel.coverPicture +
      "; opacity: 0.40; border-radius:10%; background-repeat: no-repeat;background-size: cover;background-position: center;"
    );
  };

  lobangModel.getTags = function () {
    let displayString = "";
    for (let i = 0; i <= 2; i++) {
      if (lobangModel.tags[i]) {
        displayString += lobangModel.tags[i] + ", ";
      }
    }
    return displayString.substring(0, displayString.length - 2);
  };

  lobangModel.getNumProducts = function() {
    var num = lobangModel.products.length;
    return num;
  };

  lobangModel.getTimeLeft = function () {
    const timeLeft =
      new Date(lobangModel.last_order_date).getTime() - new Date();
    const daysLeft = Math.round(timeLeft / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) {
      return "Expired";
    } else if (daysLeft >= 7) {
      const weeksLeft = Math.round(daysLeft / 7);
      const remainder = daysLeft % 7;
      if (daysLeft % 7 == 0) {
        return weeksLeft + " weeks left";
      }
      return weeksLeft + " weeks, " + remainder + " days left";
    }
    return daysLeft + " days left";
  };

  lobangModel.getNumUsersJoined = function() {
    var num = lobangModel.joined.length;
    return num;
  };

  lobangModel.belongsToCategory = function (category) {
    return lobangModel.categories.includes(category);
  };

  lobangModel.hasOrder = function (userId) {
    for (order of lobangModel.joined) {
      if (userId === order) {
        return true;
      }
    }
    return false;
  };

  return lobangModel;
}

module.exports = Lobang;
