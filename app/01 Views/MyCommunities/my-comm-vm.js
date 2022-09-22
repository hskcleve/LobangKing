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

    vm.empty = function() {
        while (vm.length) {
            vm.pop();
        }
    }

    return vm;
}

module.exports = MyCommsViewModel;