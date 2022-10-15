const observableModule = require("@nativescript/core/data/observable");
const Post = require("~/03 Models/Post");
const { doCreatePost } = require("~/07 Services/create_post-service");
var imagepicker = require("@nativescript/imagepicker");
const imageSourceModule = require("@nativescript/core/image-source");
const fileSystemModule = require("@nativescript/core/file-system");

function CreatePostViewModel() {
  var createPostViewModel = observableModule.fromObject({
    user: undefined,
    communityName: undefined,
    post: new Post(),
  });

  createPostViewModel.createPost = function (args) {
    let btn = args.object;
    const postBody = btn.page.getViewById("post-body").text;

    createPostViewModel.post.body = postBody;
    createPostViewModel.post.user_id = createPostViewModel.user.user_id;
    createPostViewModel.post.community_id = createPostViewModel.communityName;

    doCreatePost(createPostViewModel.post)
      .then(() => {
        alert("Post created successfully");
      })
      .catch((error) => {
        alert(error);
      });
  };

  createPostViewModel.selectImage = function (args) {
    var context = imagepicker.create({ mode: "single" });

    context
      .authorize()
      .then(() => {
        return context.present();
      })
      .then((selection) => {
        selection.forEach((selected) => {
          console.log(selected)
        });
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  return createPostViewModel;
}

module.exports = CreatePostViewModel;
