const observableModule = require("@nativescript/core/data/observable");
const { getAnnouncements } = require("~/07 Services/feed_service");

function AnnouncementsViewModel() {
  var announcementsViewModel = observableModule.fromObject({
    user: undefined,
    announcements: undefined,
  });

  announcementsViewModel.load = function () {
    if (process.env.USE_MOCK == "true") {
      console.log("Mock Announcements");
    } else {
      getAnnouncements(announcementsViewModel.user.user_id).then(
        (announcementsResponse) => {
          console.log("Client side announcements");
          console.log(announcementsResponse);
          announcementsViewModel.set("announcements", announcementsResponse);
        }
      );
    }
  };

  return announcementsViewModel;
}

module.exports = AnnouncementsViewModel;
