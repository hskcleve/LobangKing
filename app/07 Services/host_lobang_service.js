// service for creation of lobangs

const { Firestore } = require("@nativescript/firebase-firestore");

const firestore = new Firestore();

exports.createNewLobang = function (lobang) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("lobangs")
      .add({
        lobang_name: lobang.lobang_name,
        categories: lobang.categories,
        description: lobang.description,
        min_order: lobang.min_order,
        location: lobang.location,
        collection_date: lobang.collection_date,
        last_order_date: lobang.last_order_date,
        tags: lobang.tags,
        products: lobang.products,
        announcements: [],
        coverPicture: lobang.coverPicture || null,
        createdBy: lobang.createdBy,
        coins: 0,
        joined: [],
        lobang_status: "ACTIVE",
      })
      .then(() => resolve())
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};
