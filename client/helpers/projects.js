Template.projects.helpers({
	projects: function() {
		return Projects.find();
	},

	selectedProjectId: function() {
		return Session.get('selectedProjectId');
	},
});