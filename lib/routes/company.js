Router.route('/company/:_id', function() {
	renderCompany(this);
}, {name: 'company', onStop: function() {onStopCompany(this)}});

Router.route('/company/:_id/people', function() {
	renderCompanyPeople(this);
}, {name: 'companyPeople', onStop: function() {onStopCompany(this)}});

Router.route('/company/:_id/projects', function() {
	renderCompanyProjects(this);
}, {name: 'companyProjects', onStop: function() {onStopCompany(this)}});


function renderCompany(thiss) {
	var companyId = thiss.params._id;
	
	Session.set('selectedCompanyId', companyId);
	thiss.render('company', {
		data: Companies.findOne(companyId)
	});
}

function renderCompanyPeople(thiss) {
	var companyId = thiss.params._id;
	renderCompany(thiss);
	
	thiss.render('listPeople', {
		to: 'content',
		data: function() {
			return {
				people: Meteor.users.find({'profile.companies': companyId}),
			}
		},
	});
}

function renderCompanyProjects(thiss) {
	var companyId = thiss.params._id;
	renderCompany(thiss);
	
	thiss.render('listProjects', {
		to: 'content',
		data: function() {
			return {
				projects: Projects.find({companyId: companyId}),
			}
		},
	});
}

function onStopCompany(thiss) {
	Session.set('selectedCompanyId', null);
	thiss.render(null, {to: 'content'});
}