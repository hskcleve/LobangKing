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

exports.getAvailableGroupbuys = function () {
  return new Promise((resolve, reject) => {
    let getAvailableGroupbuysResponse = [];
    const lobangs = firestore.collection("lobangs");
    const query = lobangs.where("lobang_status", "==", "ACTIVE")

    query
      .get()
      .then((querySnapshot) => {
        console.log("getAvailableGroupbuys server response:");
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          const lobangData = doc.data();
          if (new Lobang(lobangData).getTimeLeft() != "Expired") {
            getAvailableGroupbuysResponse.push(new Lobang(lobangData));
          }
        });
        resolve(getAvailableGroupbuysResponse);
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

exports.getGroupbuysByCategory = function (categoryChosen) {
  console.log("In firestore_service, category is " + categoryChosen);
  return new Promise((resolve, reject) => {
    let getGroupbuysByCategoryResponse = [];
    const lobangs = firestore.collection("lobangs");
    const query = lobangs.where("category", "==", categoryChosen);

    query
      .get()
      .then((querySnapshot) => {
        console.log("getGroupbuysByCategory server response:");
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          const lobangData = doc.data();
          getGroupbuysByCategoryResponse.push(new Lobang(lobangData));
        });
        resolve(getGroupbuysByCategoryResponse);
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};
