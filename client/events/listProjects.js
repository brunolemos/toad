Template.listProjects.events({
	'click .projectItem': function(e, template) {
		if(e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.tagName == 'BUTTON') return true;

		if(Session.equals('selectedProjectId', this._id)) {
			if($(e.target).closest('.disableClickToCloseProject').length) return true;
			Router.go('projects');
		} else {
			Router.go('projectDetails', {projectId: this._id});
		}
	},
});