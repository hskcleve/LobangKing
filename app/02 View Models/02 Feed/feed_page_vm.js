const observableModule = require("@nativescript/core/data/observable");

function FeedPageViewModel() {
  var feedPageViewModel = observableModule.fromObject({
    user: undefined,
  });

  return feedPageViewModel;
}

module.exports = FeedPageViewModel;
