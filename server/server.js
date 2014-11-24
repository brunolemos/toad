Meteor.publish("allCompanies", function() {
	return Companies.find();
});

Meteor.publish("peopleFromCompanies", function(companies) {
	if(!(companies && companies.length > 0)) return [];
	return Meteor.users.find({'profile.companies': { $in: companies }});
});

Meteor.publish("projectsFromMyCompanies", function() {
	if(!this.userId) return [];
	
	var user = Meteor.users.findOne(this.userId);
	var companies = user.profile.companies;
	if(!(companies && companies.length > 0)) return [];

	
	return Projects.find({companyId: { $in: companies }});
});

Meteor.publish("tasksFromProject", function(projectId) {
	return Tasks.find({projectId: projectId});
});