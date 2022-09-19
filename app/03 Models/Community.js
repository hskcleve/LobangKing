const observableModule = require("@nativescript/core/data/observable");

function Community(details) {
  details = details || {
    community_id: undefined,
    name: undefined,
    num_members: undefined,
    image: undefined,
    posts: undefined,
  };

var communityModel = observableModule.fromObject({
    community_id: details.community_id,
    name: details.name,
    num_members: details.num_members,
    image: details.image,
    posts: details.posts,
});

return communityModel;
}

module.exports = Community;