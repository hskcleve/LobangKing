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
      let results = [];
      getAnnouncements(announcementsViewModel.user.user_id).then(
        (announcementsResponse) => {
          for (const a of announcementsResponse) {
            a.then((res) => {
              results.push(res.data());
              console.log(announcementsViewModel.announcements);
              announcementsViewModel.set("announcements", results);
            });
          }
        }
      );
    }
  };

  return announcementsViewModel;
}

module.exports = AnnouncementsViewModel;
