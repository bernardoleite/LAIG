/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Sphere(scene, slices, stacks) {
	CGFobject.call(this,scene);
	
	this.sphere1 = new MyLamp(this.scene, slices, stacks);
	this.sphere2 = new MyLamp(this.scene, slices, stacks);

};

Sphere.prototype = Object.create(CGFobject.prototype);
Sphere.prototype.constructor=Sphere;

Sphere.prototype.display = function (){


this.scene.pushMatrix();
    this.sphere1.display();
this.scene.popMatrix();

this.scene.pushMatrix();
	this.scene.rotate(Math.PI, 1,0,0);
   	this.sphere2.display();
this.scene.popMatrix();




}