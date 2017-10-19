var aux1 = 0;
var aux2 = 0;


var stacks = 0;
var slices = 0;

function MyLamp(scene, slices, stacks) {
	CGFobject.call(this,scene);

	this.nrSlices = slices;
	this.nrStacks = stacks;

	this.normals	= [];
	this.texCoords	= [];

	this.indices	= [];
	this.vertices	= [];

	this.initBuffers();

}

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;


    MyLamp.prototype.updateTexCoords = function(slices,stacks) {

    	aux1 =  0.5 / this.nrStacks * (stacks + 0);

    	aux2 = 0.5 / this.nrStacks * (stacks + 1) ;

    	

    		this.texCoords.push(
			 aux1 * Math.cos( (Math.PI / this.nrSlices)*2*slices) + 0.5, 
			 aux1 * Math.sin( (Math.PI / this.nrSlices)*2*slices) + 0.5,

			 aux2 * Math.cos( (Math.PI / this.nrSlices)*2*slices ) + 0.5,
			 aux2 * Math.sin( (Math.PI / this.nrSlices)*2*slices ) + 0.5
			);
	
  }




    MyLamp.prototype.updateIndices = function(stacks,slices) {

    	aux1 = slices * 2 ;
    	aux2 = 2*stacks* this.nrSlices;



    		this.indices.push( 
			(aux1) % (2*this.nrSlices) + aux2,
			(aux1+1) % (2*this.nrSlices) + aux2,
			(aux1+2) % (2*this.nrSlices) + aux2
			 );
		
			this.indices.push(
			(aux1+1) % (2*this.nrSlices) + aux2,
			(aux1+3) % (2*this.nrSlices) + aux2,
			(aux1+2) % (2*this.nrSlices) + aux2
			);
	
  }

    MyLamp.prototype.updateNormals = function(stacks,slices) {
			
			aux1 = Math.cos(Math.PI / this.nrSlices * slices*2);
			aux2 =  Math.sin(stacks*Math.PI / (this.nrStacks*2) );

  	  		this.normals.push(
			aux1 * aux2,
			Math.sin(2 * Math.PI / this.nrSlices * slices) * aux2,
			Math.cos(Math.PI / (this.nrStacks*2) * stacks)
			);

			aux1 = Math.cos(Math.PI / this.nrSlices * slices*2);
			aux2 =  Math.sin((stacks+1)*Math.PI / (this.nrStacks*2));

			this.normals.push(
			aux1 * aux2,
			Math.sin(2 * Math.PI / this.nrSlices * slices) * aux2,
			Math.cos((stacks + 1)* Math.PI / (this.nrStacks*2))
			);

  }


    MyLamp.prototype.updateVertices = function(stacks,slices) {


			aux1 = Math.cos(Math.PI / this.nrSlices * slices*2);
			aux2 =  Math.sin(stacks*Math.PI / (this.nrStacks*2) );

  	  		this.vertices.push(
			aux1 * aux2,
			Math.sin(2 * Math.PI / this.nrSlices * slices) * aux2,
			Math.cos(Math.PI / (this.nrStacks*2) * stacks)
			);

			aux1 = Math.cos(Math.PI / this.nrSlices * slices*2);
			aux2 =  Math.sin((stacks+1)*Math.PI / (this.nrStacks*2));

			this.vertices.push(
			aux1 * aux2,
			Math.sin(2 * Math.PI / this.nrSlices * slices) * aux2,
			Math.cos((stacks + 1)* Math.PI / (this.nrStacks*2))
			);

	
  }



MyLamp.prototype.initBuffers = function() {


	for ( stacks = 0; stacks < this.nrStacks;) {
	
		for ( slices = 0; slices < this.nrSlices;) {

			this.updateTexCoords(slices,stacks);
			
			this.updateIndices(stacks,slices);

			this.updateVertices(stacks,slices);

			this.updateNormals(stacks,slices);
			
			slices++;
		}

	 stacks++;
	}
	
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
	
};