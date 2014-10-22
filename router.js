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
Router.route('/projects/new', {name: 'newProject'});
Router.route('/tasks', {name: 'tasks'});
Router.route('/tasks/new', {name: 'newTask'});
Router.route('/settings', {name: 'settings'});

Router.route('/me', function() {
	this.redirect(Router.path('profile', {_id: Meteor.userId()}));
}, {name: 'me'});

Router.route('/profile/:_id', function() {
	this.render('profile', {
		data: function() {
			return Meteor.users.findOne({_id: this.params._id});
		}
	});
}, {name: 'profile'});