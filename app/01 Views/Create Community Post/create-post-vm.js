const observableModule = require("@nativescript/core/data/observable");
const Post = require("~/03 Models/Post");
const { doCreatePost } = require("~/07 Services/create_post-service");
const frameModule = require("@nativescript/core/ui/frame");

function CreatePostViewModel() {
  var createPostViewModel = observableModule.fromObject({
    user: undefined,
    communityName: undefined,
    community_image: undefined,
    post: new Post(),
  });

  createPostViewModel.createPost = function (args) {
    let btn = args.object;
    const postBody = btn.page.getViewById("post-body").text;
    const postImage = btn.page.getViewById("post-image").text;

    createPostViewModel.post.body = postBody;
    createPostViewModel.post.user_id = createPostViewModel.user.user_id;
    createPostViewModel.post.community_id = createPostViewModel.communityName;
    createPostViewModel.post.image = postImage;

    doCreatePost(createPostViewModel.post)
      .then(() => {
        alert("Post created successfully");
        frameModule.Frame.topmost().goBack();
      })
      .catch((error) => {
        alert(error);
      });
  };


  return createPostViewModel;
}

module.exports = CreatePostViewModel;
