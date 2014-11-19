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
	if(Meteor.userId()) {
		this.next();

	} else {
		//prevent from showing login page on app startup when already logged
		this.wait(function() {return !Meteor.loggingIn(); });
		this.render(this.ready() ? 'login' : null);
	}

	//public pages
}, {except: ['index', 'login', 'logout', 'signup']});


//
//FORCE CREATE COMPANY
//
Router.onBeforeAction(function() {
	if(Meteor.userId()) {
		var companies = Meteor.user().profile.companies;

		if(companies && companies.length > 0) {
			this.next();
		} else {
			this.redirect('newCompany');
		}
	} else {
		this.next();
	}

}, {only: ['projects', 'people']});


//
//HOMEPAGE
//
Router.route('/', {
	name: 'index',
	
	onBeforeAction: function() {
		if(Meteor.user()) {
			this.redirect('general');
		} else {
			this.render('home');
		}
	}
});

Router.route('/general');


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
	if(Meteor.userId()) {
		this.redirect('index');
	} else {
		Session.set('isSignup', true);
		this.render('login');
	}
});

Router.route('/logout', function() {
	Meteor.logout(function() {
		Router.go('login');
	});
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
	this.render('listTasksEditable', {
		to: 'content',
		data: function() {
			return {
				projectId: this.params.projectId,
				tasks: Tasks.find({projectId: this.params.projectId}),
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
//REPORT
//
Router.route('/report/:projectId', function() {
	Session.set('selectedProjectId', this.params.projectId);
	
	this.render('projectDetails', {data: Projects.findOne(this.params.projectId)});
	this.render('listImprovements', {
		to: 'content',
		data: function() {
			return {
				projectId: this.params.projectId,
				tasks: Tasks.find({projectId: this.params.projectId}),
			};
		},
	});

}, {
	name: 'report',
	onStop: function() {
		Session.set('selectedProjectId', null);
		this.render(null, {to: 'content'});
	},
});

//
//DASHBOARD
//
Router.route('/dashboard/:projectId', function() {
	Session.set('selectedProjectId', this.params.projectId);
	
	this.render('projectDetails', {data: Projects.findOne(this.params.projectId)});
	this.render('dashboard', {
		to: 'content',
		data: function() {
			return {
				projectId: this.params.projectId,
				tasks: Tasks.find({projectId: this.params.projectId}),
			};
		},
	});

}, {
	name: 'dashboard',
	onStop: function() {
		Session.set('selectedProjectId', null);
		this.render(null, {to: 'content'});
	},
});


//
//COMPANIES
//
Router.route('/companies', function() {
	this.redirect('userCompanies', {_id: Meteor.userId()});
});

Router.route('/companies/:_id', function() {
	Session.set('selectedCompanyId', this.params._id);
	this.render('company', {data: Companies.findOne(this.params._id)});

}, {
	name: 'company',
	onStop: function() {
		Session.set('selectedCompanyId', null);
	},
});

Router.route('/companies/:_id/people', function() {
	Session.set('selectedCompanyId', this.params._id);
	
	this.render('company', {data: Companies.findOne(this.params._id)});
	
	this.render('listPeople', {
		to: 'content',
		data: function() {
			return {
				people: Meteor.users.find({'profile.companies': this.params._id}),
			}
		},
	});
}, {
	name: 'companyPeople',
	onStop: function() {
		Session.set('selectedCompanyId', null);
		this.render(null, {to: 'content'});
	},
});

Router.route('/companies/:_id/projects', function() {
	Session.set('selectedCompanyId', this.params._id);
	
	this.render('company', {data: Companies.findOne(this.params._id)});
	
	this.render('listProjects', {
		to: 'content',
		data: function() {
			return {
				projects: Projects.find({companyId: this.params._id}),
			}
		},
	});
}, {
	name: 'companyProjects',
	onStop: function() {
		Session.set('selectedCompanyId', null);
		this.render(null, {to: 'content'});
	},
});


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
	this.render('profile', {data: Meteor.users.findOne({_id: this.params._id})});
}, {name: 'profile'});

Router.route('/profile/:_id/companies', function() {
	this.render('profile', {data: Meteor.users.findOne({_id: this.params._id})});
	
	this.render('listCompanies', {
		to: 'content',
		data: function() {
			var myCompanies = Meteor.user().profile.companies;
			var companies = Companies.find({_id: {$in: myCompanies}});

			return {
				companies: companies,
			}
		},
	});
}, {
	name: 'userCompanies',
	onStop: function() {
		this.render(null, {to: 'content'});
	},
});
