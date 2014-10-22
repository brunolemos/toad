Projects = new Mongo.Collection("projetcs");

Projects.attachSchema(new SimpleSchema({
	name: {
		type: String,
	},

	priority: {
		type: Number,
		min: 1,
		max: 3,
	},

	startDate: {
		type: Date,
	},

	motivation: {
		type: String,
	},

	objective: {
		type: String,
	},
}));