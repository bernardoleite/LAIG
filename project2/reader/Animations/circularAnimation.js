class circularAnimation extends animation{
	constructor(graph, animationID, animationType, speed, centerx, centery, centerz, radius, startang, rotang) {

		super(graph, animationID, animationType, speed);

		this.graph = graph;

		this.centerx = centerx;
		this.centery = centery;
		this.centerz = centerz;

		this.radius = radius;
		this.startang = startang;
		this.rotang = rotang;

		this.w = speed/rotang;
		this.currentAnimationAngle = 0;
		this.transformMatrix = mat4.create();

		console.warn(this);
	}

	circularAnimation.prototype.update = function(dt) {
    if(this.currentAnimationAngle < this.rotang){

		var alpha = (this.w * dt) + this.startang;

		this.currentAnimationAngle += alpha;

		mat4.identity(this.transformMatrix);
		this.transformMatrix.translate(this.centerx,this.centery,0);
		this.transformMatrix.rotate(alpha, 0, 1, 0);
		this.transformMatrix.translate(this.radius,0,0);
		this.transformMatrix.rotate(90, 0, 1, 0);
		}
	}
}