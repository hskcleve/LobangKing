const { ObservableArray } = require("@nativescript/core");
const { getCommunityPosts } = require("~/07 Services/communities-mock-service");
var observableModule = require("@nativescript/core/data/observable");
const MyCommsViewModel = require("../MyCommunities/my-comm-vm");
const { getPostsByCommunityId } = require("~/07 Services/communities-service");

function CommunityPageViewModel(communityPosts) {

    var communityPageViewModel = observableModule.fromObject({
        posts: undefined,
        communityName: undefined,
        user: undefined,
    })

    communityPageViewModel.load = function (communityName) {
        console.log("Community Name is " + communityName);
        getPostsByCommunityId(communityName)
            .then((res) => {
                communityPageViewModel.set("posts", res);
            })
    }

    communityPageViewModel.empty = function () {
        while (communityPageViewModel.length) {
            communityPageViewModel.pop();
        }
    }

    return communityPageViewModel;

    // var vm = new ObservableArray(communityPosts);

    // vm.load = function(communityName) {
    //     const arr = getCommunityPosts(communityName);
    //     console.log(arr);
    //     for (const p of arr) {
    //         vm.push(p)
    //     }
    // }

    // vm.empty = function() {
    //     while (vm.length) {
    //         vm.pop();
    //     }
    // }

    // return vm
}

module.exports = CommunityPageViewModel