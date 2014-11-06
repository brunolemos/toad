UI.registerHelper('avatar', function(user, size) {
	if(typeof(user) == 'string') user = Meteor.users.findOne(user);
	if(!(size > 0)) size = 150;
	var email = '';

	try {
		if (user.profile.picture) return user.profile.picture;
		if (user.services.facebook) return "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?size=" + size;
		email = user.emails[0].address;
	} catch(e) {}

	return Gravatar.imageUrl(email, {size: size, default: 'mm'});
});

UI.registerHelper('today', function () {
	return new Date();
});

UI.registerHelper('dateInput', function (date, _default) {
	if(!date) date = _default;
	if(!(date instanceof Date)) date = new Date(date);

	return date.toISOString().substr(0, 10);
});

UI.registerHelper('checkboxInput', function(isChecked, optionValue) {
  return isChecked ? {checked: 'checked'} : '';
});

UI.registerHelper('optionSelected', function(selectedValue, optionValue) {
  return selectedValue == optionValue ? {selected: 'selected'} : '';
});

UI.registerHelper('formatDate', function(date) {
    return moment(date).format('DD-MM-YYYY');
});

UI.registerHelper('loadUser', function(userId) {
	return Meteor.users.findOne(userId);
});

UI.registerHelper('isThisMe', function(userId) {
	return Meteor.userId() == userId;
});

UI.registerHelper('momentFromNow', function(date) {
	if(!date) return '-';

	return moment(date).fromNow();
});

UI.registerHelper('isModEqual', function(a, b, m, sum) {
	if(sum) a += sum;
	return a % b == m;
});