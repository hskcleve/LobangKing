// for auth service

const { Firestore } = require("@nativescript/firebase-firestore");

const firestore = new Firestore();
const error_messages = require("~/00 Constants/error_messages.json");
const User = require("~/03 Models/User");

exports.doUserRegister = function (userModel) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .add({
        user_id: userModel.user_id,
        password: userModel.password,
        first_name: userModel.first_name,
        last_name: userModel.last_name,
        location: userModel.location,
        profile_pic_uri:
          "https://cdn-icons-png.flaticon.com/512/847/847969.png",
        email: userModel.email,
        mobile: userModel.mobile,
        verified: false,
        coins: 0,
        rating: 0,
        disabled: "false",
        communities_joined: [],
        lobangs_joined: [],
        reviews: [],
        date_joined: new Date().toJSON().substring(0, 19),
      })
      .then((documentRef) => {
        resolve();
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

exports.doUserLogin = function (userId, password) {
  return new Promise((resolve, reject) => {
    if (userId.length == 0 || password.length == 0) {
      reject(error_messages.EMPTY_FIELD_ERROR);
    }
    const users = firestore.collection("users");
    const query = users
      .where("user_id", "==", userId)
      .where("password", "==", password);
    query
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          console.log(querySnapshot.docs[0].data().password);
          resolve(new User(querySnapshot.docs[0].data()));
        } else {
          reject(error_messages.INVALID_CREDENTIALS_ERROR);
        }
      })
      .catch((firebaseError) => console.log(firebaseError));
  });
};

exports.doUserUpdate = function (userModel) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .where("user_id", "==", userModel.user_id)
      .get()
      .then((querySnapshot) => {
        const docId = querySnapshot.docs[0].id;
        firestore
          .collection("users")
          .doc(docId)
          .update({
            user_id: userModel.user_id,
            password: userModel.password,
            first_name: userModel.first_name,
            last_name: userModel.last_name,
            location: userModel.location,
            profile_pic_uri: userModel.profile_pic_uri,
            email: userModel.email,
            mobile: userModel.mobile,
          })
          .then(() => {
            resolve();
          })
          .catch((firebaseError) => {
            console.log(firebaseError);
            reject(firebaseError);
          });
      });
  });
};
