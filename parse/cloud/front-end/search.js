'use strict';

const searchFields = ['name', 'address', 'description', 'contacts', 'schedule'];

function getCanonicalName (object) {
    const name = searchFields.map(function (filed) {
        if (object.get(filed)) {
            return String(object.get(filed)).toLowerCase();
        }
    });

    return name.join(' ');
}

Parse.Cloud.beforeSave('Object', function(request, response) {
    const canonicalName = getCanonicalName(request.object);

    request.object.set({ canonicalName });

    response.success();
});

Parse.Cloud.job('front-EndSearch', function(request, status) {
    let result = [];

    const processCallback = function(res) {
        result = result.concat(res);
        if (res.length === 1000) {
            process(res[res.length-1].id);
            return;
        }

        let objects = [];

        result.forEach((object) => {
            object.set('canonicalName', getCanonicalName(object));
            objects.push(object);
        });

        Parse.Object.saveAll(objects).then((list) => {
            console.log(`[Front-End Search] Successfully updated ${list.length} rows`);
            status.success(`Successfully updated ${list.length} rows`);
        }, (error) => {
            console.log('[Front-End Search] Error:');
            console.log(error);
        });

    };

    const process = function(skip) {
        const query = new Parse.Query("Object");

        if (skip) {
            query.greaterThan("objectId", skip);
        }
        query.limit(1000);
        query.ascending("objectId");
        query.find().then(function querySuccess(res) {
            processCallback(res);
        }, function queryFailed(reason) {
            status.error("query unsuccessful, length of result " + result.length + ", error:" + error.code + " " + error.message);
        });
    };

    process(false);
});