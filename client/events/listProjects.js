Template.listProjects.events({
	'click .item.pointer': function(e, template) {
		Router.go('projectTasks', {projectId: this._id});
	},
});