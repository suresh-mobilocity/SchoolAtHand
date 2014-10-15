function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function destroy() {
        $.mapWindow.removeEventListener("close", destroy);
        $.destroy();
        $.mapWindow.removeAllChildren();
        $ = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "MapDetail";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.mapWindow = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "School Location",
        barColor: "#6d0a0c",
        id: "mapWindow"
    });
    $.__views.mapWindow && $.addTopLevelView($.__views.mapWindow);
    $.__views.mapView = MapModule.createView({
        mapType: 1,
        animate: true,
        regionFit: true,
        userLocation: "true",
        userLocationButton: true,
        annotations: [],
        id: "mapView",
        opacity: "1"
    });
    $.__views.mapWindow.add($.__views.mapView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.mapWindow.title = args.data.name;
    if ("android" === Ti.Platform.osname) {
        var rc = MapModule.isGooglePlayServicesAvailable();
        rc != MapModule.SUCCESS && alert("Google Play Services is not installed/updated/available");
    }
    var ann = MapModule.createAnnotation({
        latitude: args.data.latitude,
        longitude: args.data.longitude,
        title: args.data.name,
        subtitle: args.data.address1 + "\n" + args.data.city + "\n" + args.data.state + " " + args.data.zipcode,
        pincolor: MapModule.ANNOTATION_VIOLET,
        animate: true
    });
    $.mapView.addAnnotation(ann);
    $.mapView.addEventListener("click", function(e) {
        Ti.Platform.openURL("Maps://?daddr=" + e.source.latitude + "," + e.source.longitude);
    });
    $.mapView.setRegion({
        latitude: args.data.latitude,
        longitude: args.data.longitude,
        title: args.data.name,
        latitudeDelta: .05,
        longitudeDelta: .05
    });
    $.mapWindow.addEventListener("close", destroy);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;