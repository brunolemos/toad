Accounts.onCreateUser(function(options, user) {
    if (options.profile && user.services.facebook) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/";
        user.profile = options.profile;
    }
    
    return user;
});