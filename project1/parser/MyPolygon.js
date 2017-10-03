/**
 * MyPolygon
 * @constructor
 */
 function MyPolygon(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.prism2 = new MyPrism(this.scene, 8, 20); 
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPolygon.prototype = Object.create(CGFobject.prototype);
 MyPolygon.prototype.constructor = MyPolygon;

 MyPolygon.prototype.initBuffers = function() {

 	
 var numberOfSides = this.slices,
    size = 1,
    Xcenter = 0,
    Ycenter = 0;

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
	
   
   var k = 1;
   var vert = 0;
   var lados = 1;
   var z = 0;
var stack = 1;
var slices = 1;

this.vertices.push(Xcenter, 
		Ycenter, 0 );

		this.normals.push(0,0,1);
		this.texCoords.push(.5,.5);

this.vertices.push(Xcenter + size * Math.cos(k * 2 * Math.PI / numberOfSides), 
		Ycenter + size * Math.sin(k * 2 * Math.PI / numberOfSides), z);

this.normals.push(
			0,
			0,
			1
			);
	this.texCoords.push(
				-.5 * Math.cos(k * 2 * Math.PI / numberOfSides) +.5,
				.5 * Math.sin(k * 2 * Math.PI / numberOfSides)+.5
		);

lados++;
k++;



for (slices = 2; slices <= this.slices+1; slices++)
{

this.vertices.push(Xcenter + size * Math.cos(k * 2 * Math.PI / numberOfSides), 
		Ycenter + size * Math.sin(k * 2 * Math.PI / numberOfSides), z);

this.normals.push(
			0,
			0,
			1
			);
		this.texCoords.push(
				-.5 * Math.cos(k * 2 * Math.PI / numberOfSides) +.5,
				.5 * Math.sin(k * 2 * Math.PI / numberOfSides)+.5
		);
 

this.indices.push(0, slices-1, slices); 

k++;

}
	
	this.prism2.display();

	//console.log(this.normals);
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
