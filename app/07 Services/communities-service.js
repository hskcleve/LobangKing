// for getting user's joined communities
// and getting posts in the community

const { firebase } = require("@nativescript/firebase-core");
const { Firestore, FieldValue } = require("@nativescript/firebase-firestore");

const firestore = new Firestore();
const Community = require("~/03 Models/Community");
const Post = require("~/03 Models/Post");

exports.getCommunitiesByUserId = function (userId) {
  return new Promise((resolve, reject) => {
    let getCommunitiesResponse = [];
    firestore
      .collection("communities")
      .where("members", "array-contains", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const communitiesJoined = doc.data();
          getCommunitiesResponse.push(communitiesJoined);
        });
        resolve(getCommunitiesResponse);
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

// check in communities whether members field has userId
exports.checkUserInCommunity = function (communityId, userId) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("communities")
      .where("community_id", "==", communityId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const joinedMembers = doc.data().members;
          resolve(joinedMembers.includes(userId));
        });
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

exports.getCommunityMembers = function (communityId) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("communities")
      .where("community_id", "==", communityId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const joinedMembers = doc.data().members;
          resolve(joinedMembers);
        });
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

// adds userId into members field of community and add communityId into communities_joined field of user.
exports.joinCommunity = function (communityId, communityMembers, userId) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("communities")
      .where("community_id", "==", communityId)
      .get()
      .then((querySnapshot) => {
        const docId = querySnapshot.docs[0].id;
        console.log(docId);
        firestore
          .collection("communities")
          .doc(docId)
          .update({
            members: FieldValue.arrayUnion([userId]),
          });
        firestore
          .collection("users")
          .where("user_id", "==", userId)
          .get()
          .then((querySnapshot) => {
            const userDocId = querySnapshot.docs[0].id;
            firestore
              .collection("users")
              .doc(userDocId)
              .update({
                communities_joined: FieldValue.arrayUnion([communityId]),
              });
          })
          .then(() => {
            resolve();
          })
          .catch((firebaseError) => {
            console.log(firebaseError);
            reject(firebaseError);
          });
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};
