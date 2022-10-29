// for create post service

const {
  Firestore,
  FieldValue,
} = require("@nativescript/firebase-firestore");

const firestore = new Firestore();
const error_messages = require("~/00 Constants/error_messages.json");
const Post = require("~/03 Models/Post");

exports.doCreatePost = function (postModel) {
  return new Promise((resolve, reject) => {
    firestore.collection("posts").add({
      post_id: postModel.post_id,
      user_id: postModel.user_id,
      community_id: postModel.community_id,
      body: postModel.body,
      image: postModel.image,
      time_posted: new Date().toJSON().substring(0, 19),
    });
    firestore
      .collection("communities")
      .where("community_id", "==", postModel.community_id)
      .get()
      .then((querySnapshot) => {
        const docId = querySnapshot.docs[0].id;
        firestore
          .collection("communities")
          .doc(docId)
          .update({
            posts: FieldValue.arrayUnion([
              {
                post_id : postModel.post_id,
                user_id: postModel.user_id,
                community_id: postModel.community_id,
                body: postModel.body,
                image: postModel.image,
                time_posted: new Date().toJSON().substring(0, 19),
              },
            ]),
          });
        resolve();
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};
