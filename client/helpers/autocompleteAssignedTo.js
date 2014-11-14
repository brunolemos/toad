Template.autocompleteAssignedTo.helpers({
	settings: {
		position: 'bottom',
		limit: 10,
		rules: [
			{
				token: '',
				collection: Meteor.users, // string means a server-side collection; otherwise, assume a client-side collection
				field: 'profile.name',
				options: '', // Use case-sensitive match to take advantage of server index.
				template: Template.autocompleteUserName,
				noMatchTemplate: Template.autocompleteNotFound,
				callback: function(user, element) { 
					$(element).data("id", user._id);
					$($(element).parent().find('[name=assignedTo]')[0]).val(user._id).change();
				}
			}
		],
	}
});