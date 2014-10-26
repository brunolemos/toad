Template.listTasks.events({
	'click .item.pointer': function(e, template) {
		Router.go('editProjectTask', {projectId: this.projectId, _id: this._id});
	},
});