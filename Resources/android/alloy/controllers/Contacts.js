function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId19(e) {
        if (e && e.fromAdapter) return;
        __alloyId19.opts || {};
        var models = filterRows(__alloyId18);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId15 = models[i];
            __alloyId15.__transform = {};
            var __alloyId17 = Alloy.createController("ContactRow", {
                $model: __alloyId15,
                __parentSymbol: __parentSymbol
            });
            rows.push(__alloyId17.getViewEx({
                recurse: true
            }));
        }
        $.__views.contactsTable.setData(rows);
    }
    function filterRows(collection) {
        var recCount = collection.models.length;
        $.noResults.text = 0 === recCount ? "No contacts found" : 1 === recCount ? "Found 1contact" : "Found " + recCount + " of contacts";
        return collection.models;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Contacts";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("contacts");
    $.__views.districtContacts = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        id: "districtContacts",
        title: "Contacts",
        className: "container"
    });
    $.__views.districtContacts && $.addTopLevelView($.__views.districtContacts);
    $.__views.searchContacts = Ti.UI.createSearchBar({
        barColor: "#000",
        color: "#fff",
        backgroundColor: "fff",
        showCancel: "true",
        height: "10%",
        top: 0,
        hintText: "Enter title or name or school",
        id: "searchContacts"
    });
    $.__views.districtContacts.add($.__views.searchContacts);
    $.__views.noResults = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "50dp",
        color: "#000",
        backgroundColor: "#fff",
        textAlign: "center",
        text: "No results found",
        id: "noResults"
    });
    $.__views.contactsTable = Ti.UI.createTableView({
        left: 0,
        width: Ti.UI.FILL,
        separatorColor: "#000000",
        height: "90%",
        backgroundColor: "#ffffff",
        headerView: $.__views.noResults,
        id: "contactsTable"
    });
    $.__views.districtContacts.add($.__views.contactsTable);
    var __alloyId18 = Alloy.Collections["contacts"] || contacts;
    __alloyId18.on("fetch destroy change add remove reset", __alloyId19);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        color: "black",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 16,
            fontWeight: "bold"
        },
        message: "Searching...",
        top: 20,
        left: "30%",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        id: "activityIndicator"
    });
    $.__views.districtContacts.add($.__views.activityIndicator);
    exports.destroy = function() {
        __alloyId18.off("fetch destroy change add remove reset", __alloyId19);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.districtContacts.title = "Contacts";
    var contacts = Alloy.Collections.contacts;
    $.contactsTable.visible = false;
    $.searchContacts.addEventListener("change", function() {});
    $.searchContacts.addEventListener("focus", function() {});
    $.searchContacts.addEventListener("search", function(e) {
        $.searchContacts.blur();
        var sql = "SELECT * FROM contacts where name like '" + e.value + "%'UNION SELECT * FROM contacts where title like + '%" + e.value + "%'UNION SELECT * FROM contacts where building like '" + e.value + "%'";
        contacts.fetch({
            query: sql,
            success: function() {
                $.loading.setOpacity(0);
            }
        });
    });
    $.searchContacts.addEventListener("return", function(e) {
        $.activityIndicator.show();
        $.searchContacts.blur();
        var sql = "SELECT * FROM contacts where name like '%" + e.value + "%'UNION SELECT * FROM contacts where title like + '%" + e.value + "%'UNION SELECT * FROM contacts where building like '" + e.value + "%'";
        contacts.fetch({
            query: sql,
            success: function() {
                $.contactsTable.visible = true;
                $.activityIndicator.hide();
            }
        });
    });
    $.searchContacts.addEventListener("cancel", function() {
        $.searchContacts.blur();
        $.searchContacts.value = "";
    });
    $.contactsTable.addEventListener("scroll", function() {
        if ("" != $.searchContacts.value) return;
    });
    $.districtContacts.addEventListener("blur", function() {});
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;