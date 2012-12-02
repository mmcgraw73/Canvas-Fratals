// JavaScript Document

			
	//		
//			function init () {
//					canvas = document.getElementById('tutorial');  
//					ctx = canvas.getContext('2d'); 
//					recurse();
//			}
//			
//			function recurse() {   
//				img = new Image();  
//				img.src = canvasOutImage;  
//				fr1 = makeFrame(ctx, makeVect(900,100), makeVect(900, 100), makeVect(100, 900));
//				img.onload = function(){ 
//			 		ctx.save(); 
//					newPainter = cornerSplit(imagePainter,5);
//					newPainter(fr1);	 
//					ctx.restore();
//					ctx.save();
//					newPainter(flipHorizLeft(fr1));
//					ctx.restore();
//					ctx.save();
//					newPainter(flipVertDown(fr1));	
//					ctx.restore();
//					ctx.save();
//					newPainter(flipVertDown(flipHorizLeft(fr1)));	
//				}  
//			}
//			
				 
	 var formElement2 = document.getElementById("recImage");
	 //formElement2.addEventListener('click', recImagePressed, false);
	 
	 function recImagePressed(e){
		 var outputCanvas = document.getElementById("outputCanvas");
		 outputCtx = outputCanvas.getContext('2d');
		 img = new Image();  
		 img.src = canvas2.toDataURL();  
		 fr1 = makeFrame(context2, makeVect(900,100), makeVect(900, 100), makeVect(100, 900));
		 img.onload = function(){ 
		 context2.save(); 
		 newPainter = cornerSplit(imagePainter,5);
		 newPainter(fr1);	 
		 context2.restore();
		 context2.save();
		 newPainter(flipHorizLeft(fr1));
		 context2.restore();
		 context2.save();
		 newPainter(flipVertDown(fr1));	
		 context2.restore();
		 context2.save();
		 newPainter(flipVertDown(flipHorizLeft(fr1)));	  
		 outputCtx.drawImage(img, 0, 0);
	 }
	 }
	 
	 //---------------------------------------------------------------------------------- listener & handler 'createImageData'button & 'recImage' button				  
	  var formElement = document.getElementById("createImageData"); 
	  formElement.addEventListener('click', createImageDataPressed, false);
	  
	  function createImageDataPressed(e) { 
	  var imageDataDisplay = document.getElementById("imageDataDisplay"); 
	  imageDataDisplay.value = canvas2.toDataURL(); 
	  var newImage = window.open(canvas2.toDataURL(),"canvasImage","right=300,top=400,width=" 
										+ canvas2.width + ",height=" + 
										canvas2.height + ",toolbar=0,resizable=0");
	 } 

	
	
	
	
function init () {
	canvas = document.getElementById('tutorial');  
	ctx = canvas.getContext('2d'); 
	draw ();
}
	
function draw() {   
	img = new Image();  
	img.src = 'pi-200-border.png';  
	fr1 = makeFrame(ctx, makeVect(100,100), makeVect(200, 50), makeVect(50, 200));
	img.onload = function(){ 
		var newPainter;
		ctx.save(); 
		imagePainter(fr1);  
	}  
} 




function init () {
	canvas = document.getElementById('tutorial');  
	ctx = canvas.getContext('2d'); 
	draw ();
}
		
function draw() {   
	img = new Image();  
	img.src = 'pi-200-border.png';  
	fr1 = makeFrame(ctx, makeVect(200,200), makeVect(200, 0), makeVect(0, 200));
	img.onload = function(){ 
		var newPainter;
		ctx.save(); 
		imagePainter(fr1);  
		ctx.restore(); 
		ctx.save(); 
		imagePainter(rotate90(fr1));  
		ctx.restore(); 
		ctx.save(); 
		imagePainter(rotate180(fr1));  
		ctx.restore(); 
		ctx.save(); 
		imagePainter(rotate270(fr1));  
	}  
}  	



function init () {
	canvas = document.getElementById('tutorial');  
	ctx = canvas.getContext('2d'); 
	draw ();
}

function draw() {   
	img = new Image();  
	img.src = 'pi-200-border.png';  
	fr1 = makeFrame(ctx, makeVect(200,200), makeVect(200, 0), makeVect(0, 200));
	img.onload = function(){ 
		var newPainter;
		ctx.save(); 
		imagePainter(fr1);  
		ctx.restore(); 
		ctx.save(); 
		imagePainter(flipHorizLeft(fr1));  
		ctx.restore(); 
		ctx.save(); 
		imagePainter(flipVertUp(fr1));  
		ctx.restore(); 
		ctx.save(); 
		imagePainter(flipVertUp(flipHorizLeft(fr1)));  
	}  
}  



//----------------------------------------------------------------------The Compound Painter: png Limit

function init () {
	canvas = document.getElementById('tutorial');  
	ctx = canvas.getContext('2d'); 
	draw ();
}
			
function draw() {   
	img = new Image();  
	img.src = 'pi-200-border.png';  
	fr1 = makeFrame(ctx, makeVect(400,0), makeVect(400, 0), makeVect(0, 400));
	img.onload = function(){ 
		ctx.save(); 
		newPainter = cornerSplit(imagePainter,5);
		newPainter(fr1);	 
		ctx.restore();
		ctx.save();
		newPainter(flipHorizLeft(fr1));
		ctx.restore();
		ctx.save();
		newPainter(flipVertDown(fr1));	
		ctx.restore();
		ctx.save();
		newPainter(flipVertDown(flipHorizLeft(fr1)));	
	}  
}  

	

function init () {
	canvas = document.getElementById('tutorial');  
	ctx = canvas.getContext('2d'); 
	draw ();
}

function draw() {   
	var img = new Image();  
	img.src = 'pi-200.png';  
	img.onload = function(){  
		ctx.drawImage(img,0,0);  
	}  
}  





