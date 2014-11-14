Meteor.startup(function() {
	Meteor.subscribe("allCompanies");

	Tracker.autorun(function() {
		try {
			var myCompanies = Meteor.user().profile.companies;
		} catch(e) {
			var myCompanies = [];
		}

		Meteor.subscribe("usersFromMyCompanies", myCompanies);
		Meteor.subscribe("projectsFromMyCompanies", myCompanies);
	});

	var tasksHandler = [];
	Projects.find().observeChanges({
		added: function(id) {
			tasksHandler[id] = Meteor.subscribe("tasksFromProject", id);
		},

		removed: function(id) {
			tasksHandler[id].stop();
		},
	});
});