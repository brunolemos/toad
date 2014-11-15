Template.listCompanies.events({
	'click #company-list > .item': function(e, template) {
		if(e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.tagName == 'BUTTON') return true;
		
		Router.go('company', {_id: this._id});
	},
});