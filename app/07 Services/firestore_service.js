// for regular DB collections

const { Firestore } = require("@nativescript/firebase-firestore");

const firestore = new Firestore();
const Lobang = require("~/03 Models/Lobang");

exports.getHostedGroupBuysByUserId = function (userId) {
  return new Promise((resolve, reject) => {
    let getHostedGroupBuyResponse = [];
    const lobangs = firestore.collection("lobangs");
    const query = lobangs.where("createdBy", "==", userId);
    query
      .get()
      .then((querySnapshot) => {
        console.log("getHostedGroupBuysByUserId server response:");
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          const lobangData = doc.data();
          getHostedGroupBuyResponse.push(new Lobang(lobangData));
        });
        resolve(getHostedGroupBuyResponse);
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

exports.getJoinedGroupBuysByUserId = function (userId) {
  return new Promise((resolve, reject) => {
    let getJoinedGroupBuysByUserIdResponse = [];
    const lobangs = firestore.collection("lobangs");
    const query = lobangs.where("joined", "array-contains", userId);
    query
      .get()
      .then((querySnapshot) => {
        console.log("getJoinedGroupBuysByUserId server response:");
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          const lobangData = doc.data();
          getJoinedGroupBuysByUserIdResponse.push(new Lobang(lobangData));
        });
        resolve(getJoinedGroupBuysByUserIdResponse);
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

exports.boostLobang = function (lobang_id, curr_coins, user_id, user_coins) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("lobangs")
      .where("lobang_id", "==", lobang_id)
      .get()
      .then((querySnapshot) => {
        const docId = querySnapshot.docs[0].id;
        firestore
          .collection("lobangs")
          .doc(docId)
          .update({ coins: Number(curr_coins) + 10 })
          .then(() => {
            firestore
              .collection("users")
              .where("user_id", "==", user_id)
              .get()
              .then((querySnapshot) => {
                const userDocId = querySnapshot.docs[0].id;
                firestore
                  .collection("users")
                  .doc(userDocId)
                  .update({
                    coins: Number(user_coins) - 10,
                  })
                  .then(() => {
                    resolve();
                  })
                  .catch((firebaseError) => {
                    console.log(firebaseError);
                    reject(firebaseError);
                  });
              });
          })
          .catch((firebaseError) => {
            console.log(firebaseError);
            reject(firebaseError);
          });
      });
  });
};
