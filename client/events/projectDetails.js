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
	    	data.companyId    = Meteor.user().profile.companies[0];
			Projects.insert(data, saveProjectCallback);
		}
	},

	'click #removeProject': function(e, template) {
	    e.preventDefault();

		if(this._id && confirm("Deseja excluir este projeto e todas suas tarefas?")) {
			var projectId = this._id;
			Meteor.call('removeProjectsAndTasks', projectId);
			
			Router.go('projects');
	    }
	},

	'click .delete': function(e, template) {
	    e.preventDefault();

		if(this._id && confirm("Deseja excluir este projeto permanentemente?")) {
	    	Projects.remove({_id: this._id}, saveProjectCallback);
	    }
	},

	'click #report': function(e, template) {
		Router.go('report', {projectId: this._id});
	},

	'click #tasks': function(e,template) {
		Router.go('projectDetails', {projectId: this._id});
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