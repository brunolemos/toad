StandardLegends = new Mongo.Collection(null);

Template.autocompleteTasks.helpers({
  settings: {
    position: 'top',
    limit: 30,
    rules: [
      {
        token: '@',
        // string means a server-side collection; otherwise, assume a client-side collection
        collection: Meteor.users,
        field: 'profile.name',
        options: 'case-sensitive', // Use case-sensitive match to take advantage of server index.
        template: Template.serverCollectionPill,
        noMatchTemplate: Template.serverNoMatch,
        callback: function(doc) { console.log(doc); }
      }
    ]
  }
});