// JavaScript Document

	//**this is the function that should bring in the canvas image created by user**//

function drawFunction() {
    img = new Image();
    var canvasDestination = document.getElementById('outputCanvas');
    var contextDestination = canvasDestination.getContext('2d');
    var canvasSource = document.getElementById('imageCreate');
    var contextC = canvasSource.getContext('2d');
	//contextC.scale(5,5);
    img.src = contextC.canvas.toDataURL();   //This loads the image from the input canvas
    contextDestination.drawImage(img, 0, 0);  //This saves the image to the destination canvas (this was the part that was missing, I think)
    //Pass the contextDestination into the makeFrame 
    fr1 = makeFrame(contextDestination, makeVect(250, 0), makeVect(250, 0), makeVect(0, 250));//1. from 4oo to 15o
    
    img.onload = function() {
		 //contextDestination.save();
        newPainter = cornerSplit(imagePainter, 5);
        newPainter(fr1);
        contextDestination.restore();
        contextDestination.save();
        newPainter(flipHorizLeft(fr1));
        contextDestination.restore();
        contextDestination.save();
        newPainter(flipVertDown(fr1));
        contextDestination.restore();
        contextDestination.save();
        newPainter(flipVertDown(flipHorizLeft(fr1)));
		};
			//this handles the CLEAR fractilized design
			var formElement = document.getElementById("clearDestination");
            	formElement.addEventListener('click',clearDisplayPressed, false);

            function clearDisplayPressed(e) {
				contextDestination.clearRect(0, 0, canvasDestination.width, canvasDestination.height);
				};

			//this handles the onclick event for the save-able fractilized design
			var formElement = document.getElementById("disImage");
            	formElement.addEventListener('click', displayImagePressed, false);

            function displayImagePressed(e) {
				var newDisplayImage = window.open(canvasDestination.toDataURL(), "DisCanvasImage", "right=500,top=700,width=" + canvasDestination.width + ",height=" + canvasDestination.height + ",toolbar=0,resizable=0");
			};
			
			
			var formElement = document.getElementById("createImageData");
            formElement.addEventListener('click', createImageDataPressed, false);

            function createImageDataPressed(e) {
                //var imageDataDisplay = document.getElementById("imageDataDisplay");
                //imageDataDisplay.value = canvas2.toDataURL();
                var newImage = window.open(canvas2.toDataURL(), "canvasImage", "right=300,top=400,width=" + canvas2.width + ",height=" + canvas2.height + ",toolbar=0,resizable=0");
            }
}//close drawFunction()