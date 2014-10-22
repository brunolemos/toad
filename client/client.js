Meteor.users._transform = function(user) {
	if(!user.profile) user.profile = {};
	var email = (user.emails && user.emails.length >= 1 ? user.emails[0].address : '');

	if (user.profile && user.services.facebook) {
		user.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?size=150";
	} else {
		user.profile.picture = Gravatar.imageUrl(email, {
		    size: 150,
		    default: 'mm'
		});
	}

	return user;
}