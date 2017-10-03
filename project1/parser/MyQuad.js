/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyQuad(scene, xmin, ymin, xmax, ymax) {
	CGFobject.call(this,scene);

	this.xmin = xmin;
	this.xmax = xmax;
	this.ymin = ymin;
	this.ymax = ymax;

	this.minS = 0;
	this.minT = 1;
	this.maxS = 0;
	this.maxT = 1;

	
	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {
	this.vertices = [
      		this.xmin, this.ymax, 0,
			this.xmax, this.ymax, 0,
			this.xmin, this.ymin, 0,
			this.xmax, this.ymin, 0
			];

	this.indices = [
            0, 1, 2, 
			3, 2, 1
        ];

   
    this.texCoords = [ 
    	this.minS,this.maxT,
    	this.maxS,this.maxT,
    	this.minS,this.minT,
    	this.maxS,this.minT
    ];

		
	this.primitiveType=this.scene.gl.TRIANGLES;


	   this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
       ];


	this.initGLBuffers();
};
