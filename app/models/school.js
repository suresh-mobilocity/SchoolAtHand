exports.definition = 
{
	config: {
	adapter : {
			"type": "sql",
			"collection_name": "schools",
			//"db_file": "/sbsddatabase.sqlite",
			"db_file": "/schoolDB.sqlite",
			"db_name": "schoolDB",
			//"idAttribute": "alloy_id",
			"idAttribute": "id",
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