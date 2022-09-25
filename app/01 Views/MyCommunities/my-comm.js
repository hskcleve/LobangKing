var observableModule = require("@nativescript/core/data/observable");
var MyCommsViewModel = require("~/01 Views/MyCommunities/my-comm-vm");

var page;

var commList = new MyCommsViewModel([]);
var pageData = observableModule.fromObject({
    communities: commList
})

exports.onLoaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    commList.empty();
    commList.load();
}

exports.selectCommunityOnTap = function() {
    const frame = frameModule.Frame.topmost();
    const navigationEntry = {
        moduleName: "~/01 Views/Community/community-page"
    };
    frame.navigate(navigationEntry);
}