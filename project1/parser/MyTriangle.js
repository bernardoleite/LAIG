function MyTriangle(scene, args) {
	CGFobject.call(this,scene);

	this.ampS = 1, this.ampT = 1;

	this.x1 = args[6]; this.y1 = args[7]; this.z1 = args[8];

	this.x2 = args[0]; this.y2 = args[1]; this.z2 = args[2];

	this.x3 = args[3]; this.y3 = args[4]; this.z3 = args[5];

	this.calculateVectors(); //Calculate Vertex Vectors in order to perfom calculations with cos's
	this.calculateAngs(); //Calculate Angs to Know the Sum

	this.initBuffers();
};



MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor=MyTriangle;

MyTriangle.prototype.initBuffers = function () {


	this.vertices = [
				this.x1, this.y1, this.z1,
				this.x2, this.y2, this.z2,
				this.x3, this.y3, this.z3
			];

	this.indices = [0,1,2];
    
	this.calculateNormalVectors(); //Calculate the Norms in relation to the triangle
		
	this.normals = [
    this.norm1, this.norm2, this.norm3,
    this.norm1, this.norm2, this.norm3,
    this.norm1, this.norm2, this.norm3
    ];
	

	
	this.texCoords = 
	[
	  (this.dc - this.da * Math.cos(this.AngBeta)) / this.ampS, this.ampT - ((this.da * Math.sin(this.AngBeta)) /this.ampT),
	  0.0, 
	  1.0,
	  this.dc / this.ampS, 
	  1.0
    ];

	this.primitiveType=this.scene.gl.TRIANGLES;	
	this.initGLBuffers();
};



MyTriangle.prototype.scaleTexCoords = function (amplifS, amplifT) {

	this.texCoords = [	
	  (this.dc - this.da * Math.cos(this.AngBeta)) / amplifS, 1 - ((this.da * Math.sin(this.AngBeta)) /amplifT),
	  0.0, 
	  1.0,
	  this.dc / amplifS, 
	  1.0
    ];

	this.updateTexCoordsGLBuffers();
};


MyTriangle.prototype.calculateVectors = function () {

	//Calculation of the args to put in the Squares
	
	this.Ccalc = (this.x3 - this.x2) * (this.x3 - this.x2) + 
			 	(this.y3 - this.y2) * (this.y3 - this.y2) +
			 	(this.z3 - this.z2) * (this.z3 - this.z2);

	this.Acalc = (this.x1 - this.x3) * (this.x1 - this.x3) + 
				(this.y1 - this.y3) * (this.y1 - this.y3) +
			 	(this.z1 - this.z3) * (this.z1 - this.z3);

	this.Bcalc = (this.x2 - this.x1) * (this.x2 - this.x1) + 
			 	 (this.y2 - this.y1) * (this.y2 - this.y1) +
			 	 (this.z2 - this.z1) * (this.z2 - this.z1);


	//Squares of the a,b,c
	this.da = Math.sqrt (this.Acalc);
	this.db = Math.sqrt(this.Bcalc);
	this.dc = Math.sqrt(this.Ccalc);
	

};


MyTriangle.prototype.calculateAngs = function () {

	this.cbeta =  ( this.dc * this.dc + this.da*this.da - this.db*this.db);
	this.cbeta = this.cbeta / (this.da * this.dc * 2);
	
	this.cgama = ( - this.dc * this.dc + this.da*this.da + this.db*this.db);
	this.cgama = this.cgame / (this.da * this.db * 2);

	this.calfa = (this.db*this.db + this.dc * this.dc - this.da*this.da);
	this.calfa = this.calfa / (this.db * this.dc * 2);

	this.AngAlfa = Math.acos(this.calfa); this.AngGama = Math.acos(this.cgama); this.AngBeta = Math.acos(this.cbeta);

	this.totalSumAngs = this.AngBeta + this.AngAlfa + this.AngGama;
	
}


MyTriangle.prototype.calculateNormalVectors = function(){

	var vetx1 = this.x2 - this.x1, vety1 = this.y2 - this.y1, vetz1 = this.z2 - this.z1;
	var vetx2 = this.x3 - this.x1, vety2 = this.y3 - this.y1, vetz2 = this.z3 - this.z1;

	this.norm1 = Math.abs(
	vety1 * vetz2 - 
	vetz1 * vety2
	);

	this.norm2 = Math.abs(
	vetz1 * vetx2 - 
	vetx1 * vetz2
	);

	this.norm3 = Math.abs(
	vetx1 * vetx2 - 
	vety1 * vetx2
	);
}