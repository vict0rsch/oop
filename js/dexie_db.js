$(function(){


    var db = new Dexie('Medias');
    db.version(1).stores({
        entitys: "id, name, longName, website, wiki",
        shares: "id, share, special, child, parent"
    });

    // Populate from AJAX:
    db.on('ready', function () {
        // on('ready') event will fire when database is open but 
        // before any other queued operations start executing.
        // By returning a Promise from this event,
        // the framework will wait until promise completes before
        // resuming any queued database operations.
        // Let's start by using the count() method to detect if 
        // database has already been populated.
        return db.shares.count(function (count) {
            if (count > 0) {
                console.log("Already populated");
            } else {
                console.log("Database shares is empty. Populating from ajax call...");
                // We want framework to continue waiting, so we encapsulate
                // the ajax call in a Dexie.Promise that we return here.
                return new Dexie.Promise(function (resolve, reject) {
                    $.post({
                        url: 'https://localhost:8000/medias/get_data/',
                        success: function(data){
                            // Resolving Promise will launch then() below.
                            console.log(data['shares']);
                            resolve(data['shares'])
                        }
                    }).fail(function(e){
                        // Rejecting promise to make db.open() fail.
                        console.log(e);
                        reject(e)
                    });
                }).then(function (data) {
                    console.log("Got ajax response. We'll now add the objects.");
                    // By returning the db.transaction() promise, framework will keep
                    // waiting for this transaction to commit before resuming other
                    // db-operations.
                    return db.transaction('rw', db.shares, function () {
                        data.forEach(function (item) {
                            console.log("Adding object: " + JSON.stringify(item));
                            db.shares.add(item);
                        });
                    });
                }).then(function () {
                    console.log ("Transaction committed for shares");
                    return db.entitys.count(function (count) {
                        if (count > 0) {
                            console.log("Entitys Already populated");
                        } else {
                            console.log("Database Entity is empty. Populating from ajax call...");
                            // We want framework to continue waiting, so we encapsulate
                            // the ajax call in a Dexie.Promise that we return here.
                            return new Dexie.Promise(function (resolve, reject) {
                                $.post({
                                    url: 'https://localhost:8000/medias/get_data/',
                                    success: function(data){
                                        // Resolving Promise will launch then() below.
                                        console.log(data['entitys']);
                                        resolve(data['entitys'])
                                    }
                                }).fail(function(e){
                                    // Rejecting promise to make db.open() fail.
                                    console.log(e);
                                    reject(e)
                                });
                            }).then(function (data) {
                                console.log("Got ajax response. We'll now add the objects.");
                                // By returning the db.transaction() promise, framework will keep
                                // waiting for this transaction to commit before resuming other
                                // db-operations.
                                return db.transaction('rw', db.entitys, function () {
                                    data.forEach(function (item) {
                                        console.log("Adding object: " + JSON.stringify(item));
                                        db.entitys.add(item);
                                    });
                                });
                            }).then(function () {
                                console.log ("Transaction committed for entitys");
                            });
                        }
                    });
                });
            };
        });
    });

    db.open(); // Will resolve when data is fully populated (or fail if error)

    window.db = db;
    // Following operation will be queued until we're finished populating data:
    // db.someTable.each(function (obj) {
    //     // When we come here, data is fully populated and we can log all objects.
    //     console.log("Found object: " + JSON.stringify(obj));
    // }).then(function () {
    //     console.log("Finished.");
    // }).catch(function (error) {
    //     // In our each() callback above fails, OR db.open() fails due to any reason,
    //     // including our ajax call failed, this operation will fail and we will get
    //     // the error here!
    //     console.error(error.stack || error);
    //     // Note that we could also have catched it on db.open() but in this sample,
    //     // we show it here.
    // });
});