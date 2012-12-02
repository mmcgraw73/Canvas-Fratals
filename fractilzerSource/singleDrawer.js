// JavaScript Document


			
function draw() {   
	img = new Image();  
	img.src = context2.canvas2.toDataURL();  
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