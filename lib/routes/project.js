Router.route('/project/:_id', function() {
	renderMyProjects(this);
}, {name: 'project', onStop: function() {onStopProject(this)}});

Router.route('/project/:_id/report', function() {
	renderProjectReport(this);
}, {name: 'projectReport', onStop: function() {onStopProject(this)}});

Router.route('/project/:_id/dashboard', function() {
	renderProjectDashboard(this);
}, {name: 'projectDashboard', onStop: function() {onStopProject(this)}});


function renderProject(thiss) {
	var projectId = thiss.params._id;
	
	Session.set('selectedProjectId', projectId);
	thiss.render('project', {data: Projects.findOne(projectId)});
}

function renderMyProjects(thiss) {
	var projectId = thiss.params._id;
	renderProject(thiss);

	thiss.render('listTasksEditable', {
		to: 'content',
		data: function() {
			return {
				projectId: projectId,
				tasks: Tasks.find({projectId: projectId}),
			};
		},
	});

}

function renderProjectReport(thiss) {
	var projectId = thiss.params._id;
	renderProject(thiss);

	thiss.render('listImprovements', {
		to: 'content',
		data: function() {
			return {
				projectId: projectId,
				tasks: Tasks.find({projectId: projectId}),
			};
		},
	});

}

function renderProjectDashboard(thiss) {
	var projectId = thiss.params._id;
	renderProject(thiss);

	thiss.render('dashboard', {
		to: 'content',
		data: function() {
			return {
				projectId: projectId,
				tasks: Tasks.find({projectId: projectId}),
			};
		},
	});
}

function onStopProject(thiss) {
	Session.set('selectedProjectId', null);
	thiss.render(null, {to: 'content'});
}