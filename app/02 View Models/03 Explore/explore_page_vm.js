const observableModule = require("@nativescript/core/data/observable");
const ObservableArray =
  require("@nativescript/core/data/observable-array").ObservableArray;
const frameModule = require("@nativescript/core/ui/frame");
const {
  getPopularGroupbuys,
  getTrendingCommunities,
} = require("~/07 Services/mock_service");
const {
  getActiveGroupbuys,
  getCommunities,
  getGroupbuysByCategory,
} = require("~/07 Services/firestore_service");
const possible_locations = require("~/00 Constants/towns_constants").town_names;
const possible_categories =
  require("~/00 Constants/categories_constants").categories;
const possible_searchTypes =
  require("~/00 Constants/search_type_constants").searchType;
const errorMsgs = require("~/00 Constants/error_messages");
const { itemsLayoutProperty } = require("@nativescript/core/ui/repeater");

function ExplorePageViewModel() {
  var explorePageViewModel = observableModule.fromObject({
    user: undefined,
    sbText: "",
    popularGroupbuys: undefined,
    trendingCommunities: undefined,
    searchType: possible_searchTypes,
    searchTypePicked: "GroupBuy",
    categories: undefined,
    categoryFilter: undefined,
    categoryToDisplay: undefined,
    lobangsInCategory: undefined,
    //locations: Object.assign([], possible_locations.unshift("None")),
    locationFilter: undefined,
    displayResults: undefined,
    onResultsPage: false,
    filterShowing: false,
  });

  explorePageViewModel.getCategoriesList = function () {
    const options = possible_categories.map((item) => item);
    options.shift();
    explorePageViewModel.set("categories", options);
  };

  explorePageViewModel.getPopularGroupbuysList = function () {
    getActiveGroupbuys().then((lobangs) => {
      lobangs.sort((a, b) => b.joined.length - a.joined.length);
      popularLobangs = lobangs.length > 5 ? lobangs.slice(6) : lobangs;
      explorePageViewModel.set("popularGroupbuys", lobangs);
    });
  };

  explorePageViewModel.getTrendingCommunitiesList = function () {
    getCommunities().then((communities) => {
      communities.sort((a, b) => b.members.lengtha - a.members.length);
      trendingComm =
        communities.length > 5 ? communities.slice(6) : communities;
      explorePageViewModel.set("trendingCommunities", trendingComm);
    });
  };

  explorePageViewModel.getLobangsInCategory = function (category) {
    explorePageViewModel.set("categoryToDisplay", category);
    console.log(
      "set categoryToDisplay var as: " + explorePageViewModel.categoryToDisplay
    );
    getActiveGroupbuys().then((lobangs) => {
      console.log("back in vm!");
      const inCat = lobangs.filter((item) =>
        item.categories.includes(category)
      );
      console.log("after filter by cat:");
      console.log(inCat);
      inCat.sort((a, b) => {
        b.coins - a.coins;
      });
      console.log("after sort by coins:");
      console.log(inCat);
      explorePageViewModel.set("lobangsInCategory", inCat);
    });
  };

  explorePageViewModel.doSearchBySearchTerm = function (callback) {
    explorePageViewModel.set("onResultsPage", true);
    //search by lobangs
    if (
      explorePageViewModel.searchTypePicked ==
      explorePageViewModel.searchType[0]
    ) {
      getActiveGroupbuys().then((lobangs) => {
        const filteredLocation =
          explorePageViewModel.locationFilter != null &&
          explorePageViewModel.locationFilter != "None"
            ? lobangs.filter(
                (item) => item.location == explorePageViewModel.locationFilter
              )
            : lobangs.map((item) => item);

        const filteredCategory =
          explorePageViewModel.categoryFilter != null &&
          explorePageViewModel.categoryFilter != "None"
            ? filteredLocation.filter((item) =>
                item.categories.includes(explorePageViewModel.categoryFilter)
              )
            : filteredLocation.map((item) => item);

        const groupbuyResults = filteredCategory
          .filter((item) =>
            item.lobang_name
              .toLowerCase()
              .includes(explorePageViewModel.sbText.toLowerCase())
          )
          .sort((a, b) => b.coins - a.coins);
        explorePageViewModel.set("displayResults", groupbuyResults);
        callback();
      });
    }
    //search by communities
    else {
      getCommunities().then((communities) => {
        const communitiesResult = communities.filter((item) =>
          item.name
            .toLowerCase()
            .includes(explorePageViewModel.sbText.toLowerCase())
        );
        explorePageViewModel.set("displayResults", communitiesResult);
        console.log("Done setting display results");
        callback();
      });
    }
  };

  return explorePageViewModel;
}

module.exports = ExplorePageViewModel;
