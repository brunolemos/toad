//app layout
Router.configure({
	layoutTemplate: 'index'
});

//private routes
Router.onBeforeAction(function() {
	if(!Meteor.user()) {
		this.wait(function() {return !Meteor.loggingIn(); });

		if(this.ready()) {
			this.render('login');
		}
	} else {
		this.next();
	}
}, {except: ['index', 'login', 'signup']});

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

Router.route('/dashboard', function() {
	this.render('dashboard');
}, {name: 'dashboard'});

Router.route('/login', function() {
	if(Meteor.userId()) {
		this.redirect('index');
	} else {
		Session.set('isSignup', false);
		this.render('login');
	}
}, {name: 'login'});

Router.route('/signup', function() {
	Session.set('isSignup', true);
	this.render('login');
}, {name: 'signup'});

Router.route('/projects', {name: 'projects'});

Router.route('/projects/:_id/edit', function() {
	this.render('formProject', {
		data: function() {
			return Projects.findOne({_id: this.params._id});
		}
	});
}, {name: 'editProject'});

Router.route('/projects/new', function() {
	this.render('formProject');
}, {name: 'newProject'});

Router.route('/tasks', {name: 'tasks'});

Router.route('/tasks/:_id/edit', function() {
	this.render('formTask', {
		data: function() {
			return Tasks.findOne({_id: this.params._id});
		}
	});
}, {name: 'editTask'});

Router.route('/tasks/new', function() {
	this.render('formTask');
}, {name: 'newTask'});

Router.route('/me', function() {
	this.render('profile', {
		data: function() {
			return Meteor.users.findOne({_id: Meteor.userId()});
		}
	});
}, {name: 'me'});

// Router.route('/profile', function() {
// 	this.redirect('me');
// });

Router.route('/profile/:_id', function() {
	this.render('profile', {
		data: function() {
			return Meteor.users.findOne({_id: this.params._id});
		}
	});
}, {name: 'profile'});


Router.route('/settings', {name: 'settings'});