$(document).on('ready', function(){

	//Loads the json file
	loadData();
});


function loadData()
{
	$.ajax({
		dataType: "json",
		url: "js/data.json",
		success: function(json){
			
			//Opens modal when the data has been read
			openLightBox(function(){
				startProgressBar(json.data.lightbox.duration);
			});
		},
		error: function(a,b,c){
		}
	});
}

//Presents the lightbox and returns a callback when it's ready
function openLightBox(callback)
{
	var modal = $('#myModal');

	$(document).on('shown.bs.modal', function(){
		//Lighbox is presented
		callback();
	});
	
	modal.modal();
}

//Animates the progressbar with the specified duration
function startProgressBar(duration)
{
	duration = duration || 5000;
	var progressText = $("#progress-text");
	var completedIcon = $("#completed-icon");
	var progressBar = $("#progress-bar");

	//Starts animation of the progressbar
	progressBar.animate({width:'100%'}, {
		duration:duration,
	    specialEasing: {
			width: "linear"
		},
		progress:function(animation, progress, remainingMs){
			//updates the percentage text
			progressText.html("Progress "+ parseInt(progress*100) +"%");
		},
		complete:function(){
			// Animation complete.
			progressBar.removeClass("progress-bar-info").addClass("progress-bar-success");
			completedIcon.show();
			progressText.html("This task is 100% completed");
		}	
	});
}