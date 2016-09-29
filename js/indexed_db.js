$(function(){

    var db;

    function open_db(DB_NAME, version){
        console.log('open');
        if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        }

        var request = window.indexedDB.open(DB_NAME, version);

        request.onerror = function(event) {
            console.log('Error openning the DB');
            console.log(event);
            localStorage['db_is_open'] = 'false';
        };

        request.onsuccess = function(event){
            console.log('request.onsuccess');
            db = this.result;
            console.log(db);
            db.onerror = function(event) {
                // Generic error handler for all errors targeted at this database's
                // requests!
                alert("Database error: " + event.target.errorCode);
                console.log(event)
            };

            console.log("openDb DONE");
            localStorage['db_is_open'] = 'true';
            localStorage['db_version'] = version;
        };

        request.onupgradeneeded = function(event) {
            
            console.log("openDb.onupgradeneeded");

            var database = event.currentTarget.result;

            var entityStore = database.createObjectStore("entitys",
                {keyPath: "id", autoIncrement: false});
            entityStore.createIndex("name", "name", {unique: false});
            

            var shareStore = database.createObjectStore("shares",
                {keyPath: "id", autoIncrement: false});
            shareStore.createIndex('child', 'child', {unique:false});
            shareStore.createIndex('parent', 'parent', {unique:false})
            
        };
    }   

    function getObjectStore(store_name, mode) {
        var tx = db.transaction(store_name, mode);
        return tx.objectStore(store_name);
    }

    function clearObjectStore(store_name, onsuccess) {
        var store = getObjectStore(store_name, 'readwrite');
        var req = store.clear();
        req.onsuccess = onsuccess();
        req.onerror = function (evt) {
          console.error("clearObjectStore:", evt.target.errorCode);
        };
      }

    function add_to_store(store_name, data){
        var store = getObjectStore(store_name, 'readwrite');
        var req = store.add(data);
        req.onsuccess = function(event){
            console.log("(add_to_store) Insertion in DB successful for " + store_name);
        };
        req.onerror = function() {
          console.error("add_to_store error", this.error);
        };
    }

    function fetch_data_server(){
        $.post({
            url:'https://localhost:8000/medias/get_data/',
            success:function(message){
                console.log('Got data from Server');
                return message
            }
        }).fail(function(e){
            console.log(e);
        });
    }

    function is_empty(store_name){
        var req;
        var store = getObjectStore(store_name, 'readwrite');
        req = store.count();
        req.onsuccess = function(evt) {
          var count = evt.target.result;
          if (count == 0){
            console.log('Count is 0, filling in store ' + store_name);
            return true
          } else {
            return false
          }
        };
        req.onerror = function(evt) {
          console.error("is_empty error", this.error);
        };
    }

    function fill_in_database(){
        console.log('Filling Database');
        var entitys_empty = is_empty('entitys');
        var shares_empty = is_empty('shares');
        console.log('Entitys Empty : ' + entitys_empty);
        console.log('Shares Empty : ' + shares_empty);
        if (shares_empty == true|| entitys_empty == true){
            console.log('An object store is empty, fetching data from server');
            var data = fetch_data_server();
            if (shares_empty == true){
                add_to_store('shares', data['shares'])
            }
            if (entitys_empty == true){
                add_to_store('entitys', data['entitys'])
            }
        }
    }

    function reset_database(){ 
        console.log('Resetting Database');
        clearObjectStore('entitys', function(){
            console.log('Entitys object store cleared' )
        });
        clearObjectStore('shares', function(){
            console.log('Shares object store cleared' )
        });
        fill_in_database()
    }

    $('#load_database_button').click(function(e){
        open_db("Medias", 1);
        fill_in_database()
    });

    $('#reset_database_button').click(function(e){
        reset_database()
    })



});