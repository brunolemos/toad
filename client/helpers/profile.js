Template.profile.helpers({
	projectsCount: function() {
		return Projects.find({createdBy: this._id}).count();
	},

	companiesCount: function() {
		try {
			return Meteor.users.findOne(this._id).profile.companies.length;
		} catch(e) {
			return 0;
		}
	},
});