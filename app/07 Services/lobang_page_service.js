// for regular DB collections

const { Firestore } = require("@nativescript/firebase-firestore");

const Announcement = require("~/03 Models/Announcement");

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
                console.log(lobang);
                firestore
                    .collection("announcements")
                    .where("lobang", "==", lobang.ref)
                    .get()
                    .then((announcements) => {
                        announcements.forEach((doc) => {
                            getAnnouncementsResponse.push(doc.data());
                        })
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

exports.getLobangProductsByLobangId = function (lobangId) {
    return new Promise((resolve, reject) => {
        let products = [];
        const query = firestore
            .collection("lobangs")
            .where("lobang_id", "==", lobangId);
        query
            .get()
            .then((querySnapshot) => {
                const docId = querySnapshot.docs[0].id;
                products = firestore
                    .collection("lobangs")
                    .doc(docId)
                    .data()
                    .products;
                resolve(products);
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
                resolve(user);
            })
            .catch((firebaseError) => {
                console.log(firebaseError);
                reject(firebaseError);
            });
    });
};

exports.getLobangOrdersByLobangId = function (lobangId) {
    return new Promise((resolve, reject) => {
        let orders = [];
        const query = firestore
            .collection("lobangs")
            .where("lobang_id", "==", lobangId);
        query
            .get()
            .then((querySnapshot) => {
                const docId = querySnapshot.docs[0].id;
                orders = firestore
                    .collection("lobangs")
                    .doc(docId)
                    .data()
                    .orders;
                resolve(orders);
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
                ratings = firestore
                    .collection("lobangs")
                    .doc(docId)
                    .data()
                    .ratings;
                resolve(ratings);
            })
            .catch((firebaseError) => {
                console.log(firebaseError);
                reject(firebaseError);
            });
    });
};

exports.submitOrder = function (lobangId, orderModel) {
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
                    .orders
                    .add({
                        order_id: orderModel.order_id,
                        user_id: orderModel.user_id,
                        line_items_qty: orderModel.line_items_qty,
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

exports.viewOrder = function (lobangId, userId) { // incomplete
    return new Promise((resolve, reject) => {
        let orders = [];
        const query = firestore
            .collection("lobangs")
            .where("lobang_id", "==", lobangId);
        query
            .get()
            .then((querySnapshot) => {
                const docId = querySnapshot.docs[0].id;
                firestore
                    .collection("lobangs")
                    .doc(docId)
                    .data()
                    .orders


            });
    });
};

exports.viewOrderSummary = function () { // incomplete

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
                    .ratings
                    .add({
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
                    .ratings
                    .get()
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

// exports.editAnnouncement = function(lobangModel, announcementModel) { // incomplete
//     return new Promise((resolve, reject) => {
//         firestore
//           .collection("lobangs")
//           .where("lobang_id", "==", lobangModel.lobang_id)
//           .get()
//           .then((querySnapshot) => {
//             const docId = querySnapshot.docs[0].id;
//             firestore
//               .collection("lobangs")
//               .doc(docId)
//               .announcements
//               .update({
//                 user_id: userModel.user_id,
//                 password: userModel.password,
//                 first_name: userModel.first_name,
//                 last_name: userModel.last_name,
//                 location: userModel.location,
//                 profile_pic_uri: userModel.profile_pic_uri,
//                 email: userModel.email,
//                 mobile: userModel.mobile,
//               })
//               .then(() => {
//                 resolve();
//               })
//               .catch((firebaseError) => {
//                 console.log(firebaseError);
//                 reject(firebaseError);
//               });
//           });
//       });
// };

exports.createNewAnnouncement = function (announcementModel) {
    return new Promise((resolve, reject) => {
        firestore
            .collection("lobangs")
            .where("lobang_name", "==", announcementModel.lobang.lobang_name)
            .get()
            .then((querySnapshot) => {
                const lobangRef = querySnapshot.docs[0].id;
                const lobangData = querySnapshot.docs[0].data();
                console.log(lobangRef);
                console.log(lobangData.lobang_name);
                firestore
                    .collection("announcements")
                    .add({
                        description: announcementModel.description,
                        picture: announcementModel.picture,
                        lobang: firestore.doc('/lobangs/' + lobangRef),
                        lobang_name: lobangData.lobang_name,
                    })
                    .then(() => resolve())
                    .catch((firebaseError) => {
                        console.log(firebaseError);
                        reject(firebaseError);
                    });
            });
    });
}

// //deleteAnnouncement // incomplete

// editOrder // incomplete
// deleteOrder // incomplete

// messageHost // incomplete



