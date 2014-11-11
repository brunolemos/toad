Template.createFirstCompany.events({
	'change form': function(e, template) {
		Session.set('error', null);
	},

	'submit form[name=associateCompany]': function(e, template) {
	    e.preventDefault();

	    var facebookId = Session.get('companyFacebookId');
	    var company = Companies.findOne({facebookId: facebookId});

	    if(company) {
		    updateUserCompany(company._id);
	    } else {
	    	Session.set('error', 'Empresa não encontrada');
	    }
	},

	'submit form[name=createCompany]': function(e, template){
	    e.preventDefault();

	    var data = {};
	    data.name = $('input[name=name]').val();
	    data.facebookId = Session.get('companyFacebookId');

	    var company = Companies.findOne({facebookId: data.facebookId});
	    if(company) {
		    Meteor.users.update(Meteor.userId(), {$set: {'profile.companies': [company._id]}});
	    } else {
		    Companies.insert(data, function(error, result) {
		    	if(error) {
		    		Session.set('error', error.message);
		    	} else if(result) {
		    		updateUserCompany(result);
		    	}
		    });
		}
	},

	'change input[name=facebookUrl]': function(e, template) {
		var facebookId = e.target.value;

		try {
			facebookId = facebookId.match(/(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/)[1];
		} catch(e) {}

		Session.set('companyFacebookId', facebookId);
	},

	'click #createCompanyLink': function(e, template) {
		Session.set('isCreateCompany', true);
	},

	'click #associateCompanyLink': function(e, template) {
		Session.set('isCreateCompany', false);
	},
});

function updateUserCompany(companyId) {
    Meteor.users.update(Meteor.userId(), {$set: {'profile.companies': [companyId]}});

	if(Router.current().url == Router.path('newCompany') || Router.current().url == Router.path('associateToCompany')) {
		Router.go('/');
	}
}