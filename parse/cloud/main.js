require('./front-end/search.js');

Parse.Cloud.define('updateUser', function(request, response) {
    if (!request.user) {
        response.error("Must be signed in to call this Cloud Function.")
        return;
    }

    var username = request.params.login;
    var password = request.params.password;
    var query = new Parse.Query(Parse.User);
    query.equalTo("objectId", request.params.userId);

    query.first({
        success: function(anotherUser) {
            anotherUser.set("username",username);
            anotherUser.set("email",username);
            if (password) {
                anotherUser.set("password",password);
            };
            anotherUser.save(null, {
                success: function() {
                    // The user was saved successfully.
                    response.success("Successfully updated user.");
                },
                error: function(error) {
                    console.log("Error updating user " + error.code + error.message);
                    response.error("Could not save changes to user.");
                },
                useMasterKey: true
            });
        },
        error: function(error) {
            console.log("Error loading user " + error.code + error.message);
            response.error("Could not find user.");
        },
        useMasterKey: true
    });
});


Parse.Cloud.define("sendPushToId", function (request, response) {
    var query = new Parse.Query(Parse.Installation);

    var message = request.params.message;
    var userId = request.params.userId;

    query.equalTo("userId", userId);

    Parse.Push.send({
        where: query,
        data: {
            alert: message
        }
    }, {
        success: function () {
            response.success();
        },
        error: function (error) {
            console.log("Error sending push " + error.code + error.message);
            response.error(error);
        },
        useMasterKey: true
    });
});

Parse.Cloud.define("sendPushToChannel", function (request, response) {
    var message = request.params.message;
    var userId = request.params.userId;

    Parse.Push.send({
        channels: request.params.channels,
        data: {
            alert: message
        }
    }, {
        success: function () {
            response.success();
        },
        error: function (error) {
            console.log("Error sending push " + error.code + error.message);
            response.error(error);
        },
        useMasterKey: true
    });
});