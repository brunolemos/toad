Tasks = new Mongo.Collection("tasks");

Tasks.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: "Task"
	},

	project: {
		type: Object,
		label: "Project"
	}
}));