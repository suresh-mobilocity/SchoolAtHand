function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.appcelerator.drawer/" + s : s.substring(0, index) + "/com.appcelerator.drawer/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        backgroundColor: "#33B5E5"
    }
}, {
    isApi: true,
    priority: 1000.0003,
    key: "TableView",
    style: {
        left: 0,
        width: Ti.UI.FILL,
        separatorColor: "#336699",
        height: Ti.UI.SIZE,
        backgroundColor: "#33B5E5"
    }
}, {
    isApi: true,
    priority: 1000.0004,
    key: "TableViewRow",
    style: {
        layout: "vertical",
        width: Ti.UI.FILL,
        height: 80
    }
}, {
    isApi: true,
    priority: 1000.001,
    key: "Label",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000"
    }
}, {
    isApi: true,
    priority: 1101.0002,
    key: "TabGroup",
    style: {
        navBarHidden: true
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "drawer",
    style: {
        left: 0,
        right: 0,
        bottom: -48,
        width: Ti.UI.FILL,
        height: 64,
        layout: "vertical",
        opacity: .75
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "pulltab",
    style: {
        backgroundImage: "/images/com.appcelerator.drawer/PullTabUp.png",
        center: {
            x: "50%"
        },
        top: 0,
        width: 48,
        height: 16,
        accessibilityLabel: "Drawer",
        accessibilityValue: "Closed",
        accessibilityHint: "Click to open the drawer"
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "row_label",
    style: {
        top: 20,
        left: "5%",
        width: "60%",
        height: Ti.UI.SIZE,
        color: "white",
        font: {
            fontSize: 24,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        textAlign: "left"
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "buttonbar",
    style: {
        left: 0,
        top: 0,
        width: Ti.UI.FILL,
        height: 48,
        backgroundColor: "black",
        layout: "horizontal"
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "right_arrow",
    style: {
        top: 20,
        left: 0,
        text: Alloy.Globals.right_arrow,
        font: {
            fontFamily: "AppIcons",
            fontSize: "24dp"
        },
        color: "white",
        width: 50,
        textAlign: "left"
    }
}, {
    isId: true,
    priority: 100000.0007,
    key: "adView",
    style: {
        testing: false,
        keywords: "K-12, education, graduation, kids student school books science  math toys sports parent teacher cars bikes",
        bottom: 0,
        adBackgroundColor: "FF8855",
        backgroundColorTop: "738000",
        borderColor: "#000000",
        textColor: "#000000",
        urlColor: "#00FF00",
        linkColor: "#0000FF"
    }
}, {
    isId: true,
    priority: 100101.0009,
    key: "adView",
    style: {
        publisherId: "ca-app-pub-3665132116722377/2467198443",
        height: "10%"
    }
} ];