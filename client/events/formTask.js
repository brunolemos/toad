Template.formTask.events({
	'submit form': function(e, template) {
	    e.preventDefault();

	    var data 				= {};
	    data.name 				= $('[name=name]').val();
	    data.projectId			= $('[name=projectId]').val();		
	    data.priority 			= $('[name=priority]').val();
	    data.assignedTo 		= $('[name=assignedTo]').val() ? Session.get('assignedTo') : '';
	    data.plannedDuration	= $('[name=plannedDuration]').val();
	    data.startDate 			= new Date($('[name=startDate]').val());
	    data.endDate 			= new Date($('[name=endDate]').val());
	    
	    if(this._id) {
	    	Tasks.update({_id: this._id}, {$set: data}, saveTaskCallback);
	    } else {
			Tasks.insert(data, saveTaskCallback);
	    }
	},

	'click .delete': function(e, template) {
	    e.preventDefault();

		if(this._id && confirm("Deseja excluir esta tarefa permanentemente?")) {
	    	Tasks.remove({_id: this._id}, saveTaskCallback);
	    }
	},
});

function saveTaskCallback(error, result) {
	if(error) {
		Session.set('error', error.message);
	} else if(result) {
		Session.set('error', null);
		history.back();
	}
}