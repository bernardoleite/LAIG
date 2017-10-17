function Patch(scene, degree1, degree2, partsU, partsV, cp) {

	this.scene = scene;

	this.knotsU = getKnotsVector(degree1);
	this.knotsV = getKnotsVector(degree2)

	this.Vert = getVert(degree1, degree2, cp);
		
	this.nurbsSurface = new CGFnurbsSurface(degree1, degree2, this.knotsU, this.knotsV, this.Vert);

	CGFnurbsObject.call(this, this.scene, this.getSurfacePoint, partsU, partsV);
}


Patch.prototype = Object.create(CGFnurbsObject.prototype);
Patch.prototype.constructor=Patch;


Patch.prototype.getSurfacePoint = function (u, v) {
	return this.nurbsSurface.getPoint(u, v);
};

getKnotsVector = function(degree) {

	var v = new Array();
	for (var i=0; i<=degree; i++) {
		v.push(0);
	}
	for (var i=0; i<=degree; i++) {
		v.push(1);
	}
	return v;

}


getVert = function(degree1, degree2, controlPoints) {

	var orderU = degree1+1;
	var orderV = degree2+1;
	
	var index = 0;
	var Vert = [];
	
	for(var i = 0; i < orderU; i++) {
		var group = [];
		
		for(var j = 0; j < orderV; j++) {
			group.push(controlPoints[index]);
			index++;
		}
		Vert.push(group);
	}
	return Vert;
}

Patch.prototype.scaleTexCoords = function(ampS,ampT){}

Patch.prototype.display = function() {
	this.scene.pushMatrix();
		CGFnurbsObject.prototype.display.call(this);
	this.scene.popMatrix();
}