Template.listTasks.events({
/*	'click .item.pointer': function(e, template) {
		Router.go('editProjectTask', {projectId: this.projectId, _id: this._id});
	},*/

	'click .checkTask': function(e, template) {
		e.preventDefault();

		if(this.status == true) {
			Tasks.update({_id: this._id}, {$set: {status: false}});
		}else {
			Tasks.update({_id: this._id}, {$set: {status: true}});
		}

	},

	'click .deleteTask': function(e, template) {
	    e.preventDefault();

		if(this._id && confirm("Deseja excluir esta tarefa permanentemente?")) {
	    	Tasks.remove({_id: this._id});
	    }
	},

	'click .taskName': function(e, template) {
	    e.preventDefault();
	    Session.set("editTaskId", this._id);
	},

	'blur input[type=text]': function(event) {
    	if (Session.equals('editTaskId', this._id))
      		Session.set('editTaskId', null);
  	},

	'keydown input[type=text]': function(event) {
    	// ESC or ENTER
    	if (event.which === 27 || event.which === 13) {
      		event.preventDefault();
      		event.target.blur();
    	}
  	},

	// update the text of the item on keypress but throttle the event to ensure
 	// we don't flood the server with updates (handles the event at most once 
  	// every 300ms)
  	'keyup input[type=text]': _.throttle(function(event) {
    	Tasks.update(this._id, {$set: {name: event.target.value}});
  	}, 300),

});