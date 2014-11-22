Template.project.rendered = function() {
	if(!(this.data && this.data._id)) {
		this.find('#projectName').focus();
	}
}