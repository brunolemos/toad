Projects.allow({
	insert: function(userId, doc) {
		doc.createdBy = userId;
		doc.createdAt = new Date();
		return userId && hasAccessToCompany(userId, doc.companyId);
	},

	update: function(userId, doc) {
		return userId && hasAccessToCompany(userId, doc.companyId);
	},
	
	remove: function(userId, doc) {
		return false;
	},
});

function hasAccessToCompany(userId, companyId) {
	check(userId, String);
	check(companyId, String);
	
	try {
		var user = Meteor.users.findOne(userId);
		return user.profile.companies.indexOf(companyId) >= 0;
		
	} catch(e) {
		return false;
	}
}