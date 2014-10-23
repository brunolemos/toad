Template.listTasks.events({
	// 'click #deleteTask': function(e, template) {
	//     e.preventDefault();

	// 	Tasks.remove({_id: this._id});
	// },

	'click .item.pointer': function(e, template) {
		Router.go('editTask', {_id: this._id});
	},
});