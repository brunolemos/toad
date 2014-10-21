//app layout
Router.configure({
	layoutTemplate: 'layout'
});

//private routes
Router.onBeforeAction(function() {
	if(!Meteor.user()) {
		this.render('login');
	} else {
		this.next();
	}
}, {only: ['page2', 'me']});

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

Router.route('/login', {name: 'login'});

Router.route('/register');

Router.route('/me', function() {
	this.redirect(Router.path('profile', {_id: Meteor.userId()}));
});

Router.route('/profile/:_id', function() {
	this.render('profile', {
		data: function() {
			return Meteor.users.findOne({_id: this.params._id});
		}
	});
}, {name: 'profile'});


Router.route('/page2', function() {
	this.render('page2');
});