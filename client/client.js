Meteor.subscribe("allCompanies");

Deps.autorun(function() {
	try {
		var myCompanies = Meteor.user().profile.companies;
	} catch(e) {
		var myCompanies = null;
	}

	Meteor.subscribe("usersFromMyCompanies", myCompanies);
	Meteor.subscribe("projectsFromMyCompanies", myCompanies);
	Meteor.subscribe("tasksFromMyCompanies", myCompanies);
});