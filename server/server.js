userPublicFields = {emails: 1, profile: 1, services: 1};

Meteor.publish("allCompanies", function() {
	return Companies.find();
});

Meteor.publish("publicProfile", function(userId) {
	return Meteor.users.find({_id: userId}, userPublicFields);
});

Meteor.publish("peopleFromMyCompanies", function() {
	if(!this.userId) return [];
	
	var user = Meteor.users.findOne(this.userId);
	var companies = user.profile.companies;
	if(!(companies && companies.length > 0)) return [];

	return Meteor.users.find({'profile.companies': { $in: companies }});
});

Meteor.publish("peopleFromCompanies", function(companies) {
	if(!(companies && companies.length > 0)) return [];
	return Meteor.users.find({'profile.companies': { $in: companies }}, userPublicFields);
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