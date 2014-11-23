Meteor.methods({
	removeProjectsAndTasks: function(projectId) {
		check(projectId, String);

	    if(!canRemoveProject(projectId)) {
			if(this.isSimulation) return false;
			throw new Meteor.Error("access-denied", "Você não tem permissão para realizar esta ação.");
	    }
	    
		return Projects.remove({_id: projectId}, function(error, result) {
			if(error) {
				if(this.isSimulation) return false;
				throw new Meteor.Error(error.name, error.message);

			} else {
				return Tasks.remove({projectId: projectId}, function(error, result) {
					if(error) {
						if(this.isSimulation) return false;
						throw new Meteor.Error(error.name, error.message);

					} else {
						return true;
					}
				});
			}
		});
	},

	insertCompanyAndUpdateUser: function(name, facebookId, admins) {
		var data = {};
		data.name = name;
		data.facebookId = facebookId;
		data.admins = admins;
		data.createdBy = Meteor.userId();
		data.createdAt = new Date();

		var company = Companies.findOne({facebookId: facebookId});
		if(company) {
			if(this.isSimulation) return false;
			throw new Meteor.Error("already-exists", "Empresa já cadastrada2.");

		} else {
			return Companies.insert(data, function(error, result) {
				if(error) {
					if(this.isSimulation) return false;
					throw new Meteor.Error(error.name, error.reason);

				} else if(result) {
					return Meteor.call('associateToCompany', result);
				}
			});
		}
	},

	associateToCompany: function(companyId) {
	    var company = Companies.findOne(companyId);
	    if(!company) {
			if(this.isSimulation) return false;
			throw new Meteor.Error("not-found", "Empresa não foi encontrada.");
	    }

		return Meteor.users.update(Meteor.userId(), {
			$addToSet: {'profile.companies': companyId},
			$set: {'profile.selectedCompany': companyId},
			
		}, function(error, result) {
			if(error) {
				if(this.isSimulation) return false;
				throw new Meteor.Error(error.name, error.reason);

			} else {
				return result;
			}
		});
	},

	diassociateFromCompany: function(companyId) {
	    var company = Companies.findOne(companyId);
	    if(!company) {
			if(this.isSimulation) return false;
			throw new Meteor.Error("not-found", "Empresa não foi encontrada.");
	    }

		return Meteor.users.update(Meteor.userId(), {
			$pull: {'profile.companies': companyId},
			$set: {'profile.selectedCompany': ''},
			
		}, function(error, result) {
			if(error) {
				if(this.isSimulation) return false;
				throw new Meteor.Error(error.name, error.reason);

			} else {
				return result;
			}
		});
	},
});