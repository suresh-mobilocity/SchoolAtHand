function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "MapDetail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
        userLocation: true,
        userLocationButton: true,
        annotations: [],
        ns: "MapModule",
        id: "mapView",
        opacity: "1"
    });
    $.__views.mapWindow.add($.__views.mapView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.API.info("latitude:" + args.data.latitude + "longitude:" + args.data.longitude);
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
    $.mapView.setRegion({
        latitude: args.data.latitude,
        longitude: args.data.longitude,
        title: args.data.name,
        latitudeDelta: .01,
        longitudeDelta: .01
    });
    Ti.Platform.openURL("Maps://?daddr=" + args.data.address1 + "," + args.data.city + "," + args.data.state);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;