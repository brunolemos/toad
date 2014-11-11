Meteor.publish("users", function() {
	var companyId = Meteor.users.findOne(this.userId).profile.companies[0];
	return Meteor.users.profile.find({companies: companyId});
});

Meteor.publish("projects", function() {
	if(this.userId)
	{
		try {
			var companyId = Meteor.users.findOne(this.userId).profile.companies[0];
			return Projects.find({companyId: companyId});	
		} catch(e) {}
	}

	return null;
});

Meteor.publish("tasks", function() {
	return Tasks.find();
});

Meteor.publish("companies", function() {
	return Companies.find();
});