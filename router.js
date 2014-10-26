//
//CONFIGURATION
//
Router.configure({
	layoutTemplate: 'index'
});

//
//PRIVATE ROUTES
//
Router.onBeforeAction(function() {
	if(!Meteor.user()) {
		//prevent from showing login page on app startup when already logged
		this.wait(function() {return !Meteor.loggingIn(); });

		if(this.ready()) {
			this.render('login');
		} else {
			this.render(null);
		}
	} else {
		this.next();
	}
}, {except: ['index', 'login', 'signup']});

//
//HOMEPAGE
//
Router.route('/', {
	name: 'index',
	
	onBeforeAction: function() {
		if(Meteor.user()) {
			this.render('dashboard');
		} else {
			this.render('home');
		}
	}
});

//
//DASHBOARD
//
Router.route('/dashboard', function() {
	this.render('dashboard');
});


//
//LOGIN & SIGNUP
//
Router.route('/login', function() {
	if(Meteor.userId()) {
		this.redirect('index');
	} else {
		Session.set('isSignup', false);
		this.render('login');
	}
});

Router.route('/signup', function() {
	Session.set('isSignup', true);
	this.render('login');
});


//
//PROJECTS
//
Router.route('/projects', function() {
	this.render('projects');
	this.render(null, {to: 'content'});
});

Router.route('/projects/new', function() {
	this.render('projects');
	this.render('formProject', {
		to: 'content',
	});
}, {name: 'newProject'});

Router.route('/projects/:_id/edit', function() {
	this.render('formProject', {
		data: function() {
			return Projects.findOne({_id: this.params._id});
		}
	});
}, {name: 'editProject'});

Router.route('/projects/:projectId/tasks', function() {
	this.render('projects');

	this.render('listTasks', {
		to: 'content',
		data: function() {
			return {
				projectId: this.params.projectId,
				tasks: Tasks.find({projectId: this.params.projectId}).fetch(),
			};
		},
	});
}, {name: 'projectTasks'});

Router.route('/projects/:projectId/tasks/new', function() {
	this.render('projects');

	this.render('formTask', {
		to: 'content',
		data: function() {
			return {
				projectId: this.params.projectId,
			};
		},
	});
}, {name: 'newProjectTask'});

Router.route('/projects/:projectId/tasks/:_id/edit', function() {
	this.render('projects');

	this.render('formTask', {
		to: 'content',
		data: function() {
			return Tasks.findOne({_id: this.params._id});
		},
	});
}, {name: 'editProjectTask'});


//
//PROFILE
//
Router.route('/me', function() {
	this.render('profile', {
		data: function() {
			return Meteor.users.findOne({_id: Meteor.userId()});
		}
	});
}, {name: 'me'});

Router.route('/profile', function() {
	this.redirect('me');
}, {name: '_profile'});

Router.route('/profile/:_id', function() {
	this.render('profile', {
		data: function() {
			return Meteor.users.findOne({_id: this.params._id});
		}
	});
}, {name: 'profile'});