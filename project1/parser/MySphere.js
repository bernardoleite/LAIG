
  	function MySphere(scene, radius, stacks, slices) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;

	this.stacks=stacks;
	
	this.rad=radius;

 	this.initBuffers();
 };

 MySphere.prototype = Object.create(CGFobject.prototype);

 MySphere.prototype.constructor = MySphere;

 MySphere.prototype.initBuffers = function() {

	this.CoordsTexOrig = [], this.indices = [], this.vertices = [], this.normals = [];
 	

 	var AngTheta = Math.PI / this.stacks;
 	var AngPhi = (Math.PI / this.slices) * 2;

 	var itestack = 0;
 	var iteslice = 0;

	while(itestack <= this.stacks) {
		iteslice = 0;
		while(iteslice <= this.slices) {

			this.calculateVertices(itestack, iteslice, AngTheta, AngPhi);
			this.calculateNormals(itestack, iteslice, AngTheta, AngPhi);

			var div1 = iteslice/this.slices;
			var div2 = 1-itestack/this.stacks;

			this.CoordsTexOrig.push(
			div1, 
			div2
			);
		++iteslice;
		}
	++itestack;
	}

	var itestack = 0;
 	var iteslice = 0;

	while(itestack < this.stacks) {
		iteslice = 0;
		while(iteslice < this.slices) {
			this.calculateIndices(itestack, iteslice);
			++iteslice;
		}

		++itestack;
	}

	this.texCoords = this.CoordsTexOrig.slice();
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 
MySphere.prototype.scaleTexCoords = function(ampS, ampT) {}


MySphere.prototype.calculateVertices = function (itestack, iteslice, AngTheta, AngPhi) {


	this.vertices.push(

	Math.sin(itestack * AngTheta) * Math.cos(iteslice * AngPhi) * this.rad, 

	Math.sin(itestack * AngTheta) * Math.sin(iteslice * AngPhi) * this.rad, 

	Math.cos(itestack * AngTheta) * this.rad);

}


MySphere.prototype.calculateNormals = function (itestack, iteslice, AngTheta, AngPhi) {

	this.normals.push(

	Math.cos(iteslice * AngPhi) * Math.sin(itestack * AngTheta), 

	Math.sin(iteslice * AngPhi) * Math.sin(itestack * AngTheta), 

	Math.cos(itestack * AngTheta));


}

MySphere.prototype.calculateIndices = function (itestack, iteslice) {

	this.indices.push(

	iteslice + itestack * (1+this.slices), 

	iteslice + (itestack + 1) * (1+this.slices), 

	iteslice + 1 + (itestack + 1) * (1+this.slices)

	);
	
	this.indices.push(

	iteslice + itestack * (1+this.slices), 

	iteslice + 1 + (itestack + 1) * (1+this.slices), 

	iteslice + 1 + itestack * (1+this.slices)
	);


}