const ExplorePageViewModel = require("~/02 View Models/03 Explore/explore_page_vm");

var page;
var vm;

exports.onLoaded = function (args) {
    page = args.object;
}

exports.onNavigatedTo = function (args) {
    const nvc = page.navigationContext;
    vm = vm ? vm : new ExplorePageViewModel();
    page.bindingContext = vm;
    vm.set("user", nvc.user);
    vm.set("temp_user", Object.assign({}, nvc.user));
    vm.getPopularGroupbuysList();
    vm.getTrendingCommunitiesList();
};

exports.toggleRecentSearch = function () {
    //assuming var 'page' had been set alr
    const recentSearchBox = page.getViewById("recentSearchBox");
    //obtains reference to the stacklayout
    if (recentSearchBox.height == 700) {
        recentSearchBox.height = 0;
    } else recentSearchBox.height = 700;
};

exports.lobangOnTap = function (args) {
    console.log(args.object.bindingContext);
    alert("Will route to selected lobang page");
};

exports.communityOnTap = function (args) {
    console.log(args.object.bindingContext);
    alert("Will route to selected community page");
};

exports.locationListOnTap = function (args) {
    
}


