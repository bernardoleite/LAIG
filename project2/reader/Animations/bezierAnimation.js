class bezierAnimation extends animation{
	constructor(graph, animationID, animationType, speed, animationControlPoints) {

	    super(graph, animationID, animationType, speed);

	    this.graph = graph;
	    this.controlPoints = [];

		var index = 0;
	  	var Vert = [];
	/*
		for(var i = 0; i < 4; i++) {
			var junction = [];
		
			for(var j = 0; j < 3; j++) {
				junction.push(animationControlPoints[index]);
				index++;
			}
			Vert.push(junction);
		}
		

		console.warn(Vert);
*/

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

		this.newPointx = this.p1x;
		this.newPointy = this.p1y;
		this.newPointz = this.p1z;
		
		this.speed = speed;

		this.distance = Math.sqrt(
						Math.pow(Math.abs(this.p1x-this.p4x),2) + 
						Math.pow(Math.abs(this.p1y-this.p4y),2) + 
						Math.pow(Math.abs(this.p1z-this.p4z),2)
						);


		this.time = this.distance/this.speed;

		this.tvalue = 0;

	    this.transformMatrix = mat4.create();
	    
	}

	update(dt){

			this.timeInc = (dt/1000) / this.time;

			this.oldPointx = this.newPointx;
			this.newPointx = Math.pow((1-this.tvalue), 3)*this.p1x+ 3*this.tvalue*Math.pow((1-this.tvalue), 2)*this.p2x + 3*Math.pow(this.tvalue,2)*(1-this.tvalue)*this.p3x + Math.pow(this.tvalue,3)*this.p4x;

			this.oldPointy = this.newPointy;
			this.newPointy = Math.pow((1-this.tvalue), 3)*this.p1y+ 3*this.tvalue*Math.pow((1-this.tvalue), 2)*this.p2y + 3*Math.pow(this.tvalue,2)*(1-this.tvalue)*this.p3y + Math.pow(this.tvalue,3)*this.p4y;

			this.oldPointz = this.newPointz;
			this.newPointz = Math.pow((1-this.tvalue), 3)*this.p1z+ 3*this.tvalue*Math.pow((1-this.tvalue), 2)*this.p2z + 3*Math.pow(this.tvalue,2)*(1-this.tvalue)*this.p3z + Math.pow(this.tvalue,3)*this.p4z;	
console.warn(this.newPointx), console.warn(this.newPointy),console.warn(this.newPointz);
			this.tvalue = this.tvalue + this.timeInc;

			this.difx = this.newPointx - this.oldPointx;
			this.difz = this.newPointz - this.oldPointz;
			this.dify = this.newPointy - this.oldPointy;

			this.horizontalAng=Math.atan2((this.difx),(this.difz));
			this.verticalAng=Math.atan2(Math.abs(this.dify),Math.abs(this.difz));

			mat4.identity(this.transformMatrix);

			mat4.translate(this.transformMatrix, this.transformMatrix, [this.newPointx,this.newPointy, this.newPointz]);
			mat4.rotate(this.transformMatrix, this.transformMatrix, this.verticalAng, [0, 0, 1]);
			mat4.rotate(this.transformMatrix, this.transformMatrix, this.horizontalAng, [0, 1, 0]);


	}
}