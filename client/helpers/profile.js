Template.profile.helpers({
	companiesCount: function() {
		try {
			return Meteor.users.findOne(this._id).profile.companies.length;
		} catch(e) {
			return 0;
		}
	},
});