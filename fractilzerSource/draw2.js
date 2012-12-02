// JavaScript Document



// ---------------------------------------------------------------------------------  Function wrap javascript -- called @ window onload.
if(window.addEventListener) {
	window.addEventListener('load', function () {
	var canvas, context, canvas2, context2, canvas3, context3;
  	var tool;
  	var tool_default = 'line';
	var image = new Image;
	var img = new Image;

  	function init () {
//--------------------------------------------------------------------------------- canvas2 --> where the user defined image stored
//--------------------------------------------------------------------------------- canvas3 --> where the recured image is displayed 
    		canvas2 = document.getElementById('imageCreate');
    		context2 = canvas2.getContext('2d');
			
			canvas3 = document.getElementById('outputCanvas');  
			context3 = canvas3.getContext('2d');
			
			canvas4 = document.getElementById('displayCanvas');
			context4 = canvas4.getContext('2d');
			 




	   var formElement = document.getElementById("createImageData"); 
           formElement.addEventListener('click', createImageDataPressed, false);
	  
	  function createImageDataPressed(e) { 
	  		var imageDataDisplay = document.getElementById("imageDataDisplay"); 
	  		imageDataDisplay.value = canvas2.toDataURL(); 
	  		var newImage = window.open(canvas2.toDataURL(),"canvasImage","right=300,top=400,width="+ canvas2.width + ",height=" +	canvas2.height + ",toolbar=0,resizable=0");
	  } 
	  
	 var formElement2 = document.getElementById("recImage");
	 formElement2.addEventListener('click', recImagePressed, false);
	 
	 function recImagePressed(e){
		 var outputCanvas = document.getElementById("outputCanvas");
		 displayCtx = displayCanvas.getContext('2d');
		 viewDisplay = displayCtx.draw();
		 viewDisplay.drawImage(canvas2, 0, 0);
		 //outputCtx = outputCanvas.getContext('2d');
		 //outputCtx.drawImage(canvas2, 0, 0);
	 }
	 
	 function draw() {   
				img = new Image();  
				img.src = "frac1.png"       
				fr1 = makeFrame(ctx,makeVect(400,0), makeVect(400, 0), makeVect(0, 400));
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

//--------------------------------------------------------------------------------- Add the temporary canvas that is cleared with each different drawing function
    		var container = canvas2.parentNode;
    	    canvas = document.createElement('canvas');
            canvas.id     = 'imageTemp';
    	    canvas.width  = canvas2.width;
   	        canvas.height = canvas2.height;
    	    container.appendChild(canvas);
		    context = canvas.getContext('2d');
//---------------------------------------------------------------------------------  Get the tool select input.
    	var tool_select = document.getElementById('dtool');
    	tool_select.addEventListener('change', ev_tool_change, false);

//------------------------------------------------------------------------------------ Activate the default tool.
    	if (tools[tool_default]) {
      		tool = new tools[tool_default]();
      		tool_select.value = tool_default;
    	}
//---------------------------------------------------------------------------------- Attach the mousedown, mousemove and mouseup event listeners.
    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mouseup',   ev_canvas, false);
  }
//----------------------------------------------------------------------------------- The general-purpose event handler. This function just determines the mouse 
// ---------------------------------------------------------------------------------- position relative to the canvas element.
  function ev_canvas (ev) {
    if (ev.layerX || ev.layerX == 0) { // Firefox
      ev._x = ev.layerX;
      ev._y = ev.layerY;
    } 
 //--------------------------------------------------------------------------------- Call the event handler of the tool.
    var func = tool[ev.type];
    if (func) {
      func(ev);
    }
  }

//------------------------------------- ---------------------------------------------event handler for drawing tool
  function ev_tool_change (ev) {
    if (tools[this.value]) {
      tool = new tools[this.value]();
    }
  }

//------------------------------------------------------------------------------------ This function draws the #imageTemp canvas on top of #imageView, after which			 
// ----------------------------------------------------------------------------------- imageTemp is cleared. This function is called each time the user 
//------------------------------------------------------------------------------------ completes a drawing operation.
  function img_update () {
		context2.drawImage(canvas, 0, 0);
		context.clearRect(0, 0, canvas.width, canvas.height);
  }

//------------------------------------------------------------------------------------- This object holds the implementation of each drawing tool.
     var tools = {};

//------------------------------------------------------------------------------------> Free Draw Marker.
  tools.markerT = function () {
    var markT = this;
    this.started = false;

    this.mousedown = function (ev) {
        context.beginPath();
        context.moveTo(ev._x, ev._y);
        tool.started = true;
    };
	
    this.mousemove = function (ev) {
      if (tool.started) {
        context.lineTo(ev._x, ev._y);
        context.stroke();
		context.strokeStyle = "Red";
		context.lineWidth = 8;
      }
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };
  };
//------------------------------------------------------------------------------------> Eraser Tool
  tools.eraser = function () {
    var eraser = this;
    this.started = false;

    this.mousedown = function (ev) {
        context.beginPath();
        context.moveTo(ev._x, ev._y);
        tool.started = true;
    };
	
    this.mousemove = function (ev) {
      if (tool.started) {
        context.lineTo(ev._x, ev._y);
        context.stroke();
		context.strokeStyle = "White";
		context.lineWidth = 15;
      }
    };

   this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };
  };
// -------------------------------------------------------------------------------------Doors Tool
  tools.rect = function () {
    var tool = this;
    this.started = false;
	
    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      var x = Math.min(ev._x,  tool.x0),
          y = Math.min(ev._y,  tool.y0),
          w = Math.abs(ev._x - tool.x0),
          h = Math.abs(ev._y - tool.y0);

      if (!w || !h) {
        return;
      }

      context.strokeRect(x, y, w, h);
	  context.strokeStyle = "Black";
	  context.lineWidth = 1;
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };
  };
//------------------------------------------------------------------------------------ Rectangle Tool
  tools.rectangle = function () {
    var tool = this;
    this.started = false;
	
    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      var x = Math.min(ev._x,  tool.x0),
          y = Math.min(ev._y,  tool.y0),
          w = Math.abs(ev._x - tool.x0),
          h = Math.abs(ev._y - tool.y0);

      context.clearRect(0, 0, canvas.width, canvas.height);

      if (!w || !h) {
        return;
      }

      context.strokeRect(x, y, w, h);
	  context.strokeStyle = "Black";
	  context.lineWidth = 3;
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };
  };
  //-----------------------------------------------------WormHole Tool 
  //-----------------------------------------------------this tool is the same as circle but circles do not clear while mouse is moving causing multiple cirlcle to be drawn
  tools.circleStack = function (){
	  var tool = this;
	  this.started = false;
	  
	  this.mousedown = function (ev) {
		  tool.started = true;
		  tool.x0 = ev._x;
		  tool.y0 = ev._y;
	  };
	  
	  this.mousemove = function (ev){
		  if(!tool.started){
			  return;
		  }
		  
	   var centerX = ev._x;//Math.min(ev._x,  tool.x0);
       var centerY = ev._y;//Math.min(ev._y,  tool.y0);
       var radius =  Math.min(ev._x ,  ev._y);
	   var startAng = 0
	   var endAng   = 2 * Math.PI;
	
 
       context.beginPath();
       context.arc(centerX, centerY, radius, startAng, endAng, false);
 
       //context.fillStyle = "30C136";
       //context.fill();
       context.lineWidth = 2;
       context.strokeStyle = "Black";
       context.stroke();
	  };
	  
	   this.mouseup = function (ev) {
           if (tool.started) {
              tool.mousemove(ev);
              tool.started = false;
              img_update();
           }
       };
  };
//----------------------------------------------------------------------------------------------------Circle Tool
    tools.circle = function (){
	  var tool = this;
	  this.started = false;
	  
	  this.mousedown = function (ev) {
		  tool.started = true;
		  tool.x0 = ev._x;
		  tool.y0 = ev._y;
	  };
	  
	  this.mousemove = function (ev){
		  if(!tool.started){
			  return;
		  }
		  
	   var centerX = ev._x;//Math.min(ev._x,  tool.x0);
       var centerY = ev._y;//Math.min(ev._y,  tool.y0);
       var radius =  Math.min(ev._x ,  ev._y);
	   var startAng = 0;
	   var endAng   = 2 * Math.PI;
	
	   context.clearRect(0, 0, canvas.width, canvas.height);
 
       context.beginPath();
       context.arc(centerX, centerY, radius, startAng, endAng, false);
 
       //context.fillStyle = "013679";
       //context.fill();
       context.lineWidth = 3;
       context.strokeStyle = "black";
       context.stroke();
	  };
	  
	   this.mouseup = function (ev) {
           if (tool.started) {
              tool.mousemove(ev);
              tool.started = false;
              img_update();
           }
       };
  };
  
  tools.clearCanvas = function(){
   
	var tool = this;
	this.started = false;
	
    context.clearRect(0, 0, canvas.width, canvas.height);
	
	this.mousedown = function(){
		tool.started = true;
		canvas.getContext();
		canvas2.getContext();
		context2.clearRect(0, 0, canvas.width, canvas.height);
		
		};
  };
//-------------------------------------------------- -------------------------------------------Line tool
  tools.line = function () {
    var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  context.beginPath();
      context.moveTo(tool.x0, tool.y0);
      context.lineTo(ev._x,   ev._y);
      context.stroke();
	  context.strokeStyle = "Black";
	  context.lineWidth = 5;
      context.closePath();
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }

    };
  };

init();

}, false);
}

