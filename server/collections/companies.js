Companies.allow({
	insert: function(userId, doc) {
		return false; //use method insertCompanyAndUpdateUser
	},

	update: function(userId, doc) {
		return false;
	},

	remove: function(userId, doc) {
		return false;
	},
});