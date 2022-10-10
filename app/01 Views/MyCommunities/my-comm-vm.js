const { ObservableArray } = require("@nativescript/core");
const { getMyCommunities } = require("~/07 Services/communities-mock-service");
const { getCommunitiesByUserId } = require("~/07 Services/communities-service");
var observableModule = require("@nativescript/core/data/observable");

function MyCommsViewModel() {
  
  var myCommsViewModel = observableModule.fromObject({
    communities: undefined,
    user: undefined,
  });

    myCommsViewModel.load = function (userId) {
      console.log("User Id is " + userId);
      getCommunitiesByUserId(userId).then((res) => {
        myCommsViewModel.set("communities", res);
      });
    };

//   myCommsViewModel.load = function () {
//     const arr = getMyCommunities();
//     myCommsViewModel.set("communities", arr);
//   };

  myCommsViewModel.empty = function () {
    while (myCommsViewModel.length) {
      myCommsViewModel.pop();
    }
  };

  return myCommsViewModel;
}

module.exports = MyCommsViewModel;
