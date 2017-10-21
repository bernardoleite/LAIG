
function MyCylinder(scene, height, RadiusB, RadiusT, stacks, slices) {
 	CGFobject.call(this,scene);

	this.stacks = stacks, this.slices = slices;
	this.height = height;
	this.RadiusB = RadiusB, this.RadiusT = RadiusT;

	this.angle = Math.PI/this.slices * 2;

	this.intervalonX = 1/(this.slices), this.intervalonY = 1/(this.stacks);

	this.vertices = [];

	this.indices = [];

	this.normals = [];

	this.texCoords = [];

	this.yTEX = 1;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;
 MyCylinder.prototype.initBuffers = function() {
 
 	this.zvar = 0;

 	var intRad = (this.RadiusT - this.RadiusB) / this.stacks, Radcurrent = this.RadiusB;
 	var m = 0;

 	while(m <= this.stacks) {
 	    this.texelX = 0;
 	    var tempAngle = 0;
 	    
			this.calculateVertAndTexCoords(tempAngle, Radcurrent);

 	    Radcurrent = Radcurrent + intRad, this.yTEX -= this.intervalonY;
 	    m++;
 	    this.zvar = this.height * (1/this.stacks) + this.zvar;
 	};

	var calcLim = ((this.stacks-1) + (this.stacks * this.slices));
	for(i = 0; i < calcLim; i+=1){
		this.calculateIndices(i);
 	};

	
	this.zvar = 0;
 	while (this.zvar <= this.stacks){
		this.calculateNormals();
		this.zvar++;
 	};

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	
 	this.initGLBuffers();

 };

MyCylinder.prototype.calculateIndices = function (ite){
	
	var comp = (ite%(1+this.slices)) ;

	if(comp == (this.slices)){
		this.indices.push(
		2+ite+this.slices, 
		1+i+this.slices, 
		ite);

		this.indices.push(
		2+ite+this.slices, 
		ite, 
		1+ite);
	}

	if(comp != (this.slices)){
		this.indices.push(
		1+ite, 
		2 + ite + this.slices, 
		1+ ite + this.slices);

		this.indices.push(
		ite,
		1+ite, 
		ite + this.slices + 1);
	}

}

MyCylinder.prototype.calculateNormals = function (){

 	    var tempAngle = 0;
 	    var ite = 0;
 	    while(ite <= this.slices) {

 	        this.normals.push(
 	        Math.cos(tempAngle), 
 	        Math.sin(tempAngle), 
 	        0);

 	        tempAngle += this.angle;
 	        ite++;
  	    };

}

MyCylinder.prototype.calculateVertAndTexCoords = function (tempAngle, Radcurrent){

	  var ite = 0;
 	  while (ite <= this.slices) {

 	  	 	if(ite >= this.slices){

 	    		this.vertices.push(
 	    		Radcurrent, 
 	    		0, 
 	    		this.zvar);

				this.texCoords.push(
				1, 
				this.yTEX);
 	    	}


 	    	if(ite < this.slices){

				this.vertices.push(
				Radcurrent*Math.cos(tempAngle), 
				Radcurrent*Math.sin(tempAngle), 
				this.zvar);
				
				this.texCoords.push(
				this.texelX, 
				this.yTEX);
 	    	} 

			this.texelX = this.texelX + this.intervalonX;
 	        tempAngle = tempAngle + this.angle;
 	        ite++;

 	    };

}
MyCylinder.prototype.scaleTexCoords = function (amplifS, amplifT) {};