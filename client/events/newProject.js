Template.newProject.events({
	'submit form': function(e, template) {
	    e.preventDefault();

	    var data 		= {};
	    data.name 		= $('[name=name]').val();
	    data.priority 	= $('[name=priority]').val();
	    data.motivation = $('[name=motivation]').val();
	    data.objective 	= $('[name=objective]').val();
	    data.startDate 	= new Date($('[name=startDate]').val());
	    
	    Projects.insert(data, function(error, result) {
	    	if(error) {
	    		Session.set('error', error.message);
	    	} else if(result) {
	    		Router.go('projects');
	    	}
	    });
	},
});