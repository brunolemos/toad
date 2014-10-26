Template.menu.events({
    'click #logout': function(e, template) {
        e.preventDefault();
        
        Meteor.logout();
    },

    'click #main-menu a:not(.dropdown-toggle)': function(e, template) {
    	//force close menu when click on menu link
    	if(template.$("#main-menu .collapse").hasClass("in")) {
    		template.$('.navbar-toggle').click();
    	}
    },
});