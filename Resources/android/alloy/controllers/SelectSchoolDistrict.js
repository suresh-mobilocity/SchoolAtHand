function Controller() {
    function getSupportedSchoolsTableRows(e) {
        var rowData = [];
        for (var i = 0; e.files.length > i; i++) {
            var file = e.files[i];
            var filenameParts = file.name.split(".");
            var filenameExt = filenameParts[1];
            var filename = filenameParts[0];
            if ("db" === filenameExt) {
                var row = Ti.UI.createTableViewRow({
                    layout: "vertical",
                    left: "1%",
                    height: 80,
                    width: "98%",
                    backgroundColor: "#336699",
                    borderWidth: 8,
                    borderColor: "gray"
                });
                var recView = Ti.UI.createView({
                    layout: "hoizontal",
                    top: 0,
                    left: 0,
                    height: Ti.UI.SIZE,
                    width: Ti.UI.SIZE
                });
                var districtName = Ti.UI.createLabel({
                    top: 0,
                    text: filename,
                    textAlight: Ti.UI.TEXT_ALIGNMENT_LEFT,
                    left: 100,
                    height: 80,
                    width: Ti.UI.SIZE,
                    font: {
                        fontSize: 16,
                        fontWeight: "bold"
                    },
                    color: "white"
                });
                var selectionSwitch = Ti.UI.createSwitch({
                    top: 0,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    height: 80,
                    left: 20,
                    value: false,
                    filename: filename,
                    fileid: file.id,
                    fileurl: file.url,
                    lastupdated: file.updated_at
                });
                selectionSwitch.setStyle(Ti.UI.Android.SWITCH_STYLE_CHECKBOX);
                selectionSwitch.addEventListener("change", function(e) {
                    if (e.value) {
                        selectedSchoolDistrict = e.source.filename;
                        dbUrl = e.source.fileurl;
                        dbLastUpdated = e.source.lastupdated;
                    }
                    $.dialog.show();
                });
                recView.add(selectionSwitch);
                recView.add(districtName);
                row.add(recView);
                rowData.push(row);
            }
        }
        return rowData;
    }
    function updateContacts() {
        var sql = "SELECT * FROM contacts";
        Alloy.Globals.contacts.deleteAll();
        var tmpRS = schoolDB.execute(sql);
        if (tmpRS.getRowCount() > 0) {
            while (tmpRS.isValidRow()) {
                var fid = tmpRS.fieldByName("id");
                var fname = tmpRS.fieldByName("name");
                var ftitle = tmpRS.fieldByName("title");
                var fdepartment = tmpRS.fieldByName("department");
                var fbuilding = tmpRS.fieldByName("building");
                var fphonenum = tmpRS.fieldByName("phonenum");
                var fext = tmpRS.fieldByName("ext");
                var femailaddr = tmpRS.fieldByName("emailaddr");
                var newContact = Alloy.createModel("contacts", {
                    id: fid,
                    name: fname,
                    title: ftitle,
                    department: fdepartment,
                    building: fbuilding,
                    phonenum: fphonenum,
                    ext: fext,
                    emailaddr: femailaddr
                });
                Alloy.Globals.contacts.add(newContact);
                tmpRS.next();
            }
            tmpRS.close();
            Alloy.Globals.contacts.saveAll();
        }
    }
    function updateSchools() {
        var sql = "SELECT * FROM schools";
        Alloy.Globals.school.config.columns;
        Alloy.Globals.school.deleteAll();
        var tmpRS = schoolDB.execute(sql);
        if (tmpRS.getRowCount() > 0) {
            while (tmpRS.isValidRow()) {
                var newSchool = Alloy.createModel("school", {
                    earlyreleasehours: tmpRS.fieldByName("earlyreleasehours"),
                    delayedhours: tmpRS.fieldByName("delayedhours"),
                    regularhours: tmpRS.fieldByName("regularhours"),
                    name: tmpRS.fieldByName("name"),
                    shortname: tmpRS.fieldByName("shortname"),
                    type: tmpRS.fieldByName("type"),
                    principal: tmpRS.fieldByName("principal"),
                    principal_emailaddr: tmpRS.fieldByName("principal_emailaddr"),
                    assistantprincipal: tmpRS.fieldByName("assistantprincipal"),
                    assistantprincipal_emailaddr: tmpRS.fieldByName("assistantprincipal_emailaddr"),
                    antibullyingspecialist: tmpRS.fieldByName("antibullyingspecialist"),
                    antibullyingspecialist_emailaddr: tmpRS.fieldByName("antibullyingspecialist_emailaddr"),
                    websiteurl: tmpRS.fieldByName("websiteurl"),
                    imagefile: tmpRS.fieldByName("imagefile"),
                    logofile: tmpRS.fieldByName("logofile"),
                    address1: tmpRS.fieldByName("address1"),
                    address2: tmpRS.fieldByName("address2"),
                    city: tmpRS.fieldByName("city"),
                    state: tmpRS.fieldByName("state"),
                    zipcode: tmpRS.fieldByName("zipcode"),
                    phone: tmpRS.fieldByName("phone"),
                    fax: tmpRS.fieldByName("fax"),
                    longitude: tmpRS.fieldByName("longitude"),
                    latitude: tmpRS.fieldByName("latitude"),
                    id: tmpRS.fieldByName("id")
                });
                Alloy.Globals.school.add(newSchool);
                tmpRS.next();
            }
            tmpRS.close();
            Alloy.Globals.school.saveAll();
        }
    }
    function destroy() {
        $.selectSchoolDistrict.removeEventListener("close", destroy);
        $.destroy();
        selectedSchoolDistrict = null;
        dbUrl = null;
        dbLastUpdated = null;
        $.selectSchoolDistrict.removeAllChildren();
        $ = null;
    }
    function downloadAndInstallResourceFiles() {
        var imagesZipfile = selectedSchoolDistrict + ".zip";
        Cloud.Files.query({
            where: {
                name: imagesZipfile
            }
        }, function(e) {
            if (e.success) if (e.files.length > 0) {
                var file = e.files[0];
                unzipAndInstallImageFile(file);
            } else closeApp(); else $.selectSchoolDistrict.close();
        });
    }
    function closeApp() {
        $.selectSchoolDistrict.removeAllChildren();
        var alertDialog = Ti.UI.createAlertDialog({
            message: "Please Reopen the Application",
            ok: "OK",
            title: "Configuration Complete!"
        });
        alertDialog.addEventListener("click", function() {
            $.selectSchoolDistrict.close();
        });
        alertDialog.show();
    }
    function unzipAndInstallImageFile(remoteFile) {
        var loadingImagesProgress = Alloy.createController("ProgressIndicator", {
            message: "Setting up configuration for \n" + selectedSchoolDistrict
        }).getView();
        loadingImagesProgress.open();
        var imagesDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "images");
        imagesDir.exists() || imagesDir.createDirectory();
        var localZipfile = Ti.Filesystem.getFile(imagesDir.resolve(), "tempImages.zip");
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function() {
            localZipfile.write(this.responseData);
            require("ti.compression").unzip(imagesDir.resolve(), localZipfile.resolve(), true);
            loadingImagesProgress.close();
            localZipfile.deleteFile();
            closeApp();
        };
        xhr.open("GET", remoteFile.url);
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "SelectSchoolDistrict";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.selectSchoolDistrict = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "selectSchoolDistrict",
        fullscreen: "true",
        exitOnClose: "true"
    });
    $.__views.selectSchoolDistrict && $.addTopLevelView($.__views.selectSchoolDistrict);
    $.__views.hintView = Ti.UI.createView({
        top: 0,
        height: "20%",
        id: "hintView",
        backgroundColor: "#ffffff"
    });
    $.__views.selectSchoolDistrict.add($.__views.hintView);
    $.__views.hintLabel = Ti.UI.createLabel({
        top: 0,
        left: "1%",
        height: 80,
        width: "98%",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        color: "blue",
        text: "Currently the following School Districts are supported. Select yours.",
        id: "hintLabel"
    });
    $.__views.hintView.add($.__views.hintLabel);
    var __alloyId86 = [];
    __alloyId86.push("Confirm");
    __alloyId86.push("Exit");
    $.__views.dialog = Ti.UI.createOptionDialog({
        options: __alloyId86,
        id: "dialog",
        title: "Confirm School District"
    });
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var selectedSchoolDistrict = null;
    var dbUrl = null;
    var dbLastUpdated = null;
    $.dialog.addEventListener("click", function(e) {
        if (2 > e.index) if (0 == e.index) {
            var loadingDBProgress = Alloy.createController("ProgressIndicator", {
                message: "Loading configuration for \n" + selectedSchoolDistrict
            }).getView();
            loadingDBProgress.open();
            var databaseDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "databases");
            databaseDir.exists() || databaseDir.createDirectory();
            var databaseFile = Ti.Filesystem.getFile(databaseDir.resolve(), "schoolDB.sqlite");
            var xhr = Ti.Network.createHTTPClient();
            xhr.onload = function() {
                databaseFile.write(this.responseData);
                loadingDBProgress.close();
                schoolDB = Ti.Database.install(databaseFile.getNativePath(), "schoolDBDownloaded");
                updateContacts();
                updateSchools();
                Ti.App.Properties.setBool("dbinstalled", true);
                Ti.App.Properties.setString("dbversion", dbLastUpdated);
                Ti.App.Properties.setString("dbname", selectedSchoolDistrict + ".db");
                Ti.App.Properties.setString("UserSchoolDistrict", selectedSchoolDistrict);
                databaseFile.deleteFile();
                downloadAndInstallResourceFiles();
            };
            xhr.open("GET", dbUrl);
            xhr.send();
        } else if (1 == e.index) {
            selectedSchoolDistrict = null;
            dbUrl = null;
            dbLastUpdated = null;
        }
    });
    $.selectSchoolDistrict.addEventListener("close", destroy);
    $.selectSchoolDistrict.title = "Select Your School District";
    Cloud.Files.query({
        page: 1,
        per_page: 20
    }, function(e) {
        if (e.success) {
            var rowData = getSupportedSchoolsTableRows(e);
            var supportedSchools = Titanium.UI.createTableView({
                data: rowData,
                width: "90%",
                top: "20%",
                height: Ti.UI.SIZE,
                separatorColor: "#000000"
            });
            $.selectSchoolDistrict.add(supportedSchools);
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;