function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.appcelerator.drawer/" + s : s.substring(0, index) + "/com.appcelerator.drawer/" + s.substring(index + 1);
    return path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function pullTabClick() {
        $._isOpen = !$._isOpen;
        $.pulltab.backgroundImage = "/images/com.appcelerator.drawer/" + ($._isOpen ? "PullTabDown.png" : "PullTabUp.png");
        Ti.API.info(($._isOpen ? "Opening" : "Closing") + " the drawer (buttonbar=" + ($._params.iconSize + 2 * $._params.gutter) + ", drawer=" + $.drawer.size.height + ")");
        $.pulltab.accessibilityValue = $._isOpen ? "Open" : "Closed";
        $.pulltab.accessibilityHint = "Click to " + ($._isOpen ? "close" : "open") + " the drawer";
        $.drawer.animate({
            bottom: $._isOpen ? 0 : -($._params.iconSize + 2 * $._params.gutter),
            opacity: $._isOpen ? $._params.openOpacity : $._params.closeOpacity,
            duration: $._params.animationDuration
        });
        $._isOpen && $._annoy && clearInterval($._annoy);
    }
    function omit(obj) {
        var ArrayProto = Array.prototype, slice = ArrayProto.slice, concat = ArrayProto.concat, copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        for (var key in obj) _.contains(keys, key) || (copy[key] = obj[key]);
        return copy;
    }
    new (require("alloy/widget"))("com.appcelerator.drawer");
    this.__widgetId = "com.appcelerator.drawer";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.drawer = Ti.UI.createView({
        left: 0,
        right: 0,
        bottom: -48,
        width: Ti.UI.FILL,
        height: 64,
        layout: "vertical",
        opacity: .75,
        id: "drawer"
    });
    $.__views.drawer && $.addTopLevelView($.__views.drawer);
    $.__views.pulltab = Ti.UI.createButton({
        backgroundImage: "/images/com.appcelerator.drawer/PullTabUp.png",
        center: {
            x: "50%"
        },
        top: 0,
        width: 48,
        height: 16,
        accessibilityLabel: "Drawer",
        accessibilityValue: "Closed",
        accessibilityHint: "Click to open the drawer",
        id: "pulltab"
    });
    $.__views.drawer.add($.__views.pulltab);
    pullTabClick ? $.__views.pulltab.addEventListener("click", pullTabClick) : __defers["$.__views.pulltab!click!pullTabClick"] = true;
    $.__views.buttonbar = Ti.UI.createView({
        left: 0,
        top: 0,
        width: Ti.UI.FILL,
        height: 48,
        backgroundColor: "black",
        layout: "horizontal",
        id: "buttonbar"
    });
    $.__views.drawer.add($.__views.buttonbar);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var DRAWER_PULLTAB_HEIGHT = 16;
    var defaults = {
        autoClose: false,
        iconSize: 48,
        openOpacity: .9,
        closeOpacity: .75,
        animationDuration: 500,
        gutter: 0,
        overrideMenu: false,
        annoy: 0
    };
    $._isOpen = false;
    $._buttons = [];
    $._params = {};
    $._annoy = false;
    exports.jiggle = function() {
        if ($._isOpen || false) return;
        var animation = require("alloy/animation");
        var chain = [ Ti.UI.createAnimation({
            bottom: -($._params.iconSize + 2 * $._params.gutter) + DRAWER_PULLTAB_HEIGHT,
            duration: 250
        }), Ti.UI.createAnimation({
            bottom: -($._params.iconSize + 2 * $._params.gutter) - DRAWER_PULLTAB_HEIGHT / 2,
            duration: 125
        }), Ti.UI.createAnimation({
            bottom: -($._params.iconSize + 2 * $._params.gutter),
            duration: 125
        }) ];
        animation.chainAnimate($.drawer, chain);
    };
    exports.checkEnabled = function() {
        Object.keys($._buttons).forEach(function(key) {
            var i = parseInt(key, 10);
            $._buttons[i].enabled && ($._buttons[i].button.enabled = $._buttons[i].enabled());
        });
    };
    exports.init = function(args) {
        $._buttons = args.buttons;
        $._params = _.defaults(args, defaults);
        $.buttonbar.height = $._params.iconSize + 2 * $._params.gutter;
        $.drawer.height = DRAWER_PULLTAB_HEIGHT + $.buttonbar.height;
        $.drawer.bottom = -$.buttonbar.height;
        Object.keys($._buttons).forEach(function(key) {
            var i = parseInt(key, 10);
            var buttonDesc = omit($._buttons[i], [ "id", "title", "click", "enabled" ]);
            _.extend(buttonDesc, {
                top: $._params.gutter,
                left: $._params.gutter,
                width: $._params.iconSize,
                height: $._params.iconSize,
                backgroundImage: "/images/" + $._buttons[i].id + "Enabled.png",
                backgroundDisabledImage: "/images/" + $._buttons[i].id + "Disabled.png"
            });
            $._buttons[i].button = Ti.UI.createButton(buttonDesc);
            $._buttons[i].button.addEventListener("click", function(e) {
                $._buttons[i].click && $._buttons[i].click(e);
                $._params.autoClose && pullTabClick(e);
            });
            $.buttonbar.add($._buttons[i].button);
        });
        $._params.annoy && ($._annoy = setInterval(function() {
            $._params.annoy > 0 && $._params.annoy--;
            0 == $._params.annoy && clearInterval($._annoy);
            $.jiggle();
        }, 2e3));
    };
    __defers["$.__views.pulltab!click!pullTabClick"] && $.__views.pulltab.addEventListener("click", pullTabClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;