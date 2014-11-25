UI.registerHelper('isMyCompany', isMyCompany);
UI.registerHelper('canRemoveProject', canRemoveProject);
UI.registerHelper('canRemoveTask', canRemoveTask);

UI.registerHelper('themeColor', function(key) {
	return Session.get('theme-color');
});

UI.registerHelper('themeClass', function(key) {
	return Session.get('theme-class');
});

UI.registerHelper('isActiveRoute', function(route, className) {
	if(typeof(className) != 'string') className = 'active';
	var currentRoute = Router.current().route.getName();

	return route == currentRoute ? 'active' : '';
});

UI.registerHelper('isActivePath', function(path, className) {
	if(typeof(className) != 'string') className = 'active';
	var currentRoute = Router.current().route.getName();
	var currentPath = Router.path(currentRoute);
	
	return currentPath.indexOf(path) <= 1 ? 'active' : '';
});

UI.registerHelper('facebookAvatar', facebookAvatar);

UI.registerHelper('companyAvatar', function(company, size) {
	if(typeof(company) == 'string') company = Companies.findOne(company);
	if(!company) return Gravatar.imageUrl('', {size: size, default: 'mm'});
	
	return facebookAvatar(company.facebookId, size);
});

UI.registerHelper('userAvatar', function(user, size) {
	if(typeof(user) == 'string') user = Meteor.users.findOne(user);
	if(!(size > 0)) size = 150;
	var email = '';
	
	try {
		email = user.emails[0].address;
		if (user.profile.picture) return user.profile.picture;
		if (user.services.facebook) return facebookAvatar(user.services.facebook.id, size);
	} catch(e) {}

	return Gravatar.imageUrl(email, {size: size, default: 'mm'});
});

UI.registerHelper('today', function() {
	return new Date();
});

UI.registerHelper('dateInput', function(date, _default) {
	if(!date) {
		if(_default instanceof Date) {
			date = _default;
		} else {
			return '';
		}
	} else if(!(date instanceof Date)) {
		date = new Date(date);
	}

	return date.toISOString().substr(0, 10);
});

UI.registerHelper('checkboxInput', function(isChecked, optionValue) {
  return isChecked ? {checked: 'checked'} : '';
});

UI.registerHelper('optionSelected', function(selectedValue, optionValue) {
  return selectedValue == optionValue ? {selected: 'selected'} : '';
});

UI.registerHelper('formatDate', function(date, format) {
	if(!date) return '';
	if(!(date instanceof Date)) date = new Date(date);
	if(typeof(format) != 'string') format = 'DD/MM/YYYY';

    return moment(date).format(format);
});

UI.registerHelper('loadUser', function(userId) {
	return Meteor.users.findOne(userId);
});

UI.registerHelper('loadCompany', function(companyId) {
	return Companies.findOne(companyId);
});

UI.registerHelper('loadProject', function(projectId) {
	return Projects.findOne(projectId);
});

UI.registerHelper('isThisMe', function(userId) {
	return Meteor.userId() == userId;
});

UI.registerHelper('momentFromNow', function(date) {
	if(!date) return '';

	return moment(date).fromNow();
});

UI.registerHelper('isModEqual', function(a, b, m, sum) {
	if(sum) a += sum;
	return a % b == m;
});

UI.registerHelper('momentFromNowDiff', function(date){
	a = moment(); 
	diff = a.diff(date, 'days');

	if (diff > 0 && diff < 10){
		return "late";
	}else if(diff > 10){
		return "tooLate";
	}else{
		return "onDate";
	}
});

function facebookAvatar(facebookUrl, size) {
	if(!(size > 0)) size = 150;
	var facebookId = facebookUrl;
	if(!facebookId) {
		return Gravatar.imageUrl('', {size: size, default: 'mm'});
	}

	try {
		facebookId = facebookUrl.match(/(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/)[1];
	} catch(e) {}
	
	return "http://graph.facebook.com/" + facebookId + "/picture/?width=" + size + "&height=" + size;
}