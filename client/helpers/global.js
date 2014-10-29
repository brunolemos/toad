UI.registerHelper('today', function () {
	return new Date();
});

UI.registerHelper('dateInput', function (date, _default) {
	if(!date) date = _default;
	if(!(date instanceof Date)) date = new Date(date);

	return date.toISOString().substr(0, 10);
});

UI.registerHelper('selected', function(selectedValue, optionValue) {
  return selectedValue == optionValue ? {selected: 'selected'} : '';
});

UI.registerHelper('formatDate', function(date) {
    return moment(date).format('DD-MM-YYYY');
});