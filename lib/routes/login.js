Router.route('/login', function() {
	if(Meteor.userId()) {
		Session.setDefault('redirectAfterLogin', '/');
		this.redirect(Session.get('redirectAfterLogin'));
	} else {
		Session.set('isSignup', false);
		this.render('login');
	}
});


Router.route('/signup', function() {
	if(Meteor.userId()) {
		Session.setDefault('redirectAfterLogin', '/');
		this.redirect(Session.get('redirectAfterLogin'));
	} else {
		Session.set('isSignup', true);
		this.render('login');
	}
});


Router.route('/logout', function() {
	this.render('login');
	
	Meteor.logout(function() {
		Router.go('login');
	});
});