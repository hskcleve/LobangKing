const observableModule = require("@nativescript/core/data/observable");

function Community(details) {
  details = details || {
    community_id: undefined,
    name: undefined,
    image: undefined,
    members: undefined,
    posts: undefined,
  };

  var communityModel = observableModule.fromObject({
    community_id: details.community_id,
    name: details.name,
    image: details.image,
    members: details.members,
    posts: details.posts,
  });

  return communityModel;
}

module.exports = Community;
