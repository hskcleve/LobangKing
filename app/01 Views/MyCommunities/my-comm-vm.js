const { ObservableArray } = require("@nativescript/core");
const { doGetMyCommunities } = require("~/07 Services/mycomms-mock-service");

function MyCommsViewModel(comms) {
    var vm = new ObservableArray(comms);

    vm.load = function() {
        const arr = doGetMyCommunities()
        console.log(arr)
        for (const c of arr) {
            vm.push(c)
        }
    }

    return vm;
}

module.exports = MyCommsViewModel;