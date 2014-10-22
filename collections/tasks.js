Tasks = new Mongo.Collection("tasks");

Tasks.attachSchema(new SimpleSchema({
	name: {
		type: String,
	},

	// project: {
	// 	type: String,
	// },

	priority: {
		type: Number,
		min: 1,
		max: 3,
	},

	// assignedTo: {
	// 	type: String,
	// },

	plannedDuration: {
		type: Date,
	},

	startDate: {
		type: Date,
	},

	endDate: {
		type: Date,
	},
}));