const { ObservableArray } = require("@nativescript/core");
const { getMyCommunities } = require("~/07 Services/communities-mock-service");
const { getCommunitiesByUserId } = require("~/07 Services/communities-service");
var observableModule = require("@nativescript/core/data/observable");

function MyCommsViewModel() {
  var myCommsViewModel = observableModule.fromObject({
    communities: undefined,
    user: undefined,
    sbText: "",
  });

  myCommsViewModel.load = function () {
    if (process.env.USE_MOCK == "true") {
      const arr = getMyCommunities();
      myCommsViewModel.set("communities", arr);
    } else {
      getCommunitiesByUserId(myCommsViewModel.user.user_id).then((res) => {
        // console.log("Client side communities");
        // console.log(res);
        myCommsViewModel.set("communities", res);
      });
    }
  };

  myCommsViewModel.empty = function () {
    while (myCommsViewModel.length) {
      myCommsViewModel.pop();
    }
  };

  myCommsViewModel.doSearch = function () {
    getCommunitiesByUserId(myCommsViewModel.user.user_id).then(
      (communities) => {
        const result = communities.filter((item) =>
          item.name.toLowerCase().includes(myCommsViewModel.sbText.toLowerCase())
        );
        myCommsViewModel.set("communities", result);
      }
    );
  };

  return myCommsViewModel;
}

module.exports = MyCommsViewModel;
