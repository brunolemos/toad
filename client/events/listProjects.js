Template.listProjects.events({
	'click .projectItem': function(e, template) {
		if(e.target.tagName == 'INPUT') return true;

		if(Session.equals('selectedProjectId', this._id)) {
			if(!$(e.target).hasClass('projectItem')) return true;
			Router.go('projects');
		} else {
			Router.go('projectTasks', {projectId: this._id});
		}
	},

	'change #projectName': function(e, template) {
		Projects.update({_id: this._id}, {$set: {name: e.target.value}});
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
	},
});