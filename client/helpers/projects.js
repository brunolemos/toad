Template.projects.helpers({
	projects: function() {
		return Projects.find();
	},

	tasks: function() {
		return Tasks.find({_id: this._id});
	}
});
