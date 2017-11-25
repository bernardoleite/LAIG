class comboAnimation extends animation{
	constructor(graph, animationID, animationType, comboAnimations) {
	    super(graph, animationID, animationType, null);

	    this.graph = graph;
	    this.animations = comboAnimations;

	    this.inc = 0;

	    this.transformMatrix = mat4.create();

	}

	update(dt){


		if(this.inc < this.animations.length){
			
			if(!this.animations[this.inc].hasEnded)
				this.animations[this.inc].update(dt);
			else{
					if(this.inc < this.animations.length-1)
						mat4.identity(this.animations[this.inc].transformMatrix);
					this.inc++;
				}
			
		}
		else{
			this.hasEnded = 1;
		}
	}
}