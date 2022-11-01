const { ObservableArray } = require("@nativescript/core");
const { getCommunityPosts } = require("~/07 Services/communities-mock-service");
var observableModule = require("@nativescript/core/data/observable");
const {
  getPostsByCommunityId,
  checkUserInCommunity,
  joinCommunity,
  getCommunityMembers,
  getCommunitiesByUserId,
} = require("~/07 Services/communities-service");

const displayPostedTime = function (datetimePosted) {
  return datetimePosted.toDate();
};

function CommunityPageViewModel() {
  var communityPageViewModel = observableModule.fromObject({
    posts: undefined,
    communityName: undefined,
    user: undefined,
    userIsMember: false,
    members: undefined,
    image: undefined,
    displayPostedTime,
  });

  communityPageViewModel.load = function (communityName) {
    console.log("Community Name is " + communityName);

    if (process.env.USE_MOCK == "true") {
      const arr = getCommunityPosts(communityName);
      communityPageViewModel.set("posts", arr);
    } else {
      getPostsByCommunityId(communityName).then((res) => {
        communityPageViewModel.set("posts", res);
      });
      // check if user is member in community
      checkUserInCommunity(
        communityPageViewModel.communityName,
        communityPageViewModel.user.user_id
      ).then((isMember) => {
        communityPageViewModel.set("userIsMember", isMember);
      });
      // get community members
      getCommunityMembers(communityPageViewModel.communityName).then(
        (members) => {
          communityPageViewModel.set("members", members);
        }
      );
    }
  };

  communityPageViewModel.empty = function () {
    while (communityPageViewModel.length) {
      communityPageViewModel.pop();
    }
  };

  communityPageViewModel.doJoinCommunity = function (_callback) {
    communityPageViewModel.members.push(communityPageViewModel.user.user_id);
    joinCommunity(
      communityPageViewModel.communityName,
      communityPageViewModel.members,
      communityPageViewModel.user.user_id
    )
      .then((resolved) => {
        alert("Successfully joined community");
        _callback();
      })
      .catch((firebaseError) => {
        alert(firebaseError);
      });
  };

  communityPageViewModel.setImageFromPost = function () {
    getCommunitiesByUserId(communityPageViewModel.user.user_id).then(
      (communities) => {
        const currentCommunity = communities.filter(
          (comm) => comm.community_id == communityPageViewModel.communityName
        );
        communityPageViewModel.set("image", currentCommunity[0].image);
      }
    );
  };

  return communityPageViewModel;
}

module.exports = CommunityPageViewModel;
