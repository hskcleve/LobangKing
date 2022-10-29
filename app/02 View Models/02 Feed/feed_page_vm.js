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
        console.log(feedPostResult.length);
        feedPageViewModel.set("posts", feedPostResult);
      });
      getAnnouncements(feedPageViewModel.user.user_id).then((res) => {
        feedPageViewModel.set("featured_announcement", res[0]);
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
