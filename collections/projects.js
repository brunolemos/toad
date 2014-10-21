Projects = new Mongo.Collection("projetcs");

Companies.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: "Projeto"
	}
}));