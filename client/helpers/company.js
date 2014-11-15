Template.company.helpers({
	membersCount: function() {
		return Meteor.users.find({'profile.companies': this._id}).count();
	},

	projectsCount: function() {
		return Projects.find({companyId: this._id}).count();
	},
});