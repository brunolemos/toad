Template.listTasks.rendered = function() {
	this.find('.newTask input[name=name]').focus();
}

Template.taskRow.helpers({
    'isEditing': function(task) {
        return this.newTask || Session.equals('editTaskId', task._id);
    }
});