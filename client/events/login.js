Template.login.events({
	'submit form[name=login]': function(e, template) {
	    e.preventDefault();

	    var email = $('input[name=email]').val();
	    var password = $('input[name=password]').val();
	    
	    Meteor.loginWithPassword({email: email}, password, onLoginSignupAttempt);
	},

	'submit form[name=signup]': function(e, template){
	    e.preventDefault();

	    var name = $('input[name=name]').val();
	    var email = $('input[name=email]').val();
	    var password = $('input[name=password]').val();

	    Accounts.createUser({
	        email: email,
	        password: password,

	        profile: {
	        	name: name
	        }
	    }, onLoginSignupAttempt);
	},

	'keyup input': function(e, template) {
		if(!$(e.target).is(':valid')) {
			$(e.target).parent().removeClass('has-success');
			$(e.target).parent().addClass('has-error');
		} else {
			$(e.target).parent().addClass('has-success');
			$(e.target).parent().removeClass('has-error');
		}
	},

	'change input[name=email]': function(e, template) {
		Session.set('form_email', e.target.value)
	},
});

function onLoginSignupAttempt(error, result) {
	if(error) {
		FlashMessages.sendError(error.message);
	} else if(result) {
		var route = Router.current().route.getName();
		if(route == 'login' || route == 'signup') {
			Router.go('/');
		}
	}
}
