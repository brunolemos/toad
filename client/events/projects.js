Template.projects.events({
	'click #projects > header': function(e, template) {
		Router.go('projects');
	},

	'click .newProject': function(e, template) {
		Projects.insert({name: 'Novo projeto'}, function(error, result) {
			if(error) {
				Session.set('error', error.message);
			} else if(result) {
				Session.set('error', null);
				Router.go('projectTasks', {projectId: result});
			}
		});
	},
});