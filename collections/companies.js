Companies = new Mongo.Collection("companies");

Companies.attachSchema(new SimpleSchema({
	name: {
		type: String,
	},
	city: {
		type: String,
	},
	state: {
		type: String,
	}
}));