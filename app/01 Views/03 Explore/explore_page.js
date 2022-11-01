const ExplorePageViewModel = require("~/02 View Models/03 Explore/explore_page_vm");
const frameModule = require("@nativescript/core/ui/frame");
const { Enums } = require("@nativescript/core");

var page;
var vm;

exports.onLoaded = function (args) {
  page = args.object;
};

exports.onNavigatedTo = function (args) {
  const nvc = page.navigationContext;
  vm = new ExplorePageViewModel();
  page.bindingContext = vm;
  vm.set("user", nvc.user);
  vm.set("temp_user", Object.assign({}, nvc.user));
  vm.getPopularGroupbuysList();
  vm.getTrendingCommunitiesList();
  vm.getCategoriesList();
};

toggleRecentSearchLocal = function () {
  const sbBox = page.getViewById("sbBox");
  vm.set("filterShowing", !vm.get("filterShowing"));
  //assuming var 'page' had been set alr
  const recentSearchBox = page.getViewById("recentSearchBox");
  //obtains reference to the stacklayout
  if (recentSearchBox.height == 0 && vm.searchTypePicked != "GroupBuy") {
    sbBox.class = "searchbarOpen";
    recentSearchBox.animate({
      height: 100,
      duration: 200,
      curve: Enums.AnimationCurve.linear,
    });
    return;
  }
  if (recentSearchBox.height > 0) {
    setTimeout(() => {
      sbBox.class = "searchbar";
    }, 220);
    recentSearchBox.animate({
      height: 0,
      duration: 200,
      curve: Enums.AnimationCurve.linear,
    });
    recentSearchBox.height = 0;
  } else {
    sbBox.class = "searchbarOpen";
    recentSearchBox.animate({
      height: 220,
      duration: 200,
      curve: Enums.AnimationCurve.linear,
    });
  }
};

exports.toggleRecentSearch = toggleRecentSearchLocal;

exports.lobangsInCategoryOnTap = function (args) {
  console.log(args.object.bindingContext);
  const category = args.object.bindingContext.category_name;
  console.log("category name is " + category);
  vm.getLobangsInCategory(category, () => {
    //page.bindingContext = null;
    //page.bindingContext = vm;
  });
};

exports.goBack = function (args) {
  vm.categoryToDisplay = null;
  vm.lobangsInCategory = null;

  //page.bindingContext = undefined;
  //page.bindingContext = vm;
};

exports.lobangOnTap = function (args) {
  const lobangTapped = args.object.bindingContext;
  const user = vm.user;
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/04 Lobang/lobang_page",
    context: {
      user: user,
      lobang: lobangTapped,
    },
  };
  frame.navigate(navigationEntry);
};

exports.communityOnTap = function (args) {
  const communityTapped = args.object.bindingContext;
  const user = vm.user;
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/08 Community/community-page",
    context: {
      user: user,
      commName: communityTapped.name,
      community_image: communityTapped.image,
    },
  };
  frame.navigate(navigationEntry);
};

exports.searchTypesOnTap = function (args) {
  const option = {
    context: {
      callback: (searchTypePicked) => {
        vm.searchTypePicked = searchTypePicked;
        //page.bindingContext = undefined;
        //page.bindingContext = vm;
      },
    },
  };
  page.showModal("~/01 Views/10 Modals/search_types_modal", option);
};

exports.locationListOnTap = function (args) {
  const option = {
    context: {
      callback: (locationPicked) => {
        vm.locationFilter = locationPicked;
        //page.bindingContext = undefined;
        //page.bindingContext = vm;
      },
    },
  };
  page.showModal("~/01 Views/10 Modals/location_filter_modal", option);
};

exports.categoryListOnTap = function (args) {
  const option = {
    context: {
      callback: (categoryPicked) => {
        vm.categoryFilter = categoryPicked;
        //page.bindingContext = undefined;
        //page.bindingContext = vm;
      },
    },
  };
  page.showModal("~/01 Views/10 Modals/category_filter_modal", option);
};

exports.handleCloseResults = function () {
  vm.set("onResultsPage", false);
};

exports.searchBySearchTerm = function (args) {
  if (vm.get("filterShowing")) {
    toggleRecentSearchLocal();
  }
  vm.doSearchBySearchTerm(() => {
    console.log("done in js file too");
    vm.set("sbText", "");
    //page.bindingContext = null;
    //page.bindingContext = vm;
  });

  //toggleRecentSearchLocal();
};

exports.groupbuyFilterOnTap = () => {
  vm.searchTypePicked = "GroupBuy";
  const recentSearchBox = page.getViewById("recentSearchBox");
  if (recentSearchBox.height == 220) {
    return;
  } else {
    recentSearchBox.animate({
      height: 220,
      duration: 200,
      curve: Enums.AnimationCurve.linear,
    });
  }
};

exports.communityFilterOnTap = () => {
  vm.searchTypePicked = "Community";
  const recentSearchBox = page.getViewById("recentSearchBox");
  if (recentSearchBox.height == 220) {
    recentSearchBox.animate({
      height: 100,
      duration: 200,
      curve: Enums.AnimationCurve.linear,
    });
  } else {
    return;
  }
};
