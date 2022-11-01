const observableModule = require("@nativescript/core/data/observable");
const {
  getMockHostedGroupBuysByUserId,
  getMockJoinedGroupBuysByUserId,
} = require("~/07 Services/mock_service");
const explanationMsgs = require("~/00 Constants/explanation_messages.json");
const {
  getJoinedGroupBuysByUserId,
  getHostedGroupBuysByUserId,
  boostLobang,
} = require("~/07 Services/firestore_service");
const { doUserUpdate } = require("~/07 Services/auth_service");
const possible_locations = require("~/00 Constants/towns_constants").town_names;
const errorMsgs = require("~/00 Constants/error_messages");


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

function ProfilePageViewModel() {
  var profilePageViewModel = observableModule.fromObject({
    user: undefined,
    temp_user: undefined,
    hostedLobangs: undefined,
    joinedLobangs: undefined,
    lobang: undefined,
    temp_lobang: undefined,
    tab: "lobangs",
    displayDateJoined,
    getVerifiedIcon,
    coinText: explanationMsgs.profile_coins_explanation,
    location_provider: possible_locations,
  });

  profilePageViewModel.getHostedLobangs = function () {
    if (!profilePageViewModel.user) {
      console.log("No user set yet!");
      return;
    } else if (process.env.USE_MOCK == "true") {
      getMockHostedGroupBuysByUserId(profilePageViewModel.user.user_id).then(
        (lobangs) => {
          profilePageViewModel.set("hostedLobangs", lobangs);
        }
      );
    } else {
      getHostedGroupBuysByUserId(profilePageViewModel.user.user_id).then(
        (lobangs) => {
          profilePageViewModel.set("hostedLobangs", lobangs);
        }
      );
    }
  };

  profilePageViewModel.getJoinedLobangs = function () {
    if (!profilePageViewModel.user) {
      console.log("No user set yet!");
      return;
    } else if (process.env.USE_MOCK == "true") {
      getMockJoinedGroupBuysByUserId(profilePageViewModel.user.user_id).then(
        (lobangs) => {
          profilePageViewModel.set("joinedLobangs", lobangs);
        }
      );
    } else {
      getJoinedGroupBuysByUserId(profilePageViewModel.user.user_id).then(
        (lobangs) => {
          profilePageViewModel.set("joinedLobangs", lobangs);
        }
      );
    }
  };

  profilePageViewModel.doBoostListing = function (lobang, _callback) {
    if (Number(profilePageViewModel.user.coins) < 10) {
      alert(errorMsgs.INSUFFICIENT_COINS_ERROR);
      return;
    }
    boostLobang(
      lobang.lobang_name,
      lobang.coins,
      profilePageViewModel.user.user_id,
      profilePageViewModel.user.coins
    )
      .then((resolved) => {
        alert("Boost Success");
        profilePageViewModel.user.coins =
          Number(profilePageViewModel.user.coins) - 10;
        lobang.coins = Number(lobang.coins) + 10;
        _callback();
      })
      .catch((firebaseError) => alert(firebaseError));
  };

  profilePageViewModel.doUserInfoUpdate = function (_callback) {
    const a = profilePageViewModel.user;
    const b = profilePageViewModel.temp_user;
    a.password = String(b.password);
    a.first_name = String(b.first_name);
    a.last_name = String(b.last_name);
    a.location = String(b.location);
    a.profile_pic_uri = String(b.profile_pic_uri);
    a.email = String(b.email);
    a.mobile = String(b.mobile);
    doUserUpdate(profilePageViewModel.user)
      .then((resolved) => {
        alert("Successful Update");
        _callback();
      })
      .catch((firebaseError) => alert(firebaseError));
  };

  return profilePageViewModel;
}

module.exports = ProfilePageViewModel;
