Template.register.events({
	'submit form': function(e, template){
	    e.preventDefault();
	    
	    var emailVar = template.find('#register-email').value;
	    var passwordVar = template.find('#register-password').value;
	    
	    Accounts.createUser({
	        email: emailVar,
	        password: passwordVar
	    });
	}
});