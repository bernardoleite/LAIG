/**
 * MyCylinderWithTamps
 * @param {scene} scene
 * @param {atributes} [height, bottomRadius, topRadius, stacks, slices, top, bottom]
 */
function MyCylinderWithTamps(scene, height, bottomRadius, topRadius, stacks, slices, top, bottom) {
	CGFobject.call(this,scene);

	this.top = top;
	this.bottom = bottom;
	this.tampTOP = new MyCircle(this.scene, topRadius, height, slices);
	this.tampBOTTOM = new MyCircle(this.scene, bottomRadius, 0, slices); 
	this.cylinderBody = new MyCylinder(this.scene, height, bottomRadius, topRadius, stacks, slices);

};

MyCylinderWithTamps.prototype = Object.create(CGFobject.prototype);
MyCylinderWithTamps.prototype.constructor=MyCylinderWithTamps;


/**
 * Displays MyCylinderWithTamps
 */
MyCylinderWithTamps.prototype.display = function (){

  this.scene.pushMatrix();
	this.cylinderBody.display();
  this.scene.popMatrix();

if(this.top==1){
  this.scene.pushMatrix();
	this.tampTOP.display();
  this.scene.popMatrix();
}

if(this.bottom==1){
   this.scene.pushMatrix();
   	this.scene.rotate(Math.PI, 1,0,0);
 	this.tampBOTTOM.display();
  this.scene.popMatrix();
}
}

/**
 * Scales TexCoords (Not used in this project)
 */
MyCylinderWithTamps.prototype.scaleTexCoords = function (amplifS, amplifT) {};