Router.onBeforeAction(function() {
	if(Meteor.userId()) {
		this.next();

	} else {
		//prevent from showing login page on app startup when already logged
		this.wait(function() {return !Meteor.loggingIn(); });
		this.render(this.ready() ? 'login' : null);
	}

}, {except: publicPages});