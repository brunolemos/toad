Router.onBeforeAction(function() {
	if(Meteor.userId()) {
		var companies = Meteor.user().profile.companies;

		if(companies && companies.length > 0) {
			this.next();
		} else {
			this.redirect('newCompany');
		}
	} else {
		this.next();
	}

}, {except: publicPages});