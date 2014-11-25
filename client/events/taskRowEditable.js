Template.taskRowEditable.events({
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

	'change .task-item.newTask input[name=name]': function(e, template) {
	    var data 		= {};
	    data.name 		= template.$('[name=name]').val();
	    data.projectId	= Session.get('selectedProjectId');

	    if(!data.name) return;
		
		$('.newTask input').val(null);
		$('form[name=editTask] [name=name]').focus();
		
		Tasks.insert(data, function(error, result) {
			if(error) {
				Session.set('error', error.message);
			} else if(result) {
				Session.set('error', null);
			}
		});
  	},

	'click .delete-task': function(e, template) {
	    e.preventDefault();

		if(this._id) {// && confirm("Deseja excluir esta tarefa permanentemente?")) {
	    	Tasks.remove({_id: this._id});
	    }
	},

	'keydown input[type=text]': function(e) {
		//ENTER = Save
		if (e.which === 13 || e.which === 2) {
			e.preventDefault();
			e.target.blur();

		//ESC = Cancel
		} else if(e.which == 27) {
			e.preventDefault();

			if(e.target.value == '') {
				Router.go('projects');
				return;
			}

			e.target.value = '';

			if(this._id) {
				e.target.blur();
			}
		}
	},
});