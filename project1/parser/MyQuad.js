
function MyQuad(scene, args) {
	CGFobject.call(this,scene);

	this.ampS = 1, this.ampT = 1;
	this.xmin = args[0], this.ymax = args[1], this.xmax = args[2], this.ymin = args[3];


	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;
MyQuad.prototype.initBuffers = function () {

	this.calculateIndices();
	this.calculateVertices();
	this.calculateNormals();
	this.h= this.ymax - this.ymin, this.width = this.xmax - this.xmin;
	this.calculateTexCoords();
	

	this.primitiveType=this.scene.gl.TRIANGLES;	
	this.initGLBuffers();
};

MyQuad.prototype.calculateIndices = function () {
	this.indices = [
        0, 1, 2, 
		3, 2, 1
    ];
}

MyQuad.prototype.calculateVertices = function () {
	   this.vertices = [
       this.xmin, this.ymin, 0,
       this.xmax, this.ymin, 0,
       this.xmin, this.ymax, 0,
       this.xmax, this.ymax, 0
	];
}

MyQuad.prototype.calculateNormals = function () {
		this.normals = [
		0,0,1,
		0,0,1,
		0,0,1,
		0,0,1
		];

}

MyQuad.prototype.calculateTexCoords = function () {
		this.texCoords = [
		0, 
		this.h / this.ampT * 1,
	 	this.width / this.ampS * 1, 
	 	this.h / this.ampT * 1,
      	0, 
      	0,
      	1 * this.width / this.ampS, 
      	0
	];
	
}

MyQuad.prototype.scaleTexCoords = function (ampS, ampT) {

	this.texCoords = [
		0,
		this.h / ampT, // * 1
	 	this.width / ampS, // * 1
	 	this.h / ampT, // * 1
      	0, 
      	0,
      	this.width / ampS, // * 1
      	0
	];

	this.updateTexCoordsGLBuffers();
};