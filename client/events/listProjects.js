Template.listProjects.events({
	// 'click #deleteProject': function(e, template) {
	//     e.preventDefault();

	// 	Projects.remove({_id: this._id});
	// },

	'click .item.pointer': function(e, template) {
		Router.go('listProjectTasks', {_id: this._id});
	},
});