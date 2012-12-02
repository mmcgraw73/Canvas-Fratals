// Painters

var imagePainter;
var fourRotationsPainter;
var fourReflectionsPainter;
var slim;
var beside;
var below;
var upSplit;
var cornerSplit;
var rightSplit;
var squareLimit;

imagePainter = function (frame) {  
	var imgWidth = img.width;
	var imgHeight = img.height;
	var ctx = dcFrame(frame);
	var o = originFrame(frame);
	var e1 = edge1Frame(frame);
	var e2 = edge2Frame(frame);
	ctx.translate(xcorVect(o),ycorVect(o));
	ctx.transform(xcorVect(e1)/imgWidth, ycorVect(e1)/imgHeight, xcorVect(e2)/imgWidth, ycorVect(e2)/imgHeight,0,0);
	ctx.drawImage(img,0,0);
} 

beside = function (painter1, painter2) {
	return function (frame) {
	  var ctx = dcFrame(frame);
	  var o = originFrame(frame);
	  var e1 = edge1Frame(frame);
	  var e2 = edge2Frame(frame);
	  var f1 = makeFrame(ctx, o, scaleVect(e1, 0.5), e2);
	  var f2 = makeFrame(ctx, addVect(o, scaleVect(e1, 0.5)), scaleVect(e1, 0.5), e2);
	  ctx.save();
	  painter1(f1);
	  ctx.restore();
	  ctx.save();
	  painter2(f2);
	  ctx.restore();
	}
}

below = function (painter1, painter2) {
	return function (frame) {
	  var ctx = dcFrame(frame);
	  var o = originFrame(frame);
	  var e1 = edge1Frame(frame);
	  var e2 = edge2Frame(frame);
	  var f1 = makeFrame(ctx, o, e1, scaleVect(e2, 0.5));
	  var f2 = makeFrame(ctx, addVect(o, scaleVect(e2, 0.5)), e1, scaleVect(e2, 0.5));
	  ctx.save();
	  painter1(f1);
	  ctx.restore();
	  ctx.save();
	  painter2(f2);
	  ctx.restore();
	}
}

upSplit = function (painter, n) {
    var smaller;
    if (n === 0) {
      return painter;
    } else {
      smaller = upSplit(painter, n - 1);
      return below(beside(smaller, smaller), painter);
    }
}

rightSplit = function (painter, n) {
    var smaller;
    if (n === 0) {
      return painter;
    } else {
      smaller = rightSplit(painter, n - 1);
      return beside(painter, below(smaller, smaller));
    }
}

cornerSplit = function(painter, n) {
    var corner;
    var right;
    var up;
    if (n === 0) {
      return painter;
    } else {
      up = upSplit(painter, n - 1);
      right = rightSplit(painter, n - 1);
      corner = cornerSplit(painter, n - 1);
      return beside(below(up, painter), below(corner, right));
    }
}
	  