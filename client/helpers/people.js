Template.people.helpers({
	users: function() {
		var users = Meteor.users.find({}, {sort: {'status.online': -1, 'profile.name': 1}}).fetch();

		var index = 0;
		users.map(function(o, i) {
			users[i].index = index++;
		});

		return users;
	},
});