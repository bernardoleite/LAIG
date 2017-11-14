class linearAnimation extends animation{
	constructor(graph, animationID, animationType, speed, animationControlPoints) {
	    super(graph, animationID, animationType, speed);

		this.graph = graph;
		this.initValues = new Array();
		this.currentAnimation = 0;
		this.controlPoints = animationControlPoints;

		console.warn(this);

		for (var i = 0; i < this.controlPoints.length-1; i++){
			var values = new Array();

			var distance = Math.sqrt(
			(this.controlPoints[i+1][0] - this.controlPoints[i][0])*(this.controlPoints[i+1][0] - this.controlPoints[i][0]) +
			(this.controlPoints[i+1][1] - this.controlPoints[i][1])*(this.controlPoints[i+1][1] - this.controlPoints[i][1]) +
			(this.controlPoints[i+1][2] - this.controlPoints[i][2])*(this.controlPoints[i+1][2] - this.controlPoints[i][2]));

			var cosAlfa = (this.controlPoints[i+1][0] - this.controlPoints[i][0])/distance;
			var senAlfa = (this.controlPoints[i+1][1] - this.controlPoints[i][1])/distance;
			//var alfa = Math.acos(cosAlfa);
			values.push([speed * cosAlfa], [speed * senAlfa]);
			this.initValues.push(values);
		}

		this.transformMatrix = mat4.create();
		this.time = 0;
	}

	update(dt) {
		if(this.currentAnimation < this.controlPoints.length - 1){

			this.time += dt;
			var dx = this.time * this.initValues[this.currentAnimation][0];
			var dy = this.time * this.initValues[this.currentAnimation][1];

			if (dx == this.controlPoints[this.currentAnimation][0] &&  dy == this.controlPoints[this.currentAnimation][1]) // currentAnimation has ended
				this.currentAnimation++;

			mat4.identity(this.transformMatrix);
			this.transformMatrix.translate(dx,dy,0);
			this.transformMatrix.translate(this.controlPoints[this.currentAnimation][0],this.controlPoints[this.currentAnimation][1],0);
			this.transformMatrix.rotate(Math.acos(this.initValues[this.currentAnimation][3]), 0, 1, 0);
			}
	}
}

