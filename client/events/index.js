Template.index.events({
	'click #messages .close': function(e, template) {
	    e.preventDefault();

    	Session.set('error', null);
	},

	'click body': function(e, template) {
		console.dir(e.target);
	}
});