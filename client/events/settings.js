Template.settings.events({
	'click #linkWithFacebook': function(e, template) {
		Meteor.linkWithFacebook();
	},

	'click #unlinkFromFacebook': function(e, template) {
		Meteor.call('unlinkFromService', 'facebook');
	},
});