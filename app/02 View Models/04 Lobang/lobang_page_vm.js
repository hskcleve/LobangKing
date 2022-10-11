const observableModule = require("@nativescript/core/data/observable");
const {
    getMockLobangDetailsByLobangId,
    getMockLobangAnnouncementsByLobangId,
    getMockLobangProductsByLobangId,
  } = require("~/07 Services/mock_service");

const {
    getLobangDetailsByLobangId,
    getLobangAnnouncementsByLobangId,
    getLobangProductsByLobangId,
    submitOrder,
    viewOrderSummary,
    messageHost,
    leaveLobangRating
  } = require("~/07 Services/firestore_service");

function LobangPageViewModel() {
    var lobangPageViewModel = observableModule.fromObject({
        lobang: undefined,
        temp_lobang: undefined,
        lobang_host: undefined,
        collection_date: undefined,
        location: undefined,
        announcements: undefined,
        tab: "lobangDetails",
        products: undefined,
        order: undefined,
        rating: undefined,
    });

    lobangPageViewModel.getLobangHost = function () {
        if (!lobangPageViewModel.lobang) {
            console.log("No lobang set yet!");
            return;
        }
        else if (process.env.USE_MOCK == "true") {
            getMockLobangDetailsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (lobang) => {
            lobangPageViewModel.set("lobang_host", lobang.lobang_host);
                }
            );
        }
        else {
            getLobangDetailsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (lobang) => {
            lobangPageViewModel.set("lobang_host", lobang.lobang_host);
                }
            );
        }
    };

    lobangPageViewModel.getCollectionDatetime = function () {
        if (!lobangPageViewModel.lobang) {
            console.log("No lobang set yet!");
            return;
        }
        else if (process.env.USE_MOCK == "true") {
            getMockLobangDetailsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (lobang) => {
            lobangPageViewModel.set("collection_date", lobang.collection_date);
                }
            );
        }
        else {
            getLobangDetailsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (lobang) => {
            lobangPageViewModel.set("collection_date", lobang.collection_date);
                }
            );
        }
    };

    lobangPageViewModel.getCollectionLocation = function () {
        if (!lobangPageViewModel.lobang) {
            console.log("No lobang set yet!");
            return;
        }
        else if (process.env.USE_MOCK == "true") {
            getMockLobangDetailsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (lobang) => {
            lobangPageViewModel.set("location", lobang.location);
                }
            );
        }
        else {
            getLobangDetailsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (lobang) => {
            lobangPageViewModel.set("location", lobang.location);
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
            getMockLobangAnnouncementsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (announcements) => {
            lobangPageViewModel.set("announcements", announcements);
                }
            );
        }
        else {
            getLobangAnnouncementsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (announcements) => {
            lobangPageViewModel.set("announcements", announcements);
                }
            );
        }
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
            getLobangProductsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (products) => {
            lobangPageViewModel.set("products", products);
                }
            );
        }
    };

    return lobangPageViewModel;
}

module.exports = LobangPageViewModel;