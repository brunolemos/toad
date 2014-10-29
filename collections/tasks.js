Tasks = new Mongo.Collection("tasks");

Tasks.attachSchema(new SimpleSchema({
	name: {
		type: String,
	},

	status: {
		type: Boolean,
	},

	projectId: {
		type: String,
	},

	priority: {
		type: Number,
		min: 1,
		max: 3,
	},

	assignedTo: {
	 	type: String,
	},

	plannedDuration: {
		type: Number,
	},

	startDate: {
		type: Date,
	},

	endDate: {
		type: Date,
	},
}));