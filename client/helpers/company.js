Template.company.rendered = function() {
	var self = this;

	this.autorun(function(a) {
		var data = Template.currentData(self.view);
		if(!data) return;

		if(data && data.themeColor) setTimeout(function() {
			setTheme(data.themeColor, data.isDarkTheme);
		}, 0200);
	});
}

Template.company.destroyed = function() {
	setTimeout(resetTheme, 0100);
}


Template.company.helpers({
	membersCount: function() {
		return Meteor.users.find({'profile.companies': this._id}).count();
	},

	projectsCount: function() {
		return Projects.find({companyId: this._id}).count();
	},

	isMyCompany: function() {
		try {
			return Meteor.user().profile.companies.indexOf(this._id) >= 0;
		} catch(e) {
			return false;
		}
	},
});