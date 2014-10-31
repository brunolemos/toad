Template.listTasks.events({
	'click .item > .pointer': function(e, template) {
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

	'blur .item > .pointer [name=name]': function(event) {
    	if (Session.equals('editTaskId', this._id)) {
      		Session.set('editTaskId', null);
    		Tasks.update(this._id, {$set: {name: event.target.value}});
    	}
  	},

	'change [name=checked]': function(e, template) {
		this.checked = e.target.checked;

		if(this.checked) {
			Tasks.update({_id: this._id}, {$set: {checked: true}});
		}else {
			Tasks.update({_id: this._id}, {$set: {checked: false}});
		}

	},

	'click .deleteTask': function(e, template) {
	    e.preventDefault();

		if(this._id && confirm("Deseja excluir esta tarefa permanentemente?")) {
	    	Tasks.remove({_id: this._id});
	    }
	},

	'keydown input[type=text]': function(e) {
		//ENTER = Save
		if (e.which === 13) {
			e.preventDefault();
			e.target.blur();

		//ESC = Cancel
		} else if(e.which == 27) {
	    	Session.set("editTaskId", null);
	    	
			e.preventDefault();
			e.target.blur();
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