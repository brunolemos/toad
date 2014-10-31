Template.listTasks.helpers({
    'isEditing': function(task) {
        return Session.get("editTaskId") == task._id;
    }
});