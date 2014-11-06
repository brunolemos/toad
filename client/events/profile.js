Template.profile.events({
	'change input.profile-input': function(e, template) {
	    var data 	= {};
	    data.name 	= e.target.value;

		if(!(data.name && this._id == Meteor.userId()) ) return false;

		Meteor.users.update(Meteor.userId(), {$set: {profile: data}});
	},
});