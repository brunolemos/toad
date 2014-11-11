Meteor.publish("users", function() {
	return Meteor.users.find();
});

Meteor.publish("projects", function() {
	
	if(this.userId)
	{
		// var companyId = Meteor.users.findOne(this.userId).profile.companies[0]
		// return Projects.find({company: companyId});
		return Projects.find();
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