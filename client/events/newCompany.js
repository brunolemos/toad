Template.newCompany.events({
	'submit form[name=newCompany]': function(e, template){
	    e.preventDefault();

	    var data = {};
	    data.name = $('input[name=name]').val();
	    data.facebookId = Session.get('companyFacebookId');
	    data.admins = [Meteor.userId()];

    	Meteor.call('insertCompanyAndUpdateUser', data.name, data.facebookId, data.admins, onNewCompany);
	},

	'change input[name=facebookUrl]': function(e, template) {
		var facebookId = e.target.value;

		try {
			facebookId = facebookId.match(/(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/)[1];
		} catch(e) {}
		
		Session.set('companyFacebookId', facebookId);
	},
});

function onNewCompany(error, result) {
	if(error) {
		FlashMessages.sendError(error.message);

	} else {
		var route = Router.current().route.getName();
		if(route == 'newCompany') {
			Router.go('companies'); //projects
		}
	}
}