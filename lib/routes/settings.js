Router.route('/settings', function() {
	this.render('settings');

}, {
	name: 'settings',
	onStop: function() {
		this.render(null, {to: 'content'});
	},
});