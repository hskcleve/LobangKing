const observableModule = require("@nativescript/core/data/observable");
const Lobang = require("~/03 Models/Lobang");
const errorMsgs = require("~/00 Constants/error_messages.json");
const { createNewLobang } = require("~/07 Services/host_lobang_service");

const displayDate = function (date) {
    if (!date) {
        return "";
    }
    date = new Date(date);
    return (
        date.getDate() +
        " " +
        date.toLocaleString().split(" ")[1] +
        " " +
        (date.getYear() + 1900)
    );
};

function HostLobangPageViewModel() {
    var hostLobangPageViewModel = observableModule.fromObject({
        user: undefined,
        temp_lobang: new Lobang(),
        categories: require("~/00 Constants/host_lobang_constants").categories,
        locations: require("~/00 Constants/towns_constants").town_names,
        status: "categorySelect",
        displayDate,
        mockProducts: [
            {
                isAddButton: true,
            },
        ],
    });

    hostLobangPageViewModel.addOrRemoveCategory = (category) => {
        const currCategories = hostLobangPageViewModel.temp_lobang.categories;
        if (currCategories.includes(category)) {
            currCategories.splice(currCategories.indexOf(category), 1);
            return;
        }
        if (currCategories.length == 3) {
            return;
        }
        currCategories.push(category);
    };

    hostLobangPageViewModel.containsCurrentCategory = (category) => {
        const currCategories = hostLobangPageViewModel.temp_lobang.categories;
        if (currCategories.includes(category)) {
            return true;
        }
        return false;
    };

    hostLobangPageViewModel.forwardStatus = () => {
        if (hostLobangPageViewModel.status == "categorySelect") {
            hostLobangPageViewModel.status = "detailsInput";
            return;
        }
        hostLobangPageViewModel.status = "completed";
    };

    hostLobangPageViewModel.reverseStatus = () => {
        hostLobangPageViewModel.status = "categorySelect";
    };

    hostLobangPageViewModel.validateLobang = () => {
        const lb = hostLobangPageViewModel.temp_lobang;
        return new Promise((resolve, reject) => {
            if (!lb.lobang_name || lb.lobang_name.trim().length < 5) {
                reject(errorMsgs.LOBANG_NAME_MIN_LENGTH_ERROR);
            } else if (!lb.min_order) {
                reject(errorMsgs.LOBANG_MIN_ORDER_INVALID_ERROR);
            } else if (!lb.description || lb.description.trim().length < 10) {
                reject(errorMsgs.LOBANG_DESCRIPTION_MIN_LENGTH_ERROR);
            } else if (!lb.location) {
                reject(errorMsgs.LOBANG_LOCATION_NOT_SET_ERROR);
            } else if (!lb.collection_date || !lb.last_order_date) {
                reject(errorMsgs.LOBANG_DATE_NOT_SET_ERROR);
            } else if (lb.products.length == 0) {
                reject("A lobang must have at least one product!");
            } else {
                resolve();
            }
        });
    };

    hostLobangPageViewModel.doCreateLobang = () => {
        hostLobangPageViewModel.temp_lobang.createdBy =
            hostLobangPageViewModel.user.user_id;
        return new Promise((resolve, reject) => {
            createNewLobang(hostLobangPageViewModel.temp_lobang)
                .then(() => resolve())
                .catch((firebaseError) => reject(firebaseError));
        });
    };

    return hostLobangPageViewModel;
}

module.exports = HostLobangPageViewModel;