Projects = new Mongo.Collection("projetcs");

Projects.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: "Project"
	}
}));