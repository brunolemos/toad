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