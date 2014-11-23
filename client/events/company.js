Template.company.events({
	'click #associateToCompany': function(e, template) {
	    Meteor.call('associateToCompany', this._id);
	},

	'click #disassociateFromCompany': function(e, template) {
	    Meteor.call('diassociateFromCompany', this._id);
	},
});