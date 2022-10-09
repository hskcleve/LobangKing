var observableModule = require("@nativescript/core/data/observable");
const CommunityPageViewModel = require("./community-page-vm");
const frameModule = require("@nativescript/core/ui/frame");

var page;

var communityPosts = new CommunityPageViewModel([]);
var pageData = observableModule.fromObject({
    posts: communityPosts,
    commName: undefined,
    user: undefined,
})

exports.onLoaded = function(args) {
    page = args.object
    page.actionBarHidden = true
}

exports.onNavigatedTo = function(args) {
    const nvc = page.navigationContext
    page.bindingContext = pageData
    communityPosts.set('commName', nvc.commName)
    communityPosts.set("user", nvc.user);
    communityPosts.empty()
    communityPosts.load(nvc.commName)
    console.log("At Community Page: " + communityPosts.user.user_id);
}

exports.navToCreatePost = function(args) {
    const frame = frameModule.Frame.topmost();
    const navigationEntry = {
        moduleName: "~/01 Views/Create Community Post/create-post",
        context: {
            communityName: communityPosts.commName,
            user: communityPosts.user,
        },
    };
    frame.navigate(navigationEntry);
}