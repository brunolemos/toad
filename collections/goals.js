Goals = new Mongo.Collection("goals");

Goals.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: "Goal"
	},
	
	project: {
		type: Object,
		label: "Project"
	}
}));