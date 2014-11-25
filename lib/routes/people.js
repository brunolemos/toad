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