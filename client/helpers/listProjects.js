MyCharts = {};

Template.listProjects.helpers({
	selectedProjectId: function() {
		return Session.get('selectedProjectId');
	},

	isProjectSelected: function(projectId) {
		return Session.equals('selectedProjectId', projectId);
	},
});

Template.projectCompletedTasksChart.rendered = function(a) {
	var projectId = this.data._id;
	createChart(projectId);
}

Template.projectCompletedTasksChart.destroyed = function() {
	try {
		var projectId = this.data._id;
		delete MyCharts[projectId];
	} catch(e) {}
}

Template.projectCompletedTasksChart.helpers({
	dummy: function() {
		var projectId = this._id;

		var checked 	= Tasks.find({projectId: projectId, checked: true}).count();
		var notChecked 	= Tasks.find({projectId: projectId, checked: false}).count();
		
		var canvas = $('#chart-' + projectId).get(0);
		if(!canvas) return;	

		if(!MyCharts[projectId]) createChart(projectId);

		MyCharts[projectId].options.animation = true;
		MyCharts[projectId].options.animationSteps = 25;
		MyCharts[projectId].segments[0].value = (!checked && !notChecked) ? 1 : notChecked;
		MyCharts[projectId].segments[1].value = checked;
		MyCharts[projectId].update();
	},
});

function createChart(projectId) {
	var checked 	= Tasks.find({projectId: projectId, checked: true}).count();
	var notChecked 	= Tasks.find({projectId: projectId, checked: false}).count();
	
	var canvas 	= $('#chart-' + projectId).get(0);
	if(!canvas) return;	

	var ctx = canvas.getContext("2d");
	var data = [
	    {
	        value: (!checked && !notChecked) ? 1 : notChecked,
	        color: "rgba(0, 0, 0, 0.05)",
	        // label: "To Do",
	    },
	    {
	        value: checked,
	        color: "#4285F4",
	        // label: "Completed",
	    }
	];

	MyCharts[projectId] = new Chart(ctx).Doughnut(data, {animation: false, animationSteps: 40, animationEasing: 'easeOut', segmentShowStroke:false});
}