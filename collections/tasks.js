Tasks = new Mongo.Collection("tasks");

Tasks.attachSchema(new SimpleSchema({
	name: {
		type: String,
	},

	projectId: {
		type: String,
	},

	checked: {
		type: Boolean,
		defaultValue: false,
	},

	priority: {
		type: Number,
		min: 1,
		max: 3,
		optional: true,
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