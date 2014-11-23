Template.project.rendered = function() {
	if(!(this.data && this.data._id)) {
		this.find('#projectName').focus();
	}
}

Template.project.helpers({
	tasksCount: function() {
		return Tasks.find({projectId: this._id}).count();
	},
});