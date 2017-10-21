/**
 * MyCircle
 * @constructor
 */
 function MyCircle(scene, rad, height, slices) {
    CGFobject.call(this,scene);
    
    this.slices = slices;
    this.rad = rad;
    this.height = height;

    this.initBuffers();
 };

 MyCircle.prototype = Object.create(CGFobject.prototype);
 MyCircle.prototype.constructor = MyCircle;

 MyCircle.prototype.initBuffers = function() {

    
 var numberOfSides = this.slices,
    Xcenter = 0;
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

this.vertices.push(Xcenter, Ycenter, this.height );

        this.normals.push(0,0,1);
        this.texCoords.push(.5,.5);

this.vertices.push(Xcenter + this.rad * Math.cos(k * 2 * Math.PI / numberOfSides), 
        Ycenter + this.rad * Math.sin(k * 2 * Math.PI / numberOfSides), this.height);

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

this.vertices.push(Xcenter + this.rad * Math.cos(k * 2 * Math.PI / numberOfSides), 
        Ycenter + this.rad * Math.sin(k * 2 * Math.PI / numberOfSides), this.height);

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
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
 };