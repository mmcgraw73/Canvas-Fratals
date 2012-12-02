// Vector operators

var makeVect;
var xcorVect;
var ycorVect;
var addVect;
var subVect;
var scaleVect;
var rotateVect;
var lengthVect;

makeVect = function (a,b) {
	return {x:a, y:b};
  };

xcorVect = function (v) {
    return v.x;
  };

ycorVect = function (v) {
    return v.y;
  };

addVect = function (v1, v2) {
    return makeVect(xcorVect(v1) + xcorVect(v2), ycorVect(v1) + ycorVect(v2));
  };

subVect = function (v1, v2) {
    return makeVect(xcorVect(v1) - xcorVect(v2), ycorVect(v1) - ycorVect(v2));
  };

scaleVect = function (v,s) {
    return makeVect(s * xcorVect(v), s * ycorVect(v));
  };
  
rotateVect = function (v,theta) {
    var newx = xcorVect(v)*Math.cos(theta) - ycorVect(v)*Math.sin(theta);
    var newy = xcorVect(v)*Math.sin(theta) + ycorVect(v)*Math.cos(theta);
    return makeVect(newx,newy);   
}

lengthVect = function (v) {
	return (Math.sqrt(xcorVect(v)*xcorVect(v) + ycorVect(v)*ycorVect(v)));
}


