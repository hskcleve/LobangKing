const observableModule = require("@nativescript/core/data/observable");
const {
  getFeedPosts,
  getAnnouncements,
} = require("~/07 Services/feed_service");

function FeedPageViewModel() {
  var feedPageViewModel = observableModule.fromObject({
    user: undefined,
    posts: undefined,
    featured_announcement: undefined,
  });

  feedPageViewModel.load = function () {
    if (process.env.USE_MOCK == "true") {
      console.log("Mock Feed");
    } else {
      let announcements = [];
      getFeedPosts(feedPageViewModel.user.user_id).then((feedPostResult) => {
        // console.log("Client side feed: ");
        // console.log(feedPostResult);
        feedPageViewModel.set("posts", feedPostResult);
      });
      getAnnouncements(feedPageViewModel.user.user_id).then((res) => {
        res[0].then((result) => {
          feedPageViewModel.set("featured_announcement", result.data());
        });
      });
    }
  };

  feedPageViewModel.empty = function () {
    while (feedPageViewModel.length) {
      feedPageViewModel.pop();
    }
  };
  return feedPageViewModel;
}

module.exports = FeedPageViewModel;
