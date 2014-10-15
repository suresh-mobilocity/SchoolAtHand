var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            profile_id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            name: "TEXT",
            school: "TEXT",
            grade: "TEXT",
            classname: "TEXT",
            teacher: "TEXT",
            url: "TEXT"
        },
        defaults: {
            name: "",
            school: "",
            grade: "",
            classname: "",
            teacher: "",
            url: "/images/profile.png"
        },
        adapter: {
            type: "sql",
            collection_name: "profiles",
            idAttribute: "profile_id"
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

model = Alloy.M("profile", exports.definition, []);

collection = Alloy.C("profile", exports.definition, model);

exports.Model = model;

exports.Collection = collection;