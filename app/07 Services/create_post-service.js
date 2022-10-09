// for create post service

const { Firestore } = require("@nativescript/firebase-firestore");

const firestore = new Firestore();
const error_messages = require("~/00 Constants/error_messages.json");
const Post = require("~/03 Models/Post");

exports.doCreatePost = function (postModel) {
    return new Promise((resolve, reject) => {
        firestore
        .collection("posts")
        .add({
            post_id: postModel.post_id,
            user_id: postModel.user_id,
            community_id: postModel.community_id,
            body: postModel.body,
            image: postModel.image,
            time_posted: new Date().toJSON().substring(0,19),
        })
        .then((documentRef) => {
            resolve();
        })
        .catch((firebaseError) => {
            console.log(firebaseError);
            reject(firebaseError);
          });
    });
}