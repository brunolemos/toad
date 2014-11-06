Meteor.publish("users", function() {
	return Meteor.users.find();
});

Meteor.publish("projects", function() {
	return Projects.find();
});

Meteor.publish("tasks", function() {
	return Tasks.find();
});