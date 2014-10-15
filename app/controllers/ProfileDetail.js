var args = arguments[0] || {};
$.parentController = args.parentTab;

$.profileDetail = _.extend({}, $.profileDetail, {
    transform : function() {
        return dataTransformation(this);
    }
});
if ( Ti.App.Properties.getBool("DisplayAds")) {
	var _admobview = require("admobview");
	var adMobView = _admobview.getaddview();
	$.detailWindow.add(adMobView);
}
//Ti.API.info('data attributes passed:' + args.data.attributes);
$.profileDetail.set(args.data.attributes);
function dataTransformation(_model) {
	//Ti.API.info (_model.attributes.profile_id + ":" + _model.attributes.name + ":" + _model.attributes.grade);
    return {
    	profile_id: _model.attributes.profile_id,
        name : "Name : "  + _model.attributes.name,
		grade: "Grade : " + _model.attributes.grade,
		school: "School : " + _model.attributes.school,
		classname: "Class Name : " + _model.attributes.classname,
		teacher: "Teacher : " + _model.attributes.teacher,
		image : _model.attributes.url || '/images/profile.png'
    };
}
// save a photo to associate with the captured person
$.photoButton.addEventListener('click', function(_e) {
 	//Ti.API.info('Adding Photo');
    var cameraOptions = {
        success : function(event) {
            var image = event.media;

            // set image on window
            $.image.image = image;

            //save for future use
            var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'photo' + args.data.get("profile_id") + '.png');
            f.write(image);

            // update the model and save
            var profileModel = args.data;
            profileModel.set("url", f.nativePath);
           // Ti.API.info('Image file :' + f.nativePath);
            profileModel.save();

            // force tables to update
            Alloy.Collections.profile.fetch();

        },
        cancel : function() {
            // cancel and close window
        },
        error : function(error) {
            var a = Ti.UI.createAlertDialog({
                title : "Camera Error"
            });
            if (error.code == Ti.Media.NO_CAMERA) {
                a.setMessage("MISSING CAMERA");
            } else {
                a.setMessage('Unexpected error: ' + error.code);
            }
            a.show();
        },
        saveToPhotoGallery : true,
        allowEditing : true,
        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
  };
   // display camera OR gallery
    if (Ti.Media.isCameraSupported) {
        Ti.Media.showCamera(cameraOptions);
    } else {
        Ti.Media.openPhotoGallery(cameraOptions);
    }

});
$.deleteButton.addEventListener('click', function(_e) {
    // delete the model object
    args.data.destroy();

    // force tables to update
    Alloy.Collections.profile.fetch();

    //on android, give a bit of a delay before closing the window...
    if (Ti.Platform.osname == 'android') {
        setTimeout(function() {
            $.detailWindow.close();
        }, 2000);
    } else {
        $.detailWindow.close();
    }
});