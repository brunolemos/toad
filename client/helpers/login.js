Session.setDefault('isSignup', false);

Template.login.created = function() {
	Session.set('form_email', '');
	Session.set('error', null);
};

Template.login.helpers({
	isSignup: function() {
		return Session.get('isSignup');
	},

	avatar: function() {
		var email = Session.get('form_email');

		return Gravatar.imageUrl(email, {
		    size: 150,
		    default: 'mm'
		});
	},

	company: function() {
		var email = Session.get('form_email');
		var user = Meteor.users.findOne({"emails.address": email});
		if(!user) return null;

		try	{
			return company = Companies.findOne(user.profile.companies[0]);

		} catch(e) {
			return null;
		}
	},
});