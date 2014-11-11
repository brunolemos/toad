Session.setDefault('isCreateCompany', true);

Template.createFirstCompany.created = function() {
	Session.set('companyFacebookId', null);
	Session.set('error', null);
};

Template.createFirstCompany.helpers({
	isCreateCompany: function() {
		return Session.get('isCreateCompany');
	},

	facebookId: function() {
		return Session.get('companyFacebookId');
	},

	company: function() {
		return null;
	},
});