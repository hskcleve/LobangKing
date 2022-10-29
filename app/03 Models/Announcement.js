const observableModule = require("@nativescript/core/data/observable");

function Announcement(info) {
  info = info || {
    announcement_id: undefined,
    user_id: undefined, 
    lobang: undefined,
    lobang_name: undefined,
    datetime: undefined,
    description: undefined,
    picture: undefined,
  };

  var announcementModel = observableModule.fromObject({
    announcement_id: info.announcement_id,
    user_id: info.user_id,
    lobang: info.lobang,
    lobang_name: info.lobang_name,
    datetime: info.datetime,
    description: info.description,
    picture: info.picture,
  });

  return announcementModel;
}

module.exports = Announcement;