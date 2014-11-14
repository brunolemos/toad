UI.registerHelper('userAvatar', function(user, size) {
	if(typeof(user) == 'string') user = Meteor.users.findOne(user);
	if(!(size > 0)) size = 150;
	var email = '';

	try {
		if (user.profile.picture) return user.profile.picture;
		if (user.services.facebook) return "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?width=" + size + "&height=" + size;
		email = user.emails[0].address;
	} catch(e) {}

	return Gravatar.imageUrl(email, {size: size, default: 'mm'});
});

UI.registerHelper('facebookAvatar', function(facebookUrl, size) {
	if(!(size > 0)) size = 150;
	var facebookId = facebookUrl;
	if(!facebookId) {
		return Gravatar.imageUrl('', {size: size, default: 'mm'});
	}

	try {
		facebookId = facebookUrl.match(/(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/)[1];
	} catch(e) {}
	
	return "http://graph.facebook.com/" + facebookId + "/picture/?width=" + size + "&height=" + size;
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
