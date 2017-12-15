/**
 * bezier animation class, representing a animation in the scene graph.
**/
class bezierAnimation extends animation{
	constructor(graph, animationID, animationType, speed, animationControlPoints) {

	    super(graph, animationID, animationType, speed);

	    this.graph = graph;
	    this.controlPoints = [];

		var index = 0;
	  	var Vert = [];


		for(var i = 0; i < animationControlPoints.length; i++)
			this.controlPoints.push(animationControlPoints[i]);	

	    this.p1x = this.controlPoints[0][0];
		this.p1y = this.controlPoints[0][1];
		this.p1z = this.controlPoints[0][2];

		this.p2x = this.controlPoints[1][0];
		this.p2y = this.controlPoints[1][1];
		this.p2z = this.controlPoints[1][2];

		this.p3x = this.controlPoints[2][0];
		this.p3y = this.controlPoints[2][1];
		this.p3z = this.controlPoints[2][2];

		this.p4x = this.controlPoints[3][0];
		this.p4y = this.controlPoints[3][1];
		this.p4z = this.controlPoints[3][2];

/*Points to CastleJou*/

		this.p12x = (this.p1x+this.p2x)/2;
		this.p12y = (this.p1y+this.p2y)/2;
		this.p12z = (this.p1z+this.p2z)/2;

		this.p23x = (this.p2x+this.p3x)/2;
		this.p23y = (this.p2y+this.p3y)/2;
		this.p23z = (this.p2z+this.p3z)/2;

		this.p34x = (this.p3x+this.p4x)/2;
		this.p34y = (this.p3y+this.p4y)/2;
		this.p34z = (this.p3z+this.p4z)/2;

		this.p123x = (this.p12x+this.p23x)/2;
		this.p123y = (this.p12y+this.p23y)/2;
		this.p123z = (this.p12z+this.p23z)/2;

		this.p234x = (this.p23x+this.p34x)/2;
		this.p234y = (this.p23y+this.p34y)/2;
		this.p234z = (this.p23z+this.p34z)/2;


		this.distance = Math.sqrt(
						Math.pow(Math.abs(this.p1x-this.p12x),2) + 
						Math.pow(Math.abs(this.p1y-this.p12y),2) + 
						Math.pow(Math.abs(this.p1z-this.p12z),2)
						) +

			 			Math.sqrt(
						Math.pow(Math.abs(this.p12x-this.p123x),2) + 
						Math.pow(Math.abs(this.p12y-this.p123y),2) + 
						Math.pow(Math.abs(this.p12z-this.p123z),2)
						) +

			 			Math.sqrt(
						Math.pow(Math.abs(this.p123x-this.p234x),2) + 
						Math.pow(Math.abs(this.p123y-this.p234y),2) + 
						Math.pow(Math.abs(this.p123z-this.p234z),2)
						) +

						Math.sqrt(
						Math.pow(Math.abs(this.p234x-this.p34x),2) + 
						Math.pow(Math.abs(this.p234y-this.p34y),2) + 
						Math.pow(Math.abs(this.p234z-this.p34z),2)
						) +

				        Math.sqrt(
						Math.pow(Math.abs(this.p34x-this.p4x),2) + 
						Math.pow(Math.abs(this.p34y-this.p4y),2) + 
						Math.pow(Math.abs(this.p34z-this.p4z),2)
						);


/*End*/


		this.newPointx = this.p1x;
		this.newPointy = this.p1y;
		this.newPointz = this.p1z;
		
		this.speed = speed;

		this.time = this.distance/this.speed;


		this.tvalue = 0;

	    this.transformMatrix = mat4.create();

	    this.difex = 0, this.difey = 0, this.difez=0;
	    
	}
/**
 * Updates Animation 
 * @param {dt} delta - Recieves time difference between two calls
 */
	update(dt){

		if(this.tvalue<=1){
					this.timeInc = (dt/1000) / this.time;

					this.oldPointx = this.newPointx;
					this.newPointx = Math.pow((1-this.tvalue), 3)*this.p1x+ 3*this.tvalue*Math.pow((1-this.tvalue), 2)*this.p2x + 3*Math.pow(this.tvalue,2)*(1-this.tvalue)*this.p3x + Math.pow(this.tvalue,3)*this.p4x;

					this.oldPointy = this.newPointy;
					this.newPointy = Math.pow((1-this.tvalue), 3)*this.p1y+ 3*this.tvalue*Math.pow((1-this.tvalue), 2)*this.p2y + 3*Math.pow(this.tvalue,2)*(1-this.tvalue)*this.p3y + Math.pow(this.tvalue,3)*this.p4y;

					this.oldPointz = this.newPointz;
					this.newPointz = Math.pow((1-this.tvalue), 3)*this.p1z+ 3*this.tvalue*Math.pow((1-this.tvalue), 2)*this.p2z + 3*Math.pow(this.tvalue,2)*(1-this.tvalue)*this.p3z + Math.pow(this.tvalue,3)*this.p4z;	
					
					this.tvalue = this.tvalue + this.timeInc;

					this.difx = this.newPointx - this.oldPointx;
					this.difz = this.newPointz - this.oldPointz;
					this.dify = this.newPointy - this.oldPointy;

					this.difex= this.difex+this.difx;
					this.difey= this.difey+this.dify;
					this.difez= this.difez+this.difz;

					this.horizontalAng=Math.atan2((this.difx),(this.difz));
					this.verticalAng=Math.atan2(Math.abs(this.dify),Math.abs(this.difz));
					


					mat4.identity(this.transformMatrix);
					

					mat4.translate(this.transformMatrix, this.transformMatrix, [this.difex,this.difey, this.difez]);
					mat4.translate(this.transformMatrix, this.transformMatrix,[this.p1x,this.p1y,this.p1z]);
					mat4.rotate(this.transformMatrix, this.transformMatrix, this.horizontalAng, [0, 1, 0]);

		}
		else{
			this.hasEnded = 1;
		}
	}
	
    changeSameNode(){
    	this.sameNode = true;
    }
}