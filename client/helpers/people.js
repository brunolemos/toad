Template.people.helpers({
	peopleCount: function() {
		return Meteor.users.find().count();
	},
});