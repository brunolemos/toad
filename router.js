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
		if(Meteor.user().profile.companies && Meteor.user().profile.companies.length > 0) {
			this.next();
		} else {
			this.render('createFirstCompany');
		}
	}
}, {except: ['index', 'login', 'logout', 'signup']});

//
//HOMEPAGE
//
Router.route('/', {
	name: 'index',
	
	onBeforeAction: function() {
		if(Meteor.user()) {
			this.redirect('dashboard');
		} else {
			this.render('home');
		}
	}
});

//
//DASHBOARD
//
Router.route('/dashboard', function() {
	this.redirect('projects');
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

Router.route('/logout', function() {
	Meteor.logout(function() {
		Router.go('login');
	});
});

Router.route('/signup', function() {
	Session.set('isSignup', true);
	this.render('login');
});


//
//COMPANY
//
Router.route('/companies/new', function() {
	Session.set('isCreateCompany', true);
	this.render('createFirstCompany');
}, {name: 'newCompany'});

Router.route('/companies/associate', function() {
	Session.set('isCreateCompany', false);
	this.render('createFirstCompany');
}, {name: 'associateToCompany'});


//
//PROJECTS
//
Router.route('/projects', function() {
	this.render('projects');
});

Router.route('/projects/new', function() {
	this.render('projectDetails');

}, {name: 'newProject'});

Router.route('/projects/:projectId', function() {
	Session.set('selectedProjectId', this.params.projectId);
	Session.set('editTaskId', null);
	
	this.render('projectDetails', {data: Projects.findOne(this.params.projectId)});
	this.render('listTasks', {
		to: 'content',
		data: function() {
			return {
				projectId: this.params.projectId,
				tasks: Tasks.find({projectId: this.params.projectId}).fetch(),
			};
		},
	});

}, {
	name: 'projectDetails',
	onStop: function() {
		Session.set('selectedProjectId', null);
		this.render(null, {to: 'content'});
	},
});


//
//PEOPLE
//
Router.route('/people', {name: 'people'});


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
