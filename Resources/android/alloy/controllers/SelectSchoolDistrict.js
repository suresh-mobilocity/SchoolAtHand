function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getSupportedSchoolsTableRows(e) {
        var rowData = [];
        for (var i = 0; i < e.files.length; i++) {
            var file = e.files[i];
            var filenameParts = file.name.split(".");
            var filenameExt = filenameParts[1];
            var filename = filenameParts[0];
            if ("db" === filenameExt) {
                var data = {
                    filename: filename,
                    fileurl: file.url,
                    fileid: file.id,
                    lastupdated: file.updated_at
                };
                var row = Ti.UI.createTableViewRow({
                    layout: "vertical",
                    left: "1%",
                    height: 80,
                    width: "98%",
                    borderWidth: 8,
                    color: "black",
                    borderColor: "gray",
                    data: data,
                    hasCheck: false
                });
                var recView = Ti.UI.createView({
                    layout: "hoizontal",
                    top: 0,
                    left: 0,
                    height: Ti.UI.SIZE,
                    width: Ti.UI.SIZE,
                    touchEnabled: false
                });
                var districtName = Ti.UI.createLabel({
                    top: 0,
                    text: filename,
                    textAlight: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    left: "4%",
                    height: 80,
                    width: "96%",
                    font: {
                        fontSize: 16,
                        fontWeight: "bold"
                    },
                    color: "black",
                    touchEnabled: false
                });
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
        supportedSchools.removeAllChildren();
        supportedSchools = null;
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
        width: "98%",
        height: 80,
        color: "blue",
        top: 0,
        left: "2%",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        text: "Currently the following School Districts are supported\n. Select yours by clicking the school district",
        id: "hintLabel"
    });
    $.__views.hintView.add($.__views.hintLabel);
    $.__views.buttonLayout = Ti.UI.createView({
        layout: "horizontal",
        borderColor: "#336699",
        top: "80%",
        id: "buttonLayout"
    });
    $.__views.selectSchoolDistrict.add($.__views.buttonLayout);
    $.__views.buttonExit = Ti.UI.createButton({
        title: "Exit",
        backgroundColor: "#336699",
        width: "40%",
        top: "10%",
        left: "5%",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        color: "white",
        borderColor: "#336699",
        borderRadius: 8,
        id: "buttonExit",
        visible: "true"
    });
    $.__views.buttonLayout.add($.__views.buttonExit);
    $.__views.buttonNext = Ti.UI.createButton({
        title: "Next",
        backgroundColor: "#336699",
        top: "10%",
        width: "40%",
        left: "5%",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        color: "white",
        borderColor: "#336699",
        borderRadius: 8,
        id: "buttonNext",
        visible: "false"
    });
    $.__views.buttonLayout.add($.__views.buttonNext);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var selectedSchoolDistrict = null;
    var dbUrl = null;
    var dbLastUpdated = null;
    var supportedSchools = Titanium.UI.createTableView({
        width: "90%",
        top: "20%",
        height: Ti.UI.SIZE,
        borderColor: "gray",
        separatorColor: "#000000",
        borderWidth: 2
    });
    $.selectSchoolDistrict.addEventListener("close", destroy);
    $.selectSchoolDistrict.title = "Select Your School District";
    Cloud.Files.query({
        page: 1,
        per_page: 20
    }, function(e) {
        if (e.success) {
            var rowData = getSupportedSchoolsTableRows(e);
            supportedSchools.setData(rowData);
            $.selectSchoolDistrict.add(supportedSchools);
        }
    });
    supportedSchools.addEventListener("click", function(e) {
        supportedSchools.touchEnabled = false;
        supportedSchools.bubbleParent = false;
        e.row.setBackgroundColor("#336699");
        e.row.setHasCheck(true);
        var rows = supportedSchools.data[0].rows;
        for (x in rows) rows[x].tochEnabled = false;
        selectedSchoolDistrict = e.rowData.data.filename;
        dbUrl = e.rowData.data.fileurl;
        dbLastUpdated = e.rowData.data.lastupdated;
        Ti.API.info("Selected School District : " + selectedSchoolDistrict + "dbUrl:" + dbUrl + "dbLastUpdated:" + dbLastUpdated);
        $.buttonNext.show();
    });
    $.buttonNext.addEventListener("click", function() {
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
    });
    $.buttonExit.addEventListener("click", function() {
        selectedSchoolDistrict = null;
        dbUrl = null;
        dbLastUpdated = null;
        Ti.App.fireEvent("close", {
            message: "SeclectSchoolDistrict Aborted"
        });
        $.selectSchoolDistrict.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;