/**
 * Patch
 * @param {scene} scene
 * @param {attribues} - [degree1, degree2, partsU, partsV, cp]
 */
function Patch(scene, degree1, degree2, partsU, partsV, cp) {

	this.scene = scene;

	this.knotsU = getKnotsVector(degree1);
	this.knotsV = getKnotsVector(degree2)

	this.Vert = getConjVert(degree1, degree2, cp);
		
	this.nurbsSurface = new CGFnurbsSurface(degree1, degree2, this.knotsU, this.knotsV, this.Vert);

	CGFnurbsObject.call(this, this.scene, this.getSurfacePoint, partsU, partsV);
}


Patch.prototype = Object.create(CGFnurbsObject.prototype);
Patch.prototype.constructor=Patch;

/**
 * Auxiliary Function to retrieve Surface
 * @param {number} u - U Axis
 * @param {number} v - V Axis
 */
Patch.prototype.getSurfacePoint = function (u, v) {
	return this.nurbsSurface.getPoint(u, v);
};

/**
 * Auxiliary Function to retreive Knots Vector
 * @param {number} degree
 */
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

/**
 * Auxiliary Function to Treat All Control Poins and put them in a Array
 * @param {number} degree1 
 * @param {number} degree2 
 * @param {number} controlPoints 
 */
getConjVert = function(degree1, degree2, controlPoints) {

	var orderU = degree1+1;
	var orderV = degree2+1;
	
	var index = 0;
	var Vert = [];
	
	for(var i = 0; i < orderU; i++) {
		var junction = [];
		
		for(var j = 0; j < orderV; j++) {
			junction.push(controlPoints[index]);
			index++;
		}
		Vert.push(junction);
	}
	return Vert;
}

/**
 * Scale TexCoords using Amplifier S and Amplifier T (Not necessay on this project)
 */
Patch.prototype.scaleTexCoords = function(ampS,ampT){}

/**
 * Displays new Patch
 */
Patch.prototype.display = function() {
	this.scene.pushMatrix();
		CGFnurbsObject.prototype.display.call(this);
	this.scene.popMatrix();
}