Meteor.startup(function() {
	moment.locale('pt-BR');
	
	Meteor.subscribe("allCompanies");

	Tracker.autorun(function() {
		try {
			var myCompanies = Meteor.user().profile.companies;
		} catch(e) {
			var myCompanies = [];
		}

		Meteor.subscribe("peopleFromCompanies", myCompanies);
		Meteor.subscribe("projectsFromMyCompanies", myCompanies);
	});

	Tracker.autorun(function() {
		Meteor.subscribe("peopleFromCompanies", [Session.get('selectedCompanyId')]);
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