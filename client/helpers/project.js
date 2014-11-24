Template.project.helpers({
	tasksCount: function() {
		return Tasks.find({projectId: this._id}).count();
	},
});