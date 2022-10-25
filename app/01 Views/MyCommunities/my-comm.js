var MyCommsViewModel = require("~/01 Views/MyCommunities/my-comm-vm");
const frameModule = require("@nativescript/core/ui/frame");
const { getCommunitiesByUserId } = require("~/07 Services/communities-service");

var page;
var vm;

exports.onLoaded = function(args) {
    page = args.object;
    page.actionBarHidden = true;

}

exports.onNavigatedTo = function(args) {
    vm = new MyCommsViewModel();
    const nvc = page.navigationContext;
    page.bindingContext = vm;
    vm.set("user", nvc.user);
    vm.empty();
    vm.load();
    console.log("User here is " + vm.user.user_id);
}

exports.selectCommunityOnTap = function(args) {
    const param = args.object.param;
    const imageToPass = args.object.imageToPass;

    const frame = frameModule.Frame.topmost();
    const navigationEntry = {
        moduleName: "~/01 Views/Community/community-page",
        context: {
            commName: param,
            user: vm.user,
            community_image: imageToPass,
        },
    };
    frame.navigate(navigationEntry);

}