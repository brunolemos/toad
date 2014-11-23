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
}, {except: ['index', 'login', 'logout', 'signup', 'company']});


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

}, {except: ['index', 'login', 'logout', 'signup', 'company', 'companies', 'allCompanies', 'newCompany', 'associateToCompany']});


//
//HOMEPAGE
//
Router.route('/', {
	name: 'index',
	
	onBeforeAction: function() {
		if(Meteor.user()) {
			this.render('general');
		} else {
			this.render('home');
		}
	}
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
//PROJECTS
//
Router.route('/projects', function() {
	this.render('projects');

	this.render('listProjects', {
		to: 'content',
		data: function() {
			return {
				projects: Projects.find(),
			};
		},
	});
});

Router.route('/projects/all', function() {
	this.render('projects');

	this.render('listProjects', {
		to: 'content',
		data: function() {
			return {
				projects: Projects.find(),
			};
		},
	});
}, {name: 'allProjects'});

Router.route('/projects/new', function() {
	this.render('project');

}, {name: 'newProject'});

Router.route('/projects/:_id', function() {
	Session.set('selectedProjectId', this.params._id);
	Session.set('editTaskId', null);
	
	this.render('project', {data: Projects.findOne(this.params._id)});
	this.render('listTasksEditable', {
		to: 'content',
		data: function() {
			return {
				projectId: this.params._id,
				tasks: Tasks.find({projectId: this.params._id}),
			};
		},
	});

}, {
	name: 'project',
	onStop: function() {
		Session.set('selectedProjectId', null);
		this.render(null, {to: 'content'});
	},
});

Router.route('/projects/:_id/report', function() {
	Session.set('selectedProjectId', this.params._id);
	
	this.render('project', {data: Projects.findOne(this.params._id)});
	this.render('listImprovements', {
		to: 'content',
		data: function() {
			return {
				projectId: this.params._id,
				tasks: Tasks.find({projectId: this.params._id}),
			};
		},
	});

}, {
	name: 'projectReport',
	onStop: function() {
		Session.set('selectedProjectId', null);
		this.render(null, {to: 'content'});
	},
});

Router.route('/projects/:_id/dashboard', function() {
	Session.set('selectedProjectId', this.params._id);
	
	this.render('project', {data: Projects.findOne(this.params._id)});
	this.render('dashboard', {
		to: 'content',
		data: function() {
			return {
				projectId: this.params._id,
				tasks: Tasks.find({projectId: this.params._id}),
			};
		},
	});

}, {
	name: 'projectDashboard',
	onStop: function() {
		Session.set('selectedProjectId', null);
		this.render(null, {to: 'content'});
	},
});


//
//COMPANIES
//
Router.route('/companies', function() {
	this.render('companies');
	
	this.render('listCompanies', {
		to: 'content',
		data: function() {
			var myCompanies = Meteor.user().profile.companies;

			return {
				companies: Companies.find({_id: {$in: myCompanies}}),
			}
		},
	});
}, {
	name: 'companies',
	onStop: function() {
		this.render(null, {to: 'content'});
	},
});

Router.route('/companies/all', function() {
	this.render('companies');

	this.render('listCompanies', {
		to: 'content',
		data: function() {
			return {
				companies: Companies.find(),
			}
		},
	});
}, {
	name: 'allCompanies',
	onStop: function() {
		this.render(null, {to: 'content'});
	},
});

Router.route('/companies/new', function() {
	Session.set('isCreateCompany', true);
	this.render('createFirstCompany');
}, {name: 'newCompany'});

Router.route('/companies/associate', function() {
	Session.set('isCreateCompany', false);
	this.render('createFirstCompany');
}, {name: 'associateToCompany'});

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
//PEOPLE
//
Router.route('/people', function() {
	this.render('people');
	
	this.render('listPeople', {
		to: 'content',
		data: {
			people: Meteor.users.find(),
		},
	});
}, {
	name: 'people',
	onStop: function() {
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
	Session.set('selectedUserId', this.params._id);

	this.render('profile', {data: Meteor.users.findOne({_id: this.params._id})});

}, {
	name: 'profile',
	onStop: function() {
		Session.set('selectedUserId', null);
	},
});

Router.route('/profile/:_id/projects', function() {
	Session.set('selectedUserId', this.params._id);
	
	this.render('profile', {data: Meteor.users.findOne({_id: this.params._id})});
	
	this.render('listProjects', {
		to: 'content',
		data: function() {
			return {
				projects: Projects.find({createdBy: this.params._id}),
			}
		},
	});
}, {
	name: 'userProjects',
	onStop: function() {
		Session.set('selectedUserId', null);
		this.render(null, {to: 'content'});
	},
});

Router.route('/profile/:_id/companies', function() {
	Session.set('selectedUserId', this.params._id);

	this.render('profile', {data: Meteor.users.findOne({_id: this.params._id})});
	
	this.render('listCompanies', {
		to: 'content',
		data: function() {
			var myCompanies = Meteor.user().profile.companies;

			return {
				companies: Companies.find({_id: {$in: myCompanies}}),
			}
		},
	});
}, {
	name: 'userCompanies',
	onStop: function() {
		Session.set('selectedUserId', null);
		this.render(null, {to: 'content'});
	},
});