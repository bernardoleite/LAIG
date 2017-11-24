class comboAnimation extends animation{
	constructor(graph, animationID, animationType, comboAnimations) {
	    super(graph, animationID, animationType, null);

	    this.graph = graph;
	    this.animations = comboAnimations;

	}
}