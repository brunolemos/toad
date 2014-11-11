Projects = new Mongo.Collection("projects");

Projects.attachSchema(new SimpleSchema({
	name: {
		type: String,
	},

	company: {
		type: String,
	},

	priority: {
		type: Number,
		min: 1,
		max: 3,
		optional: true,
	},

	startDate: {
		type: Date,
		optional: true,
	},

	motivation: {
		type: String,
		optional: true,
	},

	objective: {
		type: String,
		optional: true,
	},
}));