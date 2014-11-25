Router.route('/companies', function() {
	this.render('companies');
	
	this.render('listCompanies', {
		to: 'content',
		data: function() {
			try {
				var companies = Meteor.user().profile.companies;
				if(!(companies && companies.length >= 0)) companies = [];
			} catch(e) {
				var companies = [];
			}

			return {
				companies: Companies.find({_id: {$in: companies}}),
			}
		},
	});
}, {
	name: 'companies',
	onStop: function() {
		this.render(null, {to: 'content'});
	},
});


Router.route('/companies/all', function() {
	this.render('companies');

	this.render('listCompanies', {
		to: 'content',
		data: function() {
			return {
				companies: Companies.find(),
			}
		},
	});
}, {
	name: 'allCompanies',
	onStop: function() {
		this.render(null, {to: 'content'});
	},
});


Router.route('/companies/new', function() {
	this.render('newCompany');
	this.render('newCompanyForm', {to: 'content'});

}, {name: 'newCompany'});


Router.route('/companies/new/all', function() {
	this.render('newCompany');

	this.render('listCompanies', {
		to: 'content',
		data: function() {
			return {
				companies: Companies.find(),
			}
		},
	});
}, {
	name: 'newCompanyAll',
	onStop: function() {
		this.render(null, {to: 'content'});
	},
});