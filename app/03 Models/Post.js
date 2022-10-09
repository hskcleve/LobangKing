const observableModule = require("@nativescript/core/data/observable");

function Post(details) {
  details = details || {
    post_id: undefined,
    user_id: undefined,
    body: undefined,
    image: undefined,
    time_posted: undefined,
  };

var postModel = observableModule.fromObject({
    post_id: details.post_id,
    user_id: details.user_id,
    community_id: details.community_id,
    body: details.body,
    image: details.image,
    time_posted: details.time_posted,
});

return postModel;
}

module.exports = Post;

