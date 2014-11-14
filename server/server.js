Meteor.publish("allCompanies", function() {
	return Companies.find();
});

Meteor.publish("usersFromMyCompanies", function(companies) {
	if(!(companies instanceof Array)) return;
	return Meteor.users.find({'profile.companies': { $in: companies }});
});

Meteor.publish("projectsFromMyCompanies", function(companies) {
	if(!(companies instanceof Array)) return;
	return Projects.find({companyId: { $in: companies }});
});

Meteor.publish("tasksFromProject", function(projectId) {
	return Tasks.find({projectId: projectId});
});