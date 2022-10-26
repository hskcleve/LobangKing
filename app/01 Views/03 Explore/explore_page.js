const ExplorePageViewModel = require("~/02 View Models/03 Explore/explore_page_vm");

var page;
var vm;

exports.onLoaded = function (args) {
  page = args.object;
};

exports.onNavigatedTo = function (args) {
  const nvc = page.navigationContext;
  vm = vm ? vm : new ExplorePageViewModel();
  page.bindingContext = vm;
  vm.set("user", nvc.user);
  vm.set("temp_user", Object.assign({}, nvc.user));
  vm.getPopularGroupbuysList();
  vm.getTrendingCommunitiesList();
  vm.getCategoriesList();
};

toggleRecentSearchLocal = function () {
  //assuming var 'page' had been set alr
  const recentSearchBox = page.getViewById("recentSearchBox");
  //obtains reference to the stacklayout
  if (recentSearchBox.height == 700) {
    recentSearchBox.height = 0;
  } else recentSearchBox.height = 700;
};

exports.toggleRecentSearch = toggleRecentSearchLocal;

exports.lobangsInCategoryOnTap = function (args) {
  console.log(args.object.bindingContext);
  const category = args.object.bindingContext.category_name;
  console.log("category name is " + category);
  vm.getLobangsInCategory(category, () => {
    page.bindingContext = null;
    page.bindingContext = vm;
  });
}

exports.goBack = function (args) {
  vm.categoryToDisplay = null;
  vm.lobangsInCategory = null;

  page.bindingContext = undefined;
  page.bindingContext = vm;
}

exports.lobangOnTap = function (args) {
  console.log(args.object.bindingContext);
  alert("Will route to selected lobang page");
};

exports.communityOnTap = function (args) {
  console.log(args.object.bindingContext);
  alert("Will route to selected community page");
};

exports.searchTypesOnTap = function (args) {
  const option = {
    context: {
      callback: (searchTypePicked) => {
        vm.searchTypePicked = searchTypePicked;
        page.bindingContext = undefined;
        page.bindingContext = vm;
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
        page.bindingContext = undefined;
        page.bindingContext = vm;
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
        page.bindingContext = undefined;
        page.bindingContext = vm;
      },
    },
  };
  page.showModal("~/01 Views/10 Modals/category_filter_modal", option);
};

exports.searchBySearchTerm = function (args) {
  vm.doSearchBySearchTerm(() => {
    console.log('done in js file too');
    page.bindingContext = null;
    page.bindingContext = vm;
  });

  toggleRecentSearchLocal();
};
