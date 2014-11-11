Meteor.publish("users", function() {
	return Meteor.users.find();
});

Meteor.publish("projects", function() {
	
	if(this.userId)
	{
		var companyId = Meteor.users.findOne(this.userId).profile.companies[0]
		return Projects.find({company: companyId});
	}else{
		return null;		
	}

});

Meteor.publish("tasks", function() {
	return Tasks.find();
});

Meteor.publish("companies", function() {
	return Companies.find();
});