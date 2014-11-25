Router.route('/me', function() {
	renderMyProfile(this);
}, {name: 'me'});

Router.route('/profile', function() {
	renderMyProfile(this);
}, {name: '_profile'});

Router.route('/profile/:_id', function() {
	renderProfile(this);
}, {name: 'profile', onStop: function() {onStopProfile(this)}});

Router.route('/profile/:_id/projects', function() {
	renderProfileProjects(this);
}, {name: 'userProjects', onStop: function() {onStopProfile(this)}});

Router.route('/profile/:_id/companies', function() {
	renderProfileCompanies(this);
}, {name: 'userCompanies', onStop: function() {onStopProfile(this)}});


function renderMyProfile(thiss) {
	thiss.redirect('profile', {_id: Meteor.userId()});
}

function renderProfile(thiss) {
	var userId = thiss.params._id;

	Session.set('selectedUserId', userId);
	thiss.render('profile', {data: Meteor.users.findOne({_id: userId})});
}

function renderProfileProjects(thiss) {
	var userId = thiss.params._id;
	renderProfile(thiss);
	
	thiss.render('listProjects', {
		to: 'content',
		data: function() {
			return {
				projects: Projects.find({createdBy: userId}),
			}
		},
	});
}

function renderProfileCompanies(thiss) {
	var userId = thiss.params._id;
	renderProfile(thiss);
	
	thiss.render('listCompanies', {
		to: 'content',
		data: function() {
			try {
				var companies = Meteor.users.findOne(userId).profile.companies;
				if(!(companies && companies.length >= 0)) companies = [];
			} catch(e) {
				var companies = [];
			}

			return {
				companies: Companies.find({_id: {$in: companies}}),
			}
		},
	});
}

function onStopProfile(thiss) {
	Session.set('selectedUserId', null);
	thiss.render(null, {to: 'content'});
}