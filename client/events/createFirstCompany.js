Template.createFirstCompany.events({
	'submit form[name=associateCompany]': function(e, template) {
	    e.preventDefault();

	    var facebookId = Session.get('companyFacebookId');
	    var company = Companies.findOne({facebookId: facebookId});

	    if(company) {
	    	Meteor.call('updateUserCompany', company._id, onUpdateUserCompany);
	    } else {
			FlashMessages.sendWarning("Empresa não foi encontrada.");
	    }
	},

	'submit form[name=createCompany]': function(e, template){
		console.log('createCompany');
	    e.preventDefault();

	    var data = {};
	    data.name = $('input[name=name]').val();
	    data.facebookId = Session.get('companyFacebookId');
	    data.admins = [Meteor.userId()];

    	Meteor.call('insertCompanyAndUpdateUser', data.name, data.facebookId, data.admins, onUpdateUserCompany);
	},

	'change input[name=facebookUrl]': function(e, template) {
		var facebookId = e.target.value;

		try {
			facebookId = facebookId.match(/(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/)[1];
		} catch(e) {}
		
		Session.set('companyFacebookId', facebookId);
	},
});

function onUpdateUserCompany(error, result) {
	if(error) {
		FlashMessages.sendError(error.message);

	} else {
		var route = Router.current().route.getName();
		console.log(route);
		if(route == 'newCompany' || route == 'associateToCompany') {
			Router.go('/');
		}
	}
}