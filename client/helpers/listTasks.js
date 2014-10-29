Template.listTasks.helpers({
    'editting': function(id) {
        return Session.get("editTaskId") == id;
    }
});