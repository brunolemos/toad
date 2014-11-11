StandardLegends = new Mongo.Collection(null);

Template.autocompleteTasks.helpers({
	settings: {
		position: 'bottom',
		limit: 10,
		rules: [
			{
				token: '@',
				// string means a server-side collection; otherwise, assume a client-side collection
				collection: Meteor.users,
				field: 'profile.name',
				options: 'case-sensitive', // Use case-sensitive match to take advantage of server index.
				template: Template.serverCollectionPill,
				noMatchTemplate: Template.serverNoMatch,
				callback: function(item, element) { 
					Session.set('assignedTo', item._id);
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