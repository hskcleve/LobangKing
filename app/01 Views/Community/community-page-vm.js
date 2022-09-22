const { ObservableArray } = require("@nativescript/core");
const { doGetCommunityPosts } = require("~/07 Services/community-posts-mock-service");

function CommunityPageViewModel(communityPosts) {
    var vm = new ObservableArray(communityPosts);
    
    vm.load = function() {
        const arr = doGetCommunityPosts();
        console.log(arr);
        for (const p of arr) {
            vm.push(p)
        }
    }

    return vm
}

module.exports=CommunityPageViewModel