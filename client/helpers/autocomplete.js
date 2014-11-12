StandardLegends = new Mongo.Collection(null);

Template.autocompleteTasks.helpers({
	settings: {
		position: 'bottom',
		limit: 10,
		rules: [
			{
				token: '',
				// string means a server-side collection; otherwise, assume a client-side collection
				collection: Meteor.users,
				field: 'profile.name',
				options: '', // Use case-sensitive match to take advantage of server index.
				template: Template.autocompleteUserName,
				noMatchTemplate: Template.serverNoMatch,
				callback: function(user, element) { 
					$(element).data("id", user._id);
					$($(element).parent().find('[name=assignedTo]')[0]).val(user._id).change();
				}
			}
		],
	}
});

Template.autocompleteCompanies.helpers({
	settings: {
		position: 'bottom',
		limit: 10,
		rules: [
			{
				token: '',
				// string means a server-side collection; otherwise, assume a client-side collection
				collection: "Companies",
				field: 'name',
				options: 'case-sensitive', // Use case-sensitive match to take advantage of server index.
				template: Template.autocompleteCompanyName,
				noMatchTemplate: Template.serverNoMatch1,
				callback: function(item, element) { 
					$(element).data("companyId", item._id);
				}
			}
		],
	}
});