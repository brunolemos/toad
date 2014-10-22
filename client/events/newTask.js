Template.newTask.events({
	'submit form': function(e, template) {
	    e.preventDefault();

	    var data 				= {};
	    data.name 				= $('[name=name]').val();
	    data.priority 			= $('[name=priority]').val();
	    data.assignedTo 		= $('[name=assignedTo]').val();
	    data.plannedDuration	= new Date($('[name=plannedDuration]').val());
	    data.startDate 			= new Date($('[name=startDate]').val());
	    data.endDate 			= new Date($('[name=endDate]').val());
	    
	    Tasks.insert(data, function(error, result) {
	    	if(error) {
	    		Session.set('error', error.message);
	    	} else if(result) {
	    		Router.go('tasks');
	    	}
	    });
	},
});