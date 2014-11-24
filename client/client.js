Meteor.startup(function() {
	moment.locale('pt-BR');
	
	Meteor.subscribe("allCompanies");

	Tracker.autorun(function() {
		if(Meteor.userId()) {
			var companies = Meteor.user().profile.companies;
		} else {
			var companies = [];
		}
		
		Meteor.subscribe("peopleFromCompanies", companies);
		Meteor.subscribe("projectsFromMyCompanies", companies);
	});

	Tracker.autorun(function() {
		Meteor.subscribe("peopleFromCompanies", [Session.get('selectedCompanyId')]);
	});

	Tracker.autorun(function() {
		Meteor.subscribe("publicProfile", Session.get('selectedUserId'));
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