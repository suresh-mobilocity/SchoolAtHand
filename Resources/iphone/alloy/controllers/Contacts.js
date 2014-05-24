function Controller() {
    function __alloyId18(e) {
        if (e && e.fromAdapter) return;
        __alloyId18.opts || {};
        var models = __alloyId17.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId14 = models[i];
            __alloyId14.__transform = {};
            var __alloyId16 = Alloy.createController("ContactRow", {
                $model: __alloyId14,
                __parentSymbol: __parentSymbol
            });
            rows.push(__alloyId16.getViewEx({
                recurse: true
            }));
        }
        $.__views.contactsTable.setData(rows);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Contacts";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("contacts");
    $.__views.districtContacts = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        id: "districtContacts",
        title: "Contacts"
    });
    $.__views.districtContacts && $.addTopLevelView($.__views.districtContacts);
    $.__views.searchContacts = Ti.UI.createSearchBar({
        barColor: "#000",
        color: "#fff",
        showCancel: "true",
        height: "43",
        top: 0,
        hintText: "Enter title or name or school",
        id: "searchContacts"
    });
    $.__views.districtContacts.add($.__views.searchContacts);
    $.__views.contactsTable = Ti.UI.createTableView({
        separatorColor: "#000000",
        height: Ti.UI.SIZE,
        backgroundColor: "#33B5E5",
        id: "contactsTable",
        filterAttribute: "filter"
    });
    $.__views.districtContacts.add($.__views.contactsTable);
    var __alloyId17 = Alloy.Collections["contacts"] || contacts;
    __alloyId17.on("fetch destroy change add remove reset", __alloyId18);
    $.__views.loading = Alloy.createWidget("com.appcelerator.loading", "widget", {
        id: "loading",
        message: "loading",
        __parentSymbol: $.__views.districtContacts
    });
    $.__views.loading.setParent($.__views.districtContacts);
    exports.destroy = function() {
        __alloyId17.off("fetch destroy change add remove reset", __alloyId18);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.parentController = args.parentTab;
    $.districtContacts.title = "Contacts";
    var contacts = Alloy.Collections.contacts;
    var Pager = function() {
        var page = 1;
        this.next = function() {
            page++;
            return page;
        };
    };
    new Pager();
    $.searchContacts.addEventListener("change", function() {});
    $.searchContacts.addEventListener("focus", function() {});
    $.searchContacts.addEventListener("search", function(e) {
        $.searchContacts.blur();
        var sql = "SELECT * FROM contacts where name like '" + e.value + "%'" + "UNION SELECT * FROM contacts where title like + " + "'%" + e.value + "%'" + "UNION SELECT * FROM contacts where building like " + "'" + e.value + "%'";
        contacts.fetch({
            query: sql
        });
    });
    $.searchContacts.addEventListener("return", function(e) {
        $.searchContacts.blur();
        var sql = "SELECT * FROM contacts where name like '%" + e.value + "%'" + "UNION SELECT * FROM contacts where title like + " + "'%" + e.value + "%'" + "UNION SELECT * FROM contacts where building like " + "'" + e.value + "%'";
        contacts.fetch({
            query: sql
        });
    });
    $.searchContacts.addEventListener("cancel", function() {
        $.searchContacts.blur();
        $.searchContacts.value = "";
    });
    $.contactsTable.addEventListener("scroll", function() {
        if ("" != $.searchContacts.value) return;
    });
    $.districtContacts.addEventListener("blur", function() {
        $.destroy();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;