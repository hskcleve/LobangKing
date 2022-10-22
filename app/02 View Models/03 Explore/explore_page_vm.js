const observableModule = require("@nativescript/core/data/observable");
const ObservableArray = require("@nativescript/core/data/observable-array").ObservableArray;
const frameModule = require("@nativescript/core/ui/frame");
const { getPopularGroupbuys, getTrendingCommunities } = require("~/07 Services/mock_service");
const {
    getGroupbuys,
    getCommunities,
    getGroupbuysByLocation,
    getFilteredGroupbuys,
} = require("~/07 Services/firestore_service");
const possible_locations = require("~/00 Constants/towns_constants").town_names;
const possible_categories = require("~/00 Constants/categories_constants").categories;
const possible_searchTypes = require("~/00 Constants/search_type_constants").searchType;
const errorMsgs = require("~/00 Constants/error_messages");

function ExplorePageViewModel() {
    var explorePageViewModel = observableModule.fromObject({
        user: undefined,
        sbText: "",
        popularGroupbuys: undefined,
        trendingCommunities: undefined,
        searchType: possible_searchTypes,
        searchTypePicked: "GroupBuy",
        categories: possible_categories,
        categoryFilter: undefined,
        locations: Object.assign([], possible_locations.unshift("None")),
        locationFilter: undefined,
        displayResults: undefined
    });

    explorePageViewModel.getPopularGroupbuysList = function () {
        getGroupbuys().then(
            (lobangs) => {
                lobangs.sort((a, b) => (b.joined.length - a.joined.length))
                popularLobangs = lobangs.length > 5 ? lobangs.slice(6) : lobangs
                explorePageViewModel.set("popularGroupbuys", lobangs)
            }
        )
    }

    explorePageViewModel.getTrendingCommunitiesList = function () {
        getCommunities().then(
            (communities) => {
                communities.sort((a, b) => (b.members.lengtha - a.members.length))
                trendingComm = communities.length > 5 ? communities.slice(6) : communities
                explorePageViewModel.set("trendingCommunities", trendingComm)
            }
        )
    }

    explorePageViewModel.doSearchBySearchTerm = function () {
        console.log("In VM method!");
        //search by lobangs
        if (explorePageViewModel.searchTypePicked == explorePageViewModel.searchType[0]) {
            const locationFilterChosen = (explorePageViewModel.locationFilter != null || explorePageViewModel.locationFilter != "None") ? explorePageViewModel.locationFilter : "";
            const categoryFilterChosen = (explorePageViewModel.categoryFilter != null || explorePageViewModel.categoryFilter != "None") ? explorePageViewModel.categoryFilter : "";

            //getFilteredGroupbuys(locationFilterChosen, categoryFilterChosen)
            getGroupbuys().then(
                    (lobangs) => {
                        console.log("going to filter")
                        //const groupbuyResults = lobangs.filter((item) => (typeof item.name.indexOf(explorePageViewModel.sbText) > -1))
                        const groupbuyResults = lobangs.filter(item => item.name.includes(explorePageViewModel.sbText))
                        console.log("is it empty? " + groupbuyResults.length > 0)
                        explorePageViewModel.set("displayResults", groupbuyResults)
                    }
                )
            
        }
        //search by communities
        else {
            getCommunities().then(
                (communities) => {
                    const communitiesResult = communities.filter((item) => (typeof item.name.indexOf(explorePageViewModel.sbText) > -1))
                    explorePageViewModel.set("displayResults", communitiesResult)
                }
            )
        }
    }

    return explorePageViewModel;
}

module.exports = ExplorePageViewModel;
