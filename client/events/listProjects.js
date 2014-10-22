Template.listProjects.events({
	'click #deleteProject': function(e, template) {
	    e.preventDefault();

		Projects.remove({_id: this._id});
	}
});