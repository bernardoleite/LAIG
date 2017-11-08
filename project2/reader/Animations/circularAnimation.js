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

		console.warn(this);
	}    
}