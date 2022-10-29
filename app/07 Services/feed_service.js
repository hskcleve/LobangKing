// for fetching community posts into feed

const { Firestore } = require("@nativescript/firebase-firestore");

const firestore = new Firestore();
const error_messages = require("~/00 Constants/error_messages.json");
const MyCommsViewModel = require("~/02 View Models/05 MyCommunities/my-comm-vm");
const Post = require("~/03 Models/Post");

// exports.getFeedPosts = function (userId) {
//   return new Promise((resolve, reject) => {
//     let feedPosts = [];
//     firestore
//       .collection("communities")
//       .where("members", "array-contains", userId)
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           const communityPosts = doc.data().posts;
//           feedPosts.push(...communityPosts);
//         });
//         console.log(feedPosts);
//         resolve(feedPosts);
//       })
//       .catch((firebaseError) => {
//         console.log(firebaseError);
//         reject(firebaseError);
//       });
//   });
// };

exports.getFeedPosts = function (userId) {
  return new Promise((resolve, reject) => {
    let feedPosts = [];
    let promises = [];
    firestore
      .collection("communities")
      .where("members", "array-contains", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const communityId = doc.data().community_id;
          promises.push(
            firestore
              .collection("posts")
              .where("community_id", "==", communityId)
              .get()
          );
        });
        Promise.all(promises).then((snapshots) => {
          snapshots.forEach((snapshot) => {
            snapshot.forEach((doc) => {
              feedPosts.push(doc.data());
            });
          });
          // console.log(feedPosts);
          resolve(feedPosts);
        });
      });
  });
};

exports.getAnnouncements = function (userId) {
  return new Promise((resolve, reject) => {
    let announcementsResponse = [];
    let promiseArray = [];
    firestore
      .collection("lobangs")
      .where("joined", "array-contains", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.ref);
          const lobangPromise = firestore
            .collection("announcements")
            .where("lobang", "==", doc.ref)
            .get();
          promiseArray.push(lobangPromise);
        });
        Promise.all(promiseArray)
          .then((snapshots) => {
            snapshots.forEach((snapshot) => {
              snapshot.forEach((doc) => {
                announcementsResponse.push(doc.data());
              });
            });
            resolve(announcementsResponse);
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
