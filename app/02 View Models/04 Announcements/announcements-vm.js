const observableModule = require("@nativescript/core/data/observable");
const { getAnnouncements } = require("~/07 Services/feed_service");

const displayDateTime = function (dateJoined) {
  return dateJoined.toDate();
};

function AnnouncementsViewModel() {
  var announcementsViewModel = observableModule.fromObject({
    user: undefined,
    announcements: undefined,
    displayDateTime,
  });

  announcementsViewModel.load = function () {
    if (process.env.USE_MOCK == "true") {
      console.log("Mock Announcements");
    } else {
      getAnnouncements(announcementsViewModel.user.user_id).then(
        (announcementsResponse) => {
          // console.log("client side");
          // console.log(announcementsResponse);
          if (announcementsResponse.length > 0) {
            announcementsViewModel.set("announcements", announcementsResponse);
          }
        }
      );
    }
  };

  return announcementsViewModel;
}

module.exports = AnnouncementsViewModel;
