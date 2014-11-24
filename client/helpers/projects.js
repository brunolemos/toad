Template.projects.helpers({
	myProjectsCount: function() {
		var companies = Meteor.user().profile.companies;
		if(!(companies && companies.length >= 0)) companies = [];

		return Projects.find({createdBy: Meteor.userId(), companyId: { $in: companies }}).count();
	},

	allProjectsCount: function() {
		var companies = Meteor.user().profile.companies;
		if(!(companies && companies.length >= 0)) companies = [];
		
		return Projects.find({companyId: { $in: companies }}).count();
	},
});