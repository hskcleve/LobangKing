const observableModule = require("@nativescript/core/data/observable");
const {
    getMockLobangDetailsByLobangId,
    getMockLobangAnnouncementsByLobangId,
    getMockLobangProductsByLobangId,
    getMockUserByUserId,
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
        collection_date: undefined,
        location: undefined,
        announcements: undefined,
        tab: "lobangDetails",
        products: undefined,
        order: undefined,
        rating: undefined,
        displayDateJoined,
        getVerifiedIcon,
    });

    lobangPageViewModel.getLobangDetails = function () {
        if (!lobangPageViewModel.lobang) {
            console.log("No lobang set yet!");
            return;
        }
        else if (process.env.USE_MOCK == "true") {
            console.log("1");
            getMockLobangDetailsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (lobang) => {
                    let host = getMockUserByUserId();
                    lobangPageViewModel.set("lobang_host", host);
                    lobangPageViewModel.set("collection_date", lobang.collection_date);
                    lobangPageViewModel.set("location", lobang.location);
                }
            );
        }
        else {
            getLobangDetailsByLobangId(lobangPageViewModel.lobang.lobang_id).then(
                (lobang) => {
                    
                    lobangPageViewModel.set("lobang_host", lobang.createdBy);
                    lobangPageViewModel.set("collection_date", lobang.collection_date);
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
                    console.log(lobangPageViewModel.get("announcements"));
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
                    console.log(lobangPageViewModel.get("products"));

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