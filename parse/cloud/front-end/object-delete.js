'use strict';

Parse.Cloud.afterDelete('Object', function(request) {
    Parse.Cloud.useMasterKey();

    const user = request.object.get('user');

    if (user) {
        user.destroy().catch((e) => {
            console.log(e);
        });
    }

});