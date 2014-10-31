Tasks = new Mongo.Collection("tasks");

Tasks.attachSchema(new SimpleSchema({
	name: {
		type: String,
	},

	checked: {
		type: Boolean,
		optional: true,
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
		optional: true,
	},

	plannedDuration: {
		type: Number,
		optional: true,
	},

	startDate: {
		type: Date,
		optional: true,
	},

	endDate: {
		type: Date,
		optional: true,
	},
}));