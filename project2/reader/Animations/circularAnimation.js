class circularAnimation extends animation{
	constructor(graph, animationID, animationType, speed, centerx, centery, centerz, radius, startang, rotang) {

		super(graph, animationID, animationType, speed);

		this.graph = graph;

		this.flag = 0;

		this.centerx = centerx;
		this.centery = centery;
		this.centerz = centerz;

		this.radius = radius;
		this.startang = startang;
		this.rotang = rotang;


		this.w = speed/radius;

		this.currentAnimationAngle = ((this.startang/180)*Math.PI);

		this.transformMatrix = mat4.create();


	}

	update(dt) {
				
	
		if(this.currentAnimationAngle < ((this.rotang/180)*Math.PI)){

				this.currentAnimationAngle = (this.w * (dt/1000)) + this.currentAnimationAngle;

			mat4.identity(this.transformMatrix);

			mat4.translate(this.transformMatrix, this.transformMatrix, [this.centerx, this.centery, 0]);
			
			mat4.rotate(this.transformMatrix, this.transformMatrix, this.currentAnimationAngle, [0, 1, 0]);
				
			mat4.translate(this.transformMatrix, this.transformMatrix, [this.radius,0,0]);
			
			mat4.rotate(this.transformMatrix, this.transformMatrix, (90/180)*Math.PI, [0, 1, 0]);
		}
		else{
			this.hasEnded = true;
		}
	}
}