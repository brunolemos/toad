MyCharts = [];

Template.listProjects.helpers({
	selectedProjectId: function() {
		return Session.get('selectedProjectId');
	},

	isProjectSelected: function(projectId) {
		return Session.equals('selectedProjectId', projectId);
	},
});

Template.projectCompletedTasksChart.rendered = function() {
	var projectId = this.$('.chart').first().data('projectId');
	createChart(projectId);
}

Template.projectCompletedTasksChart.helpers({
	dummy: function(a) {
		var projectId = this._id;

		var checked 	= Tasks.find({projectId: projectId, checked: true}).count();
		var notChecked 	= Tasks.find({projectId: projectId, checked: false}).count();

		var chartId = '#chart-' + projectId;
		var canvas = $(chartId).get(0);
		if(!canvas) return;	

		if(!MyCharts[chartId]) createChart(projectId);

		MyCharts[chartId].options.animationSteps = 25;
		MyCharts[chartId].segments[0].value = (!checked && !notChecked) ? 1 : notChecked;
		MyCharts[chartId].segments[1].value = checked;
		MyCharts[chartId].update();
	},
});

function createChart(projectId) {
	var checked 	= Tasks.find({projectId: projectId, checked: true}).count();
	var notChecked 	= Tasks.find({projectId: projectId, checked: false}).count();
	
	var chartId = '#chart-' + projectId;
	var canvas 	= $(chartId).get(0);
	if(!canvas || MyCharts[chartId]) return;	

	var ctx = canvas.getContext("2d");
	var data = [
	    {
	        value: (!checked && !notChecked) ? 1 : notChecked,
	        color:"#EEEEEE",
	        // label: "To Do",
	    },
	    {
	        value: checked,
	        color: "#4285F4",
	        // label: "Completed",
	    }
	];

	MyCharts[chartId] = new Chart(ctx).Doughnut(data, {animationSteps: 40, animationEasing: 'easeOut'});
}