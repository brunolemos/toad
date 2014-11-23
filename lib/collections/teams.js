Teams = new Mongo.Collection("teams");

Teams.attachSchema(new SimpleSchema({
	name: {
		type: String,
	},

	companyId: {
		type: String,
	},

	members: {
		type: [String],
		defaultValue: [],
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