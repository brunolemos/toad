Template.listProjects.helpers({
	selectedProjectId: function() {
		return Session.get('selectedProjectId');
	},

	isProjectSelected: function(projectId) {
		return Session.equals('selectedProjectId', projectId);
	},
});