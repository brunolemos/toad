Session.setDefault('isSignup', false);

Template.login.created = function() {
	Session.set('form_email', '');
};

// sessionBind(Template.login);
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
	}
});