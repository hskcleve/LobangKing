const observableModule = require("@nativescript/core/data/observable");
const frameModule = require("@nativescript/core/ui/frame");
const {
  getHostedGroupBuysByUserId,
  getJoinedGroupBuysByUserId,
} = require("~/07 Services/mock_service");
const coins_explanation = require("~/00 Constants/explanation_messages.json");
const possible_locations = require("~/00 Constants/towns_constants").town_names;

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
    temp_user: undefined,
    hostedLobangs: undefined,
    joinedLobangs: undefined,
    tab: "lobangs",
    displayDateJoined,
    getVerifiedIcon,
    coinText: coins_explanation.profile_coins_explanation,
    location_provider: possible_locations,
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

  profilePageViewModel.doUserInfoUpdate = function () {
    profilePageViewModel.user = profilePageViewModel.temp_user;
    alert("UI updated. Will update user through service.");
  };

  return profilePageViewModel;
}

module.exports = ProfilePageViewModel;
