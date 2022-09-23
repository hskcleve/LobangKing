const observableModule = require("@nativescript/core/data/observable");
const frameModule = require("@nativescript/core/ui/frame");
const {
  getHostedGroupBuysByUserId,
  getJoinedGroupBuysByUserId,
} = require("~/07 Services/mock_service");

const displayDateJoined = function (dateJoined) {
  dateJoined = new Date(dateJoined);
  return (
    dateJoined.toLocaleString().split(" ")[1] +
    " '" +
    (dateJoined.getYear() - 100)
  );
};

const getVerifiedIcon = function (verifiedStatus) {
  const src =
    verifiedStatus === "true"
      ? "~/06 Assets/06 Profile Page Icons/verified-tick.png"
      : "~/06 Assets/06 Profile Page Icons/unverified-cross.png";
  return src;
};

function ProfilePageViewModel() {
  var profilePageViewModel = observableModule.fromObject({
    user: undefined,
    hostedLobangs: undefined,
    joinedLobangs: undefined,
    tab: "lobangs",
    displayDateJoined,
    getVerifiedIcon,
  });

  profilePageViewModel.getHostedLobangs = function () {
    if (!profilePageViewModel.user) {
      console.log("No user set yet!");
      return;
    }
    getHostedGroupBuysByUserId(profilePageViewModel.user.user_id).then(
      (lobangs) => {
        profilePageViewModel.set("hostedLobangs", lobangs);
      }
    );
  };

  profilePageViewModel.getJoinedLobangs = function () {
    if (!profilePageViewModel.user) {
      console.log("No user set yet!");
      return;
    }
    getJoinedGroupBuysByUserId(profilePageViewModel.user.user_id).then(
      (lobangs) => {
        profilePageViewModel.set("joinedLobangs", lobangs);
      }
    );
  };

  return profilePageViewModel;
}

module.exports = ProfilePageViewModel;
