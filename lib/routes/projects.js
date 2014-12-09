Router.route('/projects', function() {
	this.render('projects');

	this.render('listProjects', {
		to: 'content',
		data: function() {
			try {
				var companies = Meteor.user().profile.companies;
				if(!(companies && companies.length >= 0)) companies = [];
			} catch(e) {
				var companies = [];
			}

			return {
				projects: Projects.find({createdBy: Meteor.userId(), companyId: { $in: companies }}),
			};
		},
	});
});


Router.route('/projects/all', function() {
	this.render('projects');

	this.render('listProjects', {
		to: 'content',
		data: function() {
			try {
				var companies = Meteor.user().profile.companies;
				if(!(companies && companies.length >= 0)) companies = [];
			} catch(e) {
				var companies = [];
			}

			return {
				projects: Projects.find({companyId: { $in: companies }}),
			};
		},
	});
}, {name: 'allProjects'});


Router.route('/projects/new', function() {
	this.render('project');
}, {name: 'newProject'});