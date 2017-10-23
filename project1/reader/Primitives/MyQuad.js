/**
 * MyQuad
 * @param {scene} scene 
 * @param {atributes} args [xmin, ymax, xmax, ymin]
 */
function MyQuad(scene, args) {
	CGFobject.call(this,scene);

	this.ampS = 1, this.ampT = 1;
	this.xmin = args[0], this.ymax = args[1], this.xmax = args[2], this.ymin = args[3];


	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

/**
 * Creates new Rectangle
 */
MyQuad.prototype.initBuffers = function () {

	this.calculateIndices();
	this.calculateVertices();
	this.calculateNormals();
	this.h= this.ymax - this.ymin, this.width = this.xmax - this.xmin;
	this.calculateTexCoords();
	

	this.primitiveType=this.scene.gl.TRIANGLES;	
	this.initGLBuffers();
};

/**
 * Calculates Indices
 */
MyQuad.prototype.calculateIndices = function () {
	this.indices = [
        0, 1, 2, 
		3, 2, 1
    ];
}

/**
 * Calculates Vertices
 */
MyQuad.prototype.calculateVertices = function () {
	   this.vertices = [
       this.xmin, this.ymin, 0,
       this.xmax, this.ymin, 0,
       this.xmin, this.ymax, 0,
       this.xmax, this.ymax, 0
	];
}

/**
 * Calculates Normals
 */
MyQuad.prototype.calculateNormals = function () {
		this.normals = [
		0,0,1,
		0,0,1,
		0,0,1,
		0,0,1
		];

}

/**
 * Calculates TexCoords
 */
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

/**
 * ScaleTexCoords With Amplifiers
 * @param {Number} ampS
 * @param {Number} ampT
 */
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