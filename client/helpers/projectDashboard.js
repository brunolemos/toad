//
//COMPLETED TASKS
//
Template.CompletedTasksChart.rendered = function(a) {
	var projectId = Session.get('selectedProjectId');
	var checked 	= Tasks.find({projectId: projectId, checked: true}).count();;
	var notChecked 	= Tasks.find({projectId: projectId, checked: false}).count();
	
	createDoughnutChart(projectId, checked, notChecked, 'com');
}

Template.CompletedTasksChart.destroyed = function() {
	try {
		var projectId = Session.get('selectedProjectId');
		delete MyCharts[projectId];
	} catch(e) {}
}


//
//LATE TASKS
//
Template.LateTasksChart.rendered = function(a) {
	var projectId = Session.get('selectedProjectId');
	
	var total 		= Tasks.find({projectId: projectId}).count();;
	var notChecked 	= Tasks.find({projectId: projectId, checked: false}).count();
	
	now = moment();
	var toolate = 0;
	var late = 0; 
	for(var i=0; i<notChecked.length();++i){
		date = notChecked[i].endDate;
		diff = now.diff(date, 'days');

		if (diff > 0 && diff < 10){
			 late++;
		}else if(diff > 10){
			tooLate++;
		}
	}

	createDoughnutChart(projectId, checked, notChecked);
}

Template.LateTasksChart.destroyed = function() {
	try {
		var projectId = Session.get('selectedProjectId');
		delete MyCharts[projectId];
	} catch(e) {}
}

function createDoughnutChart(projectId, value1, value2, name) {

	var canvas 	= $('#'+name+'-chart-' + projectId).get(0);
	if(!canvas) return;	


	var ctx = canvas.getContext("2d");
	var data = [
	    {
	        value: value2,
	        color: "rgba(0, 0, 0, 0.05)",
	         label: "Não finalizadas",
	    },
	    {
	        value: value1,
	        color: "#4285F4",
	        label: "Finalizadas",
	    }
	];

	MyCharts[projectId] = new Chart(ctx).Doughnut(data, {animation: true, animationSteps: 40, animationEasing: 'easeOut', segmentShowStroke:false});
}

