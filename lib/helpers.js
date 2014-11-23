isMyCompany = function(companyId) {
	if(typeof(companyId) != 'string') companyId = Companies.findOne(companyId)._id;
	
	return Meteor.user().profile.companies.indexOf(companyId) >= 0;
}

isProjectFromMyCompanies = function(projectId) {
	if(typeof(projectId) != 'string') projectId = Projects.findOne(projectId)._id;
	
	try {
		var companyId = Projects.findOne(projectId).companyId;
		return isMyCompany(companyId);
		
	} catch(e) {
		return false;
	}
}

canRemoveProject = function(project) {
	if(typeof(project) == 'string') project = Projects.findOne(project);

    return project.createdBy == Meteor.userId() && isProjectFromMyCompanies(project._id);
}

canRemoveTask = function(task) {
	if(typeof(task) == 'string') task = Tasks.findOne(task);

	if(task.createdBy == Meteor.userId()) return true;

	var project = Projects.findOne(task.projectId);
    return canRemoveProject(project);
}