function Controller() {
    function initSchoolPickerList() {
        var sql = null;
        sql = "SELECT name from schools";
        var mySchoolsRS = schoolDB.execute(sql);
        var column = Ti.UI.createPickerColumn();
        if (mySchoolsRS.getRowCount() > 0) {
            var row_num = 0;
            while (mySchoolsRS.isValidRow()) {
                row_num++;
                var sName = mySchoolsRS.fieldByName("name");
                var row = Ti.UI.createPickerRow({
                    title: sName
                });
                column.addRow(row);
                mySchoolsRS.next();
            }
            mySchoolsRS.close();
        }
        $.schoolPickerField.add([ column ]);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AddProfile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.profileAddWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Add Student Profile",
        layout: "vertical",
        id: "profileAddWindow"
    });
    $.__views.profileAddWindow && $.addTopLevelView($.__views.profileAddWindow);
    $.__views.profileInputForm = Ti.UI.createScrollView({
        id: "profileInputForm",
        layout: "vertical"
    });
    $.__views.profileAddWindow.add($.__views.profileInputForm);
    $.__views.nameTextField = Ti.UI.createTextField({
        top: 40,
        left: "10%",
        width: "80%",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        hintText: "Enter Student or Profile Name",
        color: "black",
        height: 30,
        id: "nameTextField"
    });
    $.__views.profileInputForm.add($.__views.nameTextField);
    $.__views.inputView = Ti.UI.createView({
        top: 5,
        height: 30,
        id: "inputView",
        layout: "horizontal"
    });
    $.__views.profileInputForm.add($.__views.inputView);
    $.__views.gradeLabelField = Ti.UI.createLabel({
        left: "10%",
        color: "blue",
        height: Ti.UI.SIZE,
        width: "80%",
        font: {
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
        id: "gradeLabelField"
    });
    $.__views.inputView.add($.__views.gradeLabelField);
    $.__views.gradeFieldSlider = Ti.UI.createSlider({
        min: 0,
        max: 12,
        value: 5,
        left: "5%",
        width: 150,
        height: 20,
        id: "gradeFieldSlider"
    });
    $.__views.inputView.add($.__views.gradeFieldSlider);
    $.__views.schoolPickerField = Ti.UI.createPicker({
        top: 10,
        id: "schoolPickerField",
        selectionIndicator: "true",
        useSpinner: "true"
    });
    $.__views.profileInputForm.add($.__views.schoolPickerField);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        left: "10%",
        color: "blue",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        font: {
            fontSize: 10,
            fontWeight: "normal",
            fontFamily: "Helvetica"
        },
        text: "* App will retrieve events and other useful info for the selected school",
        id: "__alloyId0"
    });
    $.__views.profileInputForm.add($.__views.__alloyId0);
    $.__views.teacherTextField = Ti.UI.createTextField({
        left: "10%",
        width: "80%",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        borderWidth: 2,
        font: {
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "Helvetica",
            fontStyle: "normal"
        },
        hintText: "Enter Teacher Name",
        color: "black",
        top: 10,
        height: 30,
        id: "teacherTextField"
    });
    $.__views.profileInputForm.add($.__views.teacherTextField);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        left: "10%",
        color: "blue",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        font: {
            fontSize: 10,
            fontWeight: "normal",
            fontFamily: "Helvetica"
        },
        text: "* App will retrieve e-mail and phone number from school directory",
        id: "__alloyId1"
    });
    $.__views.profileInputForm.add($.__views.__alloyId1);
    $.__views.saveButton = Ti.UI.createButton({
        title: "Save",
        top: "50dp",
        id: "saveButton"
    });
    $.__views.profileInputForm.add($.__views.saveButton);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var grade = 6;
    if ("iphone" === Ti.Platform.osname) {
        $.saveButton.style = Titanium.UI.iPhone.SystemButtonStyle.PLAIN;
        $.profileAddWindow.setRightNavButton($.saveButton);
    }
    $.gradeFieldSlider.text = $.gradeFieldSlider.value;
    initSchoolPickerList(grade);
    $.schoolPickerField.addEventListener("focus", function() {});
    $.gradeFieldSlider.addEventListener("change", function(e) {
        grade = Math.round(e.value);
        switch (grade) {
          case 0:
            $.gradeLabelField.text = "Grade: KG";
            break;

          case 1:
            $.gradeLabelField.text = "Grade: 1st";
            break;

          case 2:
            $.gradeLabelField.text = "Grade: 2nd";
            break;

          case 3:
            $.gradeLabelField.text = "Grade: 3rd";
            break;

          default:
            $.gradeLabelField.text = "Grade: " + grade + "th";
        }
    });
    $.saveButton.addEventListener("click", function() {
        if ("" == $.nameTextField.value) {
            alert("Error:\nStudent Profiel name field empty");
            return;
        }
        Ti.API.info("Saving new Profile: " + $.nameTextField.value + "," + $.schoolPickerField.getSelectedRow(0).title + "," + $.gradeLabelField.text + "," + $.teacherTextField.value);
        var profileModel = Alloy.createModel("profile", {
            name: $.nameTextField.value,
            grade: $.gradeLabelField.text,
            school: $.schoolPickerField.getSelectedRow(0).title,
            teacher: $.teacherTextField.value
        });
        profileModel.save();
        Ti.API.info("Profile: " + $.nameTextField.value + " has been saved");
        profileCollection.fetch();
        $.profileAddWindow.close();
        profileCollection.trigger("change");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;