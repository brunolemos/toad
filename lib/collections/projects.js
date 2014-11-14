Projects = new Mongo.Collection("projects");

Projects.attachSchema(new SimpleSchema({
	name: {
		type: String,
	},

	companyId: {
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
}));