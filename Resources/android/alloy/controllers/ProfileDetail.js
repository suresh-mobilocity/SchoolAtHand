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
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
        top: "2%",
        height: Ti.UI.SIZE,
        left: "5%",
        right: "5%",
        font: {
            fontSize: 14,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        color: "black",
        id: "nameLabel"
    });
    $.__views.profileView.add($.__views.nameLabel);
    $.__views.schoolLabel = Ti.UI.createLabel({
        top: "2%",
        height: Ti.UI.SIZE,
        left: "5%",
        right: "5%",
        font: {
            fontSize: 14,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        color: "black",
        id: "schoolLabel"
    });
    $.__views.profileView.add($.__views.schoolLabel);
    $.__views.gradeLabel = Ti.UI.createLabel({
        top: "2%",
        height: Ti.UI.SIZE,
        left: "5%",
        right: "5%",
        font: {
            fontSize: 14,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        color: "black",
        id: "gradeLabel"
    });
    $.__views.profileView.add($.__views.gradeLabel);
    $.__views.teacherLabel = Ti.UI.createLabel({
        top: "2%",
        height: Ti.UI.SIZE,
        left: "5%",
        right: "5%",
        font: {
            fontSize: 14,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        color: "black",
        id: "teacherLabel"
    });
    $.__views.profileView.add($.__views.teacherLabel);
    $.__views.classnameLabel = Ti.UI.createLabel({
        top: "2%",
        height: Ti.UI.SIZE,
        left: "5%",
        right: "5%",
        font: {
            fontSize: 14,
            fontWight: "bold",
            fontFamily: "Helvetica Neue"
        },
        color: "black",
        id: "classnameLabel"
    });
    $.__views.profileView.add($.__views.classnameLabel);
    $.__views.image = Ti.UI.createImageView({
        height: 128,
        width: 128,
        top: 10,
        autorotate: true,
        id: "image"
    });
    $.__views.profileView.add($.__views.image);
    $.__views.photoButton = Ti.UI.createButton({
        title: "Add Photo",
        top: 10,
        height: Ti.UI.SIZE,
        left: "25%",
        width: "50%",
        color: "white",
        backgroundColor: "#336699",
        borderColor: "#336699",
        borderRadius: 8,
        id: "photoButton"
    });
    $.__views.profileView.add($.__views.photoButton);
    $.__views.deleteButton = Ti.UI.createButton({
        title: "Delete  Profile",
        top: 20,
        height: Ti.UI.SIZE,
        left: "25%",
        width: "50%",
        color: "white",
        backgroundColor: "#336699",
        borderColor: "#336699",
        borderRadius: 8,
        id: "deleteButton"
    });
    $.__views.profileView.add($.__views.deleteButton);
    $.__views.adView = Admob.createView({
        testing: false,
        keywords: "K-12 SAT tutuion education graduation kids student school books science  math toys sports parent teacher cars bikes",
        bottom: 0,
        adBackgroundColor: "FF8855",
        backgroundColorTop: "738000",
        borderColor: "#000000",
        textColor: "#000000",
        urlColor: "#00FF00",
        linkColor: "#0000FF",
        publisherId: "ca-app-pub-3665132116722377/6561150840",
        ns: "Admob",
        id: "adView"
    });
    $.__views.detailWindow.add($.__views.adView);
    var __alloyId56 = function() {
        $.nameLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["name"] : $.profileDetail.get("name");
        $.nameLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["name"] : $.profileDetail.get("name");
        $.schoolLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["school"] : $.profileDetail.get("school");
        $.schoolLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["school"] : $.profileDetail.get("school");
        $.gradeLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["grade"] : $.profileDetail.get("grade");
        $.gradeLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["grade"] : $.profileDetail.get("grade");
        $.teacherLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["teacher"] : $.profileDetail.get("teacher");
        $.teacherLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["teacher"] : $.profileDetail.get("teacher");
        $.classnameLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["classname"] : $.profileDetail.get("classname");
        $.classnameLabel.text = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["classname"] : $.profileDetail.get("classname");
        $.image.image = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["image"] : $.profileDetail.get("image");
        $.image.image = _.isFunction($.profileDetail.transform) ? $.profileDetail.transform()["image"] : $.profileDetail.get("image");
    };
    $.profileDetail.on("fetch change destroy", __alloyId56);
    exports.destroy = function() {
        $.profileDetail.off("fetch change destroy", __alloyId56);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.profileDetail = _.extend({}, $.profileDetail, {
        transform: function() {
            return dataTransformation(this);
        }
    });
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
                error.code == Ti.Media.NO_CAMERA ? a.setMessage("MISSING CAMERA") : a.setMessage("Unexpected error: " + error.code);
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
        setTimeout(function() {
            $.detailWindow.close();
        }, 2e3);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;