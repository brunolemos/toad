Template.taskRow.events({
	'change .task-item input': function(e, template) {
		if(!this._id) return false;
		if($(e.target).data('ignore-change')) return false;
		
		var value = e.target.value;
		if(e.target.type == 'checkbox') value = e.target.checked;
		if(e.target.type == 'date') value = moment(value).toDate();
		
		var data = {};
		data[e.target.name] = value;
		Tasks.update({_id: this._id}, {$set: data});
  	},
});