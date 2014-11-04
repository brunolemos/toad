Template.projectDetails.events({
	'keyup #projectName': function(e, template) {
		if(e.which == 13) {
			$(e.target).blur();
		}
	},

	'change input#projectName': function(e, template) {
	    var data 		= {};
	    data.name 		= e.target.value;

		if(!data.name) return false;

		if(this._id) {
			Projects.update({_id: this._id}, {$set: data});
		} else {
			Projects.insert(data, saveProjectCallback);
		}
	},

	'click #removeProject': function(e, template) {
		var projectId = this._id;
		Projects.remove({_id: projectId}, function(error, result) {
			if(error) {
				Session.set('error', error.message);
			} else {
				Session.set('error', null);
				// Tasks.remove({projectId: projectId});
			}
		});
		
		Router.go('projects');
	},
});

function saveProjectCallback(error, result) {
	if(error) {
		Session.set('error', error.message);
	} else if(result) {
		Session.set('error', null);
		Router.go('projectDetails', {projectId: result});
	}
}