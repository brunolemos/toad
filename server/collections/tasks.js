Tasks.allow({
	insert: function(userId, doc) {
		doc.createdBy = userId;
		doc.createdAt = new Date();
		return userId && hasAccessToProject(userId, doc.projectId);
	},

	update: function(userId, doc) {
		return userId && hasAccessToProject(userId, doc.projectId);
	},
	
	remove: function(userId, doc) {
		return userId && hasAccessToProject(userId, doc.projectId);
	},
});

function hasAccessToProject(userId, projectId) {
	check(userId, String);
	check(projectId, String);
	
	try {
		var companyId = Projects.findOne(projectId).companyId;
		var user = Meteor.users.findOne(userId);
		return user.profile.companies.indexOf(companyId) >= 0;

	} catch(e) {
		return false;
	}
}