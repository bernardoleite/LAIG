/**
 * animation class, representing a animation in the scene graph.
 * @constructor
**/
class animation{
  constructor(graph, animationID, animationType, animationSpeed) { 
    this.graph = graph;
    this.animationID = animationID;
    this.type = animationType;
    this.speed = animationSpeed;
    this.hasEnded = 0;
    }

}

