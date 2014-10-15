function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function dataTransformation(_model) {
        return {
            profile_id: _model.attributes.profile_id,
            name: "Name : " + _model.attributes.name,
            grade: "Grade : " + _model.attributes.grade,
            school: "School : " + _model.attributes.school,
            classname: "Class Name : " + _model.attributes.classname,
            teacher: "Teacher : " + _model.attributes.teacher,
            image: _model.attributes.url || "/images/profile.png"
        };
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ProfileDetail";
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
    $.profileDetail = Alloy.createModel("profile");
    $.__views.detailWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Profile Details",
        layout: "vertical",
        id: "detailWindow",
        model: "$.profileDetail",
        dataTransform: "dataTransformation"
    });
    $.__views.detailWindow && $.addTopLevelView($.__views.detailWindow);
    $.__views.profileView = Ti.UI.createView({
        layout: "vertical",
        height: "90%",
        id: "profileView"
    });
    $.__views.detailWindow.add($.__views.profileView);
    $.__views.nameLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        top: "2%",
        left: "5%",
        right: "5%",
        font: {
            fontSize: 14,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        id: "nameLabel"
    });
    $.__views.profileView.add($.__views.nameLabel);
    $.__views.schoolLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        top: "2%",
        left: "5%",
        right: "5%",
        font: {
            fontSize: 14,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        id: "schoolLabel"
    });
    $.__views.profileView.add($.__views.schoolLabel);
    $.__views.gradeLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        top: "2%",
        left: "5%",
        right: "5%",
        font: {
            fontSize: 14,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        id: "gradeLabel"
    });
    $.__views.profileView.add($.__views.gradeLabel);
    $.__views.teacherLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        top: "2%",
        left: "5%",
        right: "5%",
        font: {
            fontSize: 14,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        id: "teacherLabel"
    });
    $.__views.profileView.add($.__views.teacherLabel);
    $.__views.classnameLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        top: "2%",
        left: "5%",
        right: "5%",
        font: {
            fontSize: 14,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        id: "classnameLabel"
    });
    $.__views.profileView.add($.__views.classnameLabel);
    $.__views.image = Ti.UI.createImageView({
        height: 80,
        width: 60,
        top: 10,
        id: "image"
    });
    $.__views.profileView.add($.__views.image);
    $.__views.photoButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            title: "Add Photo",
            top: 10,
            height: Ti.UI.SIZE,
            left: "25%",
            width: "50%",
            color: "white",
            backgroundColor: "#336699",
            borderColor: "#336699",
            borderRadius: 8
        });
        IS_iPhone4SmallScreen && _.extend(o, {
            style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            height: "50dp"
        });
        _.extend(o, {
            id: "photoButton"
        });
        return o;
    }());
    $.__views.profileView.add($.__views.photoButton);
    $.__views.deleteButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            title: "Delete  Profile",
            top: 20,
            height: Ti.UI.SIZE,
            left: "25%",
            width: "50%",
            color: "white",
            backgroundColor: "#336699",
            borderColor: "#336699",
            borderRadius: 8
        });
        IS_iPhone4SmallScreen && _.extend(o, {
            top: 10,
            style: Ti.UI.iPhone.SystemButtonStyle.PLAIN,
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            height: "50dp"
        });
        _.extend(o, {
            id: "deleteButton"
        });
        return o;
    }());
    $.__views.profileView.add($.__views.deleteButton);
    var __alloyId71 = function() {
        $.nameLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["name"] : _.template("<%=profileDetail.name%>", {
            profileDetail: $.profileDetail.toJSON()
        });
        $.schoolLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["school"] : _.template("<%=profileDetail.school%>", {
            profileDetail: $.profileDetail.toJSON()
        });
        $.gradeLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["grade"] : _.template("<%=profileDetail.grade%>", {
            profileDetail: $.profileDetail.toJSON()
        });
        $.teacherLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["teacher"] : _.template("<%=profileDetail.teacher%>", {
            profileDetail: $.profileDetail.toJSON()
        });
        $.classnameLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["classname"] : _.template("<%=profileDetail.classname%>", {
            profileDetail: $.profileDetail.toJSON()
        });
        $.image.image = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["image"] : _.template("<%=profileDetail.image%>", {
            profileDetail: $.profileDetail.toJSON()
        });
    };
    $.profileDetail.on("fetch change destroy", __alloyId71);
    exports.destroy = function() {
        $.profileDetail.off("fetch change destroy", __alloyId71);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.profileDetail = _.extend({}, $.profileDetail, {
        transform: function() {
            return dataTransformation(this);
        }
    });
    if (Ti.App.Properties.getBool("DisplayAds")) {
        var _admobview = require("admobview");
        var adMobView = _admobview.getaddview();
        $.detailWindow.add(adMobView);
    }
    $.profileDetail.set(args.data.attributes);
    $.photoButton.addEventListener("click", function() {
        var cameraOptions = {
            success: function(event) {
                var image = event.media;
                $.image.image = image;
                var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "photo" + args.data.get("profile_id") + ".png");
                f.write(image);
                var profileModel = args.data;
                profileModel.set("url", f.nativePath);
                profileModel.save();
                Alloy.Collections.profile.fetch();
            },
            cancel: function() {},
            error: function(error) {
                var a = Ti.UI.createAlertDialog({
                    title: "Camera Error"
                });
                a.setMessage(error.code == Ti.Media.NO_CAMERA ? "MISSING CAMERA" : "Unexpected error: " + error.code);
                a.show();
            },
            saveToPhotoGallery: true,
            allowEditing: true,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ]
        };
        Ti.Media.isCameraSupported ? Ti.Media.showCamera(cameraOptions) : Ti.Media.openPhotoGallery(cameraOptions);
    });
    $.deleteButton.addEventListener("click", function() {
        args.data.destroy();
        Alloy.Collections.profile.fetch();
        "android" == Ti.Platform.osname ? setTimeout(function() {
            $.detailWindow.close();
        }, 2e3) : $.detailWindow.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;