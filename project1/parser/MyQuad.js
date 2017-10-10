/**
 * MyQuad
 * @constructor
 * @param scene
 * @param coordinates [topLeftX, topLeftY, topLeftZ, bottomRigthX, bottomRightY, bottomRightZ]
 */
function MyQuad(scene, coordinates) {
	CGFobject.call(this,scene);

	this.minX = coordinates[0];
	this.maxY = coordinates[1];
	this.maxX = coordinates[2];
	this.minY = coordinates[3];

	this.amplifS = 1;
	this.amplifT = 1;

	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);

MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {
	this.vertices = [
            this.minX, this.minY, 0,
            this.maxX, this.minY, 0,
            this.minX, this.maxY, 0,
            this.maxX, this.maxY, 0
			];

	this.indices = [
           0, 1, 2, 
		   3, 2, 1
        ];
		
	this.normals = [
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1
    ];

    this.width = this.maxX - this.minX;
    this.height= this.maxY - this.minY;
	
	
	this.texCoords = [
	0.0, 1.0 * this.height / this.amplifT,
	 	1.0 * this.width / this.amplifS, 1.0 * this.height / this.amplifT,
      	0.0, 0.0,
      	1.0 * this.width / this.amplifS, 0.0
	];

	this.primitiveType=this.scene.gl.TRIANGLES;	
	this.initGLBuffers();
};



MyQuad.prototype.scaleTexCoords = function (amplifS, amplifT) {

	this.texCoords = [
	0.0, 1.0 * this.height / amplifT,
	 	1.0 * this.width / amplifS, 1.0 * this.height / amplifT,
      	0.0, 0.0,
      	1.0 * this.width / amplifS, 0.0
	];

	this.updateTexCoordsGLBuffers();
};