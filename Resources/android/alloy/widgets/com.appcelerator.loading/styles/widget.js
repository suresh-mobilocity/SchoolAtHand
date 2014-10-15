function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.appcelerator.loading/" + s : s.substring(0, index) + "/com.appcelerator.loading/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
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
    isId: true,
    priority: 100000.0002,
    key: "loading",
    style: {
        height: 20,
        width: 20,
        images: [ "/images/com.appcelerator.loading/00.png", "/images/com.appcelerator.loading/01.png", "/images/com.appcelerator.loading/02.png", "/images/com.appcelerator.loading/03.png", "/images/com.appcelerator.loading/04.png", "/images/com.appcelerator.loading/05.png", "/images/com.appcelerator.loading/06.png", "/images/com.appcelerator.loading/07.png", "/images/com.appcelerator.loading/08.png", "/images/com.appcelerator.loading/09.png", "/images/com.appcelerator.loading/10.png", "/images/com.appcelerator.loading/11.png" ]
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
    priority: 100101.0008,
    key: "adView",
    style: {
        publisherId: "ca-app-pub-3665132116722377/6561150840"
    }
} ];