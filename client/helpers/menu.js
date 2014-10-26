Template.menu.helpers({
	name: function() {
		try {
			return Meteor.user().profile.name;
		} catch(error) {
			return 'Me';
		}
	}
});