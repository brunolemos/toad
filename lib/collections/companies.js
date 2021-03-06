Companies = new Mongo.Collection("companies");

Companies.attachSchema(new SimpleSchema({
	name: {
		type: String,
	    index: true,
	    unique: false,
	},

	facebookId: {
		type: String,
	    index: true,
	    unique: true,
	},
	
	admins: {
		type: [String],
		defaultValue: [],
	},

	themeColor: {
		type: String,
		optional: true,
	},

	isDarkTheme: {
		type: Boolean,
		defaultValue: true,
		optional: true,
	},
}));