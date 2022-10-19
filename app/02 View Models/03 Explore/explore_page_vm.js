const observableModule = require("@nativescript/core/data/observable");
const ObservableArray = require("@nativescript/core/data/observable-array").ObservableArray;
const frameModule = require("@nativescript/core/ui/frame");
const { getPopularGroupbuys, getTrendingCommunities } = require("~/07 Services/mock_service");
const {
    getGroupbuys,
    getCommunities,
    getGroupbuysByLocation,
} = require("~/07 Services/firestore_service");
const possible_locations = require("~/00 Constants/towns_constants").town_names;
const possible_categories = require("~/00 Constants/categories_constants").categories;
const possible_searchTypes = require("~/00 Constants/search_type_constants").searchType;
const errorMsgs = require("~/00 Constants/error_messages");

function ExplorePageViewModel() {
    var explorePageViewModel = observableModule.fromObject({
        sbText: "",
        searchType: possible_searchTypes,
        popularGroupbuys: undefined,
        trendingCommunities: undefined,
        categories: possible_categories,
        locations: Object.assign([],possible_locations.unshift("None")),
        locationFilter: null,
        displayResults: undefined
    });

    explorePageViewModel.getPopularGroupbuysList = function () {
        getGroupbuys().then(
            (lobangs) => {
                lobangs.sort((a,b) => (b.joined.length - a.joined.length))
                popularLobangs = lobangs.length > 5 ? lobangs.slice(6) : lobangs
                explorePageViewModel.set("popularGroupbuys", lobangs)
            }
        )
    }

    explorePageViewModel.getTrendingCommunitiesList = function () {
        getCommunities().then(
            (communities) => {
                communities.sort((a,b) => (a.members.length > b.members.length) ? -1 : 1)
                trendingComm = communities.length > 5 ? communities.slice(6) : communities
                explorePageViewModel.set("trendingCommunities", trendingComm)
            }
        )
    }

    explorePageViewModel.doSearchBySearchTerm = function () {
        getGroupbuysByLocation(explorePageViewModel.locationFilter).then(
            (lobangs) => {
                const groupbuysSorted = lobangs.filter((item) => (typeof item.name.indexOf(explorePageViewModel.sbText) > -1))
                explorePageViewModel.set("displayResults", groupbuysSorted)
            }
        )
    }

    return explorePageViewModel;
}

module.exports = ExplorePageViewModel;
