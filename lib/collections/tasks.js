Tasks = new Mongo.Collection("tasks");

Tasks.attachSchema(new SimpleSchema({
	name: {
		type: String,
	},

	projectId: {
		type: String,
	    index: true,
	    unique: false,
	},

	createdBy: {
		type: String,
		optional: true,
	},

	createdAt: {
		type: Date,
		optional: true,
	},

	checked: {
		type: Boolean,
		defaultValue: false,
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