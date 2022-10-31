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

  postModel.displayDate = () => {
    dt = new Date(postModel.time_posted);
    return `${dt.getDate()} ${dt
      .toLocaleString("default", { month: "long" })
      .substring(4, 7)} ${dt.getYear() + 1900}`;
  };

  return postModel;
}

module.exports = Post;
