// for regular DB collections

const { Firestore } = require("@nativescript/firebase-firestore");

const firestore = new Firestore();
const Lobang = require("~/03 Models/Lobang");
const Community = require("~/03 Models/Community");

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

exports.boostLobang = function (lobang_name, curr_coins, user_id, user_coins) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("lobangs")
      .where("lobang_name", "==", lobang_name)
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

exports.getGroupbuys = function () {
  return new Promise((resolve, reject) => {
    let getGroupbuysResponse = [];
    const lobangs = firestore.collection("lobangs");
    const query = lobangs;

    query
      .get()
      .then((querySnapshot) => {
        console.log("getGroupbuys server response:");
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          const lobangData = doc.data();
          getGroupbuysResponse.push(new Lobang(lobangData));
        });
        resolve(getGroupbuysResponse);
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

exports.getCommunities = function () {
  return new Promise((resolve, reject) => {
    let getCommunitiesResponse = [];
    const communities = firestore.collection("communities");
    const query = communities;

    query
      .get()
      .then((querySnapshot) => {
        console.log("getCommunities server response:");
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          const communityData = doc.data();
          getCommunitiesResponse.push(new Community(communityData));
        });
        resolve(getCommunitiesResponse);
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

exports.getGroupbuysByLocation = function (locationFilter) {
  return new Promise((resolve, reject) => {
    let getGroupbuysByLocationResponse = [];
    const lobangs = firestore.collection("lobangs");
    const query =
      locationFilter == null
        ? lobangs
        : lobangs.where("location", "==", locationFilter);

    query
      .get()
      .then((querySnapshot) => {
        console.log("getGroupbuysByLocation server response:");
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          const lobangData = doc.data();
          getGroupbuysByLocationResponse.push(new Lobang(lobangData));
        });
        resolve(getGroupbuysByLocationResponse);
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

exports.getFilteredGroupbuys = function (locationFilter, categoryFilter) {
  console.log("In firestore_service");
  return new Promise((resolve, reject) => {
    let getFilteredGroupbuysResponse = [];
    const lobangs = firestore.collection("lobangs");
    const query = lobangs
      .where("location", "==", locationFilter)
      .where("category", "==", categoryFilter);

    query
      .get()
      .then((querySnapshot) => {
        console.log("getFilteredGroupbuys server response:");
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          const lobangData = doc.data();
          getFilteredGroupbuysResponse.push(new Lobang(lobangData));
        });
        resolve(getFilteredGroupbuysResponse);
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};
