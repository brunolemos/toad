Template.company.events({
	'click #associateToCompany': function(e, template) {
		if(!Meteor.userId()) {
			var redirect_url = Router.path('company', {_id: this._id});
			Session.set('redirectAfterLogin', redirect_url);

			Router.go('signup');
		}

	    Meteor.call('associateToCompany', this._id);
	},

	'click #disassociateFromCompany': function(e, template) {
	    Meteor.call('diassociateFromCompany', this._id);
	},
});