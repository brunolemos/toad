Tasks.allow({
	insert: function(userId, doc) {
		doc.createdBy = userId;
		doc.createdAt = new Date();
		return userId && isProjectFromMyCompanies(doc.projectId);
	},

	update: function(userId, doc) {
		var project = Projects.findOne(doc.projectId);
		if(!project) return true;

		return userId && isProjectFromMyCompanies(project._id);
	},
	
	remove: function(userId, doc) {
		return userId && canRemoveTask(doc);
	},
});