Goals = new Mongo.Collection("goals");

Goals.attachSchema(new SimpleSchema({
	name: {
		type: String,
	},
	
	project: {
		type: Object,
	}
}));