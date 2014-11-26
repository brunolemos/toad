defaultRedirectAfterLogin = 'projects';

if(Meteor.isClient) {
	Session.setDefault('redirectAfterLogin', defaultRedirectAfterLogin);
}

Router.onAfterAction(function() {
	Session.set('redirectAfterLogin', defaultRedirectAfterLogin);
}, {except: ['login', 'signup']});