Template.profile.rendered = function() {
	var self = this;

	this.autorun(function(a) {
		var data = Template.currentData(self.view);
		if(!data) return;

		if(data && data.profile.themeColor) setTimeout(function() {
			setTheme(data.profile.themeColor, data.profile.isDarkTheme);
		}, 0200);
	});
}

Template.profile.destroyed = function() {
	setTimeout(resetTheme, 0100);
}

Template.profile.helpers({
	projectsCount: function() {
		return Projects.find({createdBy: this._id}).count();
	},

	companiesCount: function() {
		try {
			return Meteor.users.findOne(this._id).profile.companies.length;
		} catch(e) {
			return 0;
		}
	},
});