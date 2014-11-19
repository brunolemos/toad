Template.general.helpers({
	tasks: function() {	
		var startOfWeek = moment().startOf('week').toDate();
		var endOfWeek 	= moment().endOf('week').toDate();

		//tasks that start or end this week
		return Tasks.find({$or: [
			{startDate: {$gte: startOfWeek, $lte: endOfWeek}},
			{endDate: {$gte: startOfWeek, $lte: endOfWeek}},
		]});
	},
});