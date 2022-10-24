// for fetching community posts into feed

const { Firestore } = require("@nativescript/firebase-firestore");

const firestore = new Firestore();
const error_messages = require("~/00 Constants/error_messages.json");
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
    let getAnnouncementsResponse = [];
    firestore
      .collection("lobangs")
      .where("joined", "array-contains", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const announcements = doc.data().announcements;
          getAnnouncementsResponse.push(...announcements);
        });
        resolve(getAnnouncementsResponse);
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};
