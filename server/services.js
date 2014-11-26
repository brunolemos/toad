Meteor.startup(function() {
	if(ServiceConfiguration.configurations.find({service: 'facebook'}).count() > 0) {
		// first, remove configuration entry in case service is already configured
		ServiceConfiguration.configurations.remove({
			service: 'facebook'
		});

		ServiceConfiguration.configurations.insert({
			service: 'facebook',
			appId: '1727664704125562',
			secret: 'ee691b2bbac7f6bd7b2e92e27f1f53ff', //localhost
			// secret: '80c334cc5384422a069fb66ccf960779', //toad.meteor.com
		});
	}
});