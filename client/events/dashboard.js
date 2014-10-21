Template.dashboard.events({
	'change #color': function(e, template) {
		var color = template.find('#color').value;
		Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.color': color}});
	}
});