// Template.menu.rendered = function() {
// 	this.autorun(function() {
// 		if(Meteor.userId() && !Meteor.loggingIn()) {
// 			Meteor.setTimeout(function() {
// 				var width = $('#user-menu > .dropdown > .dropdown-menu').width();
// 				$('#user-menu > .dropdown').css('min-width', width);
// 				$('#user-menu > .dropdown > .dropdown-menu').css('left', 0);
// 			}, 0100);
// 		}
// 	});
// }

Template.menu.helpers({
	name: function() {
		try {
			return Meteor.user().profile.name;
		} catch(error) {
			return 'Me';
		}
	}
});