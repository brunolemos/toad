Handlebars.registerHelper('today', function () {
	return (new Date()).toISOString().substr(0, 10);
});