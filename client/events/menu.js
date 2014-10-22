Template.menu.events({
    'click #logout': function(e, template) {
        e.preventDefault();
        
        Meteor.logout();
    },

    'click #main-menu a': function(e, template) {
    	template.$('.navbar-toggle').click();
    },
});