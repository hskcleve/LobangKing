const observableModule = require("@nativescript/core/data/observable");
const Order = require("~/03 Models/Order");
const Announcement = require("~/03 Models/Announcement");

const {
    getMockLobangAnnouncementsByLobangId,
    getMockLobangProductsByLobangId,
    getMockUserByUserId,
    getMockLobangOrdersByLobangId,
    getMockLobangRatingsByLobangId,
} = require("~/07 Services/mock_service");

const {
    getLobangHostByUserId,
    getLobangAnnouncementsByLobangId,
    getLobangProductsByLobangId,
    getLobangOrdersByLobangId,
    getLobangRatingsByLobangId,
    createNewAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    updateOrderStatus,
    checkUserOrderInLobang,
    doSubmitOrder,
} = require("~/07 Services/lobang_page_service");
const { FieldValue } = require("@nativescript/firebase-firestore");

const displayDateJoined = function (dateJoined) {
    dateJoined = new Date(dateJoined);
    return (
        dateJoined.toLocaleString().split(" ")[1] +
        " '" +
        (dateJoined.getYear() - 100)
    );
};

const getVerifiedIcon = function (verifiedStatus) {
    const src = verifiedStatus
        ? "~/06 Assets/06 Profile Page Icons/verified-tick.png"
        : "~/06 Assets/06 Profile Page Icons/unverified-cross.png";
    return src;
};

function LobangPageViewModel() {
    var lobangPageViewModel = observableModule.fromObject({
        lobang: undefined,
        temp_lobang: undefined,
        user: undefined,
        temp_user: undefined,
        lobang_host: undefined,
        announcements: [],
        temp_announcement: new Announcement(),
        tab: "lobangDetails",
        products: undefined,
        temp_prodArr: [],
        prodArr: [],
        orders: undefined,
        ratings: undefined,
        hasOrder: undefined,
        userOrder: undefined,
        displayDateJoined,
        getVerifiedIcon,
    });

    lobangPageViewModel.isHost = function () {
        if (!lobangPageViewModel.lobang_host.user_id === lobangPageViewModel.user.user_id) {
            return true;
        }
        else {
            return false;
        }
    };

    lobangPageViewModel.getLobangHost = function (lobang) {
        if (!lobangPageViewModel.lobang) {
            console.log("No lobang set yet!");
            return;
        }
        else if (process.env.USE_MOCK == "true") {
            getMockUserByUserId().then(
                (host) => {
                    lobangPageViewModel.set("lobang_host", host);
                }
            );
        }
        else {
            getLobangHostByUserId(lobangPageViewModel.lobang).then(
                (lobang_host) => {
                    lobangPageViewModel.set("lobang_host", lobang_host);
                }
            );
        }
    };

    lobangPageViewModel.getAnnouncements = function () {
        if (!lobangPageViewModel.lobang) {
            console.log("No lobang set yet!");
            return;
        }
        else if (process.env.USE_MOCK == "true") {
            getMockLobangAnnouncementsByLobangId(lobangPageViewModel.lobang.lobang_name).then(
                (announcements) => {
                    lobangPageViewModel.set("announcements", announcements);
                }
            );
        }
        else {
            getLobangAnnouncementsByLobangId(lobangPageViewModel.lobang.lobang_name).then(
                (announcements) => {
                    lobangPageViewModel.set("announcements", announcements);
                }
            );
        }
    };

    lobangPageViewModel.doCreateAnnouncement = () => {
        lobangPageViewModel.temp_announcement.lobang = lobangPageViewModel.lobang;
        lobangPageViewModel.temp_announcement.user_id = lobangPageViewModel.user.user_id;
        console.log(lobangPageViewModel.user);
        return new Promise((resolve, reject) => {
            createNewAnnouncement(lobangPageViewModel.temp_announcement)
                .then((newAnnouncement) => resolve(newAnnouncement))
                .catch((firebaseError) => reject(firebaseError));
        });
    };

    lobangPageViewModel.doUpdateAnnouncement = () => {
        //lobangPageViewModel.temp_announcement.datetime = FieldValue.serverTimestamp;
        return new Promise((resolve, reject) => {
            updateAnnouncement(lobangPageViewModel.temp_announcement)
                .then(() => resolve())
                .catch((firebaseError) => reject(firebaseError));
        });
    };

    lobangPageViewModel.doDeleteAnnouncement = () => {
        return new Promise((resolve, reject) => {
            deleteAnnouncement(lobangPageViewModel.temp_announcement)
                .then(() => resolve())
                .catch((firebaseError) => reject(firebaseError));
        });
    };

    lobangPageViewModel.getProducts = function () {
        if (!lobangPageViewModel.lobang) {
            console.log("No lobang set yet!");
            return;
        }
        else if (process.env.USE_MOCK == "true") {
            getMockLobangProductsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (products) => {
                    lobangPageViewModel.set("products", products);
                }
            );
        }
        else {
            getLobangProductsByLobangId(lobangPageViewModel.lobang.lobang_name).then(
                (products) => {
                    let productsResponse = [];
                    products.forEach((value, key) => {
                        //lobangPageViewModel.prodArr.push(key);
                        productsResponse.push(key);
                        console.log(`${key} = ${value}`);
                    });
                    lobangPageViewModel.set("temp_prodArr", productsResponse);
                    lobangPageViewModel.set("products", products);
                }
            );
        }
    };

    lobangPageViewModel.submitOrder = function () {
        let order = new Order({
            lobang_name: lobangPageViewModel.lobang.lobang_name,
            user_id: lobangPageViewModel.user.user_id,
            line_items: [],
            status: "Ordered",
        });
        let temp_line_items = [];
        lobangPageViewModel.temp_prodArr.forEach((prod) => {
            if (prod.qty_ordered !== 0) {
                temp_line_items.push(new Map([ ['product_name', prod.product_name], ['qty_ordered', prod.qty_ordered]]));
            }
        });
        temp_line_items.forEach((item) => {
            console.log(item.get('product_name'));
            console.log(item.get('qty_ordered'));
        });
        doSubmitOrder(order, temp_line_items)
            .then((result) => {
                lobangPageViewModel.set("hasOrder", true);
                lobangPageViewModel.set("userOrder", result);

            });

    };

    lobangPageViewModel.getOrders = function () {
        if (!lobangPageViewModel.lobang) {
            console.log("No lobang set yet!");
            return;
        }
        else if (process.env.USE_MOCK == "true") {
            getMockLobangOrdersByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (orders) => {
                    lobangPageViewModel.set("orders", orders);
                }
            );
        }
        else {
            getLobangOrdersByLobangId(lobangPageViewModel.lobang.lobang_name).then(
                (orders) => {
                    lobangPageViewModel.set("orders", orders);
                }
            );
        }
    };

    lobangPageViewModel.doUpdateOrderStatus = function (orderModel) {
        return new Promise((resolve, reject) => {
            updateOrderStatus(orderModel)
                .then(() => resolve())
                .catch((firebaseError) => reject(firebaseError));
        });
    };

    lobangPageViewModel.userHasOrderInLobang = function () {
        console.log(lobangPageViewModel.user)
        checkUserOrderInLobang(lobangPageViewModel.lobang.lobang_name, lobangPageViewModel.user.user_id)
            .then((result) => {
                console.log(result.status);
                lobangPageViewModel.set("hasOrder", true);
                console.log(lobangPageViewModel.get("hasOrder"));
                lobangPageViewModel.set("userOrder", result);
            })
            .catch((firebaseError) => {
                lobangPageViewModel.set("hasOrder", false);
                reject(firebaseError)
            });
    };

    lobangPageViewModel.getRatings = function () {
        if (!lobangPageViewModel.lobang) {
            console.log("No lobang set yet!");
            return;
        }
        else if (process.env.USE_MOCK == "true") {
            getMockLobangRatingsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (ratings) => {
                    lobangPageViewModel.set("ratings", ratings);
                }
            );
        }
        else {
            getLobangRatingsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (ratings) => {
                    lobangPageViewModel.set("ratings", ratings);
                }
            );
        }
    };

    return lobangPageViewModel;
}

module.exports = LobangPageViewModel;