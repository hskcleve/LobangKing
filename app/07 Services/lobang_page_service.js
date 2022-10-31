// for regular DB collections

const { Firestore } = require("@nativescript/firebase-firestore");

const Product = require("~/03 Models/Product");
const User = require("~/03 Models/User");

const firestore = new Firestore();

exports.getLobangAnnouncementsByLobangId = function (lobang_name) {
  return new Promise((resolve, reject) => {
    let getAnnouncementsResponse = [];
    const query = firestore
      .collection("lobangs")
      .where("lobang_name", "==", lobang_name);
    query
      .get()
      .then((querySnapshot) => {
        const lobang = querySnapshot.docs[0];
        firestore
          .collection("announcements")
          .where("lobang", "==", lobang.ref)
          .get()
          .then((announcements) => {
            announcements.forEach((doc) => {
              getAnnouncementsResponse.push(doc.data());
            });
            getAnnouncementsResponse.sort(
              (x, y) =>
                new Date(y.datetime).getTime() - new Date(x.datetime).getTime()
            );
            resolve(getAnnouncementsResponse);
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

exports.getLobangProductsByLobangId = function (lobang_name) {
  return new Promise((resolve, reject) => {
    let getProductsResponse = new Map();
    const query = firestore
      .collection("lobangs")
      .where("lobang_name", "==", lobang_name);
    query
      .get()
      .then((querySnapshot) => {
        const lobangProducts = querySnapshot.docs[0].data().products;
        lobangProducts.forEach((product) => {
          prod_name = product.name;
          prod_price = product.price;
          new_product = new Product({
            product_name: prod_name,
            price: prod_price,
            qty_ordered: 0,
          });
          console.log(new_product);
          getProductsResponse.set(new_product, 0);
          console.log(getProductsResponse.get(new_product));
        });
        resolve(getProductsResponse);
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

exports.getLobangHostByUserId = function (lobangModel) {
  return new Promise((resolve, reject) => {
    const query = firestore
      .collection("users")
      .where("user_id", "==", lobangModel.createdBy);
    query
      .get()
      .then((querySnapshot) => {
        const user = querySnapshot.docs[0].data();
        resolve(new User(user));
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

exports.getLobangOrdersByLobangId = function (lobang_name) {
  return new Promise((resolve, reject) => {
    let getOrdersResponse = [];
    const query = firestore
      .collection("orders")
      .where("lobang_name", "==", lobang_name);
    query
      .get()
      .then((orders) => {
        orders.forEach((order) => {
          getOrdersResponse.push(order.data());
        });
        resolve(getOrdersResponse);
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

exports.updateOrderStatus = function (orderModel) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .where("order_id", "==", orderModel.order_id)
      .get()
      .then((querySnapshot) => {
        const orderRef = querySnapshot.docs[0].ref;
        orderRef
          .update({
            status: orderModel.status,
          })
          .then(() => resolve())
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

exports.checkUserOrderInLobang = function (lobang_name, user_id) {
  return new Promise((resolve, reject) => {
    const query = firestore
      .collection("orders")
      .where("lobang_name", "==", lobang_name)
      .where("user_id", "==", user_id)
      .get()
      .then((querySnapshot) => {
        const orderData = querySnapshot.docs[0].data();
        resolve(orderData);
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

exports.getLobangRatingsByLobangId = function (lobangId) {
  return new Promise((resolve, reject) => {
    let ratings = [];
    const query = firestore
      .collection("lobangs")
      .where("lobang_id", "==", lobangId);
    query
      .get()
      .then((querySnapshot) => {
        const docId = querySnapshot.docs[0].id;
        ratings = firestore.collection("lobangs").doc(docId).data().ratings;
        resolve(ratings);
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

exports.doSubmitOrder = function (orderModel, order_line_items) {
  return new Promise((resolve, reject) => {
    // line_item_arr = [];
    // order_line_items.forEach((item) => {
    //     console.log(item.get('product_name'));
    //     console.log(item.get('qty_ordered'));
    // });

    var newOrderRef = firestore.collection("orders").doc();
    newOrderRef
      .set({
        order_id: newOrderRef.id,
        lobang_name: orderModel.lobang_name,
        user_id: orderModel.user_id,
        line_items: [],
        status: orderModel.status,
      })
      .then(() => {
        firestore
          .collection("lobangs")
          .where("lobang_name", "==", orderModel.lobang_name)
          .get()
          .then((querySnapshot) => {
            const lobangData = querySnapshot.docs[0].data();
            lobangData.joined.push(orderModel.user_id);
          })
          .catch((firebaseError) => {
            console.log(firebaseError);
            reject(firebaseError);
          });
      });
    const temp = [];
    order_line_items.forEach((line) => {
      console.log(line.get("product_name"));
      console.log(line.get("qty_ordered"));
      console.log(firestore.FieldValue);
      temp.push({
        product_name: line.get("product_name"),
        qty_ordered: line.get("qty_ordered"),
      });
    });
    newOrderRef.update({
      line_items: temp,
    });
    newOrderRef
      .get()
      .then((doc) => {
        console.log("wow");
        resolve(doc.data());
      })
      .catch((firebaseError) => {
        console.log(firebaseError);
        reject(firebaseError);
      });
  });
};

exports.leaveRating = function (ratingModel) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("lobangs")
      .where("lobang_id", "==", lobangId)
      .get()
      .then((querySnapshot) => {
        const docId = querySnapshot.docs[0].id;
        firestore
          .collection("lobangs")
          .doc(docId)
          .data()
          .ratings.add({
            rating_id: ratingModel.rating_id,
            rate: ratingModel.rate,
            user_id: ratingModel.user_id,
          })
          .then((documentRef) => {
            resolve();
          })
          .catch((firebaseError) => {
            console.log(firebaseError);
            reject(firebaseError);
          });
      });
  });
};

exports.calculateRating = function (lobangId) {
  return new Promise((resolve, reject) => {
    const rate_sum = 0;
    const count = 0;
    var rating;
    firestore
      .collection("lobangs")
      .where("lobang_id", "==", lobangId)
      .get()
      .then((querySnapshot) => {
        const docId = querySnapshot.docs[0].id;
        firestore
          .collection("lobangs")
          .doc(docId)
          .data()
          .ratings.get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              rate_sum += doc.rate;
              count++;
            });
            rating = rate_sum / count;
            resolve(rating);
          })
          .catch((firebaseError) => {
            console.log(firebaseError);
            reject(firebaseError);
          });
      });
  });
};

exports.createNewAnnouncement = function (announcementModel) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("lobangs")
      .where("lobang_name", "==", announcementModel.lobang.lobang_name)
      .get()
      .then((querySnapshot) => {
        const lobangRef = querySnapshot.docs[0].id;
        const lobangData = querySnapshot.docs[0].data();
        var newAnnouncementRef = firestore.collection("announcements").doc();
        newAnnouncementRef
          .set({
            announcement_id: newAnnouncementRef.id,
            user_id: announcementModel.user_id,
            description: announcementModel.description,
            picture: announcementModel.picture,
            datetime: new Date().toJSON().substring(0, 19),
            lobang: firestore.doc("/lobangs/" + lobangRef),
            lobang_name: lobangData.lobang_name,
          })
          .then(() => {
            newAnnouncementRef.get().then((doc) => {
              console.log(doc.data());
              resolve(doc.data());
            });
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

exports.updateAnnouncement = function (announcementModel) {
  console.log(announcementModel);
  return new Promise((resolve, reject) => {
    firestore
      .collection("announcements")
      .where("announcement_id", "==", announcementModel.announcement_id)
      .get()
      .then((querySnapshot) => {
        const announcementRef = querySnapshot.docs[0].ref;
        announcementRef
          .update({
            description: announcementModel.description,
            picture: announcementModel.picture,
          })
          .then(() => resolve())
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

exports.deleteAnnouncement = function (announcementModel) {
  console.log(announcementModel);
  return new Promise((resolve, reject) => {
    firestore
      .collection("announcements")
      .where("announcement_id", "==", announcementModel.announcement_id)
      .get()
      .then((querySnapshot) => {
        const announcementRef = querySnapshot.docs[0].ref;
        announcementRef
          .delete()
          .then(() => resolve())
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

// editOrder // incomplete
// deleteOrder // incomplete

// messageHost // incomplete
