// Frame operators

var makeFrame;
var dcFrame;
var originFrame;
var edge1Frame;
var edge2Frame;
var translateFrame;
var scaleFrame;
var rotateFrame;
var rotate90;
var rotate180;
var rotate270;
var rotateAboutCenter;
var flipHorizLeft;
var flipVertUp;
var flipVertDown;

makeFrame = function (context, orig, e1, e2) {
    return {dc:context, origin:orig, edge1:e1, edge2:e2};
  };

dcFrame = function (f) {
    return f.dc;
  };

originFrame = function (f) {
    return f.origin;
  };

edge1Frame = function (f) {
    return f.edge1;
  };

edge2Frame = function (f) {
    return f.edge2;
  };
  
translateFrame = function (f,v) {
	return makeFrame(dcFrame(f), addVect(originFrame(f), v), edge1Frame(f), edge2Frame(f));
}

scaleFrame = function (f,s) {
	return makeFrame(dcFrame(f), originFrame(f), scaleVect(edge1Frame(f), s), scaleVect(edge2Frame(f), s));
}

rotateFrame = function (f, theta) {
	return makeFrame(dcFrame(f), originFrame(f), rotateVect(edge1Frame(f), theta), rotateVect(edge2Frame(f), theta));
}

rotate90 = function (f) {
    return rotateFrame(f,3.14159/2);
}

rotate180 = function (f) {
    return rotateFrame(f,Math.PI);
}

rotate270 = function (f) {
    return rotateFrame(f,3*Math.PI/2);
}

flipHorizLeft = function (f) {
	return makeFrame(dcFrame(f), originFrame(f), scaleVect(edge1Frame(f), -1), edge2Frame(f));
  };
  
flipVertUp = function (f) {
	return makeFrame(dcFrame(f), originFrame(f), edge1Frame(f), scaleVect(edge2Frame(f), -1));
  };  
  
flipVertDown = function (f) {
	return makeFrame(dcFrame(f), addVect(originFrame(f), scaleVect(edge2Frame(f), 2)), edge1Frame(f), scaleVect(edge2Frame(f), -1));
  };  
  
  
  
  
  
  

		