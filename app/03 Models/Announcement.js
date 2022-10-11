const observableModule = require("@nativescript/core/data/observable");

function Announcement(info) {
  info = info || {
    announcement_id: undefined,
    datetime: undefined,
    description: undefined,
    picture: undefined,
  };

  var AnnouncementModel = observableModule.fromObject({
    announcement_id: info.announcement_id,
    datetime: info.datetime,
    description: info.description,
    picture: info.picture,
  });

  return AnnouncementModel;
}

module.exports = Announcement;