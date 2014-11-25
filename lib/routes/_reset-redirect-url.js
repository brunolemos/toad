Router.onAfterAction(function() {
	Session.set('redirectAfterLogin', '/');
}, {except: ['login', 'signup']});