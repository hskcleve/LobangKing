const { ObservableArray } = require("@nativescript/core");
const { getCommunityPosts } = require("~/07 Services/communities-mock-service");

function CommunityPageViewModel(communityPosts) {
    var vm = new ObservableArray(communityPosts);

    vm.load = function(communityName) {
        const arr = getCommunityPosts(communityName);
        console.log(arr);
        for (const p of arr) {
            vm.push(p)
        }
    }

    vm.empty = function() {
        while (vm.length) {
            vm.pop();
        }
    }

    return vm
}

module.exports=CommunityPageViewModel