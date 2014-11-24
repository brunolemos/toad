Session.setDefault('isCreateCompany', true);

Template.newCompany.created = function() {
	Session.set('companyFacebookId', null);
	Session.set('error', null);
};

Template.newCompany.helpers({
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