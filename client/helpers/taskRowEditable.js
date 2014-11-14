Template.taskRowEditable.helpers({
    'isEditing': function(task) {
        return this.newTask || Session.equals('editTaskId', task._id);
    }
});