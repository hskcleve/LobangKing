var observableModule = require("@nativescript/core/data/observable");
const CommunityPageViewModel = require("./community-page-vm");

var page;

var communityPosts = new CommunityPageViewModel([]);
var pageData = observableModule.fromObject({
    posts: communityPosts
})

exports.onLoaded = function(args) {
    page = args.object
    page.actionBarHidden = true
    page.bindingContext = pageData
    communityPosts.empty()
    communityPosts.load()
}