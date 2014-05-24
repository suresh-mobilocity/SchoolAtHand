exports.definition = {
	config: {
		// No need to define columns object, loading the db_file
		// below will do that for us.

		"adapter": {
			"type": "sql",

			// The table name inside the sqlite database to use for
			// models and collections based on this definition.
			"collection_name": "contacts",

			// db_file tells model to use myapp.sqlite file to install
			// database
			"db_file": "/schoolDB.sqlite",

			"db_name": "contacts",

			// idAttribute tells Alloy/Backbone to use this column in
			// my table as its unique identifier field. Without
			// specifying this, Alloy's default behavior is to create
			// and "alloy_id" field which will uniquely identify your
			// rows in the table.
			"idAttribute": "id",

			// remoteBackup tells Alloy to set the value of the property
			// Ti.Filesystem.File.remoteBackup. This setting tells iOS
			// whether or not to allow your database to be backed up to
			// iCloud or in iTunes backups.
			"remoteBackup": false
		}
	},
	 extendModel : function(Model) {
        _.extend(Model.prototype, {
 
        });
        // end extend
 
        return Model;
    },
     extendCollection : function(Collection) {
        _.extend(Collection.prototype, {
 
            deleteAll : function() {
 
                var collection = this;
 
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
 
                collection.trigger('sync');
 				Ti.API.info("Deleting all recors from contacts");
            },
 
            saveAll : function() {
                var collection = this;
 
                var dbName = collection.config.adapter.db_name;
                var table = collection.config.adapter.collection_name;
                var columns = collection.config.columns;
 
 
                db = Ti.Database.open(dbName);
                db.execute("BEGIN;");
                
                collection.each(function(model) {
 
                    if (!model.id) {
                        model.id = guid();
                        model.attributes[model.idAttribute ] = model.id;
                    }
                    var names = [], values = [], q = [];
                    for (var k in columns) {
                        names.push(k);
                        values.push(model.get(k));
                        q.push("?");
                    }
                    var sqlInsert = "INSERT INTO " + table + " (" + names.join(",") + ") VALUES (" + q.join(",") + ");";
 
                    db.execute(sqlInsert, values);
 
                });
                
                db.execute("COMMIT;");
                db.close();
 
                collection.trigger('sync');
            }
        });
        return Collection;
    }
};