Companies = new Mongo.Collection("companies");

Companies.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: "Company"
	}
}));