Meteor.publish("allCompanies", function() {
	return Companies.find();
});

Meteor.publish("peopleFromCompanies", function(companies) {
	if(!(companies instanceof Array)) return;
	return Meteor.users.find({'profile.companies': { $in: companies }});
});

Meteor.publish("projectsFromMyCompanies", function() {
	if(!this.userId) return;
	
	var user = Meteor.users.findOne(this.userId);
	var companies = user.profile.companies;
	return Projects.find({companyId: { $in: companies }});
});

Meteor.publish("tasksFromProject", function(projectId) {
	return Tasks.find({projectId: projectId});
});