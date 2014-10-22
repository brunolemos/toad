Template.listTasks.events({
	'click #deleteTask': function(e, template) {
	    e.preventDefault();

		Tasks.remove({_id: this._id});
	}
});