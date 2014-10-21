Template.login.events({
'submit form': function(e, template){
    e.preventDefault();

    var emailVar = template.find('#login-email').value;
    var passwordVar = template.find('#login-password').value;
    
    Meteor.loginWithPassword({email: emailVar}, passwordVar);
}
});