exports.definition = {
	config: {

 	"columns" : {
 			"profile_id" : "INTEGER PRIMARY KEY AUTOINCREMENT",
            "name" : "TEXT",
            "school" : "TEXT",
            "grade" : "TEXT",
            "classname" : "TEXT",
            "teacher" : "TEXT",
            "url" : "TEXT"
        },
        "defaults" : {
            "name" : "",
            "school" : "",
            "grade" : "",
            "classname" : "",
            "teacher" : "",
            "url" : "/images/profile.png"
        },

		adapter: {
			type: "sql",
			collection_name: "profiles",
			idAttribute: "profile_id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};