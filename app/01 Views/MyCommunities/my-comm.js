var observableModule = require("@nativescript/core/data/observable");
var MyCommsViewModel = require("~/01 Views/MyCommunities/my-comm-vm");
const frameModule = require("@nativescript/core/ui/frame");
const { viewMatchesModuleContext } = require("@nativescript/core/ui/core/view");

var page;

var commList = new MyCommsViewModel([]);
var pageData = observableModule.fromObject({
    communities: commList,
    user: undefined
})

exports.onLoaded = function(args) {
    page = args.object;
    page.actionBarHidden = true;

}

exports.onNavigatedTo = function(args) {
    const nvc = page.navigationContext;
    page.bindingContext = pageData
    commList.set("user", nvc.user);
    commList.empty();
    commList.load();
    console.log("At My Comms: " + commList.user.user_id);

}

exports.selectCommunityOnTap = function(args) {
    const param = args.object.param;

    const frame = frameModule.Frame.topmost();
    const navigationEntry = {
        moduleName: "~/01 Views/Community/community-page",
        context: {
            commName: param,
            user: commList.user,
        },
    };
    frame.navigate(navigationEntry);

}