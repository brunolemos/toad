Template.taskRow.events({
	'click .task-item > .pointer': function(e, template) {
		if(e.target.localName != 'td' && e.target.localName != 'th')
			return;

		// Router.go('editProjectTask', {projectId: this.projectId, _id: this._id});
	    if(Session.equals("editTaskId", this._id)) {
	    	Session.set("editTaskId", null);
	    } else {
	    	Session.set("editTaskId", this._id);

	    	// setTimeout(function() {
		    // 	$(e.target).parent().find('input[name=name]').focus();
	    	// }, 0300);
	    }
	},

	'blur .task-item input': function(event) {
    	if (Session.equals('editTaskId', this._id)) {
      		Session.set('editTaskId', null);
    	}
  	},

	'change .task-item input': function(e, template) {
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
	    // data.checked 	= template.$('[name=checked]')[0].checked;
	    data.projectId	= Session.get('selectedProjectId');

	    if(!data.name) return;
		
		$('.newTask input').val(null);
		// $('.newTask input[type=checkbox]').prop('checked', false);
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
	    	Session.set("editTaskId", null);
	    	
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

	// update the text of the item on keypress but throttle the event to ensure
 	// we don't flood the server with updates (handles the event at most once 
  	// every 300ms)
  	// 'keyup input[type=text]': _.throttle(function(event) {
  	// 	console.log("AAA");
   //  	Tasks.update(this._id, {$set: {name: event.target.value}});
  	// }, 300),
});