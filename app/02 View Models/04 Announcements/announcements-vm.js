const observableModule = require("@nativescript/core/data/observable");
const { getAnnouncements } = require("~/07 Services/feed_service");

const displayDate = function (dt) {
  if (!dt) return "";
  dt = new Date(dt);
  return `${dt.getDate()} ${dt
    .toLocaleString("default", { month: "long" })
    .substring(4, 7)} ${dt.getYear() + 1900}`;
};

function AnnouncementsViewModel() {
  var announcementsViewModel = observableModule.fromObject({
    user: undefined,
    announcements: undefined,
    displayDate,
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
            announcementsResponse.map((x) => {
              x.datetime = displayDate(x.datetime);
            });
            announcementsViewModel.set("announcements", announcementsResponse);
          }
        }
      );
    }
  };

  return announcementsViewModel;
}

module.exports = AnnouncementsViewModel;
