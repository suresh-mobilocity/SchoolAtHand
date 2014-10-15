var adView;

exports.getaddview = function() {
    adView = Admob.createView({
        publisherId: "ca-app-pub-3665132116722377/6561150840",
        keywords: "K-12 SAT tutuion education graduation kids student school books science  math toys sports parent teacher cars bikes",
        testing: false,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        bottom: 0,
        adBackgroundColor: "FF8855",
        backgroundColorTop: "738000",
        borderColor: "#000000",
        textColor: "#000000",
        urlColor: "#00FF00",
        linkColor: "#0000FF"
    });
    return adView;
};