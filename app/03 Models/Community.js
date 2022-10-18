const observableModule = require("@nativescript/core/data/observable");

function Community(info) {
    info = info || {
        community_id: undefined,
        name: undefined,
        members: undefined,
        image: undefined,
        posts: undefined,
    };

    var communityModel = observableModule.fromObject({
        community_id: info.community_id,
        name: info.name,
        members: info.members,
        image: info.image,
        posts: info.posts,
    })

    communityModel.getBackgroundImageCss = function () {
        return (
          "background-image: " +
          communityModel.image +
          "; opacity: 0.40; border-radius:10%; background-repeat: no-repeat;background-size: cover;background-position: center;"
        );
      };

    return communityModel;
}

module.exports = Community;