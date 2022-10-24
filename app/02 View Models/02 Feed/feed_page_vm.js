const observableModule = require("@nativescript/core/data/observable");
const { getFeedPosts } = require("~/07 Services/feed_service");

function FeedPageViewModel() {
  var feedPageViewModel = observableModule.fromObject({
    user: undefined,
    posts: undefined,
  });

  feedPageViewModel.load = function () {
    if (process.env.USE_MOCK == "true") {
      console.log("Mock Feed");
    } else {
      getFeedPosts(feedPageViewModel.user.user_id).then((feedPostResult) => {
        console.log("Client side feed: ")
        console.log(feedPostResult);
        feedPageViewModel.set("posts", feedPostResult);
      });
    }
  };

  feedPageViewModel.empty = function() {
    while (feedPageViewModel.length) {
      feedPageViewModel.pop();
    }
  }
  return feedPageViewModel;
}

module.exports = FeedPageViewModel;
