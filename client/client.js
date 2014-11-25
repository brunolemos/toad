Meteor.startup(function() {
	moment.locale('pt-BR');

	Session.setDefault('default-theme-class', 'dark-theme');
	Session.setDefault('default-theme-color', '#7A7ABA');
	Session.setDefault('theme-class', Session.get('default-theme-class'));
	Session.setDefault('theme-color', Session.get('default-theme-color'));
	
	Meteor.subscribe("allCompanies");

	Tracker.autorun(function() {
		var myCompanies = [];

		if(Meteor.userId()) {
			myCompanies = Meteor.user().profile.companies;
		}
		
		Meteor.subscribe("peopleFromMyCompanies", myCompanies);
		Meteor.subscribe("projectsFromMyCompanies", myCompanies);
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

setTheme = function(color, isDark) {
	if(!color) {
		resetTheme();
		return;
	}
	
	var themeClass = isDark !== false ? 'dark-theme' : 'light-theme';
	
	Session.set('theme-color', color);
	Session.set('theme-class', themeClass);
}

resetTheme = function() {
	Session.set('theme-color', Session.get('default-theme-color'));
	Session.set('theme-class', Session.get('default-theme-class'));
}