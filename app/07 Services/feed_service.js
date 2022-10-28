// for fetching community posts into feed

const { Firestore } = require("@nativescript/firebase-firestore");

const firestore = new Firestore();
const error_messages = require("~/00 Constants/error_messages.json");
const MyCommsViewModel = require("~/01 Views/MyCommunities/my-comm-vm");
const Post = require("~/03 Models/Post");

exports.getFeedPosts = function (userId) {
  return new Promise((resolve, reject) => {
    let feedPosts = [];
    firestore
      .collection("communities")
      .where("members", "array-contains", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const communityPosts = doc.data().posts;
          feedPosts.push(...communityPosts);
        });
        resolve(feedPosts);
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
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
