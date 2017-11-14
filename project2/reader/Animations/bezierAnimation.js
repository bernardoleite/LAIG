class bezierAnimation extends animation{
	constructor(graph, animationID, animationType, speed, animationControlPoints) {

	    super(graph, animationID, animationType, speed);

	    this.graph = graph;
	    this.controlPoints = animationControlPoints;

	    console.warn(this);
	}

	update(dt){}
}