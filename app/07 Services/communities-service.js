// for getting user's joined communities
// and getting posts in the community

const {
  Firestore,
  QuerySnapshot,
} = require("@nativescript/firebase-firestore");

const firestore = new Firestore();
const Community = require("~/03 Models/Community");
const Post = require("~/03 Models/Post");

exports.getCommunitiesByUserId = function (userId) {
  return new Promise((resolve, reject) => {
    let getCommunitiesResponse = [];
    firestore
      .collection("users")
      .where("user_id", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const communityIdArray = doc.data().communities_joined;
          console.log(communityIdArray);
          for (const id of communityIdArray) {
            firestore
              .collection("communities")
              .where("community_id", "==", id)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  getCommunitiesResponse.push(doc.data());
                });
                resolve(getCommunitiesResponse);
              });
          }
        });
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

exports.getPostsByCommunityId = function (communityId) {
  return new Promise((resolve, reject) => {
    let communityPostsResponse = [];
    firestore
      .collection("posts")
      .where("community_id", "==", communityId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          communityPostsResponse.push(doc.data());
        });
        resolve(communityPostsResponse);
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};
