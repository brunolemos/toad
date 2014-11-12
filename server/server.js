Meteor.publish("allCompanies", function() {
	return Companies.find();
});

Meteor.publish("usersFromMyCompanies", function(companies) {
	if(companies instanceof Array) {
		return Meteor.users.find({'profile.companies': { $in: companies }});
	}

	return null;
});

Meteor.publish("projectsFromMyCompanies", function(companies) {
	if(companies instanceof Array) {
		return Projects.find({companyId: { $in: companies }});
	}

	return null;
});

Meteor.publish("tasksFromMyCompanies", function(companies) {
	if(companies instanceof Array) {
		var projectIds = [];
		var projects = Projects.find({companyId: { $in: companies }}).fetch();

		for(var i = 0; i < projects.length; i++) {
			projectIds.push(projects[i]._id);
		}

		return Tasks.find({projectId: { $in: projectIds }});
	}

	return null;
});