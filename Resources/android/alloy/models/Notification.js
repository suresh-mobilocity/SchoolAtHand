var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            notificationid: "INTEGER PRIMARY KEY AUTOINCREMENT",
            datetime: "TEXT",
            alerttype: "TEXT",
            category: "TEXT",
            badge: "TEXT",
            title: "TEXT",
            message: "TEXT"
        },
        defaults: {
            datetime: "",
            category: "",
            title: "",
            badge: "",
            message: ""
        },
        adapter: {
            type: "sql",
            collection_name: "notifications",
            idAttribute: "notificationid"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

model = Alloy.M("notification", exports.definition, []);

collection = Alloy.C("notification", exports.definition, model);

exports.Model = model;

exports.Collection = collection;