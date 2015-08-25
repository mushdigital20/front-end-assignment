$(document).on('ready', function(){
	
	var pageController = new PageController();
	pageController.loadJsonData();
});

var PageController = function(){
	this.startScreenObjects();
};

$.extend(PageController.prototype, {
	    startScreenObjects:function(){
	    	var self = this;
	    	self.resetButton = $("#resetButton");
	    	self.progressText = $("#progress-text");
			self.completedIcon = $("#completed-icon");
			self.progressBar = $("#progress-bar");
			self.modal = $('#myModal');

			//binds button click
			self.resetButton.on('click',function(){
				self.resetCounter(3);
			});

			this.resetScreenObjects();
	    },
	    //resets all objects to their initial state
	    resetScreenObjects:function(){
	    	this.progressBar.css("width","0%");
	    	this.progressBar.removeClass("progress-bar-success").addClass("progress-bar-info");
			this.completedIcon.hide();
			this.progressText.html("Progress 0%");
			this.resetButton.html("Reset");
	    },
	    //loads data from json file
	    loadJsonData:function(){
	    	this.changeCursorTo('wait');
	    	var self = this;
	    	$.ajax({
				dataType: "json",
				url: "js/data.json",
				success: function(json){
					//Opens modal when the data has been read
					self.openLightBox(function(){
						self.startProgressBar(json.data.lightbox.duration); //duration from json file
					});
				}
			});
	    },
	    //Presents the lightbox and returns a callback when it's ready
	    openLightBox:function(callback){
	    	$(document).unbind('shown.bs.modal').on('shown.bs.modal', function(){
				//Lighbox is presented
				callback();
			});
			
			this.modal.modal();
	    },
	    startProgressBar:function(duration){
	    	duration = duration || 5000;
	    	var self = this;
	    	//Starts animation of the progressbar
			self.progressBar.animate({width:'100%'}, {
				duration:duration,
			    specialEasing: {
					width: "linear"
				},
				progress:function(animation, progress, remainingMs){
					//updates the percentage text
					self.progressText.html("Progress "+ parseInt(progress*100) +"%");
				},
				complete:function(){
					// Animation complete.
					self.changeCursorTo('default');
					self.progressBar.removeClass("progress-bar-info").addClass("progress-bar-success");
					self.completedIcon.show();
					self.progressText.html("This task is 100% completed");
				}	
			});
	    },
	    resetCounter:function(secs){
			var self = this;
			if(secs > 0){
				self.resetButton.html("Reseting in "+secs);
				setTimeout(function(){
					secs--;
					self.resetCounter(secs);
				},1000);
			}else
			{
				self.resetScreenObjects();
				self.loadJsonData();
			}
		},
		changeCursorTo:function(cursor){
			$('body').css({'cursor' : cursor});
		}
	}
);