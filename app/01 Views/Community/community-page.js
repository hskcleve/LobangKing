var observableModule = require("@nativescript/core/data/observable");
const CommunityPageViewModel = require("./community-page-vm");

var page;

var communityPosts = new CommunityPageViewModel([]);
var pageData = observableModule.fromObject({
    posts: communityPosts,
    commName: undefined
})

exports.onLoaded = function(args) {
    page = args.object
    page.actionBarHidden = true
}

exports.onNavigatedTo = function(args) {
    const nvc = page.navigationContext
    page.bindingContext = pageData
    communityPosts.set('commName', nvc.commName)
    communityPosts.empty()
    communityPosts.load(nvc.commName)
}