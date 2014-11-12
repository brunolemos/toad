Template.weekTasks.helpers({
	tasks: function() {	
		return Tasks.find();
	},
});