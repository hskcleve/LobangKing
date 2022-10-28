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
    submitOrder,
    viewOrder,
    viewOrderSummary,
    messageHost,
    leaveRating,
    calculateRating,
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
        orders: undefined,
        ratings: undefined,
        displayDateJoined,
        getVerifiedIcon,
    });

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
        lobangPageViewModel.temp_announcement.lobang = lobangPageViewModel.lobang_host;
        console.log(lobangPageViewModel.temp_announcement.lobang.lobang_name);
        lobangPageViewModel.temp_announcement.datetime = FieldValue.serverTimestamp;
        return new Promise((resolve, reject) => {
            createNewAnnouncement(lobangPageViewModel.temp_announcement)
                .then(() => resolve())
                .catch((firebaseError) => reject(firebaseError));
        });
    }

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
            getLobangProductsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (products) => {
                    lobangPageViewModel.set("products", products);
                }
            );
        }
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
            getLobangOrdersByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (orders) => {
                    lobangPageViewModel.set("orders", orders);
                }
            );
        }
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

    // lobangPageViewModel.createAnnouncement = function(announcement_description) {
    //     if (!lobangPageViewModel.lobang) {
    //         console.log("No lobang set yet!");
    //         return;
    //     }
    //     else if (process.env.USE_MOCK == "true") {
            
    //     }
    //     else {
    //         var announcement = new Announcement();
    //         announcement.set("user", lobang_host);
    //         announcement.set("datetime", new Date());
    //         announcement.set("description", announcement_description);
    //         createAnnouncement(lobangPageViewModel.lobang.lobang_id, announcement).then(
    //             (announcements) => {
    //                 lobangPageViewModel.set("announcements", announcements);
    //             }
    //         );
    //     }
    // };

    return lobangPageViewModel;
}

module.exports = LobangPageViewModel;

// incomplete, update with lobang_page_services fx