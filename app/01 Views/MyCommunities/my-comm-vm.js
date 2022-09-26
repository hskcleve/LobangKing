const { ObservableArray } = require("@nativescript/core");
const { getMyCommunities } = require("~/07 Services/communities-mock-service");


function MyCommsViewModel(comms) {
    var vm = new ObservableArray(comms);

    vm.load = function() {
        const arr = getMyCommunities();
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