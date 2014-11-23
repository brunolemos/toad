Template.projects.helpers({
	myProjectsCount: function() {
		var companies = Meteor.user().profile.companies;
		return Projects.find({companyId: { $in: companies }}).count();
	},

	completedProjectsCount: function() {
		return 0;
	},
});