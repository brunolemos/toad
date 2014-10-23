Template.formProject.events({
	'submit form': function(e, template) {
	    e.preventDefault();

	    var data 		= {};
	    data.name 		= $('[name=name]').val();
	    data.priority 	= $('[name=priority]').val();
	    data.motivation = $('[name=motivation]').val();
	    data.objective 	= $('[name=objective]').val();
	    data.startDate 	= new Date($('[name=startDate]').val());
	    
	    if(this._id) {
	    	Projects.update({_id: this._id}, {$set: data}, saveProjectCallback);
	    } else {
			Projects.insert(data, saveProjectCallback);
	    }
	},

	'click .delete': function(e, template) {
	    e.preventDefault();

		if(this._id && confirm("Deseja excluir este projeto permanentemente?")) {
	    	Projects.remove({_id: this._id}, saveProjectCallback);
	    }
	},
});

function saveProjectCallback(error, result) {
	if(error) {
		Session.set('error', error.message);
	} else if(result) {
		Session.set('error', null);
		Router.go('projects');
	}
}