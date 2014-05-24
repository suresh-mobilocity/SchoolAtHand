exports.definition = {
	config: {

 	"columns" : {
 			"notificationid" : "INTEGER PRIMARY KEY AUTOINCREMENT",
 			"datetime": "TEXT",
 			"alerttype": "TEXT",
            "category" : "TEXT",
            "badge" : "TEXT",
            "title" : "TEXT",
            "message" : "TEXT",
        },
        "defaults" : {
            "datetime": "",
            "category" : "",
            "title" : "",
            "badge" : "",
            "message" : "",
        },

		adapter: {
			type: "sql",
			collection_name: "notifications",
			idAttribute: "notificationid"
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